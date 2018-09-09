/*
* Created By Suyash Tiwari
* on 2 Sept 2018
*/
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-side',
  template: `
    <div class="row">
      <div class="col s12 m4">
        <a>
          <span>Posts</span>
          <p class="num">10</p>
        </a>
      </div>
      <div class="col s12 m4">
        <a>
          <span>Following</span>
          <p class="num">10</p>
        </a>
      </div>
      <div class="col s12 m4">
        <a>
          <span>Followers</span>
          <p class="num">10</p>
        </a>
      </div>
    </div>
    <ul class="collection with-header">
      <li class="collection-item" [routerLinkActive]="['active']" [routerLinkActiveOptions]="{exact:true}">
        <a [routerLink]="['/streams']">
          <div>Streams
            <a href="#!" class="secondary-content">
              <i class="material-icons">announcement</i>
            </a>
          </div>
        </a>
      </li>
      <li class="collection-item" [routerLinkActive]="['active']" [routerLinkActiveOptions]="{exact:true}">
        <a [routerLink]="['/people']">
          <div>People
            <a href="#!" class="secondary-content">
              <i class="material-icons">people</i>
            </a>
          </div>
        </a>
      </li>
      <li class="collection-item" [routerLinkActive]="['active']" [routerLinkActiveOptions]="{exact:true}">
        <a [routerLink]="['/people','following']">
          <div>Following
            <a href="#!" class="secondary-content">
              <i class="material-icons">people</i>
            </a>
          </div>
        </a>
      </li>
      <li class="collection-item">
        <div>Followers<a href="#!" class="secondary-content"><i class="material-icons">people_outline</i></a></div>
      </li>
      <li class="collection-item">
        <div>Photos<a href="#!" class="secondary-content"><i class="material-icons">photo_library</i></a></div>
      </li>
      <li class="collection-item">
        <div>Notifications<a href="#!" class="secondary-content"><i class="material-icons">alarm</i></a></div>
      </li>
    </ul>
  `,
  styles: [`
    a {
      color: black;
    }

    .active a {
      color: #ffffff !important;
    }

    .active {
      background-color: #64b5f6 !important;
    }

    .material-icons {
      color: #64b5f6;
    }

    .active .material-icons {
      color: #ffffff;
    }

    .row span {
      font-size: 12px;
      font-weight: bold;
    }
    .num{
      margin: 0 !important;
      color:#64b5f6;
      font-weight: bold;
      font-size: 16px;
    }
  `]
})
export class SideComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
