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
import {TableTemplateComponentV2} from "./table-template-v2/table-template-v2.component";
import {NgxPaginationModule} from "ngx-pagination";
import {FormatOrderNumberPipe} from "./_pipe/format-order-number.pipe";
import {FormatDatePipe} from "./_pipe/format-date.pipe";
import {FormatLanguagePromotionPipe} from "./_pipe/format-language-promotion";
import {FormatNumberPipe} from "./_pipe/format-number.pipe";
import {OrderModule} from "ngx-order-pipe";
@NgModule({
  declarations: [
    SpinnerLayoutComponent,
    ConfirmationDialogComponent,
    TableTemplateComponentV2,
    FormatOrderNumberPipe,
    FormatDatePipe,
    FormatLanguagePromotionPipe,
    FormatNumberPipe
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
    NgxPaginationModule,
    OrderModule,
  ],
  providers: [
    ConfirmationDialogService,
    NgbDropdown,
    FormatOrderNumberPipe,
    FormatDatePipe,
    FormatLanguagePromotionPipe,
    FormatNumberPipe
  ],
  exports: [
    Ng2SearchPipeModule,
    SpinnerLayoutComponent,
    MatMenuModule,
    FormatOrderNumberPipe,
    FormatDatePipe,
    FormatLanguagePromotionPipe,
    FormatNumberPipe
  ],
})
export class SharedModule {}
