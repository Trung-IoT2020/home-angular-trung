import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DefaultMatCalendarRangeStrategy, MAT_DATE_RANGE_SELECTION_STRATEGY } from '@angular/material/datepicker';


import { NgxSpinnerService } from 'ngx-spinner';
import * as XLSX from 'xlsx';


import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
// @ts-ignore
import dayjs from 'dayjs';
import {GeneralService} from "../../../_services/general.service";

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'vi-VN' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: DefaultMatCalendarRangeStrategy,
    },
  ],
})
export class FormInputComponent implements OnInit {
  @ViewChild('imageCalendar', { static: false })
  imageCalendar!: ElementRef<HTMLImageElement>;// @ts-ignore
  @Input() selectedDateToDate: { from_date: Date; to_date: Date };
  ranges: any = {
    Today: [dayjs(), dayjs()],
    Yesterday: [dayjs().subtract(1, 'days'), dayjs().subtract(1, 'days')],
    'Last 7 Days': [dayjs().subtract(6, 'days'), dayjs()],
    'Last 30 Days': [dayjs().subtract(29, 'days'), dayjs()],
    'This Month': [dayjs().startOf('month'), dayjs().endOf('month')],
    'Last Month': [dayjs().subtract(1, 'month').startOf('month'), dayjs().subtract(1, 'month').endOf('month')],
  };
  funcTest(): any {
    this.imageCalendar.nativeElement.click();
  }
  constructor(public general: GeneralService,
              private confirmDialog: ConfirmationDialogService,
              private spinner: NgxSpinnerService) {}


  @Input() keyType: any;
  @Input() styleInput: any;
  @Input() nameTitleInput: any = '';
  @Input() valueInput: any = '';
  @Input() required: any = false;
  @Input() popupCaption: any = false;
  @Input() noteCaption: any = '';
  @Input() dataCustom: any = [];
  @Input() selectCustom: any;
  @Input() oneDate: any = '';
  @Input() minOneDate: any = '';
  @Input() maxOneDate: any = '';
  @Input() disabled: any = false;
  @Input() placeholder: any = 'Vui lòng điền thông tin';  // @ts-ignore
  @Input() ddmmyyyy: false;// @ts-ignore
  @Input() fromComponent: string;

  @Output() dataFormOutput: any = new EventEmitter<any>();
  @Output() dataFormChange: any = new EventEmitter<any>();
  @Output() urlChange: any = new EventEmitter<any>();
  @Output() isCheck: any = new EventEmitter<any>();
  mexEmail = /[àảãáạăằẳẵắặâầẩẫấậÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬđĐèẻẽéẹêềểễếệÈẺẼÉẸÊỀỂỄẾỆìỉĩíịÌỈĨÍỊòỏõóọôồổỗốộơờởỡớợÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢùủũúụưừửữứựÙỦŨÚỤƯỪỬỮỨỰỳỷỹýỵ]/g;
  emailRegex: any =
    '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,5}\\.[0-9]{1,5}\\.[0-9]{1,5}\\.[0-9]{1,5}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$';
  ktEmail: any = 0;
  ktPhone: any = 0;
  maxSDT: any = 10;
  fileImportName: any = '';
  checkAllMulti: any = [];
  @Input() dataMulti: any = [];
  @Input() isAllMulti: any = false;
  @Input() selectMulti: any = [];
  @Input() public showSpinners: any = true;
  @Input() public showSeconds: any = true;
  @Input() public touchUi: any = false;
  @Input() public stepHour: any = 1;
  @Input() public stepMinute: any = 1;
  @Input() public stepSecond: any = 1;
  @Input() public color: any = '';
  @Input() public enableMeridian: any = false;

  public maxDate: any;

  @Input() oneDatetime: any = '';
  @Input() minOneDatetime: any = '';
  @Input() maxOneDatetime: any = '';
  @Input() description: any = '';
  // tslint:disable-next-line:variable-name
  @Input() src_img: any;
  @Input() urlCity: any = '';
  @Input() urlDistrict: any = '';
  @Input() urlWard: any = '';
  @Input() selectButton: any;
  @Input() dataSelectButton: any = [];
  @Input() dataCity: any = [
    { id: 'Title1', name: 'Title1' },
    { id: 'Title2', name: 'Title2' },
    { id: 'Title3', name: 'Title3' },
    { id: 'Title4', name: 'Title4' },
  ];
  @Input() dataDistrict: any = [
    { id: 'Title1', name: 'Title1' },
    { id: 'Title2', name: 'Title2' },
    { id: 'Title3', name: 'Title3' },
    { id: 'Title4', name: 'Title4' },
  ];
  @Input() dataWard: any = [
    { id: 'Title1', name: 'Title1' },
    { id: 'Title2', name: 'Title2' },
    { id: 'Title3', name: 'Title3' },
    { id: 'Title4', name: 'Title4' },
  ];
  error: any;
  errorMessage = '';
  listPhoneNumbers: any;

