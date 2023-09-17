import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GeneralService} from "../../../_services/general.service";


@Component({
  selector: 'app-table-template-v2',
  templateUrl: './table-template-v2.component.html',
  styleUrls: ['./table-template-v2.component.scss'],
})
export class TableTemplateComponentV2  implements OnInit,AfterViewInit {

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
  dataContent: any = [];
  @Input() offset = 0;
  @Input() valueInput: any = '';
  @Input() sort: any = '';
  @Input() keyFolderType: any;

  @Output() pageChange = new EventEmitter();
  @Output() pageChange2 = new EventEmitter();
  keyShowStatePromotion: any = true;
  listColor: any = [
    '#FFEFD5',
    '#FFE4B5',
    '#D8BFD8',
    '#98FB98',
    '#f8f0f0',
    '#6B8E23',
    '#B0C4DE',
    '#E6E6FA',
    '#ADD8E6',
    '#F5DEB3',
    '#FFFFF0',
    '#FAF0E6',
    '#FFF0F5',
    '#FFE4E1',
    '#F0FFF0',
  ];
  listImageName: any = [
    'Hình ảnh',
    'Ảnh chương trình',
  ];
  listQR: any = [
    'Hình QR',
  ];
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
  listActiveState: any = [
    'Tình trạng',
  ];
  listActiveSpecial: any = [
    'Sắp ra mắt',
  ];
  listLink: any = [
    'Đường dẫn đến game',
    'Link chương trình',
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
  listOrder: any = [
    'Mã HĐ',
    'Mã phiếu',
    'Mã đơn',
  ];
  listActiveClick: any = [
    'Khách hàng',
    'Liên hệ',
  ];
  listActiveDHTH: any = [
    'Đúng hẹn/Trễ hẹn',
  ];

  NowDate: any = 0;

  listFR: any = [];
  listPhoneDoubleColor: any = [];
  listPhoneDouble: any = [];

  msgAddCart: any;
  showSuccessInform: any = false;

  changePage(e: any): any {
    this.pageChange.emit(e);
  }

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
        data[i]['Hình ảnh'] = 'https://hi-static.fpt.vn/sys/hifpt/pnc_pdx/new-portal/avatar_default.jpg';
        data[i]['Ảnh chương trình'] = 'https://hi-static.fpt.vn/sys/hifpt/pnc_pdx/new-portal/avatar_default.jpg';
      }
    }
    // 'https://hi-static.fpt.vn/sys/hifpt/pnc_pdx/muanhanh/new-acc.png';
  }

  ngOnInit(): void {

    if (this.sort !== '') {
      this.setOrder(this.sort);
      this.setOrder(this.sort);
    }
    setTimeout(()=>{
      this.checkTableConfig();
    },1000)
  }
  ngAfterViewInit(): void{
    this.tableContentEvent.subscribe((event: any) => {
      this.dataContent = event;
      console.log(11, this.dataContent);
    });
    this.tableTHEvent.subscribe((event: any) => {
      this.tableTH = event;
      console.log(22, this.tableTH);
    });
  }

  openPopup(type: any, id?: any): any {

  }

  checkDateFormView(start: any, end: any, state: any): any {
    const nowDate = new Date().getTime();
    const startList = start.split('/');
    const v1 = startList[2] + '-' + startList[1] + '-' + startList[0] + ' ' + '00:00:00';
    const endList = end.split('/');
    const v2 = endList[2] + '-' + endList[1] + '-' + endList[0] + ' ' + '23:59:59';
    const startV = new Date(v1).getTime();
    const endV = new Date(v2).getTime();
    if (endV >= nowDate && nowDate >= startV) {
      if ((nowDate + 86400000) <= startV) {
        this.NowDate = 1;
      } else if ((nowDate + 86400000) > endV) {
        this.NowDate = 2;
      } else {
        if (state === 'Public') {
          this.NowDate = 3;
        } else {
          this.NowDate = 5;
        }

      }
    } else if (endV < nowDate) {
      this.NowDate = 4;
    } else if (nowDate < startV) {
      this.NowDate = 1;
    } else {
      this.NowDate = 0;
    }
    return this.NowDate;
  }

  functionRandom(array: any): any {
    const index = Math.floor(Math.random() * array.length);
    return array.splice(index, 1)[0];
  }

  funcDoublePhoneToColor(phone: any, array: any): any {
    if (array.length > 0) {
      for (const obj in array) {
        // @ts-ignore
        if (String(array[obj].phone) === String(phone)) {
          // @ts-ignore
          return array[obj].color;
        }
      }
    } else {
      return undefined;
    }
  }

  checkTableConfig(): any {
    if (this.tableContentEvent) {
      this.tableContentEvent.subscribe((event: any) => {
        this.dataContent = event;
        console.log(11, this.dataContent);
      });
    }
    if (this.tableTHEvent) {
      this.tableTHEvent.subscribe((event: any) => {
        this.tableTH = event;
        console.log(22, this.tableTH);
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

  open(i: any, item: any): any {

  }

  copyLinkShow(link: any): any {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = link === '' || link === '-' || !link ? '' : link;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.msgAddCart = 'Đã sao chép';
    this.showSuccessInform = true;
    setTimeout(() => {
      this.showSuccessInform = false;
    }, 2000);
  }


  functionCrmModalCheck(str: any, value: any): any {
    this.valueInput = value;
    this.dataInputCheck.emit(this.valueInput);
  }
}
