import {Component, OnInit} from '@angular/core';
import {GeneralService} from "../../../_services/general.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {ConfirmationDialogService} from "../../shared/confirmation-dialog/confirmation-dialog.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  type = "TENANT";

  constructor(
    private general: GeneralService,
    private modalService: NgbModal,
    private router: Router,
    private spinner: NgxSpinnerService,
    private confirmDialog: ConfirmationDialogService,
  ) {
  }

  listMenu: any = [];

  ngOnInit(): void {
    if (this.type === "TENANT") {
      this.listMenu = [
        {
          group: "Home",
          name: "Dashboard",
          link: "/home",
          icon: 'ti ti-layout-dashboard',
          type: "TENANT"
        },
        {
          group: "Device",
          name: "Quản lý thiết bị",
          link: "/device",
          icon: 'ti ti-layout-dashboard',
          type: "TENANT"
        },
        {
          group: "Device",
          name: "Xem note hoạt động",
          link: "/chart-device",
          icon: 'ti ti-layout-dashboard',
          type: "TENANT"
        },
        {
          group: "History",
          name: "Lịch sử",
          link: "/history",
          icon: 'ti ti-layout-dashboard',
          type: "TENANT"
        }
      ]
    } else {
      this.listMenu = [
        {
          group: "Home",
          name: "Dashboard",
          link: "/home-customer",
          icon: 'ti ti-layout-dashboard',
          type: "Customer"
        }]
    }

    localStorage.setItem('data-menu', JSON.stringify(this.listMenu));

    this.funcAddMenu(this.listMenu);
  }

  funcAddMenu(data: any): any {
    const groupedData = data.reduce((groups: any, item: any) => {
      if (!groups[item.group]) {
        groups[item.group] = [];
      }
      groups[item.group].push(item);
      return groups;
    }, {});
    let sidebar = document.getElementById("sidebarnav") as any;
    for (const group in groupedData) {
      if (groupedData.hasOwnProperty(group)) {
        // Tạo phần tử nhóm
        const groupItem = document.createElement("li");
        groupItem.className = "nav-small-cap";
        groupItem.innerHTML = `
      <i class="ti ti-dots nav-small-cap-icon fs-4"></i>
      <span class="hide-menu">${group}</span> `;
        sidebar.appendChild(groupItem);
        groupedData[group].forEach((item: any) => {
          const listItem = document.createElement("li");
          listItem.className = "sidebar-item";
          listItem.innerHTML = `
        <a class="sidebar-link" href="${item.link}"  aria-expanded="false">
          <span>
            <i class="${item.icon}"></i>
          </span>
          <span class="hide-menu">${item.name}</span>
        </a>`;
          // Chèn mục danh sách vào danh sách
          sidebar.appendChild(listItem);
        });
      }
    }
  }
}

