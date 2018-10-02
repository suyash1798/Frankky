/*
* Created By Suyash Tiwari
* on 2 Sept 2018
*/
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PostService} from '../services/post.service';
import io from 'socket.io-client';
import {FileUploader} from 'ng2-file-upload';

const URL = 'http://localhost:3000/api/chatapp/upload-image';

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
                      <div class="btn addImageBtn">
                        <span>
                          <i class="material-icons">image</i>
                          Image
                        </span>
                        <input type="file" ng2FileSelect [uploader]="uploader" (onFileSelected)="OnFileSelected($event)">
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
      background-color: black;
    }

    .postBtn {
      float: right;
      margin-bottom: 5px;
      background-color: black;
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

  uploader: FileUploader = new FileUploader({
    url: URL,
    disableMultipart: true
  });

  selectedFile: any;

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
    let body;
    if (!this.selectedFile) {
      body = {
        post: this.postForm.value.post
      };
    } else {
      body = {
        post: this.postForm.value.post,
        image: this.selectedFile
      };
    }

    this.postService.addPost(body).subscribe((data) => {
      this.socket.emit('refresh',{});
      this.postForm.reset();
    });
  }

  OnFileSelected(event) {
    const file: File = event[0];

    this.ReadAsBase64(file)
      .then(result => {
        this.selectedFile = result;
      })
      .catch(err => console.log(err));
  }

  ReadAsBase64(file): Promise<any> {
    const reader = new FileReader();
    const fileValue = new Promise((resolve, reject) => {
      reader.addEventListener('load', () => {
        resolve(reader.result);
      });

      reader.addEventListener('error', event => {
        reject(event);
      });

      reader.readAsDataURL(file);
    });

    return fileValue;
  }
}
