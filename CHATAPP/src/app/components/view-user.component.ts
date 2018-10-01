import {Component, OnInit, AfterViewInit} from '@angular/core';
import * as M from 'materialize-css';
import {ActivatedRoute} from '@angular/router';
import * as moment from 'moment';
import {UsersService} from '../services/users.service';

@Component({
  selector: 'app-view-user',
  template: `
    <app-toolbar></app-toolbar>

    <div class="container">
      <div class="col s12 m12 l10">
        <ul class="tabs">
          <li class="tab col s4" (click)="ChangeTab('posts')">
            <a href="#" class="active">
              Posts
            </a>
          </li>
          <li class="tab col s4" (click)="ChangeTab('following')">
            <a href="#">
              Following
            </a>
          </li>
          <li class="tab col s4" (click)="ChangeTab('followers')">
            <a href="#">
              Followers
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="container" style="margin-top: 30px">
      <div class="row">
        <div class="col s12 m4 l3">
          <div class="row">
            <div class="col s12">
              <span class="title">{{name}}</span>
              <!--<h2 class="cityName" *ngIf="user.city">{{user.city}}, {{user.country}}</h2>-->
            </div>
          </div>
        </div>

        <div class="col s12 m8 l9" style="background: white;">
          <div class="row">
            <div class="col s12">
              <div class="row" *ngIf="postsTab">
                <ul class="collection col s12 m12 l10" *ngFor="let post of posts">
                  <li class="collection-item avatar">
                    <img class="circle" src="http://res.cloudinary.com/dkgxgbhug/image/upload/v{{user.picVersion}}/{{user.picId}}">
                    <span class="post">{{post.postId.username}}</span>
                    <p class="time">{{TimeFromNow(post.created)}}
                    </p>
                  </li>
                  <div class="row">
                    <div class="col s12">
                      <div class="card">
                        <div class="card-image card_image" *ngIf="post.postId">
                          <img class="circle" src="http://res.cloudinary.com/dkgxgbhug/image/upload/v{{user.picVersion}}/{{user.picId}}">
                        </div>
                        <div class="card-content">
                          <p>{{post.postId.post}}</p>
                        </div>
                        <div class="card-action">
                          <i class="material-icons">thumb_up</i>
                          <span id="iconSpan">
                        {{post.postId.totalLikes}}
                      </span>
                          <i class="material-icons">chat</i>
                          <span id="iconSpan">
                        {{post.postId.comments.length}}
                      </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </ul>
              </div>

              <div class="row" *ngIf="followingTab">
                <div class="col s12 m4 l4" *ngFor="let user of following">
                  <div class="card">
                    <div class="card-image imgDiv">
                      <img class="imgCircle" src="http://res.cloudinary.com/dkgxgbhug/image/upload/v{{user.userFollowed.picVersion}}/{{user.userFollowed.picId}}">
                    </div>
                    <div class="card-action">
                      <h3 class="card-title">{{user.userFollowed.username}}</h3>
                      <!-- <p>Country</p> -->
                    </div>
                  </div>
                </div>
              </div>

              <div class="row" *ngIf="followersTab">
                <div class="col s12 m4 l4" *ngFor="let user of followers">
                  <div class="card">
                    <div class="card-image imgDiv">
                      <img class="imgCircle"
                           src="http://res.cloudinary.com/dkgxgbhug/image/upload/v{{user.follower.picVersion}}/{{user.follower.picId}}">
                    </div>
                    <div class="card-action">
                      <h3 class="card-title">{{user.follower.username}}</h3>
                      <!-- <p>Country</p> -->
                    </div>
                  </div>
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

    .title {
      font-size: 21px;
      font-weight: 700;
      margin-bottom: 0px !important;
      bottom: 0 !important;
    }

    .cityName {
      font-size: 14px;
      line-height: 20px;
      margin-top: -1px !important;
    }

    .post {
      font-weight: bold;
      color: #64b5f6;
    }

    .postImage {
      width: 100% !important;
      margin: 0 auto !important;
      left: 20px !important;
      top: 10px !important;
    }

    .card_image {
      width: 200px;
      height: auto !important;
    }

    .tabs a {
      color: #64b5f6 !important;
      font-weight: bold;
      font-size: 16px;
    }

    .tabs .col .s4 {
      text-align: center !important;
      margin: 0 auto !important;
    }

    .tabs a .indicator {
      background-color: #64b5f6 !important;
    }

    .collection {
      border: none !important;
    }

    .collection-item {
      border: none !important;
    }
  `]
})
export class ViewUserComponent implements OnInit, AfterViewInit {
  tabElement: any;
  postsTab = false;
  followingTab = false;
  followersTab = false;
  posts = [];
  following = [];
  followers = [];
  user: any;
  name: any;

  constructor(private route: ActivatedRoute, private usersService: UsersService) {
  }

  ngOnInit() {
    this.postsTab = true;
    const tabs = document.querySelector('.tabs');
    M.Tabs.init(tabs, {});
    this.tabElement = document.querySelector('.nav-content');

    this.route.params.subscribe(params => {
      this.name = params.name;
      this.GetUserData(this.name);
    });
  }

  ngAfterViewInit() {
    this.tabElement.style.display = 'none';
  }

  GetUserData(name) {
    this.usersService.GetUserByName(name).subscribe(
      data => {
        console.log('data in view user', data);
        this.user = data.result;
        this.posts = data.result.posts.reverse();
        console.log('posts array', this.posts);
        this.followers = data.result.followers;
        this.following = data.result.following;
      },
      err => console.log(err)
    );
  }

  ChangeTab(value) {
    if (value === 'posts') {
      this.postsTab = true;
      this.followersTab = false;
      this.followingTab = false;
    }

    if (value === 'following') {
      this.postsTab = false;
      this.followersTab = false;
      this.followingTab = true;
    }

    if (value === 'followers') {
      this.postsTab = false;
      this.followersTab = true;
      this.followingTab = false;
    }
  }

  TimeFromNow(time) {
    return moment(time).fromNow();
  }
}
