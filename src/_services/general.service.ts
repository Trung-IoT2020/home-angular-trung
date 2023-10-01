import { Injectable } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';


import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  fileExtension = '.xlsx';
  permissionList: any = [];
  url: any;

  myPromise: any;
  constructor() {
  }
  public exportExcel(jsonData: any[], fileName: string, sheetName: string = 'data'): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);

    const wb: XLSX.WorkBook = { Sheets: { [sheetName]: ws }, SheetNames: [sheetName] };
    const excelBuffer: any = XLSX.write(wb, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveExcelFile(excelBuffer, fileName);
  }
  public saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: this.fileType });
    FileSaver.saveAs(data, fileName + this.fileExtension);
  }
  onActivate(event: any): void {
    window.scroll(0, 0);
  }

  convertNumber(n: any): string {
    return n > 9 ? '' + n.toString() : '0' + n.toString();
  }

  convertStrDDMMYYYY(n: any): string {
    const a = n.split('/');
    return [a[2], a[1], a[0]].join('-');
  }

  convertNgbToDDMMYYYY(date: any): any {
    return [this.convertNumber(date.day), this.convertNumber(date.month), this.convertNumber(date.year)].join('/');
  }

  convertDateToYYYYMMDD(date: any): any {
    return [this.convertNumber(date.getFullYear()), this.convertNumber(date.getMonth() + 1), this.convertNumber(date.getDate())].join('-');
  }

  convertDateToDDMMYYYY(date: any): any {
    return [this.convertNumber(date.getDate()), this.convertNumber(date.getMonth() + 1), this.convertNumber(date.getFullYear())].join('/');
  }

  preventMinus(e:any): any {
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
    if (e.keyCode === 8 || e.keyCode === 46 || e.keyCode === 37 || e.keyCode === 39) {
      return true;
    }
    if (e.keyCode === 109 || e.keyCode === 107 || e.keyCode === 187 || e.keyCode === 189) {
      return false;
    }
    const seperator = '^([0-9])';
    const maskSeperator = new RegExp(seperator, 'g');
    const result = maskSeperator.test(e.key);
    return result;
  }

  allowCharacterAndNumber(e: any): any {
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
    if (e.keyCode === 8 || e.keyCode === 46 || e.keyCode === 37 || e.keyCode === 39) {
      return true;
    }
    if (e.keyCode === 109 || e.keyCode === 107 || e.keyCode === 187 || e.keyCode === 189) {
      return false;
    }
    const seperator = '^([a-zA-Z0-9 ]+)$';
    const maskSeperator = new RegExp(seperator);
    const result = maskSeperator.test(e.key);
    return result;
  }

  preventMinusCanEnterDot(e: any): any {
    if (e.keyCode === 8 || e.keyCode === 46 || e.keyCode === 37 || e.keyCode === 39 || e.keyCode === 190 || e.keyCode === 110) {
      return true;
    }
    if (e.keyCode === 109 || e.keyCode === 107 || e.keyCode === 187 || e.keyCode === 189) {
      return false;
    }
    const seperator = '^([0-9])';
    const maskSeperator = new RegExp(seperator, 'g');
    const result = maskSeperator.test(e.key);
    return result;
  }

  checkCmt(str: any): any {
    // return str.replace(/[~`!@#$%^&*<>\{\}\[\]\\\/]/gi, '');
    // return str.replace(/[&\/\\!@^#,+()$~%.'":;*?<>=\[\]{}_-]/g, '');
    return str.replace(/[^0-9a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ\s ]/gi, '');
  }

  checkForError(str: any, form: any, submitted: any): any {
    const input = form.controls[str];
    if ((input.touched || submitted) && input.errors?.pattern) {
      return true;
    }
    if ((input.touched || submitted) && input.errors?.required) {
      return true;
    }
    if ((input.touched || submitted) && input.errors?.maxlength) {
      return true;
    }
    if ((input.touched || submitted) && input.errors?.minlength) {
      return true;
    }
    return false;
  }

  convertPrice(p: any): any {
    return p.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  copyText(val: string): any {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  preventSpecialCharacter(type: any, str: any): any {
    if (type === 'email') {
      return str.replace(/[!|#$%^&*<>='";:?,\{\}\[\]\\\/]/gi, '');
    }
    if (type === 'name') {
      return str.replace(/[+-.£¬~`!@|#$%^&*<>=";:?_\(\)\{\}\[\]\\\/]/gi, '');
    }
    if (type === 'address') {
      return str.replace(/[£¬~`!@|#$%^&*<>='";:?_\(\)\{\}\[\]\\]/gi, '');
    }
    if (type === 'text') {
      return str.toString().replace(/[¢€¥°∆¶π√•℅™®©£¬~`!@|#$%^&*<>='";:_\'’‘\`+×÷+×÷==//_<<>\[\]₫\(\)\-'":;,?.♧◇♡♤■□●○•°¿¡》《¤▪☆$¥\(\)\{\}\[\]\\\/]/gi, '');
    }
    if (type === 'passport') {
      return str.replace(/[+-.£¬~`!@|#$%^&*<>='";:?_\(\)\{\}\[\]\\\/]/gi, '');
    }
    if (type === 'number') {
      return str.replace(/[^0-9]+/g, '');
    }
  }
  formatDate(a: any): any {
    if (!a || a === '') {
      return undefined;
    } else {
      const b = a.split(' ');
      const b1 = b[0].split('/');
      const b2 = b1[2] + '-' + b1[1] + '-' + b1[0] + ' ' + b[1];
      return b2;
    }
  }

  dateFormatYYYYMMDD(date: Date): string {
    const day = Number(date.getDate()) < 10 ? '0' + Number(date.getDate()) : Number(date.getDate());
    const month = Number(date.getMonth()) + 1 < 10 ? '0' + Number(Number(date.getMonth()) + 1) : Number(Number(date.getMonth()) + 1);
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  convertTextYYYYMMDDToDDMMYYYY(a: any): any {
    let v = '';
    if (a.includes('-')) {
      let formatV = a.split('-');
      v = formatV[2] + '/' + formatV[1] + '/' + formatV[0];
    } else {
      v = a;
    }
    return v;
  }

  convertStrYYMMDDhhmmssToDDMMYYhhmmss(a: any): any {
    let v = '';
    if (a.includes('-') && a.includes(' ')) {
      let formatV = a.split(' ');
      let formatV2 = formatV[0].split('-');
      v = formatV2[2] + '/' + formatV2[1] + '/' + formatV2[0] + ' ' + formatV[1];
    } else {
      v = a;
    }
    return v;
  }

  convertStrDDMMYYYYTimetoYYYYMMDDTime(a: any): any {
    let data = a.includes(', ') ? a.split(', ') : a.split(' ');
    let formatData = data[0].split('/');
    let v;
    if (data[0] && data[1] && formatData) {
      v = formatData[2] + '-' + formatData[1] + '-' + formatData[0] + ' ' + data[1];
    } else {
      v = a;
    }
    return v;
  }

  convertDateToDDMMYY(date: Date): any {
    return [this.convertNumber(date.getDate()), this.convertNumber(date.getMonth() + 1), this.convertNumber(date.getFullYear())].join('/');
  }

  convertDateToDDMMYY2(date: Date): any {
    return [this.convertNumber(date.getDate()), this.convertNumber(date.getMonth() + 1), this.convertNumber(date.getFullYear())].join('-');
  }

  convertDateToYYYYMMDD2(date: Date): any {
    return [this.convertNumber(date.getFullYear()), this.convertNumber(date.getMonth() + 1), this.convertNumber(date.getDate())].join('/');
  }

  formatTable(table_need_format: any, table_sample: any): any {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < table_need_format.length; i++) {
      // tslint:disable-next-line:prefer-for-of
      for (let j = 0; j < table_sample.length; j++) {
        const key = table_sample[j].key;
        const value = table_sample[j].title;
        if (table_need_format[i].hasOwnProperty(key)) {
          // @ts-ignore
          table_need_format[i][value] = table_need_format[i][key];
          // @ts-ignore
          delete table_need_format[i][key];
        }
      }
    }
    return table_need_format;
  }


}
