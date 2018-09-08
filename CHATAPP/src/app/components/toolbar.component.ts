import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TokenService} from '../services/token.service';

@Component({
  selector: 'app-toolbar',
  template: `
    <nav class="nav-extended">
      <div class="container">
        <div class="nav-wrapper">
          <a href="#" class="brand-logo">Chat App</a>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li><a href="sass.html">Sass</a></li>
            <li><a href="badges.html">Components</a></li>
            <li><a href="collapsible.html" (click)="logout()">Logout</a></li>
          </ul>
        </div>
        <div class="nav-content">
          <div class="nav-div">
            <img class="circle responsive-img" src="https://via.placeholder.com/350x150">
          </div>
          <h1 class="profile-name">{{user.data.username}}</h1>
          <p class="user-text">This is a test</p>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    nav {
      background-color: #64b5f6;
    }

    .brand-logo {
      font-weight: 700;
      font-size: 30px;
    }

    .navDiv {
      background-color: #64b5f6;
    }

    .nav-content {
      height: 250px;
    }

    .nav-div {
      width: 300px;
      height: auto;
      display: block;
      text-align: center;
      margin: 0 auto;
      margin-top: 15px;
    }

    .nav-div img {
      margin-top: 20px;
      width: 140px;
      height: 140px;
      border-radius: 50%;
      border: 10px solid rgba(255, 255, 255, 0.3);
      text-align: center;
      margin: 0 auto;
    }

    .profile-name {
      color: #fff;
      font-size: 40px;
      text-align: center;
      margin: 0 auto;
    }

    .user-text {
      color: #fff;
      text-align: center;
      margin: 0 auto;
    }

    .material-icons {
      color: #ffffff !important;
    }

    .nav-label-icon {
      top: -9px;
      position: relative;
      background: red;
      padding: 5px;
      border-radius: 50%;
      width: 40px !important;
      height: 40px !important;
    }

    .dropdown-content {
      margin: 0;
      display: none;
      min-width: 350px;
      max-height: 320px;
      margin-left: -1px;
      overflow-y: scroll;
      opacity: 0;
      position: absolute;
      white-space: nowrap;
      z-index: 1;
      will-change: width, height;
    }

    .title {
      color: #64b5f6;
      margin: 0px !important;
      padding: 0px !important;
      font-weight: normal;
    }

    .isRead {
      color: #64b5f6;
      margin: 0px !important;
      padding: 0px !important;
      font-weight: normal;
    }

    .unread {
      color: #64b5f6;
      margin: 0px !important;
      padding: 0px !important;
      font-weight: bold;
    }

    .time {
      margin-bottom: 10px !important;
      font-style: italic;
    }

    .text {
      text-align: center;
    }

    .material-icons {
      color: #64b5f6 !important;
      cursor: pointer;
    }

    .secondary-content {
      margin-top: -5px !important;
    }

    .markAll {
      color: #ffffff;
      background: #64b5f6 !important;
    }

    li.dropdown-button {
      margin-left: 20px !important;
    }

  `]
})
export class ToolbarComponent implements OnInit {
  user: any;
  constructor(private tokenService: TokenService, private router: Router) { }

  ngOnInit() {
    this.user = this.tokenService.GetPayload();
    console.log(this.user);
  }

  logout() {
    this.tokenService.DeleteToken();
    this.router.navigate(['']);
  }

}
