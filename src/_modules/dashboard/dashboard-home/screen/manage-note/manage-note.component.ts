import {Component, EventEmitter, OnInit} from '@angular/core';
import {GeneralService} from "../../../../../_services/general.service";
import {ConfirmationDialogService} from "../../../../shared/confirmation-dialog/confirmation-dialog.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter
} from "@angular/material-moment-adapter";
import {DefaultMatCalendarRangeStrategy, MAT_DATE_RANGE_SELECTION_STRATEGY} from "@angular/material/datepicker";
import {NathiService} from "../../../../../_services/nathi.service";

@Component({
  selector: 'app-manage-note',
  templateUrl: './manage-note.component.html',
  styleUrls: ['./manage-note.component.scss'],
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
export class ManageNoteComponent implements OnInit {
  searchText: any = '';
  tableContentEvent: EventEmitter<object> = new EventEmitter();
  tableConfigEvent: EventEmitter<object> = new EventEmitter();
  page: EventEmitter<object> = new EventEmitter();
  itemsPerPage: any = 10;
  p: any = 1;

  dataContent: any = [];
  tableTH = [];

  idGateway: any = '';

  constructor(private general: GeneralService,
              private modalService: NgbModal,
              private router: Router,
              private spinner: NgxSpinnerService,
              private confirmDialog: ConfirmationDialogService,
              private nathiService: NathiService,
              private route: ActivatedRoute,
  ) {
    this.route.queryParamMap.subscribe(async (res: any) => {
      this.idGateway = res.get('id');
      this.getAPIListNote(this.idGateway);
    });
  }

  addData: any = false;


  ngOnInit(): void {


  }

  openEvent2(e: any): any {
    console.log(e);

  }

  listT = [];

  getAPIListNote(e: any): any {
    this.tableTH = [];
    this.nathiService.apiGetDetailDevice(e).subscribe((res2: any) => {
      if (res2) {
        const uniqueKeys = [] as any;
        this.listT = [];
        this.tableTH = [];
        for (const key in res2) {
          if (key.includes('Node')) {
            // @ts-ignore
            this.listT.push(res2[key][0].value);
            const values = res2[key];
            for (const item of values) {
              if (item.value) {
                const keysInValue = Object.keys(item.value);
                keysInValue.filter((k) => uniqueKeys.push(k));
              }
            }
          }
        }

        // @ts-ignore
        let listTH = uniqueKeys.map((i: any) => {
          return {title: i, dataField: i, key: i}
        });
        const uniqueItems = new Set(listTH.map((item:any) => JSON.stringify(item)));

        // Chuyển đổi Set thành mảng và gán cho filteredData
        this.tableTH = Array.from(uniqueItems).map((item:any) => JSON.parse(item)) as any;

        console.log(this.tableTH);
        setTimeout(() => {
          this.dataContent = this.listT;
          this.tableContentEvent.emit(this.dataContent);
          this.tableConfigEvent.emit(this.tableTH);
        }, 500);
      }
    }, (error: any) => {
      this.tableTH = [];
      this.dataContent = [];
      this.tableContentEvent.emit([]);
      this.tableConfigEvent.emit([]);
    });
  }

  exportFile(): any {
    console.log('exportFile');
    this.confirmDialog.confirm('Thông báo', `<br>Bạn muốn tải báo cáo này?<br>`, '', 'Xác nhận', 'Đóng').then((confirm) => {
      if (confirm) {
        this.general.exportExcel(this.dataContent, 'Baocao_thongtin_node_' + this.idGateway);
      }
    });
  }


}
