import { Injectable } from '@angular/core';
import { __values } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class FormsService {
  static uriArr: any;

  
  /*static getCollections() {
    var responseArr: any[] = [];
    var tblExist = document.getElementsByTagName('table').length;
    if(tblExist === 0) {
      this.buildTable();
    } else {
      this.rebuildTable();
    }
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200)
          var o = JSON.parse(xhr.responseText);
          console.log(xhr.responseText);                    
          console.log(JSON.stringify(xhr.responseText));
          for(var p in o) {
            var current = o[p];
            responseArr.push(current);
            var tbl = document.getElementsByClassName('displayTbl')[0];
            var row = document.createElement('tr');
          }
          
    }
    xhr.open("GET", 'http://localhost:5000/api/collections', true);
    xhr.send(/*JSON.stringify({test:"test1"})*///null);
  //}*/


  //postData below will insert a as whatever number of elements that is in the array "namnes" with fixed fields id,name, and tag
   static postData() {
    var names = ['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
    for(var i = 0;i < 20;i++) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'http://localhost:5000/api/insert', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
      id: i,
      name: names[i],
      tag: 'test'
    }
    ));
  }
}

static adminDisplayData2() {    
  var xhr = new XMLHttpRequest();
  var n = 0;
  var responseArr: any[] = [];
  var tblExist = document.getElementsByTagName('table').length;
  console.log(tblExist);
  if(tblExist === 0) {
    this.buildTable();
  } else {
    this.rebuildTable();
  }
  //(tblExist === 0) ? this.buildTable : this.rebuildTable();
  
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200)
        var o = JSON.parse(xhr.responseText);
        console.log(JSON.stringify(xhr.responseText));
        
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
          console.log(row);            
          row.removeAttribute('class');
          n += 1;
          JSON.stringify(responseArr.reverse().pop());
        }
  }
  xhr.open("GET", 'http://localhost:5000/api/display2', true);
  xhr.send(/*JSON.stringify({test:"test1"})*/null);
  }






  static adminDisplayData() {    
    var xhr = new XMLHttpRequest();
    var n = 0;
    var responseArr: any[] = [];
    var tblExist = document.getElementsByTagName('table').length;
    console.log(tblExist);
    if(tblExist === 0) {
      this.buildTable();
    } else {
      this.rebuildTable();
    }
    //(tblExist === 0) ? this.buildTable : this.rebuildTable();
    
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200)
          var o = JSON.parse(xhr.responseText);
          console.log(JSON.stringify(xhr.responseText));
          
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
            console.log(row);            
            row.removeAttribute('class');
            n += 1;
            JSON.stringify(responseArr.reverse().pop());
          }
    }
    xhr.open("GET", 'http://localhost:5000/api/display', true);
    xhr.send(/*JSON.stringify({test:"test1"})*/null);
    }

    static adminDisplayCollections() {    
      var xhr = new XMLHttpRequest();
      var n = 0;
      var responseArr: any[] = [];
      var tblExist = document.getElementsByTagName('table').length;
      console.log(tblExist);
      if(tblExist === 0) {
        this.buildTable();
      } else {
        this.rebuildTable();
      }
      //(tblExist === 0) ? this.buildTable : this.rebuildTable();
      
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200)
            var o = JSON.parse(xhr.responseText);
            console.log(JSON.stringify(xhr.responseText));
            
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
              console.log(row);            
              row.removeAttribute('class');
              n += 1;
              JSON.stringify(responseArr.reverse().pop());
            }
      }
      xhr.open("GET", 'http://localhost:5000/api/collections', true);
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
    tbl.style.left = '13%';
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
