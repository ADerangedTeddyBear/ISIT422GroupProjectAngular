import { Inject, Injectable, resolveForwardRef } from '@angular/core';
import { __values } from 'tslib';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {
  constructor() {}

  static collections = [
    { id: 0, name: 'courses' },
    { id: 1, name: 'students' },
    { id: 2, name: 'teachers' },
    { id: 3, name: 'projects' },
    { id: 4, name: 'project_lists' }
];

/************************************ These are to test execution points *************************************************/
  static async newProjectList(projectListName:string, courseID:string) {
    return new Promise(function(resolve, reject) {      
      let url = 'http://localhost:5000/api/newprojectlist/';
      var xhr = new XMLHttpRequest();
      xhr.open('POST', url);
      xhr.setRequestHeader('Content-Type', 'application/json');
      var d = JSON.stringify({
        id:1,
        name:projectListName,
        courseid:Number(courseID)
      })
      xhr.onload = () => {
        if(xhr.readyState == 4 && xhr.status == 200) {
          console.log(`xhr.response: ${xhr.response}`);
          resolve(xhr.response);
        } else {
          console.log("reject");
          reject({
            status:xhr.status,
            statusText: xhr.statusText
          });
        }
      };
      xhr.onerror = () => {
        console.log("error");
        reject({
          status:xhr.status,
          statusText:xhr.statusText
        });
      };
      xhr.send(d);
    });
  }

  static coursesByTeacher(teacherID:string) {
    return new Promise(function(resolve, reject) {
      let teacherIDAsInt = Number(teacherID);
      let urlString = 'http://localhost:5000/api/getCoursesByTeacher/';
      let url = urlString += teacherIDAsInt;
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.onload = () => {
        if(xhr.readyState == 4 && xhr.status == 200) {
          console.log(`xhr.response: ${xhr.response}`);
          resolve(xhr.response);
        } else {
          reject({
            status:xhr.status,
            statusText: xhr.statusText
          });
        }
      };
      xhr.onerror = () => {
        reject({
          status:xhr.status,
          statusText:xhr.statusText
        });
      };
      xhr.send();
    });
  }
  static three() {
    console.log("three+_+_+_+")
  }
  static six() {
    console.log("six+_+_+_")
  }
  static seven() {
    console.log("seven+_+_+_+")
  }
  static eight() {
    console.log("eight+_+_+")
  }
  /*****************E*N*D********************************************/

  static getAllStudentUsers() {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'http://localhost:5000/api/getStudents');
      xhr.onload = () => {
        if(xhr.readyState == 4 && xhr.status == 200) {
          console.log(Response);
          resolve(xhr.response);
        } else {
          reject({
            status:xhr.status,
            statusText: xhr.statusText
          });
        }
      };
      xhr.onerror = () => {
        reject({
          status:xhr.status,
          statusText:xhr.statusText
        });
      };
      xhr.send();
    });
  };

/****** Form Service Login ********************************************************************************/
  static dbLogIn(in_username:string, in_password:string) {
    let loginArr: any[] = [];
    let query = 'http://localhost:5000/api/login/';  
    let varLogin = [`username:${in_username}`, `password:${in_password}`];  
    for(var p in varLogin) {    
      query += `|${varLogin[p]}`;  
    }
    console.log(`execution point: databaseService -> dbLogin: query: ${query}`);
    return query;
}

  
static async requestLogin(method:string, url:string) {
  return new Promise(function(resolve, reject) {
    console.log(`execution point: databaseService -> requestLogin: query/url: ${url}`);
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = () => {
      if(xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
      } else { 
        reject({
          status:xhr.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = () => {      
      reject({
        status:xhr.status,
        statusText:xhr.statusText
      });
    };
    console.log(`execution point: databaseService -> requestLogin: just before xhr.send(): method: ${method}`);
    xhr.send();
  });
};
/*****************E*N*D********************************************/
/****** Form Service Create User ********************************************************************************/
  static async createNewUser(in_name: string, in_username: string, in_password: string, in_user_type:string) {    
    let collectionId;
    for(let p in this.collections) {
      if(this.collections[p].name === `${in_user_type}s`) {
        collectionId = this.collections[p].id;
      }
    }    
    let query = `http://localhost:5000/api/createnewuser/${collectionId}/`;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", query, true);
    xhr.setRequestHeader('Content-Type', 'application/json');    
    //id value must be set to any number. It will get changed but needs an initial value
    var d = JSON.stringify({
      id:1,
      name:in_name,
      username:in_username,
      password:in_password,
      user_type:in_user_type
    })
    xhr.send(d);    
    return d;
  }
/*****************E*N*D********************************************/
/****** Form Service New Project ********************************************************************************/
  static newProject(in_name: string, in_description: string, in_projectListID: string) {
    let query = `http://localhost:5000/api/createnewproject/3`
        var xhr = new XMLHttpRequest();
        xhr.open("POST", query, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        //id value here is inconsequential, but it must exist as some number
        var d = JSON.stringify({
          id:12,
          name:in_name,
          description:in_description,
          projectListID:in_projectListID          
        })
        xhr.send(d);    
        return d;
  }
/*****************E*N*D********************************************/



/***********************************************************************************************************/
/******** The code below is used from database component  and  uses jQuery**********************************/
/***********************************************************************************************************/
  
  static adminDisplayData(query_in:string, idx:number) {
    let mongo_out = `${query_in}/${idx}`;        
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
                this.addData((responseArr[p2][d]),n, d, row);
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
    xhr.send(null);
  }
  
  static addData(d:any,n:number, dtag:any, rowElem:HTMLElement) {
    var data = document.createElement('td');
    rowElem.appendChild(data);    
    var textNode = document.createTextNode(d);
    //only add data element text for strings and numbers - objects hide
    typeof d !== 'object' ? data.appendChild(textNode) : console.log();
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
    $('.displayTbl').prepend('<input type = "button" class = "x" value = "X"></input>').on('click', () => {
      $('.displayTbl').remove();
    });
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
      DatabaseService.doForm(fields, idx, fieldVals);
      $('table').remove();
      $('.dynContain').css({'position':'absolute', 'top':'40%', 'left':'12%', 'backgroundColor':'grey', 'width':'75%'});
      $('.dynContain .selectedItem').css({'backgroundColor':'#48576F', 'listStyleType':'none'});
      $('.dynContain .selectedItem li').css({'margin':'2% 0 0 20%'})
      //transition: width 0.4s ease-in-out;
    })
  }
  
  static doForm(fields:(string | undefined)[] = [], idx:number, fieldVals:(string | undefined)[] = []) {
    console.log(`first - ${fields[0]} second - ${fields[1]}`);    
    $('.dynContain').append(`<form class="dynForm"></form>`);    
    for (let p in fields) {
      $('.dynForm').append(`      
      <input type = "text" id = "${fields[p]}" name = "${fields[p]}" placeholder = "${fields[p]}"></input>
      <br>`)
    }

    $('.dynForm').append(`<input type = "button" id = "submitbtn" value = "Submit"></input>`).css({'margin':'2%'});
    $('.dynForm').append(`<input type = "button" id = "deletebtn" value = "Delete"></input>`).css({'margin':'2%'});
    $('.dynContain').prepend(`<input type = "button" class = "x" value = "X"></input>`)
    $('#submitbtn').on('click', () => {
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
    $('#deletebtn').on('click', () => {
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
    });
    $('.x').on('click', () => {
      $('.dynContain').remove();
    })
    $('.dynForm input').css({'width':'40%','margin':'0 50% 0 4%'});
    $('.li__id, #_id').hide();
  }
  
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