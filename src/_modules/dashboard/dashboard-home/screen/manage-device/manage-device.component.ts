import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {GeneralService} from "../../../../../_services/general.service";
import {ConfirmationDialogService} from "../../../../shared/confirmation-dialog/confirmation-dialog.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {NathiService} from "../../../../../_services/nathi.service";
import {AddDeviceModalComponent} from "../add-device-modal/add-device-modal.component";

@Component({
  selector: 'app-manage-device',
  templateUrl: './manage-device.component.html',
  styleUrls: ['./manage-device.component.scss']
})
export class ManageDeviceComponent implements OnInit {
  searchText: any = '';
  tableContentEvent: EventEmitter<object> = new EventEmitter();
  tableConfigEvent: EventEmitter<object> = new EventEmitter();
  page: EventEmitter<object> = new EventEmitter();
  itemsPerPage: any = 10;
  p: any = 1;
  itemsP2: any;
  offset: any = 0;
  tableContent: any = [];
  order: any = 't_create';
  reverse: any = false;
  sort: any = '';
  listShowCaptionName: any = [
    'Mô tả',
    'Mô tả chương trình',
    'Chi tiết',
    'Danh sách sản phẩm',
    'Hướng dẫn sử dụng',
    'Chi tiết chương trình',
    'Tiêu đề phụ',
    'Ngày không áp dụng',
    'Nội dung khiếu nại',
    'Nguồn chuyển thông tin',
    'Hướng xử lý',
    'Điều kiện áp dụng',
    'Địa chỉ', 'Tên Game', 'Tên vật phẩm', 'Kết quả xử lý', 'Shipper note',
    'Ghi chú',
    'Ghi chú của khách hàng',
    'Ghi chú của nhân viên',
  ];
  listActiveName: any = [
    'Hoạt động',
    'On/Off',
  ];
  listNumberFormatName: any = [
    'Số lượng phát hành',
    'Số lượng tồn',
    'Giá trị',
    'Số tiền giảm tối đa',
    'Số tiền thanh toán tối thiểu',
    'Thành tiền trước KM',
    'Số lượng voucher phát hành',
    'Tổng tiền khuyến mãi',
    'Thành tiền sau khuyến mãi',
    'Thành tiền gói dịch vụ',
    'Điểm FGold',
    'Thanh toán tối thiểu',
    'Giảm giá tối đa',
    'Chi phí tạm tính',
    'Đơn giá',
    'Tạm tính',
    'Tổng tiền',
  ];

  dataContent: any = [];

  tableTH = [
    {title: 'Mã Gateway', dataField: 'Mã Gateway', key: 'id'},
    {title: 'Tên Gateway', dataField: 'Tên Gateway', key: 'name'},
    {title: 'Kinh độ', dataField: 'Kinh độ', key: 'lon'},
    {title: 'Vĩ độ', dataField: 'Vĩ độ', key: 'lat'},
    {title: 'Trạng thái', dataField: 'trạng thái', key: 'active'},
    {title: 'Thời gian', dataField: 'Thời gian', key: 't_create'},
  ];
  tableTH2: any = [];
  idSelectedTable1 = '';
  numberPhone: any = '';
  isCheck: any = false;

  constructor(private general: GeneralService,
              private confirmDialog: ConfirmationDialogService,
              private modalService: NgbModal,
              private router: Router,
              private spinner: NgxSpinnerService,
              private nathiService: NathiService
  ) {
  }

  addData: any = false;


  ngOnInit(): void {

    this.getAPIListDevice();

  }


  keyValueTable: any;

  openEvent2(e: any): any {
    console.log(e);
    if (e.str === 'edit') {
      const modalRef = this.modalService.open(AddDeviceModalComponent, {
        backdrop: 'static',
        size: 'lg',
      });
      modalRef.componentInstance.title = e.data ? 'Cập nhật thông tin Gateway' : 'Thêm Gateway mới';
      modalRef.componentInstance.dataDetail = e.data ? e.data : undefined;
      modalRef.componentInstance.modalAction.subscribe((res: any) => {
        if (res === 'submit') {
          this.getAPIListDevice();
        }
      });
    } else if (e.str === 'delete') {
      this.confirmDialog.confirm("Thông báo", 'Dữ liệu trong Gateway này sẽ bị xóa hết! Bạn có chắc là xóa gateway này?', '', 'Đồng ý', 'Hủy bỏ').then((k: any) => {
        if (k) {
          this.spinner.show();
          this.apiDeleteGateway(e.key);
        }
      });
    } else {
      this.router.navigate(['/note'], {queryParams: {id: e.key}});
    }

  }


  getAPIListDevice(): any {
    let listT1 = [] as any;
    this.spinner.show();
    this.nathiService.apiGetAllDevice().subscribe((res: any) => {
      if (res && res.data) {
        this.spinner.hide();
        res.data.filter((i: any, index: any) => {
          if (i) {
            this.nathiService.apiGetDetailDevice(i.id.id).subscribe((res2: any) => {
              if (res2 && res2.GW) {
                listT1.push({
                  name: res2.GW[0].value.ID,
                  lat: res2.GW[0].value.P1 ? String(res2.GW[0].value.P1) : '',
                  lon: res2.GW[0].value.P2 ? String(res2.GW[0].value.P2) : '',
                  active: res2.GW[0].value.P1 ? 1 : 0,
                  id: i.id.id,
                  t_create: this.general.convertDateToDDMMYY(new Date(i.createdTime))
                });
              } else {
                listT1.push({
                  name: i.name,
                  lat: '',
                  lon: '',
                  active: 0,
                  id: i.id.id,
                  t_create: this.general.convertDateToDDMMYY(new Date(i.createdTime))
                });
              }
            });
          }
        });
        setTimeout(() => {
          this.dataContent = this.general.formatTable(listT1, this.tableTH);
          this.tableContentEvent.emit(this.dataContent);
          this.tableConfigEvent.emit(this.tableTH);
        }, 500);
      }
    }, (error: any) => {
      this.spinner.hide();
      this.confirmDialog.confirm('Notification', error.error.message, '', 'Ok', '');
    });
  }

  exportFile(): any {
    console.log('exportFile');
    this.confirmDialog.confirm('Thông báo', `<br>Bạn muốn tải báo cáo này?<br>`, '', 'Xác nhận', 'Đóng').then((confirm) => {
      if (confirm) {
        this.general.exportExcel(this.dataContent, 'Baocao_thongtin_' + "Device1");
      }
    });
  }

  apiDeleteGateway(id: any): any {
    this.nathiService.apiDeleteDevice(id).subscribe((res: any) => {
      if (res) {
        this.getAPIListDevice();
        this.confirmDialog.confirm('Thông báo', 'Đã xóa gateway thành công!', '', 'Đóng', '');
      }
    }, (error: any) => {
      this.confirmDialog.confirm('Thông báo', error.error.message, '', 'Đóng', '');
    })
  }


}
