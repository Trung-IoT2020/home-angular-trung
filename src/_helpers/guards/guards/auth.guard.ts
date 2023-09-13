import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmationDialogService } from 'src/app/modules/shared/confirmation-dialog/confirmation-dialog.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OtpService } from 'src/app/services/auth/otp.service';
import { GeneralService } from 'src/app/services/general.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private general: GeneralService,
    private confirmDialog: ConfirmationDialogService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.checkToken()) {
      return true;
    } else {
      this.authService.signOut();
      return false;
    }
  }
}
