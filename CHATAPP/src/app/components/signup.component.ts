import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-signup',
  template: `
    <div class="container">
      <div class="row">
        <div class="col s10 offset-s1" id="panel">
          <h1 id="title">Sign Up</h1>
            <form class="col s12">
              <div class="row">
                <div class="input-field col s12">
                  <input id="user_name" type="text">
                  <label for="user_name">UserName</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <input id="email" type="email">
                  <label for="email">Email</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <input id="password" type="password">
                  <label for="password">Password</label>
                </div>
              </div>
              <button class="btn waves-effect" id="signupbtn">
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

  `]
})
export class SignupComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
