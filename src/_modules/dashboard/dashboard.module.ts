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
import {FormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {OrderModule} from "ngx-order-pipe";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgSelectModule} from "@ng-select/ng-select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MatNativeDateModule} from "@angular/material/core";
import {ChartDeviceComponent} from "./dashboard-home/screen/chart-device/chart-device.component";


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
    AddDeviceModalComponent,
    ChartDeviceComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
    FormsModule,
    NgxPaginationModule,
    OrderModule,
    NgbModule,
    NgSelectModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
  ],
})
export class DashboardModule {
}
