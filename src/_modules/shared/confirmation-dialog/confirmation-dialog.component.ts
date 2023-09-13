import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent implements OnInit {
  // @ts-ignore
  @Input() title: string; // @ts-ignore
  @Input() message: string; // @ts-ignore
  @Input() value: string; // @ts-ignore
  @Input() message2: string; // @ts-ignore
  @Input() btnOkText: string; // @ts-ignore
  @Input() btnCancelText: string;
  @Input() classMessage: any;
  @Input() isButtonRight: boolean = false;
  @Input() isIconSuccess: boolean = false;
  success: any;

  constructor(private activeModal: NgbActiveModal) {}

  ngOnInit(): void {}

  public decline(): void {
    this.activeModal.close(false);
  }

  public accept(): void {
    this.activeModal.close(true);
  }

  public dismiss(): void {
    this.activeModal.dismiss();
  }
  close(): void {
    this.activeModal.close(false);
  }
  // showSuccess(): any {
  //   this.notiDialog.noti('', `<p class="noti"><i class="fa fa-check"></i>&nbsp;Đã copy thành công</p>`);
  // }
}
