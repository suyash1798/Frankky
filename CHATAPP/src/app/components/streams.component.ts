/*
* Created By Suyash Tiwari
* on 31 Aug 2018
*/
import {Component, OnInit} from '@angular/core';
import {TokenService} from '../services/token.service';
import {Router} from '@angular/router';

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
          <app-post-form></app-post-form>
          <app-posts></app-posts>
        </div>
      </div>
    </div>
  `,
  styles: ['']
})
export class StreamsComponent implements OnInit {

  token: any;

  constructor() {
  }

  ngOnInit() {
  }


}
