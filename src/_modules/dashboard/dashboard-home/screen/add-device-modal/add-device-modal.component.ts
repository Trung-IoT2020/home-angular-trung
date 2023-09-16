import {Component, EventEmitter} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {NgxSpinnerService} from "ngx-spinner";
import {ConfirmationDialogService} from "../../../../shared/confirmation-dialog/confirmation-dialog.service";
import {GeneralService} from "../../../../../_services/general.service";

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

  dataMultiNV: any = [];
  selectNV: any = [];
  selectNVOne: any;
  valueSelectOrderId: any = '';
  number_assignments: any = '';
  valueRadio: any = 'all';
  dataRadio: any = [
    {
      name: 'Tất cả',
      value: 'all',
    }, {
      name: 'Tự chọn',
      value: 'custom',
    },
  ];
  dataCampaignDetail: any;
  valueSelectCity: any;
  dataBlock: any = [
    {
      id: '1',
      value: '1',
    },
  ];
  dataCity: any = [];
  dataDistrict: any = [];
  dataWard: any = [];
  valueSelectDistrict: any;
  valueSelectWard: any;
  valueSelectBlock: any;
  numberKH: any;
  numberKHDefault: any;
  keyCampaign: any = '';
  idSelectedTable1 = '';
  numberPhone: any = '';
  selectCusNV: any;
  folderType: any = 'POTENTIAL_CUSTOMER';

  constructor(
    public activeModal: NgbActiveModal,
    private spinnerService: NgxSpinnerService,
    private confirmDialog: ConfirmationDialogService,
    private general: GeneralService,
  ) {
  }

  closeModal(): any {
    this.activeModal.close();
  }


  submit(id?: any): any {
    if (id === 0) {
      const post = {
        'folder_id': this.topicId,
        'customer_phone': this.numberPhone,
      };

    } else {
      console.log(
        this.note,
        this.topicName,
        this.topicDescription,
        this.tStart,
        this.tEnd,
      );
      const post = {
        'folder_id': this.topicId,
        'state': this.folderType === 'POTENTIAL_CUSTOMER' ? 1 : 'ON',
        'folder_name': this.topicName,
        'description': this.topicDescription,
        'note': this.note,
        't_start': this.tStart,
        't_end': this.tEnd,
        folder_type: this.folderType === 'POTENTIAL_CUSTOMER' ? 'POTENTIAL_CUSTOMER' : 'CUSTOMER_REMINDER',
      };
      // this.crmService.apiPostCampaign(post).subscribe((res: any) => {
      //   if (res) {
      //     if (res.status === 1) {
      //       console.log(res.detail);
      //       this.confirmDialog
      //         .confirm('Thông báo', this.topicId !== '' ? 'Cập nhật thành công' : 'Thêm thành công', '', 'Đóng', '', true)
      //         .then((confirm: any) => {
      //           this.closeModal();
      //         })
      //         .finally(() => {
      //           this.modalAction.emit('submit');
      //         });
      //     } else {
      //       this.confirmDialog.confirm('Thông báo', res.msg, '', 'Đóng', '', false);
      //     }
      //   }
      // }, (error: any) => {
      //   this.confirmDialog.confirm('Thông báo', 'Hệ thông đang lỗi! Vui lòng thử lại sau!', '', 'Đóng', '', false);
      // });
    }

  }


  ngOnInit(): void {
    const timeTamp = new Date().getTime() + 3600000;
    const today = new Date(timeTamp);
    const lastMont = new Date(today);
    const nextMont1 = new Date(today);
    const minF1 = today.toLocaleString('vi-VN');
    const dateFormat1 = minF1.includes(',') ? minF1.split(', ') : minF1.split(' ');
    const timedefault = dateFormat1[0];
    lastMont.setDate(today.getDate() + 7);
    this.tStart = this.general.convertDateToYYYYMMDD(nextMont1) + ' ' + timedefault;
    this.tEnd = this.general.convertDateToYYYYMMDD(lastMont) + ' ' + timedefault;
    this.minOneDate = this.general.convertDateToYYYYMMDD(today) + ' ' + timedefault;
    if (this.dataCampaignDetail) {
      const getAPI = {
        'folder_id': this.topicId,
        'city': [],
        'district': [],
        'ward': [],
        'assignment_status': [0],


      };
      this.dataGetDetailCampaign = getAPI;
      console.log(this.dataCampaignDetail);
      console.log(this.dataCampaignDetail['Thời gian bắt đầu'],
        this.dataCampaignDetail['Thời gian kết thúc']);
      this.topicId = this.dataCampaignDetail['Mã chương trình'];
      this.topicName = this.dataCampaignDetail['Tên chương trình'];
      this.topicDescription = this.dataCampaignDetail['Mô tả chương trình'];

      this.note = this.dataCampaignDetail['Ghi Chú'];

    } else {
      this.dataCampaignDetail = {};
    }


  }


  dataGetDetailCampaign: any;
  valueNumber: any = '';


}



