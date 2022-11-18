import { Inject, Injectable } from '@angular/core';
import { __values } from 'tslib';
import * as $ from 'jquery';
import { findIndex } from 'rxjs';
import { STRING_TYPE } from '@angular/compiler';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})


export class DatabaseService {
  constructor() {}

  public static currentID:number;

  static collections = [
    { id: 0, name: 'courses' },
    { id: 1, name: 'students' },
    { id: 2, name: 'teachers' },
    { id: 3, name: 'projects' },
    { id: 4, name: 'project_lists' }
];




  static one() {
    console.log("one+_+_+_")
  }
  static createNewProjectList(in_teacherID:number) {
    let query = 'http://localhost:5000/api/createnewprojectlist/';
    var xhr = new XMLHttpRequest();
    xhr.open("POST", query, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    /*var d = JSON.stringify({
      id:113,
      name:in_name,
      username:in_username,
      password:in_password,
      user_type:in_user_type
    })*/
    //xhr.send(d);
    //return d;    
  }
  static three() {
    console.log("three+_+_+_+")
  }
  static dbLogIn(in_username:string, in_password:string) {
    let loginObj = {logname:String, username:String, status:Number, id:Number };
    let usertype = '';
    let wasFound = true;
    let loginArr: any[] = [];
    let query = 'http://localhost:5000/api/login/';
    let varLogin = [`username:${in_username}`, `password:${in_password}`];
    for(var p in varLogin) {
      query += `|${varLogin[p]}`;
    }        
    var xhr = new XMLHttpRequest();
    console.log(`xhr.readyState: ${xhr.readyState} | xhr.status: ${xhr.status}`);
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
      let loginResponse = xhr.response.split('|');
      for(let i = 0;i<4;i++) {
        loginArr.push(loginResponse[i]);
      }
      loginObj.logname = loginResponse[0];
      loginObj.username = loginResponse[1];
      loginObj.status = loginResponse[2];
      loginObj.id = loginResponse[3];

      if(Number(loginObj.status) % 2 === 0) {
        usertype = 'teacher';
        wasFound = false;
        //SessionService.SetCurrentUser(String(loginObj.logname), String(loginObj.id), usertype);
        console.log(`${loginObj.logname} with username ${loginObj.username} has been signed in as a teacher successfully`);
      } else if (Number(loginObj.status) % 2 === 1) {
        usertype = 'student';
        wasFound = false;
        //SessionService.SetCurrentUser(String(loginObj.logname), String(loginObj.id), usertype);
        console.log(`${loginObj.logname} with username ${loginObj.username} has been signed in as a student successfully`);
      }
      //SessionService.GetCurrentUser();
      const loginUser = {found:wasFound, currentUserName:loginObj.logname, un:loginObj.username, typeUser:usertype };      
      console.log(`found: ${loginUser.found} currentUserName: ${loginUser.currentUserName} un: ${loginUser.un} typeUser: ${loginUser.typeUser}`)      
    }
  };
  xhr.open("GET", query, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send();
  console.log(`${String(loginObj.username)} ++++++`)
  const loginUser = {found:wasFound, currentUserName:String(loginObj.username), id:String(loginObj.id), typeUser:usertype };
  return loginUser;
}



static getCollectionId(collection:string) {
  let collectionId;
  for(let p in this.collections) {
    if(this.collections[p].name === collection) {
      collectionId = this.collections[p].id;
    }
  }
  let query = `http://localhost:5000/api/getid/${collectionId}/`;
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      console.log(`xhr.response: ${xhr.response}`);
      console.log(`xhr.response.split(',')[1].split(':')[1]: ${xhr.response.split(',')[1].split(':')[1]}`);
      var idVal = xhr.response.split(',')[1].split(':')[1];
      idVal = idVal++;
      this.currentID = Number(idVal);
      console.log(`idVal: ${this.currentID}`)
    }    
  }  
  xhr.open("GET", query, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send();
  console.log(this.currentID);
  return Number(this.currentID);
}





  static createNewUser(in_name: string, in_username: string, in_password: string, in_user_type:string) {
    //this.getCollectionId(`${in_user_type}s`);
    let collectionId;
    for(let p in this.collections) {
      if(this.collections[p].name === `${in_user_type}s`) {
        collectionId = this.collections[p].id;
      }
    }
    console.log(`${collectionId}>>>>`)
    let query = `http://localhost:5000/api/createnewuser/${collectionId}/`;
    var xhr = new XMLHttpRequest();

    //this works for POSTs, not GETs
    //console.log(this.getCollectionId(`${in_user_type}s`))
    var d = JSON.stringify({
      id:12/*this.currentID++*//*211*//*this.getCollectionId(`${in_user_type}s`)*/,
      name:in_name,
      username:in_username,
      password:in_password,
      user_type:in_user_type
    })
    xhr.open("POST", query, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(d);    
    return d;    
  }
  static six() {
    console.log("six+_+_+_")
  }
  static seven() {
    console.log("seven+_+_+")
  }
  static eight() {
    console.log("eight+_+_+")
  }
  static updateMany(query_in:string) {
    let mongo_out = query_in;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", mongo_out, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
  }
  //Not reliant on jQuery ********
  static postData(query_in:string) {   
    console.log(query_in); 
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
  //Not reliant on jQuery ********
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
  //Not reliant on jQuery ********
  static addData(d:any,n:number, dtag:any, rowElem:HTMLElement) {
    var data = document.createElement('td');
    rowElem.appendChild(data);    
    var textNode = document.createTextNode(d);
    //console.log(`d from addData is -> ${d}`)
    //only add data element text for strings and numbers - objects hide
    typeof d !== 'object' ? data.appendChild(textNode) : console.log();
    //data.appendChild(textNode);
    data.setAttribute('class', dtag );
    document.getElementsByClassName('_id')[n].setAttribute('hidden', 'true')
  }
  //Not reliant on jQuery - can change styling by commenting out 6th line down and uncommenting rest ********
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
  //Not reliant on jQuery ********
  static rebuildTable() {
    document.getElementsByTagName('table')[0].remove();
    this.buildTable();
  }
  //This function is highly reliant on jQuery*******
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
      DatabaseService.doForm(fields, idx, fieldVals);
      $('table').remove();
      $('.dynContain').css({'position':'absolute', 'top':'40%', 'left':'12%', 'backgroundColor':'grey', 'width':'75%'});
      $('.dynContain .selectedItem').css({'backgroundColor':'#48576F', 'listStyleType':'none'});
      $('.dynContain .selectedItem li').css({'margin':'2% 0 0 20%'})
      //transition: width 0.4s ease-in-out;
    })
  }
  //This function is highly reliant on jQuery*******
  static doForm(fields:(string | undefined)[] = [], idx:number, fieldVals:(string | undefined)[] = []) {
    console.log(`first - ${fields[0]} second - ${fields[1]}`);    
    $('.dynContain').append(`<form class="dynForm"></form>`);    
    for (let p in fields) {
      $('.dynForm').append(`      
      <input type = "text" id = "${fields[p]}" name = "${fields[p]}" placeholder = "${fields[p]}"></input>
      <br>`)
    }
    let btns = ['Submit_btn, Delete_btn'];
    for (let i in btns) {
      $('.dynForm').append(`<input type = "button" id = "submitbtn" value = ${btns[i]}></input>`).css({'margin':'2%'});  
    }
    $('.dynForm').append(`<input type = "button" id = "submitbtn" value = "Submit"></input>`).css({'margin':'2%'});
    $('.dynForm').append(`<input type = "button" id = "deletebtn" value = "Delete"></input>`).css({'margin':'2%'});
    $('#submitbtn').on('click', function(){
      var i = 0;
      $('input').each(function() {
        var n = Number(`${$(this).val()?.toString().length}`);        
        if(n > 0 && ($(this).attr('id') !== 'submitbtn')) {
          fieldVals[i] = `${$(this).val()?.toString()}`
          console.log(`${fieldVals[i]}`);          
        }
        i += 1;
      })
      let mongo_modify_out = `http://localhost:5000/api/findAndModify/${idx}/`;
      for(let i = 0;i < fields.length;i++) {
        mongo_modify_out += `|${fields[i]}:${fieldVals[i]}`;
      }
      console.log(`${mongo_modify_out}`);
      DatabaseService.findAndModify(mongo_modify_out);
    })
    $('#deletebtn').on('click', function(){
      var i = 0;
      $('input').each(function() {
        var n = Number(`${$(this).val()?.toString().length}`);        
        if(n > 0 && ($(this).attr('id') !== 'submitbtn')) {
          fieldVals[i] = `${$(this).val()?.toString()}`
          console.log(`${fieldVals[i]}`);          
        }
        i += 1;
      })
      let mongo_delete_out = `http://localhost:5000/api/delete/${idx}/`;
      for(let i = 0;i < fields.length;i++) {
        mongo_delete_out += `|${fields[i]}:${fieldVals[i]}`;
      }
      console.log(`${mongo_delete_out}`);
      DatabaseService.deleteRecord(mongo_delete_out);
    })
    $('.dynForm input').css({'width':'40%','margin':'0 50% 0 4%'});
    $('.li__id, #_id').hide();
  }
  //Not reliant on jQuery ********
  static findAndModify(query_in:string) {
    let mongo_out = query_in;
    var xhr = new XMLHttpRequest;
    xhr.open("POST", mongo_out, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = () => {      
      console.log(`${mongo_out}`);
      if (xhr.readyState == 4 && xhr.status == 200)
        var o = JSON.parse(xhr.responseText);
        console.log(o)
    }    
    xhr.open("GET", mongo_out, true)
    xhr.send(null);
  }
  static deleteRecord(query_in:string) {
    let mongo_out = query_in;
    var xhr = new XMLHttpRequest;
    xhr.open("POST", mongo_out, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = () => {      
      console.log(`${mongo_out}`);
      if (xhr.readyState == 4 && xhr.status == 200)
        var o = JSON.parse(xhr.responseText);
        console.log(o)
    }    
    xhr.open("GET", mongo_out, true)
    xhr.send(null);
  }
  
}