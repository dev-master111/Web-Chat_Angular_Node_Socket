import { Injectable } from '@angular/core';
import { User, Message } from '../models/user';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MockUsers } from '../consts';
import * as io from 'socket.io-client';

@Injectable()
export class UserService {
  private _myuserName = sessionStorage.getItem('webchat-username');
  private _activeUsername: string;
  private _users: User[] = [];
  private _usersSubscription: BehaviorSubject<User[]> = new BehaviorSubject([]);
  private _socket;

  constructor() {
    this._socket = io('//localhost:3000');
    this.waitMessages();
    this.getPreviousMessages();
  }

  initializeUsers() {
    this._socket.emit('action', { type: 'connected', user: this._myuserName });
    this._socket.on('users', (data) => {
      data.users.forEach(user => {
        const oUser = this._users.find(u => u.username === user.username);
        oUser ? oUser.status = user.status : this._users.push(new User(user.username, user.username, user.status));
      });
      this._usersSubscription.next(this._users);
    });
  }

  set username(name: string) {
    this._myuserName = name;
  }

  getPreviousMessages() {
    this._socket.on('messages', (data) => {
      if (data.user !== this._myuserName) { return; }
      this._users.forEach(user => {
        const msgList = data.messages
          .filter(messageData =>
            (messageData.sender === user.username && messageData.receiver === this._myuserName) ||
            (messageData.sender === this._myuserName && messageData.receiver === user.username)
          )
          .map(messageData => ({
            message: messageData.content,
            sender: messageData.sender,
            date: new Date(messageData.date)
          }));
        user.resetMessages(msgList);
      });
    });
  }

  waitMessages() {
    this._socket.on('receive_message', (data) => {
      if (data.receiver === this._myuserName) {
        const receiver = this._users.find(user => user.username === data.sender);
        if (receiver) {
          receiver.addMessage({
            message: data.content,
            sender: data.sender,
            date: new Date(data.date)
          });
        }
      }
    });
  }

  get users() {
    return this._usersSubscription;
  }

  get activeUsername(): string {
    return this._activeUsername;
  }

  activateUser(username: string) {
    this._activeUsername = username;
  }

  getUserByUsername(username: string) {
    return this._users.find(user => user.username === username);
  }

  sendMessage(message: string) {
    this._socket.emit('send_message', {
      sender: this._myuserName,
      receiver: this._activeUsername,
      content: message
    });

    const activatedUser = this._users.find(user => user.username === this._activeUsername);
    activatedUser.addMessage({
      sender: this._myuserName,
      message: message,
      date: new Date()
    });
  }
}
