import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../shared/models/user';
import { UserService } from '../../shared/services';

@Component({
  selector: 'app-user-room',
  templateUrl: './user-room.component.html',
  styleUrls: ['./user-room.component.scss']
})

export class UserRoomComponent implements OnInit {
  user: User;
  newMessage: string;
  @ViewChild('messageContainer') messageContainer;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.route.params.subscribe(params => {
      const user = params['username'];
      this.userService.activateUser(user);
      this.moveToBottom();

      this.userService.users.subscribe(users => {
        this.user = this.userService.getUserByUsername(user);
      });
    });
  }

  ngOnInit() {
  }

  sendMessage() {
    this.userService.sendMessage(this.newMessage);
    this.newMessage = '';
    this.moveToBottom();
  }

  moveToBottom() {
    if (!this.messageContainer) { return; }
    const element = this.messageContainer.nativeElement;
    setTimeout(() => element.scrollTop = element.scrollHeight);
  }
}
