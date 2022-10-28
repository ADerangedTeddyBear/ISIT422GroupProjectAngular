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

  constructor() {
    'ngInject';
    ;
  }
  
  oninsert() {
    var names = ['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen',];
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
  this.buildTable();
  xhr.onreadystatechange = () => { 
    if (xhr.readyState == 4 && xhr.status == 200)
      
        //console.log(`${JSON.parse(xhr.responseText)}`);
        //var resObj = xhr.responseText;
        var o = JSON.parse(xhr.responseText);
        
        var newRow = document.getElementsByTagName('tr');
        for(var p in o) {
          n += 1;
          console.log(`${n}: ${o[p]}`)
          //console.log(JSON.stringify(o[p]))
          var da = (o[p]);
          for(var p in da) {
            this.addRow(da.id, n);
            
            this.addData(da.name, n);
            this.addData(da.tag, n);
            document.getElementsByTagName('tr')[n].removeAttribute('class');
          }
          //this.addRow(JSON.stringify(o[p]));

          //document.getElementsByTagName('tr')[0].classList.remove('current');

        }
        var tbl = document.getElementsByClassName('displayTbl');
        //$('table').css('color', 'red');
        this.rows();

}


xhr.open("GET", 'http://localhost:5000/api/display', true);
xhr.send(/*JSON.stringify({test:"test1"})*/null);
  
}

buildTable() {
  var tbl = document.createElement('table');
  var tblRows = document.getElementsByTagName('tr');
  //var tblRow = document.createElement('tr');
  //var tbldata = document.createElement('td')
  var divElem = document.getElementsByClassName('dbGrid')[0]
  divElem.after(tbl);
  tbl.setAttribute('class', 'displayTbl');
  tbl.style.position = 'absolute';
  tbl.style.left = '13%';
  tbl.style.top = '45%';
  tbl.style.backgroundColor = '#00afdd';
  //tbl.style.border = '1';
  //console.log(`${getComputedStyle(tbl).getPropertyValue('border')} --------------------`)

}

addRow(data:any, n:number) {
  var tbl = document.getElementsByClassName('displayTbl')[0];
  var row = document.createElement('tr');
  
  tbl.appendChild(row);
  //var newRowCount = newRow.length;
  //console.log(newRowCount)
  //var n = document.getElementsByTagName('tr').length;
  //document.getElementsByTagName('tr')[n].setAttribute('class', 'current');
  row.setAttribute('class', 'current');
  this.addData(data, n);
  //document.getElementsByClassName('current')[0].removeAttribute('current')
  //row.removeAttribute('class')
  
}

addData(d:any, n:number) {
  //body > app-root > div > db-database > table:nth-child(4) > tr:nth-child(1)

  var data = document.createElement('td');
  var curRow = document.getElementsByClassName('current')[n];
  curRow.appendChild(data);  
  var textNode = document.createTextNode(d);
  textNode.appendData(d);
  data.appendChild(textNode);
  
  
}

rows() {
  var tbl = document.getElementsByClassName('displayTbl')[0];
  var rows = document.getElementsByClassName('row');
}


  ngOnInit(): void {
  }

}
