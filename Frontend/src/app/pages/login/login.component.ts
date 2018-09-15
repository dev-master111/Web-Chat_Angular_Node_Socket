import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  username: string;

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  login() {
    if (!this.username)  { return; }
    sessionStorage.setItem('webchat-username', this.username);
    this.userService.username = this.username;
    this.userService.initializeUsers();
    this.router.navigate(['/room/' + this.username]);
  }
}
