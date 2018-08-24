import {Component, OnInit} from '@angular/core';
import * as Material from 'materialize-css';


@Component({
  selector: 'app-auth-tabs',
  template: `
    <div class="card-panel blue bodyDiv">
      <div class="container bodyContainer">
        <div class="row">
          <div class="col s12">
            <div class="card">
              <div class="card-tabs">
                <ul class="tabs tabs-fixed-width">
                  <li class="tab col s3"><a class="active" href="#login">Chat App Login</a></li>
                  <li class="tab col s3"><a href="#signup">Chat App Sign Up</a></li>
                </ul>
              </div>
              <div class="card-content">
                <p style="text-align: center; font-size:20px">Welocme to Chat App</p>
              </div>
              <div class="card-content auth-content">
                <div id="login" >
                  <app-login></app-login>
                </div>
                <div id="signup">
                  <app-signup></app-signup>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .bodyDiv {
      height: 100vh;
    }

    div.bodyContainer {
      margin-top: 50px | important;
    }
    
    .tabs a{
      color: #64b5f6;
      font-weight: bold;
      font-size: 18px;
    }
    
    .tabs .active{
      background: inherit !important;
    }
    
    .auth-content{
      height: 503px !important;
    }
  `]
})
export class AuthTabsComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    const tabs = document.querySelector('.tabs');
    Material.Tabs.init(tabs, {});
  }

}
