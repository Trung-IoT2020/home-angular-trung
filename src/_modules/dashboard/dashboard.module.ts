import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import {SharedModule} from "../shared/shared.module";
import {DashboardHomeComponent} from "./dashboard-home/dashboard-home.component";
import {DashboardRoutingModule} from "./dashboard-routing.module";


@NgModule({
  declarations: [DashboardComponent,DashboardHomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
  ],
})
export class DashboardModule {}
