/*
* Created By Suyash Tiwari
* on 1 september 2018
*/
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthTabsComponent} from '../components/auth-tabs.component';
import {StreamsComponent} from '../components/streams.component';
import {AuthGuard} from '../guards/auth.guard';
import {CommentsComponent} from '../components/comments.component';

const routes: Routes = [
  {
    path: 'streams',
    component: StreamsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'post/:id',
    component: CommentsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  declarations: []
})
export class StreamsRoutingModule {
}
