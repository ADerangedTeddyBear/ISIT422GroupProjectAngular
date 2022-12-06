import { Injectable } from '@angular/core';
import { __values } from 'tslib';
import * as $ from 'jquery';
import { findIndex } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class FormsService {
  static updateMany(query_in:string) {
    let mongo_out = query_in;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", mongo_out, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
  }

  static postData(query_in:string) {   
    console.log(query_in); 
    var names = ['zero','one','two'];
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
  static adminDisplayData(query_in:string, idx:number) {
    let mongo_out = `${query_in}/${idx}`;    
    console.log(`mongo_out from adminDisplayData line 2 : ${mongo_out}`)
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
            //add each object to 
            responseArr.push(current);
            var tbl = document.getElementsByClassName('displayTbl')[0];
            var row = document.createElement('tr');
            for(var p2 in responseArr) {
              tbl.appendChild(row);
              row.setAttribute('class', 'current');              
              for(var d in responseArr[p2]) {
                //var dtag = document.getElementsByClassName('current')[0];
                //console.log(`dtag is - > ${dtag.childElementCount}`)
                this.addData((responseArr[p2][d]),n, d, row);
                //console.log(`d from adminDisplayData is -> ${d}`)
              }
            }
            row.removeAttribute('class');
            n += 1;
            //as it goes through each object and puts data in the td elements, when finished, remove it from array
            //so the next item is processed.
            JSON.stringify(responseArr.reverse().pop());
          }
          this.doTableElems(idx);
    }
    xhr.open("GET", mongo_out, true);
    xhr.send(/*JSON.stringify({test:"test1"})*/null);
  }

  static addData(d:any,n:number, dtag:any, rowElem:HTMLElement) {
    var data = document.createElement('td');
    rowElem.appendChild(data);
    //console.log(`typeof d from addData is -> ${typeof d}`)
    var textNode = document.createTextNode(d);
    //console.log(`d from addData is -> ${d}`)
    //only add data element text for strings and numbers - objects hide
    typeof d !== 'object' ? data.appendChild(textNode) : console.log();
    //data.appendChild(textNode);
    data.setAttribute('class', dtag );
    document.getElementsByClassName('_id')[n].setAttribute('hidden', 'true')
  }

  static buildTable() {
    let tbl = document.createElement('table');
    let tblRows = document.getElementsByTagName('tr');
    let divElem = document.getElementsByClassName('dbGrid')[0];
    divElem.after(tbl);
    tbl.setAttribute('class', 'displayTbl');
    $('.displayTbl').css({'position':'absolute','left':'10%','top':'45%','backgroundColor': 'yellow', 'border':'solid 7px #000000'});
    //tbl.style.position = 'absolute';
    //tbl.style.left = '10%';
    //tbl.style.top = '45%';
    //tbl.style.backgroundColor = '#00afdd';
    //tbl.style.border = "solid 7px #000000";
  }

  static rebuildTable() {
    document.getElementsByTagName('table')[0].remove();
    this.buildTable();
  }

  static doTableElems(idx:number) {    
    var fields: (string | undefined)[] = [];
    var fieldVals: (string | undefined)[] = [];
    $('.selectedItem').remove();
    $('td').on('click', function () {
      $('.dbGrid').append('<div class = "dynContain"><ul class = "selectedItem"></ul></div>');      
      $('.selectedItem').css({'width': '50%', 'display':'grid', 'color':'#ffffff', 'marginTop':'2%'})
      console.log($(this).parent().children().attr('id'))
      $(this).parent().children().each(function() {
        $('.selectedItem').append(`<li class="li_${$(this).attr('class')}">${$(this).attr('class')} :  ${$(this).html()}</li>`);
        fields.push($(this).attr('class'));
        fieldVals.push($(this).html());
      })            
      FormsService.doForm(fields, idx, fieldVals);
      $('table').remove();
      $('.dynContain').css({'position':'absolute', 'top':'40%', 'left':'12%', 'backgroundColor':'grey', 'width':'75%'});
      $('.dynContain .selectedItem').css({'backgroundColor':'#48576F', 'listStyleType':'none'});
      $('.dynContain .selectedItem li').css({'margin':'2% 0 0 20%'})
      //transition: width 0.4s ease-in-out;
    })
  }

  static doForm(fields:(string | undefined)[] = [], idx:number, fieldVals:(string | undefined)[] = []) {
    console.log(`first - ${fields[0]} second - ${fields[1]}`);
    //console.log(`${$('input')}+++++++++++++`);
    $('.dynContain').append(`<form class="dynForm"></form>`);    
    for (let p in fields) {
      $('.dynForm').append(`      
      <input type = "text" id = "${fields[p]}" name = "${fields[p]}" placeholder = "${fields[p]}"></input>
      <br>`)
      //console.log(`${fields[p]} ------`)
    }
    $('.dynForm').append(`<input type = "button" id = "submitbtn" value = "Submit"></input>`).css({'margin':'2%'});
    $('.dynForm').append(`<input type = "button" id = "deletebtn" value = "Delete"></input>`).css({'margin':'2%'});
    $('#submitbtn').on('click', function(){
      var i = 0;
      $('input').each(function() {
        var n = Number(`${$(this).val()?.toString().length}`);
        //if($(this).val()?.toString().length > 0) {
        if(n > 0 && ($(this).attr('id') !== 'submitbtn')) {
          fieldVals[i] = `${$(this).val()?.toString()}`
          console.log(`${fieldVals[i]}`);          
        }
        i += 1;
      })
      let mongo_modify_out = `https://isit422-node-finale-2022.azurewebsites.net/api/findAndModify/${idx}/`;
      for(let i = 0;i < fields.length;i++) {
        mongo_modify_out += `|${fields[i]}:${fieldVals[i]}`;
      }
      console.log(`${mongo_modify_out}`);
      FormsService.findAndModify(mongo_modify_out);
    })
    $('#deletebtn').on('click', function(){
      var i = 0;
      $('input').each(function() {
        var n = Number(`${$(this).val()?.toString().length}`);
        //if($(this).val()?.toString().length > 0) {
        if(n > 0 && ($(this).attr('id') !== 'submitbtn')) {
          fieldVals[i] = `${$(this).val()?.toString()}`
          console.log(`${fieldVals[i]}`);          
        }
        i += 1;
      })
      let mongo_delete_out = `https://isit422-node-finale-2022.azurewebsites.net/api/delete/${idx}/`;
      for(let i = 0;i < fields.length;i++) {
        mongo_delete_out += `|${fields[i]}:${fieldVals[i]}`;
      }
      console.log(`${mongo_delete_out}`);
      FormsService.deleteRecord(mongo_delete_out);
    })
    // (click)=${FormsService.findAndModify('/api/findAndModify')}

    $('.dynForm input').css({'width':'40%','margin':'0 50% 0 4%'});
    $('.li__id, #_id').hide();
  }

  static findAndModify(query_in:string) {
    let mongo_out = query_in;
    var xhr = new XMLHttpRequest;
    xhr.open("POST", mongo_out, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = () => {
      //console.log(`${xhr.readyState} - ${xhr.status}`);
      console.log(`${mongo_out}`);
      if (xhr.readyState == 4 && xhr.status == 200)
        var o = JSON.parse(xhr.responseText);
        console.log(o)
    }
    //xhr.open("GET", mongo_out, true);
    xhr.open("GET", mongo_out, true)
    xhr.send(null);
  }

  static deleteRecord(query_in:string) {
    let mongo_out = query_in;
    var xhr = new XMLHttpRequest;
    xhr.open("POST", mongo_out, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = () => {
      //console.log(`${xhr.readyState} - ${xhr.status}`);
      console.log(`${mongo_out}`);
      if (xhr.readyState == 4 && xhr.status == 200)
        var o = JSON.parse(xhr.responseText);
        console.log(o)
    }
    //xhr.open("GET", mongo_out, true);
    xhr.open("GET", mongo_out, true)
    xhr.send(null);
  }
  constructor() { }
  
}