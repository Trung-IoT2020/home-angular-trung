import {Component, OnInit} from '@angular/core';
import {GeneralService} from "../../../_services/general.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {ConfirmationDialogService} from "../../shared/confirmation-dialog/confirmation-dialog.service";

@Component({
  selector: 'app-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.scss']
})
export class TaskbarComponent implements OnInit {

  name: any = '';

  constructor(
    private general: GeneralService,
    private modalService: NgbModal,
    private router: Router,
    private spinner: NgxSpinnerService,
    private confirmDialog: ConfirmationDialogService,
  ) {
  }

  ngOnInit(): void {
    // @ts-ignore
    let dataMenu = JSON.parse(localStorage.getItem("data-menu"));
    if (dataMenu) {
      dataMenu.filter((i: any) => {
        if (i.link === window.location.pathname) {
          this.name = i.name;
        }
      })

    }

  }
}
