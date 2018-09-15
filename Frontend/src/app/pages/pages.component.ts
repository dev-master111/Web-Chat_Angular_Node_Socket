import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/index';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})

export class PagesComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    const isAuthenticated: string = sessionStorage.getItem('webchat-username');
    if (!isAuthenticated) {
      this.router.navigate(['/login']);
    } else {
      this.userService.initializeUsers();
    }
  }
}
