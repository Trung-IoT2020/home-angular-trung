import {Component, EventEmitter, OnInit} from '@angular/core';
import {GeneralService} from "../../../../../_services/general.service";
import {ConfirmationDialogService} from "../../../../shared/confirmation-dialog/confirmation-dialog.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter
} from "@angular/material-moment-adapter";
import {DefaultMatCalendarRangeStrategy, MAT_DATE_RANGE_SELECTION_STRATEGY} from "@angular/material/datepicker";

@Component({
  selector: 'app-manage-history',
  templateUrl: './manage-history.component.html',
  styleUrls: ['./manage-history.component.scss'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'vi-VN'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: DefaultMatCalendarRangeStrategy,
    },
  ],
})
export class ManageHistoryComponent implements OnInit {
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
  listNote: any = [
    {
      id: "note1",
      name: "note1",
    },
    {
      id: "note2",
      name: "note2",
    },
    {
      id: "note3",
      name: "note3",
    }
  ]
  noteActive: any;
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
  fromDate: any = '';
  minFromDate: any = '';
  maxFromDate: any = '';

  toDate: any = '';
  minToDate: any = '';
  maxToDate: any = '';

  changeEvent(e: any, str: any): any {

  }

  search(e: any): any {
    console.log(e);
    this.searchText = e;
    this.p = 1;
    this.page.emit(this.p);
    this.getAPIListDevice(e);
  }

