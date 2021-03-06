/*
* Created By Suyash Tiwari
* on 1 september 2018
*/

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StreamsComponent} from '../components/streams.component';
import {TokenService} from '../services/token.service';
import {CookieService} from 'ngx-cookie-service';
import {ToolbarComponent} from '../components/toolbar.component';
import {SideComponent} from '../components/side.component';
import {PostFormComponent} from '../components/post-form.component';
import {PostsComponent} from '../components/posts.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {CommentsComponent} from '../components/comments.component';
import {RouterModule} from '@angular/router';
import {PeopleComponent} from '../components/people.component';
import {UsersService} from '../services/users.service';
import {FollowingComponent} from '../components/following.component';
import {FollowersComponent} from '../components/followers.component';
import {NotificationsComponent} from '../components/notifications.component';
import {TopStreamsComponent} from '../components/top-streams.component';
import {ChatComponent} from '../components/chat.component';
import {MessageComponent} from '../components/message.component';
import {MessageService} from '../services/message.service';
import {NgxAutoScrollModule} from 'ngx-auto-scroll';
import {EmojiPickerModule} from 'ng2-emoji-picker';
import { ImagesComponent } from '../components/images.component';
import {FileUploadModule} from 'ng2-file-upload';
import { ViewUserComponent } from '../components/view-user.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgxAutoScrollModule,
    FileUploadModule,
    EmojiPickerModule.forRoot()
  ],
  declarations: [StreamsComponent,
    ToolbarComponent,
    SideComponent,
    PostFormComponent,
    PostsComponent,
    CommentsComponent,
    PeopleComponent,
    FollowingComponent,
    FollowersComponent,
    NotificationsComponent,
    TopStreamsComponent,
    ChatComponent,
    MessageComponent,
    ImagesComponent,
    ViewUserComponent],
  exports: [StreamsComponent,
    ToolbarComponent],
  providers: [TokenService, CookieService, UsersService, MessageService]
})
export class StreamsModule {
}
