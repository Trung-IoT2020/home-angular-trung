import {Component, OnInit} from '@angular/core';
import {GeneralService} from "../../../_services/general.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {ConfirmationDialogService} from "../../shared/confirmation-dialog/confirmation-dialog.service";
import {NathiService} from "../../../_services/nathi.service";

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent implements OnInit {
  userName: any = "";
  passWord: any = "";

  constructor(
    private general: GeneralService,
    private modalService: NgbModal,
    private router: Router,
    private spinner: NgxSpinnerService,
    private confirmDialog: ConfirmationDialogService,
    private nathiService: NathiService,
  ) {
  }

  ngOnInit(): void {
    localStorage.clear();
    sessionStorage.clear();
  }

  goto(str: any): any {
    if (str === 'login') {
      let data = {
        username: this.userName,
        password: this.passWord
      }
      this.nathiService.callToken(data);
    } else if (str === 'forgotpassword') {
      this.router.navigate(['/auth/forgotpassword']);
    }
  }
}
