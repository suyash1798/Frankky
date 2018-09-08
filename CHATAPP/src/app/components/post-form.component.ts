/*
* Created By Suyash Tiwari
* on 2 Sept 2018
*/
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PostService} from '../services/post.service';
import io from 'socket.io-client';

@Component({
  selector: 'app-post-form',
  template: `
    <div class="row">
      <div class="col s12 m12 l10">
        <div class="card postDiv">
          <div class="card-content">
            <form [formGroup]="postForm" novalidate (ngSubmit)="submitPost()">
              <div class="formDiv">
                <textarea id="textarea1" formControlName="post" class="materialize-textarea"></textarea>
                <div class="file-field input-field">
                  <div class="row">
                    <div class="col s6">
                      <div class="btn">
                        <span>
                          <i class="material-icons">image</i>
                          Image
                        </span>
                        <input type="file">
                      </div>
                      <div class="file-path-wrapper">
                        <input class="file-path validate" type="text">
                      </div>
                    </div>
                    <div class="col s6">
                      <button class="btn postBtn">
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .postDiv {
      background-color: #64b5f6;
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
      float: right;
      margin-bottom: 5px;
    }

    .file-field input[type='file'] {
      width: 70% !important;
    }

  `]
})
export class PostFormComponent implements OnInit {

  socketHost: any;
  socket: any;
  postForm: FormGroup;

  constructor(private fb: FormBuilder, private postService: PostService) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.postForm = this.fb.group({
      post: ['', Validators.required]
    });
  }

  submitPost() {
    this.postService.addPost(this.postForm.value).subscribe((data) => {
      this.socket.emit('refresh',{});
      this.postForm.reset();
    });
  }
}
