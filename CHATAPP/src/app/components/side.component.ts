/*
* Created By Suyash Tiwari
* on 2 Sept 2018
*/
import {Component, OnInit} from '@angular/core';
import {TokenService} from '../services/token.service';
import {UsersService} from '../services/users.service';
import io from 'socket.io-client';

@Component({
  selector: 'app-side',
  template: `
    
    <div *ngIf="userData" class="nav-content">
      <div class="nav-div">
        <img class="circle responsive-img"
             src="https://res.cloudinary.com/dkgxgbhug/image/upload/v{{userData.picVersion}}/{{userData.picId}}">
      </div>
      <h1 class="profile-name">{{userData.username}}</h1>
    </div>
    <ul class="collection with-header">
      <li class="collection-item" [routerLinkActive]="['active']" [routerLinkActiveOptions]="{exact:true}">
        <a [routerLink]="['/streams']">
          <div>Streams
            <a href="#!" class="secondary-content">
              <i class="material-icons">announcement</i>
            </a>
          </div>
        </a>
      </li>
      <li class="collection-item" [routerLinkActive]="['active']" [routerLinkActiveOptions]="{exact:true}">
        <a [routerLink]="['/people']">
          <div>People
            <a href="#!" class="secondary-content">
              <i class="material-icons">people</i>
            </a>
          </div>
        </a>
      </li>
      <li class="collection-item" [routerLinkActive]="['active']" [routerLinkActiveOptions]="{exact:true}">
        <a [routerLink]="['/people','following']">
          <div>Following
            <a href="#!" class="secondary-content">
              <i class="material-icons">people</i>
            </a>
          </div>
        </a>
      </li>
      <li class="collection-item" [routerLinkActive]="['active']" [routerLinkActiveOptions]="{exact:true}">
        <a [routerLink]="['/people','followers']">
          <div>Followers
            <a href="#!" class="secondary-content">
              <i class="material-icons">people_outline</i>
            </a>
          </div>
        </a>
      </li>
      <li class="collection-item" [routerLinkActive]="['active']" [routerLinkActiveOptions]="{exact:true}">
        <a [routerLink]="['/images',user.data.username]">
          <div>Photos
            <a href="#!" class="secondary-content">
              <i class="material-icons">photo_library</i>
            </a>
          </div>
        </a>
      </li>
      <li class="collection-item" [routerLinkActive]="['active']" [routerLinkActiveOptions]="{exact: true}">
        <a [routerLink]="['/notifications']">
          <div>Notifications
            <a href="#!" class="secondary-content">
              <i class="material-icons">alarm</i>
            </a>
          </div>
        </a>
      </li>
    </ul>
    <div class="row">
      <div class="col s12 m4">
        <a *ngIf="userData" [routerLink]="['',userData.username]">
          <span>Posts</span>
          <p class="num" *ngIf="userData">{{userData.posts.length}}</p>
          <p class="num" *ngIf="!userData">0</p>
        </a>
      </div>
      <div class="col s12 m4">
        <a>
          <span>Following</span>
          <p class="num" *ngIf="userData">{{userData.following.length}}</p>
          <p class="num" *ngIf="!userData">0</p>
        </a>
      </div>
      <div class="col s12 m4">
        <a>
          <span>Followers</span>
          <p class="num" *ngIf="userData">{{userData.followers.length}}</p>
          <p class="num" *ngIf="!userData">0</p>
        </a>
      </div>
    </div>
  `,
  styles: [`
    a {
      color: black;
    }

    .active a {
      color: white !important;
    }

    .active {
      background-color: black !important;
      color: white;
    }

    .material-icons {
      color: black;
    } 

    .active .material-icons {
      color: #ffffff;
    }

    .profile-name {
      color: black;
      font-size: 40px;
      text-align: center;
      margin: 0 auto;
    }
    
    .row span {
      font-size: 12px;
      font-weight: bold;
    }

    .num {
      margin: 0 !important;
      color: black;
      font-weight: bold;
      font-size: 16px;
    }
  `]
})
export class SideComponent implements OnInit {

  socket: any;
  user: any;
  userData: any;

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
    this.usersService.GetUserById(this.user.data._id).subscribe(data => {
      this.userData = data.result;
      console.log('UserData in side', this.userData);
    });
  }

}
