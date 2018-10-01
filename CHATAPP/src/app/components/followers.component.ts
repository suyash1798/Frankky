import {Component, OnInit} from '@angular/core';
import {UsersService} from '../services/users.service';
import {TokenService} from '../services/token.service';
import io from 'socket.io-client';

@Component({
  selector: 'app-followers',
  template: `
    <app-toolbar></app-toolbar>
    <div class="container" style="margin-top:30px">
      <div class="row">
        <div class="col s12 m4 13">
          <app-side></app-side>
        </div>
        <div class="col s12 m8 19">
          <div class="row" *ngIf="followers.length > 0">
            <div class="col s12 m6 l4 cardDiv" *ngFor="let user of followers">
              <div class="card">
                <a>
                  <div class="card-image imgDiv">
                    <img class="imgCircle responsive-img" src="https://res.cloudinary.com/dkgxgbhug/image/upload/v{{user.follower.picVersion}}/{{user.follower.picId}}">
                  </div>
                </a>
                <div class="card-action">
                  <h3 class="card-title">
                    {{user.follower.username}}
                  </h3>
                  <!--<button class="btn" (click)="UnFollowUser(user.userFollowed)">UnFollow</button>-->
                </div>
              </div>
            </div>
          </div>
          <div class="row" *ngIf="followers.length <= 0">
            <h4 class="text">You have no follower</h4>
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

    .text {
      text-align: center !important;
      font-size: 18px;
    }
  `]
})
export class FollowersComponent implements OnInit {

  followers = [];
  user: any;

  socket: any;

  constructor(private tokenService: TokenService, private usersService: UsersService) {
    this.socket = io('http://loaclhost:3000');
  }

  ngOnInit() {
    this.user = this.tokenService.GetPayload();
    this.GetUser();
    this.socket.on('refreshPage', () => {
      this.GetUser();
    });
  }

  GetUser() {
    this.usersService.GetUserById(this.user.data._id).subscribe(data => {
      console.log('follower', data);
      this.followers = data.result.followers;
    }, err => console.log(err));
  }

}
