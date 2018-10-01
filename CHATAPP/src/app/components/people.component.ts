import {Component, OnInit} from '@angular/core';
import {UsersService} from '../services/users.service';
import _ from 'lodash';
import {TokenService} from '../services/token.service';
import {Observable} from 'rxjs';
import io from 'socket.io-client';
import {Router} from '@angular/router';

@Component({
  selector: 'app-people',
  template: `
    <app-toolbar></app-toolbar>
    <div class="container" style="margin-top:30px">
      <div class="row">
        <div class="col s12 m4 13">
          <app-side></app-side>
        </div>
        <div class="col s12 m8 19">
          <div class="row">
            <div class="col s12 m6 l4 cardDiv" *ngFor="let user of users" (click)="ViewUser(user)">
              <div class="card">
                <a>
                  <div class="card-image imgDiv">
                    <img class="imgCircle responsive-img"
                         src="https://res.cloudinary.com/dkgxgbhug/image/upload/v{{user.picVersion}}/{{user.picId}}">
                  </div>
                </a>
                <div class="card-action">
                  <h3 class="card-title">
                    {{user.username}}
                  </h3>
                  <p>Country</p>
                  <button class="btn" *ngIf="!CheckInArray(userArr,user._id)" (click)="FollowUser(user)">Follow</button>
                  <button class="btn following disabled" *ngIf="CheckInArray(userArr,user._id)">Following</button>
                  <a class="secondary-content" [routerLink]="['/chat',user.username]">
                    <i class="material-icons">chat</i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card-image {
      height: 200px;
      border: 2px solid #e7e7e7;
    }

    .more {
      margin-right: -18px !important;
    }

    .dropdown-content {
      margin: 0;
      display: none;
      min-width: 150px;
      max-height: auto;
      margin-left: -1px;
      overflow: hidden;
      opacity: 0;
      position: absolute;
      white-space: nowrap;
      z-index: 1;
      will-change: width, height;
    }

    .collection-item {
      margin: 0px !important;
      padding: 0px !important;
    }

    .card-action {
      height: 179px !important;
      border: 1px solid #e7e7e7;
    }

    .imgDiv {
      display: block;
      position: relative;
    }

    .imgCircle {
      width: 150px !important;
      height: 150px !important;
      border-radius: 50% !important;
      margin: 0 auto !important;
      top: 20px !important;
    }

    .active {
      width: 350px !important;
      height: 350px !important;
      border-radius: none !important;
      margin: -150px 0px 0px 120px !important;
    }

    .fa-circle {
      color: rgb(21, 206, 21) !important;
      font-size: 15px !important;
    }

    .following {
      color: white !important;
      background-color: #64b5f6 !important;
    }

  `]
})
export class PeopleComponent implements OnInit {

  socket: any;
  users = [];
  loggedInUser: any;
  userArr = [];

  constructor(private usersService: UsersService, private tokenService: TokenService, private router: Router) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    this.loggedInUser = this.tokenService.GetPayload();
    this.GetUsers();
    this.GetUser();

    this.socket.on('refreshPage', () => {
      this.GetUsers();
      this.GetUser();
    });
  }

  GetUsers() {
    this.usersService.GetAllUsers().subscribe(data => {
      _.remove(data.result, {username: this.loggedInUser.data.username});
      this.users = data.result;
    });
  }

  GetUser() {
    this.usersService.GetUserById(this.loggedInUser.data._id).subscribe((data) => {
      this.userArr = data.result.following;
    });
  }

  FollowUser(user) {
    this.usersService.FollowUser(user._id).subscribe(data => {
      this.socket.emit('refresh', {});
    });
  }

  ViewUser(user) {
    this.router.navigate([user.username]);
    if (this.loggedInUser.username !== user.username) {
      this.usersService.ProfileNotifications(user._id).subscribe(
        data => {
          this.socket.emit('refresh', {});
        },
        err => console.log(err)
      );
    }
  }

  CheckInArray(arr, id) {
    console.log('checkid', arr, 'id', id);
    const result = _.find(arr, ['userFollowed._id', id]);
    if (result) {
      return true;
    } else {
      return false;
    }
  }

}
