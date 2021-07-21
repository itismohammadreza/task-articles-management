import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { TableColDef } from '@shared/models/table';

@Component({
  selector: 'ng-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  constructor() {
  }

  @Input() colDef: TableColDef[];
  @Input() data: any[];
  @ContentChild(TemplateRef) layoutTemplate: TemplateRef<any>;

  ngOnInit(): void {
  }

  fromObj(obj: any, is: string | string[], value?: any) {
    if (typeof is == 'string') {
      return this.fromObj(obj, is.split('.'), value);
    }
    else if (is.length == 1 && value !== undefined) {
      return (obj[is[0]] = value);
    }
    else if (is.length == 0) {
      return obj;
    }
    else {
      return this.fromObj(obj[is[0]], is.slice(1), value);
    }
  }


}
