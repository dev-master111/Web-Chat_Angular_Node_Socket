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
    this.socket = io('//ec2-18-217-180-153.us-east-2.compute.amazonaws.com:5001');
  }

  initiateUsers() {
    this.socket.on('connect', (users) => {
    });
  }
}
