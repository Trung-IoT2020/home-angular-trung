import {Injectable} from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import {Observable} from 'rxjs';
import {GeneralService} from "../../../_services/general.service";
import {NathiService} from "../../../_services/nathi.service";


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: NathiService,
    private router: Router,
    private general: GeneralService,
    // private confirmDialog: ConfirmationDialogService
  ) {
  }

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
