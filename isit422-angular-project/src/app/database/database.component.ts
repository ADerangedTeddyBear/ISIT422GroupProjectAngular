import { HttpBackend } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Component, Injectable, Input, OnInit } from '@angular/core';


@Component({
  selector: 'db-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css']
})
export class DatabaseComponent implements OnInit {
  name = 'db';
  $http: any;
  message: any;
  one: any;

  constructor() {
    'ngInject';
    ;
  }
  
  oninsert() {
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


/* Placeholder - copied from insert */
onupdate() {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", 'http://localhost:5000/api/message', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
    value: "from onupdate"  
  }
));  
}
/* Placeholder - copied from insert */
ondelete() {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", 'http://localhost:5000/api/message', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
    value: "from ondelete"  
  }
));  
}

ondisplay() {
  var xhr = new XMLHttpRequest();
  var n = 0;
  
  xhr.onreadystatechange = () => { 
    if (xhr.readyState == 4 && xhr.status == 200)
        var o = JSON.parse(xhr.responseText);
        this.buildTable();
        var newRow = document.getElementsByTagName('tr');
        for(var p in o) {
          
          console.log(`${n}: ${o[p]}`)
          var da = (o[p]);
          this.addRow(da.id, n);
          this.addData(da.name, n);
          this.addData(da.tag, n);
          n += 1;
          document.getElementsByTagName('tr')[n].removeAttribute('class');
          //document.querySelector('body > app-root > div > db-database > table > .current')?.removeAttribute('class')
          for(var p in da) {
            //document.querySelector('body > app-root > div > db-database > table > .current')?.removeAttribute('class')
          }
        }
        var tbl = document.getElementsByClassName('displayTbl');
        this.rows();
        console.log(`${document.querySelector('body > app-root > div > db-database > table')}`)
}
xhr.open("GET", 'http://localhost:5000/api/display', true);
xhr.send(/*JSON.stringify({test:"test1"})*/null);

}
buildTable() {
  var tbl = document.createElement('table');
  var tblRows = document.getElementsByTagName('tr');
  var divElem = document.getElementsByClassName('dbGrid')[0]
  divElem.after(tbl);
  tbl.setAttribute('class', 'displayTbl');
  tbl.style.position = 'absolute';
  tbl.style.left = '13%';
  tbl.style.top = '45%';
  tbl.style.backgroundColor = '#00afdd';
  tbl.style.border = "solid 7px #000000";
  //tbl.style.border = '1';
  //console.log(`${getComputedStyle(tbl).getPropertyValue('border')} --------------------`)
}

addRow(data:any, n:number) {
  var tbl = document.getElementsByClassName('displayTbl')[0];
  var row = document.createElement('tr');
  tbl.appendChild(row);
  row.setAttribute('class', 'current');
  row.style.border = "solid 1px #000000";
  this.addData(data, n);  
}

addData(d:any, n:number) {
  //body > app-root > div > db-database > table:nth-child(4) > tr:nth-child(1)
  var data = document.createElement('td');
  var curRow = document.getElementsByClassName('current')[n];
  curRow.appendChild(data);  
  var textNode = document.createTextNode(d);
  textNode.appendData(d);
  data.appendChild(textNode);
  data.style.border = "solid 1px #000000";
  var tbl = document.getElementsByClassName('displayTbl')[0];
  //console.log(document.querySelector('body > app-root > div > db-database > table > .current')?.removeAttribute('class'))
  //console.log(`${getComputedStyle(tbl).getPropertyValue('border')} --------------------`);
}

rows() {
  var tbl = document.getElementsByClassName('displayTbl')[0];
  var rows = document.getElementsByClassName('row');
  var tbl = document.getElementsByClassName('displayTbl')[0];
  //console.log(`${/*tbl.setAttribute('style.border', 'solid 1px rgb(128, 128, 128)')*/}`); 
  //getComputedStyle(tbl).setProperty('border', 'solid 1px rgb(128, 128, 128)')
//  console.log(this)
  //console.log(document.querySelector('body > app-root > div > db-database > table > tr'))
  
}

//body > app-root > div > db-database > table
//body > app-root > div > db-database > .displayTbl
  ngOnInit(): void {
    
  }
}
