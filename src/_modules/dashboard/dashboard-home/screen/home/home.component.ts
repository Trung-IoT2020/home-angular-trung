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
    this.callAPIGetDevice();

  }


  callAPIGetDevice(): any {
    let listT1 = [] as any;
    const latView = String(Number(this.Location.lat));
    const lonView = String(Number(this.Location.lon));
    this.map = map('map').setView([latView, lonView], 19);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
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
                  name: res2.GW[0].value.ID,
                  lat: res2.GW[0].value.P1 ? String(res2.GW[0].value.P1) : '',
                  lon: res2.GW[0].value.P2 ? String(res2.GW[0].value.P2) : '',
                  active: res2.GW[0].value.P1 ? 1 : 0
                });
              } else {
                listT1.push({
                  name: "Gateway" + (index + 1),
                  lat: '',
                  lon: '',
                  active: 0
                });
              }
            });
          }
        });
        console.log(listT1);
        this.listGateway = listT1;
      }
    });
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
        this.callAPIGetDevice();
        // this.folder_type === 'POTENTIAL_CUSTOMER' ? this.getAPIListCampaign('') : this.getAPIListRecare('');
      }
    });
  }
}





