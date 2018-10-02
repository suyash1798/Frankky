/*
* Created By Suyash Tiwari
* on 25 Aug 2018
*/

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthTabsComponent} from '../components/auth-tabs.component';
import {AuthGuard} from '../guards/auth.guard';
import {LoginComponent} from '../components/login.component';
import {SignupComponent} from '../components/signup.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  declarations: []
})
export class AuthRoutingModule {
}
