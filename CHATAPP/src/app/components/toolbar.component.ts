import {AfterViewInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {TokenService} from '../services/token.service';
import * as M from 'materialize-css';
import {UsersService} from '../services/users.service';
import * as moment from 'moment';
import io from 'socket.io-client';
import _ from 'lodash';
import {MessageService} from '../services/message.service';

@Component({
  selector: 'app-toolbar',
  template: `
    <nav class="nav-extended">
      <div>
        <div class="nav-wrapper">
          <a (click)="GoToHome()" href="#" class="brand-logo">Chat App</a>
          <ul id="nav-mobile" class="right">
            <li class="dropdown-button dropdown-trigger" data-target="dropdown">
              <i class="fa fa-globe fa-1x badge"></i>
              <span class="nav-label-icon" *ngIf="count.length > 0">{{count.length}}</span>
              <ul id='dropdown' class='dropdown-content col s12 collection'>
                <li class="collection-item avatar" *ngFor="let data of notifications">
                  <img src="https://res.cloudinary.com/dkgxgbhug/image/upload/v{{data.senderId.picVersion}}/{{data.senderId.picId}}"
                       class="circle">
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
            <li class="dropdown-button dropdown-trigger1" data-target="dropdown1">
              <i class="fa fa-bell fa-1x badge"></i>
              <span class="nav-label-icon" *ngIf="msgNumber > 0">{{msgNumber}}</span>
              <ul id='dropdown1' class='dropdown-content col s12 collection'>
                <li class="collection-item avatar" *ngFor="let chat of chatList" (click)="GoToChatPage(chat.receiverId.username)">
                  <div *ngIf="chat.msgId">
                    <img src="https://res.cloudinary.com/dkgxgbhug/image/upload/v{{chat.receiverId.picVersion}}/{{chat.receiverId.picId}}"
                         class="circle">
                    <span class="title">
                    {{chat.receiverId.username}}
                    <a class="secondary-content">
                      {{MessageDate(chat.msgId.message[chat.msgId.message.length - 1].createdAt)}}
                    </a>
                  </span>
                    <p>
                      {{chat.msgId.message[chat.msgId.message.length - 1].body}}
                      <a class="secondary-content"
                         *ngIf="!chat.msgId.message[chat.msgId.message.length-1].isRead && chat.receiverId.username !== chat.msgId.message[chat.msgId.message.length-1].receivername">
                        <i class="material-icons">brightness_1</i>
                      </a>
                      <a class="secondary-content" *ngIf="chat.msgId.message[chat.msgId.message.length-1].isRead">
                        <i class="material-icons">panorma_fish_eye</i>
                      </a>
                    </p>
                  </div>
                </li>
                <li *ngIf="notifications.length <= 0">
                  <p class="text">No Notification</p>
                </li>
                <p class="secondary-content">
                  <a class="markAll btn" (click)="MarkAllMessage()">Mark All As Read</a>
                </p>
              </ul>
            </li>
            <li>
              <a (click)="logout()">Logout</a>
            </li>

          </ul>
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
      left: 17%;
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
      color: black;
      margin: 0px !important;
      padding: 0px !important;
      font-weight: normal;
    }

    .isRead {
      color: black;
      margin: 0px !important;
      padding: 0px !important;
      font-weight: normal;
    }

    .unread {
      color: black;
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
      color: black !important;
      cursor: pointer;
    }

    .secondary-content {
      margin-top: -5px !important;
    }

    .markAll {
      color: #ffffff;
      background: black !important;
    }

    li.dropdown-button {
      margin-left: 20px !important;
    }

    .nav-wrapper{
      background-color: black;
    }
    

  `]
})
export class ToolbarComponent implements OnInit, AfterViewInit {

  @Output() onlineUsers = new EventEmitter();
  user: any;
  notifications = [];
  socket: any;
  count = [];
  chatList = [];
  msgNumber = 0;
  imageId: any;
  imageVersion: any;

  constructor(private tokenService: TokenService, private router: Router, private usersService: UsersService, private msgService: MessageService) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    this.user = this.tokenService.GetPayload();

    const dropDownElement = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(dropDownElement, {

      alignment: 'right',
      hover: true,
      coverTrigger: false,
    });

    const dropDownElementTwo = document.querySelectorAll('.dropdown-trigger1');
    M.Dropdown.init(dropDownElementTwo, {

      alignment: 'left',
      hover: true,
      coverTrigger: false,
    });

    this.socket.emit('online', {room: 'global', user: this.user.data.username});

    this.GetUser();
    this.socket.on('refreshPage', () => {
      this.GetUser();
    });
  }

  ngAfterViewInit(): void {
    this.socket.on('usersOnline', data => {
      this.onlineUsers.emit(data);
    });
  }

  GetUser() {
    this.usersService.GetUserById(this.user.data._id).subscribe(data => {

        this.imageId = data.result.picId;
        this.imageVersion = data.result.picVersion;
        this.notifications = data.result.notification.reverse();
        const value = _.filter(this.notifications, ['read', false]);
        this.count = value;
        this.chatList = data.result.chatList;
        this.CheckIfread(this.chatList);
      },
      err => {
        if (err.error.token == null) {
          this.tokenService.DeleteToken();
          this.router.navigate(['']);
        }
      }
    );
  }

  CheckIfread(arr) {
    const checkArr = [];
    for (let i = 0; i < arr.length; i++) {
      const receiver = arr[i].msgId.message[arr[i].msgId.message.length - 1];
      if (this.router.url !== '/chat/${receiver.sendername}') {
        if (receiver.isRead === false && receiver.receivername === this.user.username) {
          checkArr.push(i);
          this.msgNumber = _.sum(checkArr);
        }
      }
    }
  }

  MarkAll() {
    this.usersService.MarkAllAsRead().subscribe(data => {
      this.socket.emit('refresh', {});
    });
  }

  logout() {
    this.socket.emit('disconnect');
    this.tokenService.DeleteToken();
    this.router.navigate(['']);
  }

  GoToHome() {
    this.router.navigate(['streams']);
  }

  GoToChatPage(name) {
    this.router.navigate(['chat', name]);
    this.msgService.MarkMessages(this.user.username, name).subscribe((data) => {
      console.log(data);
      this.socket.emit('refresh', {});
    });
  }

  MarkAllMessage() {
    this.msgService.MarkAllMessages().subscribe(data => {
      this.socket.emit('refresh', {});
      this.msgNumber = 0;
    });
  }

  TimeFromNow(time) {
    return moment(time).fromNow();
  }

  MessageDate(data) {
    return moment(data).calendar(null, {
      sameDay: '[Today]',
      lastDay: '[Yesterday]',
      lastWeek: 'DD/MM/YYYY',
      sameElse: 'DD/MM/YYYY',
    });
  }

}
