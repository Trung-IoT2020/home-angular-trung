import { Injectable } from '@angular/core';

// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export enum Environment {
  Staging = 'staging',
  Local = '172.27.57.242',
}
export class EnvironmentsService {
  // tslint:disable-next-line:variable-name
  // @ts-ignore
  private _env: Environment;
  // tslint:disable-next-line:variable-name
  private _apiUrl: any;
  // tslint:disable-next-line:variable-name
  _deepLink: any;
  // tslint:disable-next-line:variable-name
  _domain: any;
  constructor() { }
  init(): Promise<void> {
    return new Promise(resolve => {
      this.setEnvVariables();
      resolve();
    });
  }
  get env(): Environment {
    return this._env;
  }
  private setEnvVariables(): void {
    const hostname = window && window.location && window.location.hostname;
    if (hostname === '172.27.57.242' || hostname === 'localhost') {
      this._env = Environment.Local;
      this._apiUrl = 'https://hifpt-api-stag.fpt.vn';
    } else if (hostname === 'staging-hi.fpt.vn') {
      this._env = Environment.Staging;
      this._apiUrl = 'https://hifpt-api-stag.fpt.vn';
    } else {
      console.warn(`Cannot find environment for host name ${hostname}`);
    }
  }

  get apiUrl(): string {
    return this._apiUrl;
  }
  get domain(): any {
    return this._domain;
  }
}
