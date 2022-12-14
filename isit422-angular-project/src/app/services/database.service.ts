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

static async delete(id:number) {
return new Promise(function(resolve, reject) {
  let orig = document.location.href.split('/').length;
  let origin = document.location.href.split('/')[orig - 1]
  console.log(`document.location.href>>>> from DatabaeService>>>>: ${document.location.href}`)
  let url = `https://isit422-node-finale-2022.azurewebsites.net//api/delete`;
  console.log(`${url}`);
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type', 'application/json');
  var d = JSON.stringify({
    id:id,
    origin:origin    
  });
  xhr.onload = () => {
    if(xhr.readyState == 4 && xhr.status == 200) {
      console.log(`xhr.response from deleteProject: ${xhr.response}`);
      resolve(xhr.response);
    } else {
      reject({
        //status:xhr.status,
        //statusText: xhr.statusText
      });
    }
  };
  xhr.onerror = () => {
    reject({
      status:xhr.status,
      statusText:xhr.statusText
    });
  };
  xhr.send(d);
});
};



/******From Form Service -New Project- To Backend *************************************************************************/
static async editProject(in_name: string, in_description: string, in_id: string) {
  return new Promise(function(resolve, reject) {
    console.log(`
      edit project paramaters in database service before xhr:
      in_name: ${in_name}
      in_description: ${in_description}
      in_id: ${in_id}
    `)
    let url = 'https://isit422-node-finale-2022.azurewebsites.net/api/editproject';
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    var d = JSON.stringify({
      id:in_id,
      name:in_name,
      description:in_description,
    });
    console.log(`url from editProject: ${url}`);
    xhr.onload = () => {
      if(xhr.readyState == 4 && xhr.status == 200) {
        console.log(`xhr.response from editProject: ${xhr.response}`);
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
    xhr.send(d);
  });
};
/**************Response From Backend ** Resolved Back to Form Service ***********************************/
/*****************E*N*D********************************************/



/******From Form Service -New Project- To Backend *************************************************************************/
static async getProject(projectId: string) {
  return new Promise(function(resolve, reject) {
    let url = 'https://isit422-node-finale-2022.azurewebsites.net/api/getProject/';
    let id = projectId;
    url += id;
    console.log(url);
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => {
      if(xhr.readyState == 4 && xhr.status == 200) {
        console.log(`xhr.response from getProject: ${xhr.response}`)
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
/**************Response From Backend ** Resolved Back to Form Service ***********************************/
/*****************E*N*D********************************************/

/******From Form Service -New Project- To Backend *************************************************************************/


//Still in progress - need to implement version including the project_list_id param from Form Service

//ADDED 12/5/22 - USED TO FIX PROJECTLIST ID WRITING TO DB
static async newProject(in_name: string, in_description: string, in_projectListID: number) {
  return new Promise(function(resolve, reject) {
    let url = 'https://isit422-node-finale-2022.azurewebsites.net/api/createnewproject';
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    var d = JSON.stringify({
      id:1,
      name:in_name,
      description:in_description,        
      project_list_id:in_projectListID,
      student_ids:0
    });
    console.log(`url from newProject: ${url}`)
    xhr.onload = () => {
      if(xhr.readyState == 4 && xhr.status == 200) {
        console.log(`xhr.response from newProject: ${xhr.response}`);
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
    xhr.send(d);
  });
};


/*ORIGINAL
static async newProject(in_name: string, in_description: string) {
  return new Promise(function(resolve, reject) {
    let url = 'http://localhost:5000/api/createnewproject';
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    var d = JSON.stringify({
      id:1,
      name:in_name,
      description:in_description,        
      project_list_ids:0,
      student_ids:0
    });
    console.log(`url from newProject: ${url}`)
    xhr.onload = () => {
      if(xhr.readyState == 4 && xhr.status == 200) {
        console.log(`xhr.response from newProject: ${xhr.response}`);
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
    xhr.send(d);
  });
};
*/


/**************Response From Backend ** Resolved Back to Form Service ***********************************/
/*****************E*N*D********************************************/

/******From Form Service -New Project List- To Backend**********************************************************************/
static async newProjectList(projectListName:string, courseID:string) {
    return new Promise(function(resolve, reject) {      
      let url = 'https://isit422-node-finale-2022.azurewebsites.net/api/newprojectlist/';
      var xhr = new XMLHttpRequest();
      xhr.open('POST', url);
      xhr.setRequestHeader('Content-Type', 'application/json');
      var d = JSON.stringify({
        id:1,
        name:projectListName,
        course_id:Number(courseID)
      })
      xhr.onload = () => {
        if(xhr.readyState == 4 && xhr.status == 200) {
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
      xhr.send(d);
    });
};
/**************Response From Backend ** Resolved Back to Form Service ***********************************/
/*****************E*N*D********************************************/

/******From Form Service -Courses By Teacher- To Backend ********************************************************************/
static async coursesByTeacher(teacherID:string) {
    return new Promise(function(resolve, reject) {
      let teacherIDAsInt = Number(teacherID);
      let urlString = 'https://isit422-node-finale-2022.azurewebsites.net/api/getCoursesByTeacher/';
      let url = urlString += teacherIDAsInt;
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.onload = () => {
        if(xhr.readyState == 4 && xhr.status == 200) {
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
/**************Response From Backend ** Resolved Back to Form Service ***********************************/
/*****************E*N*D********************************************/

/******From Form Service -New Course- To Backend *****************************************************************************/
static async newCourse(in_name: string, in_students: string[], in_teacherID: string) {
    return new Promise(function(resolve, reject) {
      let url = 'https://isit422-node-finale-2022.azurewebsites.net/api/createnewcourse/';
      console.log(`
      in_name: ${in_name}
      in_students: ${in_students}
      in_teacherID: ${in_teacherID}
      `);
      var xhr = new XMLHttpRequest();
      xhr.open('POST', url);
      xhr.setRequestHeader('Content-Type', 'application/json');
      var d = JSON.stringify({
        id:1,
        name:in_name,
        student_ids: in_students,
        teacher_id:in_teacherID
      });
      xhr.onload = () => {
        if(xhr.readyState == 4 && xhr.status == 200) {
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
      xhr.send(d);
  });
};
/**************Response From Backend ** Resolved Back to Form Service ***********************************/
/*****************E*N*D********************************************/

/******From Form Service -Get All Student Users- To Backend ******************************************************************/
static async getAllStudentUsers() {
    return new Promise(function(resolve, reject) {
      let url = 'https://isit422-node-finale-2022.azurewebsites.net/api/getStudents';
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.onload = () => {
        if(xhr.readyState == 4 && xhr.status == 200) {
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
/**************Response From Backend ** Resolved Back to Form Service ***********************************/
/*****************E*N*D********************************************/

/******From Form Service -Login- To Backend ***********************************************************************************/
static dbLogIn(in_username:string, in_password:string) {
    let query = 'https://isit422-node-finale-2022.azurewebsites.net/api/login/';  
    let varLogin = [`username:${in_username}`, `password:${in_password}`];  
    for(var p in varLogin) {    
      query += `|${varLogin[p]}`;  
    }    
    return query;
};
static async requestLogin(method:string, url:string) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    console.log(`urlfrom requestLogin: ${url}`)
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
    xhr.send();
  });
};
/**************Response From Backend ** Resolved Back to Form Service ***********************************/
/*****************E*N*D********************************************/

/******From Form Service -Create New User- To Backend *************************************************************************/
static async createNewUser(in_name: string, in_username: string, in_password: string, in_user_type:string) {
    let collectionId;
    for(let p in this.collections) {
      if(this.collections[p].name === `${in_user_type}s`) {
        collectionId = this.collections[p].id;
      }
    }    
    let query = `https://isit422-node-finale-2022.azurewebsites.net/api/createnewuser/${collectionId}/`;
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
};
/**************Response From Backend ** Resolved Back to Form Service ***********************************/
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
      let mongo_modify_out = `https://isit422-node-finale-2022.azurewebsites.net/api/findAndModify/${idx}/`;
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
      let mongo_delete_out = `https://isit422-node-finale-2022.azurewebsites.net/api/delete/${idx}/`;
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