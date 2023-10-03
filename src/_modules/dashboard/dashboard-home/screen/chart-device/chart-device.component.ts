import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {GeneralService} from "../../../../../_services/general.service";
import {ConfirmationDialogService} from "../../../../shared/confirmation-dialog/confirmation-dialog.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {DefaultMatCalendarRangeStrategy, MAT_DATE_RANGE_SELECTION_STRATEGY} from "@angular/material/datepicker";
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter
} from "@angular/material-moment-adapter";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
// @ts-ignore
import {Chart} from "chart.js";
import {NathiService} from "../../../../../_services/nathi.service";
import {MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-chart-device',
  templateUrl: './chart-device.component.html',
  styleUrls: ['./chart-device.component.scss'],
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
export class ChartDeviceComponent implements OnInit {
  searchText: any = '';
  tableContentEvent: EventEmitter<object> = new EventEmitter();
  tableConfigEvent: EventEmitter<object> = new EventEmitter();
  page: EventEmitter<object> = new EventEmitter();
  itemsPerPage: any = 10;
  p: any = 1;
  tableContent: any = [];

  tableTH = [];
  dataContent: any = [];
  fromDate: any = '';
  minFromDate: any = '';
  maxFromDate: any = '';

  toDate: any = '';
  minToDate: any = '';
  maxToDate: any = '';
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
  listGateway: any = [];
  fromDateF: any;
  toDateF: any;
  selectedItemNode: any = [];
  ItemNode: any = [];

  selectedGateway: any;
  selectedNode: any;
  listResultMuil: any = [];
  listResult: any = [];
  listDataChart: any = {};
  listDate: any = [];

  constructor(private general: GeneralService,
              private confirmDialog: ConfirmationDialogService,
              private modalService: NgbModal,
              private router: Router,
              private spinner: NgxSpinnerService,
              private nathiService: NathiService
  ) {
  }


  changeEvent(e: any, str: any, list?: any): any {
    if (str === 'gateway') {
      this.selectedGateway = e;
      this.selectedNode = undefined;
      this.ItemNode = [];
      this.selectedItemNode = [];
      this.dataContent = [];
      this.tableTH = [];
      this.tableContentEvent.emit([]);
      this.tableConfigEvent.emit([]);
      this.listChartMuil = [];
      this.listChart = [];
      this.listResultMuil = [];
      this.listResult = [];
      this.listDataChart = {};
      this.listDate = [];
      this.listN = [];
      this.listP = [];
      this.listK = [];
      this.listM = [];
      this.listE = [];
      this.listT = [];
      this.listH = [];
      this.callAPINote(this.selectedGateway);
    } else if (str === 'node') {
      // @ts-ignore
      this.selectedNode = e;
      this.ItemNode = [];
      this.selectedItemNode = [];
      let listNodeItem = [] as any;

      list.filter((i: any) => {
        if (i.id === e) {
          let k = Object.keys(i.value);
          k.filter((j: any) => {
            if (j === 'N' || j === 'P' ||
              j === 'K' || j === 'M' ||
              j === 'E' || j === 'T' ||
              j === 'H') {
              listNodeItem.push({
                id: j,
                name: j
              });

            }
          })
          this.ItemNode = listNodeItem;
          this.selectedItemNode = listNodeItem.map((k: any) => {
            return {
              id: k.id,
              name: k.id
            };
          })
        }
      })
    } else if (str === 'fromDate') {
      this.fromDateF = new Date(e._d).getTime();
    } else {
      this.toDateF = new Date(e._d).getTime();
    }

  }


  filterDuplicateDates(data: any): any {
    return this.organizeDataByDate(data)
  }

  organizeDataByDate(data: any): any {
    let LT = [] as any;
    const organizedData = {} as any;

    data.forEach((item: any) => {
      const date = this.getDateFromTimestamp(item.ts);
      if (!organizedData[date]) {
        organizedData[date] = {...item.value};
      } else {
        for (const key in item.value) {
          if (item.value.hasOwnProperty(key) && typeof item.value[key] === 'number') {
            organizedData[date][key] = Math.max(organizedData[date][key], item.value[key]);
          }
        }
      }
    });
    return this.sortDataByDate(organizedData);
  }

  getDateFromTimestamp(timestamp: number): string {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}`;
  }

  sortDataByDate(data: any): any {
    return Object.keys(data).sort((a, b) => {
      const dateA = new Date(a.split('-').reverse().join('-')) as any;
      const dateB = new Date(b.split('-').reverse().join('-')) as any;
      return dateA - dateB;
    }).reduce((acc: any, key: any) => {
      acc[key] = data[key];
      return acc;
    }, {});
  }


  ngOnInit(): void {
    this.fromDate = this.general.dateFormatYYYYMMDD(new Date());
    this.toDate = this.general.dateFormatYYYYMMDD(new Date());
    this.fromDateF = new Date().getTime();
    this.toDateF = new Date().getTime();
    this.callAPIGateway();
  }

  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart: any;
  listColor: any = [
    '#FF0000',
    '#00FF00',
    '#0000FF',
    '#FFFF00',
    '#00FFFF',
    '#800000',
    '#FF00FF',
    '#E6E6FA',
    '#C0C0C0',
  ];

  chartLine(): any {
    let ctx: any = document.getElementById('lineChart') as HTMLElement;
    let listDatasets = [] as any;
    listDatasets = this.selectedItemNode.map((k: any, index: any) => {
      return {
        label: k.id,
        data: this.listDataChart[k.id],
        backgroundColor: this.listColor[index],
        borderColor: this.listColor[index],
        fill: false,
        lineTension: 0,
        radius: 5,
      }
    });
    //options
    var options = {
      responsive: true,
      title: {
        display: true,
        position: 'top',
        text: 'Dữ liệu node theo thời gian',
        fontSize: 18,
        fontColor: '#111',
      },
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          fontColor: '#333',
          fontSize: 16,
        },
      },
    };
    setTimeout(() => {
      var data = {
        labels: this.listDate,
        datasets: listDatasets,
      };
      var chart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options,
      });
    }, 200);


  }

  ngAfterViewInit() {


  }

  exportFile(): any {
    this.confirmDialog.confirm('Thông báo', `<br>Bạn muốn tải báo cáo này?<br>`, '', 'Xác nhận', 'Đóng').then((confirm) => {
      if (confirm) {
        this.general.exportExcel(this.dataContent, 'Baocao_dulieu_node_' + this.selectedNode);
      }
    });
  }


  callAPIGateway(): any {
    let dataGateway = [] as any;
    this.spinner.show();
    this.nathiService.apiGetAllDevice().subscribe((res: any) => {
      if (res && res.data) {
        this.spinner.hide();
        res.data.filter((i: any) => {
          dataGateway.push({
            id: i.id.id,
            name: i.name
          })
        });


      }
    }, (error: any) => {
      this.spinner.hide();
      this.confirmDialog.confirm('Thông báo', error.error.message, '', 'Đóng', '', false);
    })
    setTimeout(() => {
      this.listGateway = dataGateway;
      this.callAPINote(this.listGateway[0].id);
    }, 200);

  }

  selectGateway: any = '';
  selectNote: any = '';
  listChartMuil: any = [];
  listChart: any = [];

  callAPINote(idGateway: any): any {
    let dataNode = [] as any;
    this.spinner.show();
    this.nathiService.apiGetDetailDevice(idGateway).subscribe((res2: any) => {
      if (res2) {
        this.spinner.hide();
        for (const key in res2) {
          if (key.includes('Node')) {
            dataNode.push({
              id: key,
              name: key,
              value: res2[key][0].value
            });
          }
        }
      }
    }, (error: any) => {
      this.spinner.hide();
      this.confirmDialog.confirm('Thông báo', error.error.message, '', 'Đóng', '', false);
    })
    this.listNote = dataNode;
  }

  listN: any = [];
  listP: any = [];
  listK: any = [];
  listM: any = [];
  listE: any = [];
  listT: any = [];
  listH: any = [];

  getDataHistory(selectedGateway: any, selectedNode: any, fromDateF: any, toDateF: any): any {
    this.spinner.show();
    this.nathiService.apiHistoryDeviceNote(selectedGateway,
      selectedNode,
      fromDateF,
      toDateF).subscribe((res: any) => {
      if (res) {
        this.spinner.hide();
        this.listChartMuil = [];
        this.listChart = [];
        this.listResultMuil = [];
        this.listResult = res[selectedNode];
        this.listDataChart = {};
        this.listDate = [];
        this.listN = [];
        this.listP = [];
        this.listK = [];
        this.listM = [];
        this.listE = [];
        this.listT = [];
        this.listH = [];
        if (res[selectedNode]) {
          this.listChartMuil = this.organizeDataByDate(res[selectedNode]);
          for (const key in this.listChartMuil) {
            if (this.listChartMuil.hasOwnProperty(key)) {
              const item = this.listChartMuil[key];
              this.listN.push(item.N);
              this.listP.push(item.P);
              this.listK.push(item.K);
              this.listM.push(item.M);
              this.listE.push(item.E);
              this.listT.push(item.T);
              this.listH.push(item.H);
            }
            this.listDate.push(key);
          }
          this.listDataChart = {
            N: this.listN,
            P: this.listP,
            K: this.listK,
            M: this.listM,
            E: this.listE,
            T: this.listT,
            H: this.listH,
          }

          
        
          console.log(this.listResult);
          this.dataContent = this.listResult.map((i: any) => {
            let dataPush = i.value;
            dataPush.t_create = this.general.convertDateToDDMMYY(new Date(i.ts));
            return dataPush;
          })
          // @ts-ignore
          this.tableTH = Object.keys(this.listResult[0].value).map((k: any) => {
            return {title: k, dataField: k, key: k};
          })
          setTimeout(() => {
            this.tableContentEvent.emit(this.dataContent);
            this.tableConfigEvent.emit(this.tableTH);
            this.chartLine();
          }, 200);
        } else {
          this.confirmDialog.confirm('Thông báo', "Không có dữ liệu!", '', 'Đóng', '', false)
        }

      }
    }, (error: any) => {
      this.tableContentEvent.emit([]);
      this.tableConfigEvent.emit([]);
      this.listChartMuil = [];
      this.listChart = [];
      this.listResultMuil = [];
      this.listResult = [];
      this.listDataChart = {};
      this.listDate = [];
      this.listN = [];
      this.listP = [];
      this.listK = [];
      this.listM = [];
      this.listE = [];
      this.listT = [];
      this.listH = [];
      this.spinner.hide();
      this.confirmDialog.confirm('Thông báo', error.error.message, '', 'Đóng', '', false);
    })
  }

  openEvent2(e: any): any {
    console.log(e)
  }

}

