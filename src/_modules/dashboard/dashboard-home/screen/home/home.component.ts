import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit} from '@angular/core';
// @ts-ignore
import * as L from 'leaflet';
// @ts-ignore
import {map} from 'leaflet';
import {AddDeviceModalComponent} from "../add-device-modal/add-device-modal.component";
import {GeneralService} from "../../../../../_services/general.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {ConfirmationDialogService} from "../../../../shared/confirmation-dialog/confirmation-dialog.service";
import {NathiService} from "../../../../../_services/nathi.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  Location: any = {lat: '10.798939', lon: '106.652915'};
  // Location: any;
  public map: L.Map;
  public marker: L.Marker;

  public listGateway: any = [];
  isLogin: any;

  constructor(
    private general: GeneralService,
    private modalService: NgbModal,
    private router: Router,
    private spinner: NgxSpinnerService,
    private confirmDialog: ConfirmationDialogService,
    private nathiService: NathiService
  ) {
  }

  ngOnInit(): void {
    this.isLogin = this.nathiService.checkToken();
    setTimeout(() => {
      if (this.isLogin) {
        const latView = String(Number(this.Location.lat));
        const lonView = String(Number(this.Location.lon));
        this.map = map('map').setView([latView, lonView], 19);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
        this.callAPIGetDevice();
      }
    }, 500)
    setTimeout(()=>{
      window.location.reload();
    },3600000);


  }


  callAPIGetDevice(): any {
    let listT1 = [] as any;
    this.nathiService.apiGetAllDevice().subscribe((res: any) => {
      if (res && res.data) {
        const icon = L.icon({
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.5.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.5.1/images/marker-shadow.png',
          iconAnchor: [20, 41],
          popupAnchor: [0, -34],
          tooltipAnchor: [16, -28],
          shadowSize: [41, 41],
          shadowAnchor: [12, 41],
        });

        res.data.filter((i: any, index: any) => {
          if (i) {
            this.nathiService.apiGetDetailDevice(i.id.id).subscribe((res2: any) => {
              if (res2 && res2.GW) {
                this.marker = (L.marker([String(res2.GW[0].value.P1), String(res2.GW[0].value.P2)], {icon}).addTo(this.map));
                listT1.push({
                  id: i.id.id,
                  name: i.name,
                  lat: res2.GW[0].value.P1 ? String(res2.GW[0].value.P1) : '',
                  lon: res2.GW[0].value.P2 ? String(res2.GW[0].value.P2) : '',
                  active: Number(Number(res2.GW[0].ts) + 3600000) > new Date().getTime() ? 1 : 0,
                  t_create: this.general.convertDateToDDMMYY(new Date(i.createdTime)),
                  location: res2.GW[0].value.P1 && res2.GW[0].value.P2 ? 1 : 0
                });
              } else {
                listT1.push({
                  id: i.id.id,
                  name: i.name,
                  lat: '',
                  lon: '',
                  t_create: this.general.convertDateToDDMMYY(new Date(i.createdTime)),
                  active: 0,
                  location: 0
                });
              }
            });
          }
        });
        setTimeout(() => {
          listT1.filter((k: any) => {
            this.marker.bindPopup("<b>" + k.name + "</b><br><a href='./node?id=" + k.id + "'>ID: " + k.id + "</a><br>Thời gian tạo: " + k.t_create).openPopup();
          })
        }, 200)

        this.listGateway = listT1;
      }
    });
  }

  gotoDevice(data: any): any {
    this.map.flyTo([data.lat, data.lon], 18);
    this.marker.bindPopup("<b>" + data.name + "</b><br><a href='./node?id=" + data.id + "'>ID: " + data.id + "</a><br>Thời gian tạo: " + data.t_create).openPopup();
  }

  createDevice(data?: any): any {
    const modalRef = this.modalService.open(AddDeviceModalComponent, {
      backdrop: 'static',
      size: 'lg',
    });
    modalRef.componentInstance.title = data ? 'Cập nhật thông tin Gateway' : 'Thêm Gateway mới';
    modalRef.componentInstance.dataCampaignDetail = data ? data : undefined;
    modalRef.componentInstance.modalAction.subscribe((res: any) => {
      if (res === 'submit') {
        console.log(12334555);
        this.callAPIGetDevice();
      }
    });
  }
}





