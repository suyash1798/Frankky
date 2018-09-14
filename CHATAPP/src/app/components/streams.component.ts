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
        <div class="col s12 m4 13">
          <app-side></app-side>
        </div>
        <div class="col s12 m8 19">
          <div class="row">
            <div class="col s12 m12 l10">
              <ul class="tabs">
                <li class="tab col s6">
                  <a href="#streams" class="active">Streams</a>
                </li>
                <li class="tab col s6">
                  <a href="#top">Top Streams</a>
                </li>
              </ul>
            </div>
            <div id="streams" class="col s12">
              <app-post-form></app-post-form>
              <app-posts></app-posts>
            </div>
            <div id="top" class="col s12">
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

  constructor(private tokenService: TokenService) {
  }

  ngOnInit() {
    this.token = this.tokenService.GetPayload();
    const tabs = document.querySelector('.tabs');
    M.Tabs.init(tabs, {});
  }


}
