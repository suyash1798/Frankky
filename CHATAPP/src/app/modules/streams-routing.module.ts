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
import {PeopleComponent} from '../components/people.component';
import {FollowingComponent} from '../components/following.component';
import {FollowersComponent} from '../components/followers.component';
import {NotificationsComponent} from '../components/notifications.component';
import {ChatComponent} from '../components/chat.component';
import {ImagesComponent} from '../components/images.component';
import {ViewUserComponent} from '../components/view-user.component';

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
  },
  {
    path: 'people',
    component: PeopleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'people/following',
    component: FollowingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'people/followers',
    component: FollowersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'chat/:name',
    component: ChatComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'images/:name',
    component: ImagesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':name',
    component: ViewUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'streams'
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
