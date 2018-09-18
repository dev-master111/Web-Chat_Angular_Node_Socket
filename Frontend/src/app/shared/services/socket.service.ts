import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { UserService } from './user.service';

@Injectable()
export class SocketService {
  public socket;

  constructor(
    private userService: UserService
  ) {
  }

  initiateSocket() {
    this.socket = io('//localhost:5001');
  }

  initiateUsers() {
    this.socket.on('connect', (users) => {
    });
  }
}
