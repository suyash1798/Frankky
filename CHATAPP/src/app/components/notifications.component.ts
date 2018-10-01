import {Component, OnInit} from '@angular/core';
import io from 'socket.io-client';
import {TokenService} from '../services/token.service';
import {UsersService} from '../services/users.service';
import * as moment from 'moment';

@Component({
  selector: 'app-notifications',
  template: `
    <app-toolbar></app-toolbar>
    <div class="container" style="margin-top: 30px;">
      <div class="row">
        <div class="col s12 m4 l3">
          <app-side></app-side>
        </div>
        <div class="col s12 m8 l9">
          <ul class="collection col s12 m10" *ngIf="notifications.length > 0">
            <li class="collection-item avatar" *ngFor="let data of notifications">
              <img src="https://res.cloudinary.com/dkgxgbhug/image/upload/v{{data.senderId.picVersion}}/{{data.senderId.picId}}" alt="" class="circle">
              <span class="title">{{data.message}}</span>
              <a class="secondary-content">
                <i *ngIf="!data.read" class="material-icons">brightness_1</i>
                <i *ngIf="data.read" class="material-icons">panorama_fish_eye</i>
              </a>
              <p class="time">{{TimeFromNow(data.created)}}</p>
              <div class="material-icons">
                <i class="material-icons" (click)="MarkNotification(data)" [ngClass]="data.read ? 'disabled':'notDisabled'">
                  check
                </i>
                <i class="material-icons" (click)="DeleteNotificatio(data)">
                  delete_forever
                </i>
              </div>
            </li>
          </ul>
          <div class="row" *ngIf="notifications.length <= 0">
            <h3 class="text">You have no notification</h3>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .material-icons {
      color: #64b5f6 !important;
      margin-right: 10px;
      cursor: pointer;
    }

    .time {
      margin-bottom: 10px !important;
      font-style: italic;
    }

    .text {
      text-align: center;
      font-size: 18px !important;
    }

    .disabled {
      color: #c0c0c0 !important;
    }
  `]
})
export class NotificationsComponent implements OnInit {

  socket: any;

  user: any;
  notifications = [];

  constructor(private tokenService: TokenService, private usersService: UsersService) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    this.user = this.tokenService.GetPayload();
    this.GetUser();
    this.socket.on('refreshPage', () => {
      this.GetUser();
    });
  }

  GetUser() {
    this.usersService.GetUserById(this.user.data._id).subscribe((data) => {
      console.log(data);
      this.notifications = data.result.notification.reverse();
    });
  }

  MarkNotification(data) {
    this.usersService.MarkNotification(data._id).subscribe(value => {
      this.socket.emit('refresh', {});
    });
  }

  DeleteNotificatio(data) {
    this.usersService.MarkNotification(data._id, true).subscribe(value => {
      this.socket.emit('refresh', {});
    });
  }

  TimeFromNow(time) {
    return moment(time).fromNow();
  }

}
