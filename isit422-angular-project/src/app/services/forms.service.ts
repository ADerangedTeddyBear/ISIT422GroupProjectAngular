import { Injectable } from '@angular/core';
import { __values } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  static findAndModify(query_in:string) {
    let mongo_out = query_in;
  }

  static updateMany(query_in:string) {
    let mongo_out = query_in;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", mongo_out, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
  }

  static postData(query_in:string) {    
    var names = ['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
    let mongo_out = query_in;
    for(var i = 0;i < 20;i++) {
    var xhr = new XMLHttpRequest();
    //console.log(`+++++${mongo_out}`)
    xhr.open("POST", mongo_out, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    var d = JSON.stringify({
      id: i,
      name: names[i],
      tag: 'test' })      
    xhr.send(d);
  }
}
  static adminDisplayData(query_in:string) {
    let mongo_out = query_in;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = (e) => {
      console.log(`onreadystatechanged error :${e}`);
    }
    var n = 0;
    var responseArr: any[] = [];
    var tblExist = document.getElementsByTagName('table').length;
    (tblExist === 0) ? this.buildTable() : this.rebuildTable();
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200)
          var o = JSON.parse(xhr.responseText);        
          for(var p in o) {
            var current = o[p];
            responseArr.push(current);
            var tbl = document.getElementsByClassName('displayTbl')[0];
            var row = document.createElement('tr');
            for(var p2 in responseArr) {
              tbl.appendChild(row);
              row.setAttribute('class', 'current');              
              for(var d in responseArr[p2]) {
                this.addData((responseArr[p2][d]), n, row);
              }
            }
            row.removeAttribute('class');
            n += 1;
            JSON.stringify(responseArr.reverse().pop());
          }
    }
    xhr.open("GET", mongo_out, true);
    xhr.send(/*JSON.stringify({test:"test1"})*/null);
  }

  static addData(d:any, n:number, rowElem:HTMLElement) {    
    var data = document.createElement('td');
    rowElem.appendChild(data);
    var textNode = document.createTextNode(d);
    data.appendChild(textNode);
  }

  static buildTable() {
    let tbl = document.createElement('table');
    let tblRows = document.getElementsByTagName('tr');
    let divElem = document.getElementsByClassName('dbGrid')[0];
    divElem.after(tbl);
    tbl.setAttribute('class', 'displayTbl');
    tbl.style.position = 'absolute';
    tbl.style.left = '10%';
    tbl.style.top = '45%';
    tbl.style.backgroundColor = '#00afdd';
    tbl.style.border = "solid 7px #000000";
  }

  static rebuildTable() {
    document.getElementsByTagName('table')[0].remove();
    this.buildTable();
  }

  constructor() { }
  
}
