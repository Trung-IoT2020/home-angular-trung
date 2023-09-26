import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef} from '@angular/core';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GeneralService} from "../../../_services/general.service";


@Component({
  selector: 'app-table-template-v2',
  templateUrl: './table-template-v2.component.html',
  styleUrls: ['./table-template-v2.component.scss'],
})
export class TableTemplateComponentV2 implements OnInit {

  constructor(private general: GeneralService, private modalService: NgbModal) {
  }

  // @ts-ignore
  @ViewChild('printDiv') printDiv: ElementRef;
  @Input() exportEX: any = false;
  @Input() tableTH: any = [];
  @Input() order: any = 't_create';
  @Input() reverse: any = false;
  @Input() searchAll: any = '';
  @Input() itemsPerPage: any;
  @Input() tableClass: any = '';
  @Input() keyCSKH: any = '';
  @Input() keyValueTable: any;
  @Input() p: any = 1;
  // tslint:disable-next-line:variable-name
  @Input() assign_me: any = 0;
  @Input() itemsP2: any = 2;
  @Output() openEvent2 = new EventEmitter<any>();
  @Output() dataInputCheck = new EventEmitter<any>();
  @Output() valueTable = new EventEmitter<any>();
  @Input() tableContentEvent: any;
  @Input() tableTHEvent: any;
  @Input() page: any;
  @Input() addData: any = false;
  @Input() dataContent: any = [];
  @Input() offset = 0;
  @Input() valueInput: any = '';
  @Input() sort: any = '';
  @Input() keyFolderType: any;

  @Output() pageChange = new EventEmitter();
  @Output() pageChange2 = new EventEmitter();


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
  listTitleClick: any = [
    'Mã Gateway',
    'Mã Note'
  ]

  changePage2(e: any): any {
    this.p = e;
    this.pageChange2.emit(e);
  }


  print(): any {
    window.print();
  }

  openEvent(str: any, data: any, key: any, count?: any): any {
    let a = {
      str,
      data,
      key,
      count,
      p: this.p,
    };
    this.openEvent2.emit(a);
  }

  onError(e: any, data: any): any {
    for (let i = 0; i < data.length; i++) {
      if (i === e) {
        data[i]['Hình ảnh'] = './assets/images/nathi/avatar_default.png';
        data[i]['Ảnh chương trình'] = './assets/images/nathi/avatar_default.png';
      }
    }
  }

  ngOnInit(): void {
    this.checkTableConfig();
    if (this.sort !== '') {
      this.setOrder(this.sort);
      this.setOrder(this.sort);
    }
  }

  checkTableConfig(): any {
    if (this.tableContentEvent) {
      this.tableContentEvent.subscribe((event: any) => {
        this.dataContent = event;
        console.log(21, this.dataContent)
      });
    }
    if (this.tableTHEvent) {
      this.tableTHEvent.subscribe((event: any) => {
        this.tableTH = event;
        console.log(21, this.tableTH)
      });
    }
    if (this.page) {
      this.page.subscribe((event: any) => {
        this.p = event;
      });
    }
    this.p = 1;
  }

  setOrder(value: string): any {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

}
