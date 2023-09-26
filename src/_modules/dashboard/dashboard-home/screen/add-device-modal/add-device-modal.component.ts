import {Component, EventEmitter} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {NgxSpinnerService} from "ngx-spinner";
import {ConfirmationDialogService} from "../../../../shared/confirmation-dialog/confirmation-dialog.service";
import {GeneralService} from "../../../../../_services/general.service";
import {NathiService} from "../../../../../_services/nathi.service";

@Component({
  selector: 'app-add-device-modal',
  templateUrl: './add-device-modal.component.html',
  styleUrls: ['./add-device-modal.component.scss']
})
export class AddDeviceModalComponent {
  keyStr: any;
  modalAction: EventEmitter<any> = new EventEmitter();
  title: any;
  // tslint:disable-next-line:variable-name
  short_name: any;
  nameCampaign: any = '20230419GOBNJRIOBURHTB';
  note: any = '';
  minOneDate: any = '';
  tStart: any = '';
  tEnd: any = '';
  topicId: any = '';
  topicName: any = '';
  topicDescription: any = '';
  key: any = '';
  dataDetail: any;
  dataMultiNV: any = [];
  selectNV: any = [];
  selectNVOne: any;
  valueSelectOrderId: any = '';
  number_assignments: any = '';

  constructor(
    public activeModal: NgbActiveModal,
    private spinnerService: NgxSpinnerService,
    private confirmDialog: ConfirmationDialogService,
    private general: GeneralService,
    private nathiService: NathiService
  ) {
  }

  closeModal(): any {
    this.activeModal.close();
  }


  submit(id?: any): any {
    if (id === 0) {
      this.apiPostData(this.nameGateway, this.idGateway);
    } else {
      this.apiUpdateData(this.nameGateway, this.idGateway);
    }


  }


  ngOnInit(): void {

    if (this.dataDetail) {
      console.log(this.dataDetail);
      this.idGateway = this.dataDetail['Mã Gateway'];
      this.nameGateway = this.dataDetail['Tên Gateway'];
      this.isDisable = true;
    } else {
      this.isDisable = false;
    }

  }

  isDisable: any = false;


  dataGetDetailCampaign: any;
  valueNumber: any = '';

  nameGateway: any = '';
  idGateway: any = '';

  apiPostData(nameGateway: any, deviceID: any): any {
    this.spinnerService.show();
    this.nathiService.apiCreateDevice(JSON.stringify({name: nameGateway}), deviceID).subscribe((res: any) => {
      if (res) {
        this.spinnerService.hide();
        this.confirmDialog.confirm('Thông báo', "Thêm gateway thành công!", '', 'Đóng', '', true).then((confirm: any) => {
          this.closeModal();
        }).finally(() => {
          this.modalAction.emit('submit');
        });
      }
    }, (error: any) => {
      this.spinnerService.hide();
      this.confirmDialog.confirm('Thông báo', error.error.message, '', 'Đóng', '', false);
    });
  }

  apiUpdateData(nameGateway: any, deviceID: any): any {
    this.spinnerService.show();
    let time = new Date().getTime();
    let v = JSON.stringify({
      name: nameGateway,
      id: {
        entityType: "DEVICE",
        id: deviceID
      },
      createdTime: time
    })
    this.nathiService.apiUpdateDevice(v).subscribe((res: any) => {
      if (res) {
        this.spinnerService.hide();
        this.confirmDialog.confirm('Thông báo', "Thêm gateway thành công!", '', 'Đóng', '', true).then((confirm: any) => {
          this.closeModal();
        }).finally(() => {
          this.modalAction.emit('submit');
        });
      }
    }, (error: any) => {
      this.spinnerService.hide();
      this.confirmDialog.confirm('Thông báo', error.error.message, '', 'Đóng', '', false);
    });
  }
}



