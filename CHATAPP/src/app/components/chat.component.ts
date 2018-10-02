import {AfterViewInit, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-chat',
  template: `
    <app-toolbar (onlineUsers)="online($event)"></app-toolbar>
    <div class="container" style="margin-top: 30px">
      <div class="row chatRow">
        <div class="col s12">
          <app-message [users]="online_users"></app-message>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .chatRow {
      bottom: 0 !important;
      margin-bottom: 0px !important;
      position: relative;
      max-height: 700px !important;
    }
  `]
})
export class ChatComponent implements OnInit, AfterViewInit {

  tabElement: any;
  online_users = [];

  constructor() {
  }

  ngOnInit() {
    this.tabElement = document.querySelector('.nav-content');
  }

  ngAfterViewInit() {
    this.tabElement.style.display = 'none';
  }

  online(event) {
    this.online_users = event;
  }

}
