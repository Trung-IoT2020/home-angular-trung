import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {SharedModule} from "../shared/shared.module";
import {DashboardHomeComponent} from "./dashboard-home/dashboard-home.component";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {MenuComponent} from "./menu/menu.component";
import {TaskbarComponent} from "./taskbar/taskbar.component";
import {HomeComponent} from "./dashboard-home/screen/home/home.component";
import {HomeCustomerComponent} from "./dashboard-home/screen/home-customer/home-customer.component";
import {ManageDeviceComponent} from "./dashboard-home/screen/manage-device/manage-device.component";
import {ManageHistoryComponent} from "./dashboard-home/screen/manage-history/manage-history.component";
import {AddDeviceModalComponent} from "./dashboard-home/screen/add-device-modal/add-device-modal.component";


@NgModule({
  declarations: [
    DashboardComponent,
    DashboardHomeComponent,
    MenuComponent,
    TaskbarComponent,
    HomeComponent,
    HomeCustomerComponent,
    ManageDeviceComponent,
    ManageHistoryComponent,
    AddDeviceModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
  ],
})
export class DashboardModule {
}
