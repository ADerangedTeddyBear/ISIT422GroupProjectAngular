import { Component, Injectable, Input, OnInit } from '@angular/core';
import { FormsService } from 'src/app/services/forms.service';


@Component({
  selector: 'db-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css']
})
export class DatabaseComponent /*implements OnInit*/ {
  name = 'db';
  one: any;
  FormsService: any;
  

  constructor() {
    'ngInject';
    ;
  }
  
  oninsert() {
    //FormsService.postData();
    FormsService.adminDisplayCollections();
  }
  onupdate() {
   FormsService.postData();
  }

  ondelete() {
    FormsService.adminDisplayData2();
  }

  ondisplay() {
    FormsService.adminDisplayData();
  }
/*buildTable() {
}

addRow(data:any, n:number) {
 
}

addData(d:any, n:number) {

}

rows() {

}
*/
  ngOnInit(): void {
    //FormsService.getCollections();
  }
}
