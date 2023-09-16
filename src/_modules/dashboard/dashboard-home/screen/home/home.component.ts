import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  NgZone,
} from '@angular/core';
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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  Location: any = {lat: '10.7370357', lon: '106.7086349'};
  // Location: any;
  private map: L.Map;
  private marker: L.Marker;

  listGateway: any = [];

  constructor(
    private general: GeneralService,
    private modalService: NgbModal,
    private router: Router,
    private spinner: NgxSpinnerService,
    private confirmDialog: ConfirmationDialogService,
  ) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.initializeMap();
      console.log(this.listGateway);
    }, 1000);
    let listData = [];
    for (let i = 1; i <= 20; i++) {
      listData.push(
        {
          name: "Gateway_" + i,
          lat: String(Number(10.7370357 + (i / 100))),
          lon: String(Number(106.708634 + (i / 100)))
        }
      );
    }
    this.listGateway = listData;

  }


  initializeMap() {
    const latView = Number(Number(this.Location.lat));
    const lonView = Number(Number(this.Location.lon));
    this.map = map('map').setView([latView, lonView], 19);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
    this.updateMarker(this.Location.lat, this.Location.lon);

  }

  private updateMarker(lat: number, lng: number): void {
    let listData = [];
    const icon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.5.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.5.1/images/marker-shadow.png',
      iconAnchor: [20, 41],
      popupAnchor: [0, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
      shadowAnchor: [12, 41],
    });

    this.marker = L.marker([Number(Number(lat)), Number(Number(lng))], {icon}).addTo(this.map);
    for (let i = 1; i <= 20; i++) {
      listData.push(
        {
          name: "Gateway_" + i,
          lat: String(Number(10.7370357 + (i / 100))),
          lon: String(Number(106.708634 + (i / 100)))
        }
      );
      this.marker = (L.marker([String(10.7370357 + (i / 100)), String(106.7086349 + (i / 100))], {icon}).addTo(this.map));

    }
    this.listGateway = listData;
    this.map.flyTo([this.listGateway[1].lat, this.listGateway[1].lon], 18);

  }

  gotoDevice(data: any): any {
    this.map.flyTo([data.lat, data.lon], 18);
  }

  createDevice(data?: any): any {
    const modalRef = this.modalService.open(AddDeviceModalComponent, {
      backdrop: 'static',
      size: 'lg',
    });
    modalRef.componentInstance.title = data ? 'Cập nhật thông tin Gateway' : 'Thêm Gateway mới';
    modalRef.componentInstance.dataCampaignDetail = data ? data : undefined;
    // modalRef.componentInstance.key = str;
    // modalRef.componentInstance.folderType = this.folder_type;

    modalRef.componentInstance.modalAction.subscribe((res: any) => {
      console.log(res);
      if (res === 'submit') {
        console.log('Đã Gửi!');
        // this.folder_type === 'POTENTIAL_CUSTOMER' ? this.getAPIListCampaign('') : this.getAPIListRecare('');
      }
    });
  }
}





