/*
* Created By Suyash Tiwari
* on 2 Sept 2018
*/
import {Component, OnInit} from '@angular/core';
import {PostService} from '../services/post.service';
import * as moment from 'moment';
import io from 'socket.io-client';

@Component({
  selector: 'app-posts',
  template: `
    <ul class="collection" *ngFor="let post of posts">
      <li class="collection-item avatar">
        <img src="https://3.bp.blogspot.com/-9Iu3-Xnvtig/Wntv1F6CKII/AAAAAAAAAR0/CvCLy-jFSUIfM9vjj6UdjZigK7LKBnSPgCLcBGAs/s1600/2.jpg"
             class="circle">
        <span class="title">{{post.username}}</span>
        <p class="time">{{TimeFromNow(post.created)}}
          <br> Country
        </p>
      </li>
      <div class="row">
        <div class="col s12">
          <div class="card-image">
            <img class="postImage"
                 src="https://3.bp.blogspot.com/-9Iu3-Xnvtig/Wntv1F6CKII/AAAAAAAAAR0/CvCLy-jFSUIfM9vjj6UdjZigK7LKBnSPgCLcBGAs/s1600/2.jpg">
          </div>
          <div class="card-content">
            <p>{{post.post}}</p>
          </div>
          <div class="card-action">
            <i (click)="LikePost(post)" class="material-icons">thumb_up</i>
            <span class="iconSpan">
              {{post.totalLikes}}
            </span>
            <i class="material-icons">chat</i>
            <span class="iconSpan">
              {{post.comments.length}}
            </span>
          </div>
        </div>
      </div>
    </ul>
  `,
  styles: [`
    .button {
      background: none !important;
      border: none !important;
      height: 10px;
    }

    .liked {
      color: #64b5f6 !important;
    }

    .title {
      font-weight: bold;
      color: #64b5f6;
    }

    .time {
      font-size: 14px;
      color: #666565;
    }

    .iconSpan {
      font-size: 18px;
      line-height: 18px;
      margin-right: 5px;
    }

    .material-icons {
      display: inline-flex;
      vertical-align: top;
      cursor: pointer;
    }

    .postImage {
      width: 100% !important;
      margin: 0 auto !important;
      left: 20px !important;
      top: 10px !important;
    }

    .card-image {
      width: 200px;
      height: auto !important;
    }

    .active {
      width: 350px !important;
      height: 350px !important;
      border-radius: none !important;
      margin: -150px 0px 0px 120px !important;
    }

    .collection {
      border: none !important;
    }

    .collection-item {
      border: none !important;
    }

  `]
})
export class PostsComponent implements OnInit {
  posts = [];
  socket: any;

  constructor(private postService: PostService) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    this.AllPosts();

    this.socket.on('refreshPage', (data) => {
      this.AllPosts();
    });
  }

  AllPosts() {
    this.postService.getAllPosts().subscribe((data) => {
      this.posts = data.posts;
    });
  }

  TimeFromNow(time) {
    return moment(time).fromNow();
  }

  LikePost(post) {

  }

}
