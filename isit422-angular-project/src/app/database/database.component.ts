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


  constructor($http:HttpClient) {
    'ngInject';
    this.$http = $http;
    
  }
  
  oninsert() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'http://localhost:5000/api/message', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
      value: "from oninsert"  
    }
  ));  
}

onupdate() {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", 'http://localhost:5000/api/message', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
    value: "from onupdate"  
  }
));  
}

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
  xhr.open("POST", 'http://localhost:5000/api/message', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
    value: "from ondisplay"  
  }
));  
}


  ngOnInit(): void {
  }

}
