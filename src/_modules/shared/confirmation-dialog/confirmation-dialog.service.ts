import { Injectable } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmationDialogComponent } from './confirmation-dialog.component';

@Injectable()
export class ConfirmationDialogService {
  constructor(private modalService: NgbModal) {}

  public confirm(
    title: any,
    message: string,
    classMessage: string = '',
    btnOkText: string | any,
    btnCancelText: string | any,
    success: any = null,
    // value?: any,
    // message2?: any,
    windowClass?: string
  ): Promise<boolean> {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      windowClass: windowClass,
    });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.classMessage = classMessage;
    modalRef.componentInstance.btnCancelText = btnCancelText;
    modalRef.componentInstance.success = success;
    return modalRef.result;
  }
}
