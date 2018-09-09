import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-following',
  template: `
    <app-toolbar></app-toolbar>
    <div class="container" style="margin-top:30px">
      <div class="row">
        <div class="col s12 m4 13">
          <app-side></app-side>
        </div>
        <div class="col s12 m8 19">
          <div class="row">
            <div class="col s12 m6 l4 cardDiv">
              <div class="card">
                <a>
                  <div class="card-image imgDiv">
                    <img class="imgCircle responsive-img" src="https://via.placeholder.com/350x150">
                  </div>
                </a>
                <div class="card-action">
                  <h3 class="card-title">
                    Username
                  </h3>
                  <button class="btn">UnFollow</button>
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
      border: 2px solid #e7e7e7;
    }

    .more {
      margin-right: -18px !important;
    }

    .dropdown-content {
      margin: 0;
      display: none;
      min-width: 150px;
      max-height: auto;
      margin-left: -1px;
      overflow: hidden;
      opacity: 0;
      position: absolute;
      white-space: nowrap;
      z-index: 1;
      will-change: width, height;
    }

    .collection-item {
      margin: 0px !important;
      padding: 0px !important;
    }

    .card-action {
      height: 179px !important;
      border: 1px solid #e7e7e7;
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

    .active {
      width: 350px !important;
      height: 350px !important;
      border-radius: none !important;
      margin: -150px 0px 0px 120px !important;
    }

    .fa-circle {
      color: rgb(21, 206, 21) !important;
      font-size: 15px !important;
    }

    .following {
      color: white !important;
      background-color: #64b5f6 !important;
    }

  `]
})
export class FollowingComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}