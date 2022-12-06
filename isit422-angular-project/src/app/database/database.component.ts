import { Component, Injectable, Input, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
//import * as $ from 'jquery';
//import {ViewChild, ElementRef, AfterViewInit} from '@angular/core';
//import {bootstrap}    from '@angular/platform-browser-dynamic';
//declare var $:JQueryStatic;

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
      'https://isit422-node-finale-2022.azurewebsites.net/api/display', 'https://isit422-node-finale-2022.azurewebsites.net/api/insert',
     'https://isit422-node-finale-2022.azurewebsites.net/api/courses', 'https://isit422-node-finale-2022.azurewebsites.net/api/display', 'https://isit422-node-finale-2022.azurewebsites.net/api/projects',
     'https://isit422-node-finale-2022.azurewebsites.net/api/findAndModify'
    ];
    return path[n];
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
    DatabaseService.adminDisplayData(query_out, 0);
  }
  onidx1() {
    let query_out = this.querys(0);
    //console.log(`${query_out}`)
    this.checkClassExists(0);
    DatabaseService.adminDisplayData(query_out, 1);
  }

  onidx2() {
    let query_out = this.querys(0);
    this.checkClassExists(0);
    DatabaseService.adminDisplayData(query_out, 2);
  }

  onidx3() {
    let query_out  = this.querys(0);
    this.checkClassExists(0);
    DatabaseService.adminDisplayData(query_out, 3);
  }

  onidx4() {
    let query_out  = this.querys(0);
    this.checkClassExists(0);
    DatabaseService.adminDisplayData(query_out, 4);
    //FormsService.findAndModify(query_out);
  }

  onidx5() {
    let query_out  = this.querys(0);
    this.checkClassExists(0);
    //FormsService.updateMany(query_out);
    DatabaseService.adminDisplayData(query_out, 5);
  }

  onidx6() {
    let query_out  = this.querys(0);
    this.checkClassExists(0);
    //FormsService.updateMany(query_out);
    DatabaseService.adminDisplayData(query_out, 6);
  }

  ngOnInit(): void {
    //FormsService.getCollections();
    window.onclick = function(e) {
      //console.log(e.target);
      //$('body').css('backgroundColor', 'blue');
    }
  }
}
