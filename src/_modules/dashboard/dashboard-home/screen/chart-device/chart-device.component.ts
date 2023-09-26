import {Component, OnInit, ViewChild} from '@angular/core';
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

  constructor(private general: GeneralService,
              private confirmDialog: ConfirmationDialogService,
              private modalService: NgbModal,
              private router: Router,
              private spinner: NgxSpinnerService,
              private nathiService: NathiService
  ) {
  }

  fromDateF: any;
  toDateF: any;

  changeEvent(e: any, str: any): any {
    console.log(e);
    if (str === 'Gateway') {
      // @ts-ignore
      this.selectGateway = event.target.value;
      console.log(this.selectGateway);
      this.callAPINote(this.selectGateway);
    } else if (str === 'Node') {
      // @ts-ignore
      this.selectNote = event.target.value;
    } else if (str === 'fromDate') {
      console.log(e);
      this.fromDateF = new Date(e._d).getTime();
      console.log(this.fromDateF);
    } else {
      this.toDateF = new Date(e._d).getTime();
      console.log(this.toDateF);
    }

  }

  ngOnInit(): void {
    this.fromDate = this.general.dateFormatYYYYMMDD(new Date());
    this.toDate = this.general.dateFormatYYYYMMDD(new Date());
    this.callAPIGateway();
  }

  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart: any;

  ngAfterViewInit() {
    this.canvas = this.mychart.nativeElement;
    this.ctx = this.canvas.getContext('2d');

    let myChart = new Chart(this.ctx, {
      type: 'line',

      data: {
        datasets: [{
          label: 'Höhenlinie',
          backgroundColor: "rgba(255, 99, 132,0.4)",
          borderColor: "rgb(255, 99, 132)",
          fill: true,
          data: [
            {x: 1, y: 2},
            {x: 2500, y: 2.5},
            {x: 3000, y: 5},
            {x: 3400, y: 4.75},
            {x: 3600, y: 4.75},
            {x: 5200, y: 6},
            {x: 6000, y: 9},
            {x: 7100, y: 6},
          ],
        }]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Höhenlinie'
        },
        scales: {
          xAxes: [{
            type: 'linear',
            position: 'bottom',
            ticks: {
              userCallback: function (tick: any) {
                if (tick >= 1000) {
                  return (tick / 1000).toString() + 'km';
                }
                return tick.toString() + 'm';
              }
            },
            scaleLabel: {
              labelString: 'Länge',
              display: true,
            }
          }],
          yAxes: [{
            type: 'linear',
            ticks: {
              userCallback: function (tick: any) {
                return tick.toString() + 'm';
              }
            },
            scaleLabel: {
              labelString: 'Höhe',
              display: true
            }
          }]
        }
      }
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
      console.log(this.listGateway);
      this.callAPINote(this.listGateway[0].id);
    }, 500);

  }

  selectGateway: any = '';
  selectNote: any = '';

  callAPINote(idGateway: any): any {
    console.log(idGateway);
    let dataNode = [] as any;
    this.spinner.show();
    this.nathiService.apiGetDetailDevice(idGateway).subscribe((res2: any) => {
      if (res2) {
        this.spinner.hide();
        for (const key in res2) {
          dataNode.push({
            id: key,
            name: key
          })
        }
      }
    }, (error: any) => {
      this.spinner.hide();
      this.confirmDialog.confirm('Thông báo', error.error.message, '', 'Đóng', '', false);
    })
    this.listNote = dataNode;
  }

  getDataHistory(): any {
    this.spinner.show();
    this.nathiService.apiHistoryDeviceNote(this.selectGateway, this.selectNote, this.fromDateF, this.toDateF).subscribe((res: any) => {
      if (res) {
        this.spinner.hide();
        console.log(res);
      }
    }, (error: any) => {
      this.spinner.hide();
      this.confirmDialog.confirm('Thông báo', error.error.message, '', 'Đóng', '', false);
    })
  }
}
