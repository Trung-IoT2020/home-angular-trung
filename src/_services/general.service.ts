import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  constructor() {
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

  // onPaste(str): any {
  //   console.log('Str in paste', str);
  //   return str.replace(/[^a-zA-Z0-9]/g, '');
  // }

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
}
