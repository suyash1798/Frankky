import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthTabsComponent} from '../components/auth-tabs.component';
import { LoginComponent } from '../components/login.component';
import { SignupComponent } from '../components/signup.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AuthTabsComponent,
    LoginComponent,
    SignupComponent
  ],
  exports: [
  ]
})
export class AuthModule {
}
