import { Component, EventEmitter, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-template',
  templateUrl: './table-template.component.html',
  styleUrls: ['./table-template.component.scss'],
})
export class TableTemplateComponent implements OnInit {
  @Input() public tableConfigChoosen: EventEmitter<object> =
    new EventEmitter<any>();
  @Input() tableMode: string = 'default';
  @Input() thClass: string = '';
  @Input() public tableConfigCustomChoosen: EventEmitter<object> =
    new EventEmitter<any>();
  @Input() public tableContentChoosen: EventEmitter<object> =
    new EventEmitter<any>();
  constructor() {}
  tableConfig: any;
  tableConfigCustom: any;
  tableContent: any;
  ngOnInit(): void {
    this.checkTableConfig();
    this.checkTableConfigCustom();
    this.checkTableContent();
  }
  checkTableConfig() {
    if (this.tableConfigChoosen) {
      this.tableConfigChoosen.subscribe((event) => {
        this.tableConfig = event;
      });
    } else {
      this.tableConfig = [];
    }
  }
  checkTableConfigCustom() {
    if (this.tableConfigCustomChoosen) {
      this.tableConfigCustomChoosen.subscribe((event) => {
        this.tableConfigCustom = event;
      });
    } else {
      this.tableConfigCustom = [];
    }
  }
  checkTableContent() {
    if (this.tableContentChoosen) {
      this.tableContentChoosen.subscribe((event) => {
        this.tableContent = event;
        console.log(this.tableContent);
      });
    } else {
      this.tableContent = [];
    }
  }
}
