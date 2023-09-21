import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import {AuthLoginComponent} from "./auth-login/auth-login.component";
import {AuthForgotPasswordComponent} from "./auth-forgot-password/auth-forgot-password.component";


const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: AuthLoginComponent,
      },
      {
        path: 'forgotpassword',
        component: AuthForgotPasswordComponent,
      },

      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '**', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
