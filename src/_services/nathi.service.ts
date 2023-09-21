import {Injectable} from '@angular/core';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {NgxSpinnerService} from 'ngx-spinner';
import {HttpClient} from '@angular/common/http';
import {ConfirmationDialogService} from "../_modules/shared/confirmation-dialog/confirmation-dialog.service";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root',
})
export class NathiService {
  permissionList: any = [];
  url: any;
  baseUrl: any;
  token: any = '';
  header: any;

  constructor(
    private spinnerService: NgxSpinnerService,
    private confirmDialog: ConfirmationDialogService,
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService,
    private spinner: NgxSpinnerService,
  ) {
    this.baseUrl = 'http://103.101.161.120:8080';
    this.header = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      "X-Authorization": "Bearer " + this.getToken()
    };
  }

  callToken(data: any): any {
    this.spinner.show();
    this.apiLogin(JSON.stringify(data)).subscribe((res: any) => {
      if (res) {
        this.spinner.hide();
        this.saveToken(res.token, res.refreshToken);
      }
    }, (error: any) => {
      this.spinner.hide();
      this.confirmDialog.confirm('Notification', error.error.message, '', 'Ok', '');
    })
  }

  saveToken(token: string, refreshToken: any): any {
    // @ts-ignore
    const dt = this.jwtHelper.decodeToken(token);
    console.log(dt);
    const exp = new Date(dt.exp).getTime();
    localStorage.setItem('access_info', btoa(unescape(encodeURIComponent(JSON.stringify(dt)))));
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken.refreshToken);
    localStorage.setItem('dataInfo', JSON.stringify(dt));
    this.router.navigate(['/dashboard']);
  }

  checkToken() {
    // @ts-ignore
    const dt = this.jwtHelper.decodeToken(localStorage.getItem('token'));
    if (dt) {
      let timeNow = new Date().getTime();
      let timeToken = new Date(Number(dt.exp * 1000)).getTime();
      console.log(timeNow, timeToken);
      // @ts-ignore
      if (timeNow >= timeToken) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  getToken() {
    if (this.checkToken()) {
    }
    return localStorage.getItem('access_token');
  }

  getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }

  signOut(): any {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/auth/login']);
  }

  apiLogin(content: any): any {
    const headers = this.header;
    return this.http.post<any>(
      this.baseUrl + '/api/auth/login',
      content, // @ts-ignore
      {headers},
    );
  }

  apiForgotPassword(data: any): any {
    const headers = this.header;
    return this.http.post<any>(this.baseUrl + '/api/noauth/resetPasswordByEmail', data, {headers});
  }
}
