import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PostService} from '../services/post.service';
import {ActivatedRoute} from '@angular/router';
import io from 'socket.io-client';
import * as moment from 'moment';

@Component({
  selector: 'app-comments',
  template: `
    <app-toolbar></app-toolbar>

    <div class="container" style="margin-top: 30px;">
      <div class="row">
        <div class="col s12 m4 l3">
          <app-side></app-side>
        </div>
        <div class="col s12 m4 l9">
          <div class="col s12 m10">
            <div class="row">
              <div class="card">
                <ul class="collection">
                  <li class="collection-item">
                    <span class="post">
                      {{post}}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col s12 m12 l10">
              <div class="card postDiv">
                <div class="card-content">
                  <form [formGroup]="commentForm" (ngSubmit)="AddComment()">
                    <div class="formDiv">
                      <textarea id="textarea1" formControlName="comment" class="materialize-textarea"></textarea>
                      <button class="btn postBtn" style="background-color: black" [disabled]="!commentForm.valid">
                        Add Comment
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <ul class="collection col s12 m10" *ngFor="let comment of commentsArray">
            <li class="collection-item avatar">
              <img class="circle" src="https://via.placeholder.com/350x150">
              <span class="title">{{comment.username}}</span>
              <p class="time">{{TimeFromNow(comment.createdAt)}}</p>
              <p class="postComment">{{comment.comment}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .postDiv {
      background-color: black;
    }

    form {
      background-color: #fff;
    }

    .formDiv {
      margin: 0px 20px 0px 20px;
    }

    .addImageBtn {
      margin-bottom: 5px;
    }

    .postBtn {
      margin-bottom: 5px;
    }

    .title {
      font-weight: bold;
      color: black;
    }

    .time {
      font-size: 14px;
      color: #666565;
    }

    .postComment {
      font-size: 15px;
    }

  `]
})
export class CommentsComponent implements OnInit, AfterViewInit {

  toolbarElement: any;
  socket: any;

  commentForm: FormGroup;
  postId: any;
  commentsArray = [];
  post: string;

  constructor(private fb: FormBuilder, private postService: PostService, private route: ActivatedRoute) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    this.toolbarElement = document.querySelector('.nav-content');
    this.postId = this.route.snapshot.paramMap.get('id');

    this.init();
    this.GetPost();

    this.socket.on('refreshPage', (data) => {
      this.GetPost();
    });
  }

  init() {
    this.commentForm = this.fb.group({
      comment: ['', Validators.required]
    });
  }

  ngAfterViewInit() {
    this.toolbarElement.style.display = 'none';
  }

  AddComment() {
    this.postService.addComment(this.postId, this.commentForm.value.comment).subscribe(data => {
      this.socket.emit('refresh', {});
      this.commentForm.reset();
    });
  }

  GetPost() {
    this.postService.getPost(this.postId).subscribe(data => {
      this.post = data.post.post;
      this.commentsArray = data.post.comments.reverse();
    });
  }

  TimeFromNow(time) {
    return moment(time).fromNow();
  }

}
