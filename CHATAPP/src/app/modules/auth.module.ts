import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthTabsComponent} from '../components/auth-tabs.component';
import {LoginComponent} from '../components/login.component';
import {SignupComponent} from '../components/signup.component';
import {AuthService} from '../services/auth.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],
  declarations: [
    AuthTabsComponent,
    LoginComponent,
    SignupComponent
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService]
})
export class AuthModule {
}
