import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SpinnerLayoutComponent} from './spinner-layout/spinner-layout.component';
import {NgxDaterangepickerMd} from 'ngx-daterangepicker-material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {NgxSpinnerModule} from 'ngx-spinner';
import {NgSelectModule} from '@ng-select/ng-select';
import {MatMenuModule} from '@angular/material/menu';

import {
  NgbModule,
  NgbDateParserFormatter,
  NgbDatepickerModule,
  NgbDropdown,
  NgbTimepickerModule, NgbActiveModal,
} from '@ng-bootstrap/ng-bootstrap';

import {ConfirmationDialogComponent} from './confirmation-dialog/confirmation-dialog.component';
import {ConfirmationDialogService} from './confirmation-dialog/confirmation-dialog.service';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {NgxPaginationModule} from "ngx-pagination";
import {FormatOrderNumberPipe} from "./_pipe/format-order-number.pipe";
import {FormatDatePipe} from "./_pipe/format-date.pipe";
import {FormatLanguagePromotionPipe} from "./_pipe/format-language-promotion";
import {FormatNumberPipe} from "./_pipe/format-number.pipe";
import {OrderModule} from "ngx-order-pipe";

import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule} from '@angular/material-moment-adapter';
import {
  NGX_MAT_DATE_FORMATS,
  NgxMatDateFormats,
  NgxMatDatetimePickerModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
import {NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS, NgxMatMomentModule} from '@angular-material-components/moment-adapter';
import {FormatDatepicker} from "../../_helpers/format-datepicker";

export const MOMENT_DATETIME_WITH_SECONDS_FORMAT = 'DD-MM-YYYY  HH:mm:ss';
const CUSTOM_MOMENT_FORMATS: NgxMatDateFormats = {
  parse: {
    dateInput: MOMENT_DATETIME_WITH_SECONDS_FORMAT,
  },
  display: {
    dateInput: MOMENT_DATETIME_WITH_SECONDS_FORMAT,
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";

import {MatNativeDateModule} from '@angular/material/core';
import {TableTemplateComponentV2} from "./table-template-v2/table-template-v2.component";

@NgModule({
  declarations: [
    SpinnerLayoutComponent,
    ConfirmationDialogComponent,
    FormatOrderNumberPipe,
    FormatDatePipe,
    FormatLanguagePromotionPipe,
    FormatNumberPipe,
    TableTemplateComponentV2,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
    NgxMatTimepickerModule,
    NgxMatDatetimePickerModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    NgxMatMomentModule,
  ],
  providers: [
    ConfirmationDialogService,
    NgbDropdown,
    FormatOrderNumberPipe,
    FormatDatePipe,
    FormatLanguagePromotionPipe,
    FormatNumberPipe,
    {provide: NgbDateParserFormatter, useClass: FormatDatepicker},
    ConfirmationDialogService,
    NgbDropdown,
    MatDatepickerModule,
    NgbActiveModal,
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: false}},
    {provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_MOMENT_FORMATS},
    {
      provide: NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS,
      useValue: {useUtc: false},
    },
  ],
  exports: [
    Ng2SearchPipeModule,
    SpinnerLayoutComponent,
    MatMenuModule,
    FormatOrderNumberPipe,
    FormatDatePipe,
    FormatLanguagePromotionPipe,
    FormatNumberPipe,
    TableTemplateComponentV2,
  ],
})
export class SharedModule {
}


