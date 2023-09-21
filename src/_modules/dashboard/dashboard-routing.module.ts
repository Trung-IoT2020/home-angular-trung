import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardHomeComponent} from "./dashboard-home/dashboard-home.component";
import {HomeComponent} from "./dashboard-home/screen/home/home.component";
import {HomeCustomerComponent} from "./dashboard-home/screen/home-customer/home-customer.component";
import {ManageHistoryComponent} from "./dashboard-home/screen/manage-history/manage-history.component";
import {ManageDeviceComponent} from "./dashboard-home/screen/manage-device/manage-device.component";
import {ChartDeviceComponent} from "./dashboard-home/screen/chart-device/chart-device.component";


const routes: Routes = [
  {
    path: '',
    component: DashboardHomeComponent,
    children: [
      {
        path: 'dashboard',
        component: HomeComponent,
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'home-customer',
        component: HomeCustomerComponent,
      },
      {
        path: 'history',
        component: ManageHistoryComponent,
      },
      {
        path: 'device',
        component: ManageDeviceComponent,
      },
      {
        path: 'chart-device',
        component: ChartDeviceComponent,
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {
}
