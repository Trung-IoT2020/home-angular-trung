import {Component, OnInit} from '@angular/core';
import {GeneralService} from "../../../_services/general.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {ConfirmationDialogService} from "../../shared/confirmation-dialog/confirmation-dialog.service";
import {NathiService} from "../../../_services/nathi.service";

@Component({
  selector: 'app-auth-forgot-password',
  templateUrl: './auth-forgot-password.component.html',
  styleUrls: ['./auth-forgot-password.component.scss']
})
export class AuthForgotPasswordComponent implements OnInit {

  email: any = "";

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

  }

  goto(str: any): any {
    if (str === 'Resetpassword') {
      this.nathiService.apiForgotPassword(JSON.stringify(this.email)).subscribe((res: any) => {
        if (res) {
          this.confirmDialog.confirm('Notification', 'Your request has been processed, please check your email address!', '', 'Ok', '').then((k) => {
            this.router.navigate(['/auth/login']);
          });
        }
      }, (error: any) => {
        this.confirmDialog.confirm('Notification', error.error.message, '', 'Ok', '');
      })
    } else {
      this.router.navigate(['/auth/login']);
    }
    console.log(str, this.email);
  }
}
