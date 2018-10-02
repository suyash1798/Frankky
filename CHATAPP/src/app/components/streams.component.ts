/*
* Created By Suyash Tiwari
* on 31 Aug 2018
*/
import {Component, OnInit} from '@angular/core';
import {TokenService} from '../services/token.service';
import {Router} from '@angular/router';
import * as M from 'materialize-css';

@Component({
  selector: 'app-streams',
  template: `
    <app-toolbar></app-toolbar>
    <div class="container" style="margin-top:30px">
      <div class="row">
        <div class="col s12 m4 l4" style="position: sticky;top: 0">
          <app-side></app-side>
        </div>
        <div class="col s12 m8 l8">
          <div class="row">
            <div id="streams" class="col s12" *ngIf="streamsTab">
              <app-post-form></app-post-form>
              <app-posts></app-posts>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ['']
})
export class StreamsComponent implements OnInit {

  token: any;
  streamsTab = false;
  topStreamsTab = false;

  constructor(private tokenService: TokenService) {
  }

  ngOnInit() {
    this.streamsTab = true;
    this.token = this.tokenService.GetPayload();
    const tabs = document.querySelector('.tabs');
    M.Tabs.init(tabs, {});
  }

  ChangeTabs(value) {
    if (value === 'streams') {
      this.streamsTab = true;
      this.topStreamsTab = false;
    }

    if (value === 'top') {
      this.streamsTab = false;
      this.topStreamsTab = true;
    }
  }

}
