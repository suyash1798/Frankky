/*
* Created By Suyash Tiwari
* on 1 september 2018
*/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StreamsComponent} from '../components/streams.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [StreamsComponent],
  exports : [StreamsComponent]
})
export class StreamsModule { }
