import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthRoutingModule } from './auth-routing.module';

import { AuthComponent } from './auth.component';
import {AuthLoginComponent} from "./auth-login/auth-login.component";
import {AuthForgotPasswordComponent} from "./auth-forgot-password/auth-forgot-password.component";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [AuthLoginComponent, AuthComponent,AuthForgotPasswordComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
  ],
})
export class AuthModule {}
