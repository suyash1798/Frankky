import {Component, OnInit} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {URL} from 'url';
import {UsersService} from '../services/users.service';
import {TokenService} from '../services/token.service';
import io from 'socket.io-client';

@Component({
  selector: 'app-images',
  template: `
    <app-toolbar></app-toolbar>
    <div class="container" style="margin-top:30px">
      <div class="row">
        <div class="col s12 m4 13">
          <app-side></app-side>
        </div>
        <div class="col s12 m8 19">
          <div class="row">
            <div class="col s6">
              <div class="file-field input-field">
                <div class="btn filebtn">
                  <span>File</span>
                  <input type="file" ng2FileSelect [uploader]="uploader" (onFileSelected)="OnFileSelected($event)">
                </div>
                <div class="file-path-wrapper">
                  <input class="file-path validate" id="filePath" type="text">
                </div>
              </div>
            </div>
            <div class="col s6">
              <div class="file-field input-field">
                <button href="" class="waves-effect waves-light btn uploadbtn" (click)="Upload()">
                  <i class="material-icons left">image</i>
                  Upload Image
                </button>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col s12 m6 14" *ngFor="let image of images">
              <div class="item-img-wrap imgDiv">
                <img src="https://res.cloudinary.com/dkgxgbhug/image/upload/v{{image.imgVersion}}/{{image.imgId}}" alt="" class="imgCircle">
                <button class="btn imgBtn" (click)="SetProfileImage(image)">Set AS Profile</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .item-img-wrap {
      position: relative;
      text-align: center;
      overflow: hidden;
    }
    
    .filebtn ,.uploadbtn{
      background-color: black !important;
    }

    .item-img-wrap img {
      -moz-transition: all 200ms linear;
      -o-transition: all 200ms linear;
      -webkit-transition: all 200ms linear;
      transition: all 200ms linear;
      width: 100%;
      height: 180px;
    }

    .imgCircle {
      border-radius: 50%;
    }

    .imgCircle {
      width: 160px !important;
      height: 160px !important;
      border-radius: 50%;
      margin: 0 auto !important;
    }

    .imgBtn {
      margin: 0 auto !important;
      text-align: center !important;
      margin-top: 5px !important;
      background-color: black;
    }

    .active {
      width: 350px !important;
      height: 350px !important;
      border-radius: 0px !important;
      margin: 50px 0px 0px 120px !important;
    }

    @media only screen and (max-width: 480px) {
      .imgCircle {
        width: 140px !important;
        height: 140px !important;
      }
    }

  `]
})
export class ImagesComponent implements OnInit {

  URL = 'http://localhost:3000/api/chatapp/upload-image';

  uploader: FileUploader = new FileUploader({
    url: this.URL,
    disableMultipart: true
  });
  user: any;
  selectedFile: any;
  images = [];

  socket: any;

  constructor(private usersService: UsersService, private tokenService: TokenService) {
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
    this.usersService.GetUserById(this.user.data._id).subscribe(
      data => {
        this.images = data.result.images;
      },
      err => console.log(err)
    );
  }

  OnFileSelected(event) {
    const file: File = event[0];

    this.ReadAsBase64(file)
      .then(result => {
        this.selectedFile = result;
      })
      .catch(err => console.log(err));
  }

  Upload() {
    if (this.selectedFile) {
      this.usersService.AddImage(this.selectedFile).subscribe(
        data => {
          this.socket.emit('refresh', {});
          const filePath = <HTMLInputElement>document.getElementById('filePath');
          filePath.value = '';
        },
        err => console.log(err)
      );
    }
  }

  SetProfileImage(image) {
    this.usersService.SetDefaultImage(image.imgId, image.imgVersion).subscribe(
      data => {
        this.socket.emit('refresh', {});
      },
      err => console.log(err)
    );
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
