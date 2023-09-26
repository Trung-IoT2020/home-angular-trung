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
    this.baseUrl = 'http://host.nathi.vn:8080';
    console.log(this.getToken());
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
    localStorage.setItem('refreshToken', refreshToken);
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
    return localStorage.getItem('token');
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
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

  //show hết tất cả các device(gateway)
  apiGetAllDevice(): any {
    const headers = this.header;
    return this.http.get<any>(this.baseUrl + '/api/tenant/devices?pageSize=100&page=0', {headers});
  }

  //detail 1 device(gateway)
  apiGetDetailDevice(id: any): any {
    const headers = this.header;
    return this.http.get<any>(this.baseUrl + "/api/plugins/telemetry/DEVICE/" + id + "/values/timeseries?useStrictDataTypes=true", {headers});
  }

  apiCreateDevice(data: any, idDevice: any): any {
    const headers = this.header;
    return this.http.post<any>(this.baseUrl + "/api/device?accessToken=" + "NINAGATE20112019" + idDevice, data, {headers});
  }

  apiUpdateDevice(data: any): any {
    const headers = this.header;
    return this.http.post<any>(this.baseUrl + "/api/device", data, {headers});
  }

  apiDeleteDevice(idDevice: any): any {
    const headers = this.header;
    return this.http.delete<any>(this.baseUrl + "/api/device/" + idDevice, {headers});
  }

  apiHistoryDeviceNote(idDevice: any, nameNote: any, fromDate: any, toDate: any): any {
    const headers = this.header;
    return this.http.get<any>(
      this.baseUrl + "/api/plugins/telemetry/DEVICE/" + idDevice +
      "/values/timeseries?limit=1&agg=NONE&orderBy=DESC&useStrictDataTypes=true&keys=" +
      nameNote + "&startTs=" + fromDate + "&endTs=" + toDate
      , {headers});
  }
}
