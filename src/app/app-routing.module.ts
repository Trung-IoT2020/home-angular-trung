import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "../_helpers/guards/guards/auth.guard";
import {AuthModule} from "../_modules/auth/auth.module";
import {DashboardModule} from "../_modules/dashboard/dashboard.module";

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./../_modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    // canActivate: [AuthGuard],
    loadChildren: () => import('./../_modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  { path: '**',
  loadChildren: ()=> import('../_modules/errors/errors.module').then((m)=> m.ErrorsModule)
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
