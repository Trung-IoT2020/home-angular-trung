import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "../_helpers/guards/guards/auth.guard";

const routes: Routes = [
  {
    path: 'auth',
    // loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    // canActivate: [AuthGuard],
    // loadChildren: () => import('./_metronic/layout/layout.module').then((m) => m.LayoutModule),
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
