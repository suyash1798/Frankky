/*
* Created By Suyash Tiwari
* on 25 Aug 2018
*/
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {TokenService} from '../services/token.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="container">
      <div class="row">
        <div class="col s10 offset-s1" id="panel">
          <div class="progress" *ngIf="showSpinner">
            <div class="indeterminate"></div>
          </div>
          <h1 id="title">Login</h1>
          <div id="errorMsg" *ngIf="errorMessage">
            <span>{{errorMessage}}</span>
          </div>
          <form class="col s12" [formGroup]="loginForm" novalidate (ngSubmit)="loginUser()">
            <div class="row">
              <div class="input-field col s12">
                <input id="user-name" type="text" formControlName="username">
                <label for="user-name">UserName</label>
                <span class="error" *ngIf="!loginForm.controls['username'].valid && loginForm.controls['username'].touched">
                    Username is required
                </span>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input id="password" type="password" formControlName="password">
                <label for="password">Password</label>
                <span class="error" *ngIf="!loginForm.controls['password'].valid && loginForm.controls['password'].touched">
                    password is required
                </span>
              </div>
            </div>
            <button class="btn waves-effect" id="loginbtn" [disabled]="!loginForm.valid" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    #panel {
      background-color: #ffffff;
    }

    #loginbtn {
      float: right;
      margin-right: 10px;
      background-color: #64b5f6;
      font-weight: 500;
    }

    #title {
      background-color: #64b5f6;
      color: white;
      padding: 8px;
      margin-top: 0px;
      font-weight: 700;
      text-align: center;
    }

    form {
      padding: 0px;
      border-radius: 3px;
      box-sizing: border-box;
      margin: 0px 20px 0px 20px;
    }

    .error {
      color: red;
    }

    .indeterminate {
      background-color: #64b5f6 !important;
    }

    .input-field {
      margin-bottom: 0px !important;
      padding-bottom: 0px !important;
    }

    #errorMsg {
      background: #f6b2b5;
      width: 100%;
      height: 50px;
      text-align: center;
    }

    #errorMsg span {
      top: 50%;
      transform: translate(-50%, -50%);
      left: 50%;
      position: relative;
      float: left;
      font-size: 15px;
    }

  `]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string;
  showSpinner = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private tokenService: TokenService) {
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  loginUser() {
    this.showSpinner = true;
    this.authService.loginUser(this.loginForm.value).subscribe(data => {
      console.log(data);
      this.tokenService.SetToken(data.token);
      this.loginForm.reset();
      setTimeout(() => {
        this.router.navigate(['streams']);
      }, 2000);
    }, err => {
      this.showSpinner = false;

      if (err.error.message) {
        this.errorMessage = err.error.message;
      }
    });
  }

}
