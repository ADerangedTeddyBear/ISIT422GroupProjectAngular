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
  static path: any;
  static id: number;

  querys(n:number) {
    let path = [
      'http://localhost:5000/api/collections', 'http://localhost:5000/api/insert',
     'http://localhost:5000/api/courses', 'http://localhost:5000/api/display', 'http://localhost:5000/api/updateMany',
     'http://localhost:5000/api/findAndModify'
    ];
    return path[n];
  }

  dropdown() {
    document.getElementsByClassName('dropdn')[0].classList.toggle("show");
  }

  checkClassExists(idx:number) {
    let classExists = document.getElementsByClassName('clicked')[0];
    let setClass = document.getElementsByTagName('button')[idx].setAttribute('class', 'clicked');
    classExists ? classExists.removeAttribute('class') : setClass;
    setClass;    
  }

  onidx0() {    
    let query_out = this.querys(0);
    this.checkClassExists(0);
    FormsService.adminDisplayData(query_out);
  }
  onidx1() {
    let query_out = this.querys(1);
    //console.log(`${query_out}`)
    this.checkClassExists(1);
   FormsService.postData(query_out);
  }

  onidx2() {
    let query_out = this.querys(2);
    this.checkClassExists(2);
    FormsService.adminDisplayData(query_out);
  }

  onidx3() {
    let query_out  = this.querys(3);
    this.checkClassExists(3);
    FormsService.adminDisplayData(query_out);
  }

  onidx4() {
    let query_out  = this.querys(4);
    this.checkClassExists(4);
    FormsService.updateMany(query_out);
    //FormsService.findAndModify(query_out);
  }

  onidx5() {
    let query_out  = this.querys(5);
    this.checkClassExists(5);
    //FormsService.updateMany(query_out);
    FormsService.findAndModify(query_out);
  }

  ngOnInit(): void {
    //FormsService.getCollections();
    window.onclick = function(e) {      
      //console.log(e.target);
    }
  }
}