  dataContent: any = [
    {
      "Tên note": "Note_1",
      "Thông số 1": 1,
      "Thông số 2": 1,
      "Thông số 3": 1,
      "Thông số 4": 1,
      "Thông số 5": 1,
      "Thông số 6": 1,
      "Thông số 7": 1,
      "Thời gian": "17/09/2023"
    },
    {
      "Tên note": "Note_2",
      "Thông số 1": 2,
      "Thông số 2": 2,
      "Thông số 3": 2,
      "Thông số 4": 2,
      "Thông số 5": 2,
      "Thông số 6": 2,
      "Thông số 7": 2,
      "Thời gian": "17/09/2023"
    },
    {
      "Tên note": "Note_3",
      "Thông số 1": 3,
      "Thông số 2": 3,
      "Thông số 3": 3,
      "Thông số 4": 3,
      "Thông số 5": 3,
      "Thông số 6": 3,
      "Thông số 7": 3,
      "Thời gian": "17/09/2023"
    },
    {
      "Tên note": "Note_4",
      "Thông số 1": 4,
      "Thông số 2": 4,
      "Thông số 3": 4,
      "Thông số 4": 4,
      "Thông số 5": 4,
      "Thông số 6": 4,
      "Thông số 7": 4,
      "Thời gian": "17/09/2023"
    },
    {
      "Tên note": "Note_5",
      "Thông số 1": 5,
      "Thông số 2": 5,
      "Thông số 3": 5,
      "Thông số 4": 5,
      "Thông số 5": 5,
      "Thông số 6": 5,
      "Thông số 7": 5,
      "Thời gian": "17/09/2023"
    },
    {
      "Tên note": "Note_6",
      "Thông số 1": 6,
      "Thông số 2": 6,
      "Thông số 3": 6,
      "Thông số 4": 6,
      "Thông số 5": 6,
      "Thông số 6": 6,
      "Thông số 7": 6,
      "Thời gian": "17/09/2023"
    },
    {
      "Tên note": "Note_7",
      "Thông số 1": 7,
      "Thông số 2": 7,
      "Thông số 3": 7,
      "Thông số 4": 7,
      "Thông số 5": 7,
      "Thông số 6": 7,
      "Thông số 7": 7,
      "Thời gian": "17/09/2023"
    },
    {
      "Tên note": "Note_8",
      "Thông số 1": 8,
      "Thông số 2": 8,
      "Thông số 3": 8,
      "Thông số 4": 8,
      "Thông số 5": 8,
      "Thông số 6": 8,
      "Thông số 7": 8,
      "Thời gian": "17/09/2023"
    },
    {
      "Tên note": "Note_9",
      "Thông số 1": 9,
      "Thông số 2": 9,
      "Thông số 3": 9,
      "Thông số 4": 9,
      "Thông số 5": 9,
      "Thông số 6": 9,
      "Thông số 7": 9,
      "Thời gian": "17/09/2023"
    },
    {
      "Tên note": "Note_10",
      "Thông số 1": 10,
      "Thông số 2": 10,
      "Thông số 3": 10,
      "Thông số 4": 10,
      "Thông số 5": 10,
      "Thông số 6": 10,
      "Thông số 7": 10,
      "Thời gian": "17/09/2023"
    },
    {
      "Tên note": "Note_11",
      "Thông số 1": 11,
      "Thông số 2": 11,
      "Thông số 3": 11,
      "Thông số 4": 11,
      "Thông số 5": 11,
      "Thông số 6": 11,
      "Thông số 7": 11,
      "Thời gian": "17/09/2023"
    },
    {
      "Tên note": "Note_12",
      "Thông số 1": 12,
      "Thông số 2": 12,
      "Thông số 3": 12,
      "Thông số 4": 12,
      "Thông số 5": 12,
      "Thông số 6": 12,
      "Thông số 7": 12,
      "Thời gian": "17/09/2023"
    },
    {
      "Tên note": "Note_13",
      "Thông số 1": 13,
      "Thông số 2": 13,
      "Thông số 3": 13,
      "Thông số 4": 13,
      "Thông số 5": 13,
      "Thông số 6": 13,
      "Thông số 7": 13,
      "Thời gian": "17/09/2023"
    },
    {
      "Tên note": "Note_14",
      "Thông số 1": 14,
      "Thông số 2": 14,
      "Thông số 3": 14,
      "Thông số 4": 14,
      "Thông số 5": 14,
      "Thông số 6": 14,
      "Thông số 7": 14,
      "Thời gian": "17/09/2023"
    },
    {
      "Tên note": "Note_15",
      "Thông số 1": 15,
      "Thông số 2": 15,
      "Thông số 3": 15,
      "Thông số 4": 15,
      "Thông số 5": 15,
      "Thông số 6": 15,
      "Thông số 7": 15,
      "Thời gian": "17/09/2023"
    },
    {
      "Tên note": "Note_16",
      "Thông số 1": 16,
      "Thông số 2": 16,
      "Thông số 3": 16,
      "Thông số 4": 16,
      "Thông số 5": 16,
      "Thông số 6": 16,
      "Thông số 7": 16,
      "Thời gian": "17/09/2023"
    },
    {
      "Tên note": "Note_17",
      "Thông số 1": 17,
      "Thông số 2": 17,
      "Thông số 3": 17,
      "Thông số 4": 17,
      "Thông số 5": 17,
      "Thông số 6": 17,
      "Thông số 7": 17,
      "Thời gian": "17/09/2023"
    },
    {
      "Tên note": "Note_18",
      "Thông số 1": 18,
      "Thông số 2": 18,
      "Thông số 3": 18,
      "Thông số 4": 18,
      "Thông số 5": 18,
      "Thông số 6": 18,
      "Thông số 7": 18,
      "Thời gian": "17/09/2023"
    },
    {
      "Tên note": "Note_19",
      "Thông số 1": 19,
      "Thông số 2": 19,
      "Thông số 3": 19,
      "Thông số 4": 19,
      "Thông số 5": 19,
      "Thông số 6": 19,
      "Thông số 7": 19,
      "Thời gian": "17/09/2023"
    },
    {
      "Tên note": "Note_20",
      "Thông số 1": 20,
      "Thông số 2": 20,
      "Thông số 3": 20,
      "Thông số 4": 20,
      "Thông số 5": 20,
      "Thông số 6": 20,
      "Thông số 7": 20,
      "Thời gian": "17/09/2023"
    }
  ];
  dataContent2: any = [];
  tableTH = [
    {title: 'Tên note', dataField: 'Tên note', key: 'note_name'},
    {title: 'Thông số 1', dataField: 'Thông số 1', key: 'value_1'},
    {title: 'Thông số 2', dataField: 'Thông số 2', key: 'value_2'},
    {title: 'Thông số 3', dataField: 'Thông số 3', key: 'value_3'},
    {title: 'Thông số 4', dataField: 'Thông số 4', key: 'value_4'},
    {title: 'Thông số 5', dataField: 'Thông số 5', key: 'value_5'},
    {title: 'Thông số 6', dataField: 'Thông số 6', key: 'value_6'},
    {title: 'Thông số 7', dataField: 'Thông số 7', key: 'value_7'},
    {title: 'Thời gian', dataField: 'Thời gian', key: 't_start'},

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
  ) {
  }

  addData: any = false;


  ngOnInit(): void {
    this.fromDate= this.general.dateFormatYYYYMMDD(new Date());
    this.toDate= this.general.dateFormatYYYYMMDD(new Date());
    let t_start = new Date();
    this.callDevice();
    this.callDevice();
    this.callDevice();


  }


  callDevice(): any {
    setTimeout(() => {
      console.log(1);
    }, 1000)
  }

  keyValueTable: any;

  openEvent2(e: any): any {
    console.log(e);

  }

  changePage2(e: any): any {
    this.p = e;
  }

  setOrder(value: string): any {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  getAPIListDevice(e: any): any {
    console.log(e);
  }

  exportFile(): any {
    console.log('exportFile');
    this.confirmDialog.confirm('Thông báo', `<br>Bạn muốn tải báo cáo này?<br>`, '', 'Xác nhận', 'Đóng').then((confirm) => {
      if (confirm) {
        this.general.exportExcel(this.dataContent, 'Baocao_thongtin_' + "Device1");
      }
    });
  }


}
