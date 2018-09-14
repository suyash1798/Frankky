import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TokenService} from '../services/token.service';
import * as M from 'materialize-css';
import {UsersService} from '../services/users.service';
import * as moment from 'moment';
import io from 'socket.io-client';
import _ from 'lodash';

@Component({
  selector: 'app-toolbar',
  template: `
    <nav class="nav-extended">
      <div class="container">
        <div class="nav-wrapper">
          <a (click)="GoToHome()" href="#" class="brand-logo">Chat App</a>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li class="dropdown-button dropdown-trigger" data-target="dropdown">
              <i class="fa fa-globe fa-1x badge"></i>
              <span class="nav-label-icon" *ngIf="count.length > 0">{{count.length}}</span>
              <ul id='dropdown' class='dropdown-content col s12 collection'>
                <li class="collection-item avatar" *ngFor="let data of notifications">
                  <img src="https://via.placeholder.com/350x150" class="circle">
                  <span [ngClass]="data.read ? 'isRead':'unread'">{{data.message}}</span>
                  <p class="time">{{TimeFromNow(data.created)}}
                </li>
                <li *ngIf="notifications.length <= 0">
                  <p class="text">No Notification</p>
                </li>
                <p class="secondary-content">
                  <a class="markAll btn" (click)="MarkAll()">Mark All As Read</a>
                </p>
              </ul>
            </li>
            <li>
              <a (click)="logout()">Logout</a>
            </li>
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
  notifications = [];
  socket: any;
  count = [];

  constructor(private tokenService: TokenService, private router: Router, private usersService: UsersService) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    this.user = this.tokenService.GetPayload();

    const dropDownElement = document.querySelector('.dropdown-trigger');
    M.Dropdown.init(dropDownElement, {

      alignment: 'right',
      hover: true,
      coverTrigger: false,
    });

    this.GetUser();
    this.socket.on('refreshPage', () => {
      this.GetUser();
    });
  }

  GetUser() {
    this.usersService.GetUserById(this.user.data._id).subscribe(data => {
        console.log(data);
        this.notifications = data.result.notification.reverse();
        const value = _.filter(this.notifications, ['read', false]);
        this.count = value;
      },
      err => {
        if (err.error.token == null){
          this.tokenService.DeleteToken();
          this.router.navigate(['']);
        }
        }
        );
  }

  MarkAll() {
    this.usersService.MarkAllAsRead().subscribe(data => {
      this.socket.emit('refresh', {});
    });
  }

  logout() {
    this.tokenService.DeleteToken();
    this.router.navigate(['']);
  }

  GoToHome() {
    this.router.navigate(['streams']);
  }

  TimeFromNow(time) {
    return moment(time).fromNow();
  }

}
