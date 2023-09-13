import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import {EnvironmentsService} from "./environments.service";




@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private jwtHelper: JwtHelperService,
    private http: HttpClient,
    private envService: EnvironmentsService,
    private router: Router,
    // private confirmDialog: ConfirmationDialogService,
    private spinner: NgxSpinnerService
  ) {}
  callToken(data: any): any {
    // const headers = { TOKEN: token }
    this.spinner.show();
    this.http.post<any>(this.envService.apiUrl + '/fconnect-partner-management-api/login', data, {}).subscribe(
        (res) => {
          if (res && res.status === 1) {
            this.spinner.hide();
            localStorage.setItem('refresh_token', res.detail.refresh_token);
            this.saveToken(res.detail.access_token);
          } else {
            this.spinner.hide();
            // this.confirmDialog.confirm(
            //   'Thông báo',
            //   `<br><p>${res.msg}</p>`,
            //   '',
            //   'Đóng',
            //   '',
            //   false
            // );
          }
        },
        (error) => {
          this.spinner.hide();
        }
      );
  }
  saveToken(token: string): any {
    // @ts-ignore
    const dt = this.jwtHelper.decodeToken(token);
    console.log(dt);
    const role = dt.role;
    console.log(dt);
    const exp = new Date(dt.expired).getTime();
    localStorage.setItem('access_token', token);
    localStorage.setItem('user_role', role);
    localStorage.setItem(
      'access_info',
      btoa(unescape(encodeURIComponent(JSON.stringify(dt))))
    );
    this.router.navigate(['/dashboard']);
  }
  checkToken() {
    // @ts-ignore
    const dt = this.jwtHelper.decodeToken(localStorage.getItem('access_token'));

    if (dt) {
      let timeNow = new Date().getTime();
      let timeToken = new Date(dt.expired).getTime();
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
    //return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFkbWluQGZwdC5jb20udm4iLCJleHAiOjE2NDUxNjcwODAsImV4cGlyZWQiOiIyMDIyLTAyLTE4IDEzOjUxOjIwIn0.x6OR19GsbCl5kEgZOL45iI75OWlCl4Rok9zt8tvrXfA'
  }
  getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }

  refreshToken() {
    const headers = { refreshtoken: this.getRefreshToken() };
    return this.http.post<any>(
      this.envService.apiUrl +
        '/hi-ecom-portal-api/v1/web-portal/refresh_token',
      {}, // @ts-ignore
      { headers }
    );
  }

  signOut(): any {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}
