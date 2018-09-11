import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-notifications',
  template: `
    <app-toolbar></app-toolbar>
    <div class="container" style="margin-top: 30px;">
      <div class="row">
        <div class="col s12 m4 l3">
          <app-side></app-side>
        </div>
        <div class="col s12 m8 l9">
          <ul class="collection col s12 m10">
            <li class="collection-item avatar">
              <img src="https://via.placeholder.com/350x150" alt="" class="circle">
              <span class="title">This is the message</span>
              <a class="secondary-content">
                <i class="material-icons">brightness_1</i>
              </a>
              <p class="time">Date</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .material-icons {
      color: #64b5f6 !important;
      margin-right: 10px;
      cursor: pointer;
    }

    .time {
      margin-bottom: 10px !important;
      font-style: italic;
    }

    .text {
      text-align: center;
      font-size: 18px !important;
    }
  `]
})
export class NotificationsComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
