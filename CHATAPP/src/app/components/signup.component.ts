/*
* Created By Suyash Tiwari
* on 25 Aug 2018
*/
import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {map} from 'rxjs/internal/operators';
import {Router} from '@angular/router';
import {TokenService} from '../services/token.service';

@Component({
  selector: 'app-signup',
  template: `
    <div class="container">
      <div class="row">
        <div class="col s10 offset-s1" id="panel">
          <div class="progress" *ngIf="showSpinner">
            <div class="indeterminate"></div>
          </div>
          <h3 id="title">Sign Up</h3>
          <div id="errorMsg" *ngIf="errorMessage">
            <span>{{errorMessage}}</span>
          </div>
          <form class="col s12" [formGroup]="signupForm" novalidate (ngSubmit)="signupUser()">
            <div class="row">
              <div class="input-field col s12">
                <input id="user_name" type="text" formControlName="username">
                <label for="user_name">UserName</label>
                <span class="error" *ngIf="!signupForm.controls['username'].valid && signupForm.controls['username'].touched">
                    Username is required                  
                </span>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input id="email" type="email" formControlName="email">
                <label for="email">Email</label>
                <span class="error" *ngIf="!signupForm.controls['email'].valid && signupForm.controls['email'].touched">
                    Email is required                  
                </span>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input id="pass-word" type="password" formControlName="password">
                <label for="pass-word">Password</label>
                <span class="error" *ngIf="!signupForm.controls['password'].valid && signupForm.controls['password'].touched">
                    Password is required                  
                </span>
              </div>
            </div>
            <button class="btn waves-effect" id="signupbtn" [disabled]="!signupForm.valid" type="submit">
              Sign Up
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

    #signupbtn {
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

    #errorMsg {
      background: #f6b2b5;
      width: 100%;
      height: 50px;
      text-align: center;
    }
  `]
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  errorMessage: string;
  showSpinner: boolean = false;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router,
              private tokenService: TokenService) {
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.required]],
      password: ['', Validators.required]
    });
  }

  signupUser() {
    console.log(this.signupForm.value);
    this.showSpinner = true;
    this.authService.registerUser(this.signupForm.value).subscribe(data => {
      this.tokenService.SetToken(data.token);
      this.signupForm.reset();
      setTimeout(() => {
        this.router.navigate(['streams']);
      }, 2000);
    }, err => {
      this.showSpinner = false;
      console.log(err);
      {
        // this.errorMessage = err.error.msg[0].message;
      }

      if (err.error.message) {
        this.errorMessage = err.error.message;
      }
    });
  }

}