  // tslint:disable-next-line:variable-name
  to_date: any;
  // tslint:disable-next-line:variable-name
  from_date: any;
  countD1: any = 0;
  imageChangedEvent: any;
  selectedThumb: any;

  // myFilter(e: any): any {
  //   console.log(e);
  //   if (e) return false;
  //   else {
  //     const day = new Date().getDay();
  //     // Prevent Saturday and Sunday from being selected.
  //     return day !== 0 && day !== 6;
  //   }
  // }

  onFileChange(event: any): any {
    const files: FileList = event.target.files;
    this.fileImportName = files[0].name;
    this.saveFiles(files);
  }

  saveFiles(files: FileList): any {
    if (files.length > 1) {
      this.error = 'Only one file at time allow';
    } else {
      this.error = '';
      if (files.length !== 1) {
        throw new Error('Cannot use multiple files');
      }
      this.description = '';
      const reader: FileReader = new FileReader();
      reader.readAsBinaryString(files[0]);
      reader.onload = (e: any) => {
        const binarystr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        this.convertFiletoObject(data);
      };
    }
  }

  convertFiletoObject(list: any): any {
    this.listPhoneNumbers = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < list.length; i++) {
      this.listPhoneNumbers.push(list[i].SDT);
    }
    this.description = this.description + this.listPhoneNumbers.toString();
  }

  selectMultiV(e: any): any {
    this.selectMulti = e;
    if (this.selectMulti.length !== this.checkAllMulti.length) {
      this.isAllMulti = false;
    } else {
      this.isAllMulti = true;
    }
  }

  selectAllMulti(): any {
    if (this.selectMulti.length === 0 || this.selectMulti.length !== this.checkAllMulti.length) {
      this.isAllMulti = true;
      const arr = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.dataMulti.length; i++) {
        const id = this.dataMulti[i].id;
        arr.push(id);
      }
      this.selectMulti = arr;
      this.checkAllMulti = arr;
      this.dataFormChange.emit(this.selectMulti);
    } else {
      this.isAllMulti = false;
      this.selectMulti = [];
      this.dataFormChange.emit(this.selectMulti);
    }
  }

  preventMinus(e: any): any {
    e = e || window.event; // IE support
    const c = e.keyCode;
    const ctrlDown = e.ctrlKey || e.metaKey; // Mac support
    if (ctrlDown && c === 67) {
      return true;
    }
    // c
    else if (ctrlDown && c === 86) {
      return true;
    }
    // v
    else if (ctrlDown && c === 88) {
      return true;
    } else if (ctrlDown && c === 65) {
      return true;
    }
    if (e.keyCode === 8 || e.keyCode === 46 || e.keyCode === 37 || e.keyCode === 39 || e.keyCode === 13 || e.keyCode === 9) {
      return true;
    }
    if (e.keyCode === 109 || e.keyCode === 187 || e.keyCode === 189 || e.keyCode === 107) {
      return false;
    }
    const seperator = '^([0-9])';
    const maskSeperator = new RegExp(seperator, 'g');
    const result = maskSeperator.test(e.key);
    return result;
  }

  ngOnInit(): void {
    const today = new Date();
    const lastMont = new Date(today);
    lastMont.setDate(today.getDate() - 7);
    this.to_date = this.general.convertDateToYYYYMMDD(today);
    this.from_date = this.general.convertDateToYYYYMMDD(lastMont);
    this.oneDate = this.to_date;

    if (this.keyType === 'Number') {
      this.valueInput = String(this.valueInput)
        .replace(/\D/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
  }

  changeEventButton(i: any, e: any): any {
    let v = {};
    if (i === 1) {
      v = { type: 'select', data: e, nameTitleInput: this.nameTitleInput };
    } else {
      v = { type: 'button', data: e, nameTitleInput: this.nameTitleInput };
    }
    this.dataFormChange.emit(v);
  }

  changeThumb(event: any): void {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < event.target.files.length; i++) {
      const size = event.target.files[i].size;
      if (Math.round(size / 1024) <= (this.fromComponent === 'debt-brick-modal' ? 1500 : 150)) {
        this.imageChangedEvent = event;
        this.selectedThumb = event.target.files;
        if (this.selectedThumb && this.selectedThumb[0]) {
          // @ts-ignore
          const lst = [];
          const numberOfFiles = this.selectedThumb.length;
          // tslint:disable-next-line:no-shadowed-variable
          for (let i = 0; i < numberOfFiles; i++) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
              const temp = e.target.result.split(',');
              const timep = new Date().getTime();

              const type = e.target.result.split(',')[0].split('/')[1].split(';')[0];

              const dic = {
                sub_folder: 'imageFconnectAll',
                data_content: temp[1],
                data_file_name: String(timep),
                data_type: type,
                big_file: this.fromComponent === 'debt-brick-modal' ? 2 : 0,
              };

            };
            reader.readAsDataURL(this.selectedThumb[i]);
          }
        }
      } else {
        this.src_img = undefined;
        this.confirmDialog.confirm('Thông báo', 'Vui lòng chọn hình có kích thước nhỏ hơn' + this.fromComponent === 'debt-brick-modal' ? '2MB' : '150Kb', '', 'Đóng', '');
      }
    }
  }

  changeEvent(e: any): any {
    switch (true) {
      case this.keyType === 'Text':
        this.dataFormChange.emit(e.trim());
        break;
      case this.keyType === 'Number': // @ts-ignore
        this.dataFormChange.emit(
          String(this.valueInput)
            .replace(/\D/g, '')
            .replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
        );
        break;
      case this.keyType === 'Email':
        const validateEmail = !!e.match(this.emailRegex);
        if (validateEmail) {
          const checkValMaxEmail = !!e.match(this.mexEmail);
          if (checkValMaxEmail) {
            this.ktEmail = 1;
          } else {
            this.ktEmail = 2;
            this.dataFormChange.emit(String(this.valueInput));
          }
        } else if (e.trim() === '') {
          this.ktEmail = 1;
        } else {
          this.ktEmail = 1;
        }
        this.isCheck.emit(this.ktEmail === 2);
        break;
      case this.keyType === 'Phone':
        let temp = false;
        if (this.maxSDT === e.length) {
          switch (!temp) {
            case Number(e[0]) === 0:
              this.valueInput = e;
              if (Number(e[1]) === 0) {
                this.ktPhone = 1;
                this.maxSDT = 10;
                temp = false;
              } else {
                this.ktPhone = 2;
                temp = true;
                this.maxSDT = 10;
              }

              break;
            case e.length === 0:
              this.ktPhone = 2;
              temp = true;
              this.maxSDT = 10;
              break;
            default:
              this.ktPhone = 1;
              this.maxSDT = 10;
              temp = false;
          }
        } else if (e.length === 0) {
          this.ktPhone = 2;
          temp = true;
          this.maxSDT = 10;
        } else {
          this.ktPhone = 1;
          this.maxSDT = 10;
        }
        this.isCheck.emit(this.ktPhone === 2);
        this.dataFormChange.emit(String(this.valueInput));
        // @ts-ignore
        // this.dataFormChange.emit(String(this.valueInput).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
        break;
      case this.keyType === 'Select':
        this.dataFormChange.emit(this.selectCustom);
        break;
      case this.keyType === 'Select_Multi':
        this.selectMulti = e;
        if (this.selectMulti.length !== this.checkAllMulti.length) {
          this.isAllMulti = false;
        } else {
          this.isAllMulti = true;
        }
        this.dataFormChange.emit(this.selectMulti);
        break;
      case this.keyType === 'Select Address':
        this.dataFormChange.emit(this.selectCustom);
        break;
      case this.keyType === 'Date':
        this.oneDate = this.general.dateFormatYYYYMMDD(new Date(e));
        this.dataFormChange.emit(this.oneDate);
        break;
      case this.keyType === 'Datetime':
        const F1 = new Date(e);
        const minF1 = F1.toLocaleString('vi-VN');
        const dateFormat1 = minF1.includes(',') ? minF1.split(', ') : minF1.split(' ');
        const timedefault = dateFormat1[0];
        this.oneDate = this.general.dateFormatYYYYMMDD(F1) + ' ' + timedefault;
        if (this.ddmmyyyy) {
          this.oneDate = this.general.convertDateToDDMMYY2(F1) + ' ' + timedefault;
        }
        this.dataFormChange.emit(this.oneDate);
        break;
      case this.keyType === 'Radio':
        this.dataFormChange.emit(this.valueInput);
        break;
      case this.keyType === 'Textarea':
        this.description = e;
        this.dataFormChange.emit(this.description);
        break;
    }
  }

  get(e: any): any {}

  choosedDate(e: any): any {
    if (e && e.from_date && e.to_date) {
      if (e.from_date.$d && e.to_date.$d) {
        if (this.general.convertDateToYYYYMMDD(e.to_date.$d) === '0NaN-0NaN-0NaN') {
          this.selectedDateToDate = {
            from_date: e.from_date.$d,
            to_date: e.from_date.$d,
          };
        } else {
          this.selectedDateToDate = {
            from_date: e.from_date.$d,
            to_date: e.to_date.$d,
          };
        }
        const data = {
          from_date: this.general.convertDateToYYYYMMDD(e.from_date.$d),
          to_date:
            this.general.convertDateToYYYYMMDD(e.to_date.$d) === '0NaN-0NaN-0NaN'
              ? this.general.convertDateToYYYYMMDD(e.from_date.$d)
              : this.general.convertDateToYYYYMMDD(e.to_date.$d),
        };
        this.dataFormChange.emit(data);
      } else {
        console.log('Error DateToDate 2');
      }
    } else {
      console.log('Error DateToDate');
    }
  }
}
