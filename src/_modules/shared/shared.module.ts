import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerLayoutComponent } from './spinner-layout/spinner-layout.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatMenuModule } from '@angular/material/menu';

import {
  NgbModule,
  NgbDateParserFormatter,
  NgbDatepickerModule,
  NgbDropdown,
  NgbTimepickerModule,
} from '@ng-bootstrap/ng-bootstrap';

import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from './confirmation-dialog/confirmation-dialog.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { TableTemplateComponent } from './table-template/table-template.component';
@NgModule({
  declarations: [
    SpinnerLayoutComponent,
    ConfirmationDialogComponent,
    TableTemplateComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgxSpinnerModule,
    NgSelectModule,
    NgxDaterangepickerMd.forRoot({
      applyLabel: 'Okay',
      firstDay: 0,
    }),
    NgbModule,
    MatMenuModule,
    Ng2SearchPipeModule,
  ],
  providers: [
    ConfirmationDialogService,
    NgbDropdown,
  ],
  exports: [
    Ng2SearchPipeModule,
    SpinnerLayoutComponent,
    MatMenuModule,
    TableTemplateComponent,
  ],
})
export class SharedModule {}
