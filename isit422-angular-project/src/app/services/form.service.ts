import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from './session.service';
import { NewListPageComponent } from '../teacher-pages/new-list-page/new-list-page.component';
import { DatabaseService } from './database.service'; //'../../src/app/services/database.service';
import $ from 'jquery';
import { async } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private router: Router) {     
    document.addEventListener("readystatechange", (event) => {
    console.log(`document.readyState: ${document.readyState}`)
  }) }

  logFormData(in_formData: {[index: string]: any}) {
    // For each key(string)/value(any) pair in the input object
    for (let key in in_formData) {
      const value = in_formData[key]
      console.log(`${key}: ${value}`);
    }
  }

  //
  // --=|| DATABASE QUERRIES ||=--
  //

  async GetStudentNamesAndIDs() {
    console.log("Get Students")
    return new Promise((resolve) => {
      DatabaseService.getAllStudentUsers().then((value: any) => {
        let valueObj = JSON.parse(value);
        console.log("Students Promise", valueObj);
        let studentArray = [];
        for (let val in valueObj) {
          let temp = {name: valueObj[val].name, id: valueObj[val].id}
          studentArray.push(temp)
        }
        resolve(studentArray);
      });
    })
  }
  async GetCourseNamesAndIDs(in_teacherID: string) {
    return new Promise((resolve) => {
      DatabaseService.coursesByTeacher(in_teacherID).then((value:any) => (resolve(JSON.parse(value))))
      console.log(`SessionService.GetCurrentList: ${SessionService.GetCurrentList()}`)
    });
  }

  
  //ORIGINAL CODE
  async GetProject(in_projectID: string) {
    return new Promise((resolve) => {
      DatabaseService.getProject(in_projectID).then(
        (value:any) => {
          resolve(value);
        })
      SessionService.GetCurrentList();
      //let testData = JSON.stringify({projectName: "Name of project", projectDescription: "Description of project"})
      //resolve(testData);
    });
  }

  
  
  async GetExistingUser(in_username: string, in_password: string) {
    return new Promise((resolve) => {
      let url = DatabaseService.dbLogIn(in_username, in_password);
      DatabaseService.requestLogin('GET', url).then(
        (value:any) => {
          resolve(JSON.parse(value));
        }
      );
    });
  }
  async CreateNewUser(in_name: string, in_username: string, in_password: string, in_user_type: string) {   
    return new Promise((resolve) => {
      DatabaseService.createNewUser(in_name, in_username, in_password, in_user_type).then(
        (value: any) => {
          resolve(value);
        }
      );
    });    
  }
  CreateNewCourse(in_name: string, in_students: string[], in_teacherID: string) {
    DatabaseService.newCourse(in_name, in_students, in_teacherID);
  }
  async CreateNewProjectList(in_name: string, in_course: string) {
    return new Promise((resolve, reject) => {
      DatabaseService.newProjectList(in_name, in_course).then(
        (value: any) => {
          resolve(value);
        }
      );
    });
  }

  //Still in progress - need to implement version with in_projectListID
  CreateNewProject(in_name: string, in_description: string, in_projectListID: string) {    
    console.log(`
    in_name: ${in_name}
    in_description: ${in_description}
    in_projectListID: ${in_projectListID}
  `)
    DatabaseService.newProject(in_name, in_description);
  }
  EditProject(in_name: string, in_description: string, in_id: string) {
    // TODO: Replace with a database call that updates a project record (found with the given id) to have the new input values
    console.log(`
      in_name: ${in_name}
      in_description: ${in_description}
      in_id: ${in_id}
    `)
    DatabaseService.editProject(in_name, in_description, in_id);
  }
  
  //
  // --=|| FORM HANDLERS ||=--
  //
  async HandleLoginForm(in_FormData: {username: string, password: string}, in_FormName: string) {
    console.log(`${in_FormName} - Check the users table for a user that has the following usename and password:`);
    this.logFormData(in_FormData);

    // TODO: Replace with database call to get user data
    
    this.GetExistingUser(in_FormData.username, in_FormData.password).then(
      (exampleUser: any) => {
        // If the user was found
        console.log(exampleUser);
        if (typeof exampleUser != 'undefined' && exampleUser['wasfound']) {
          // Set the new user
          SessionService.SetCurrentUser(exampleUser['name'], exampleUser['id'], exampleUser['user_type']);
          // Navigate to the correct landing page
          if (exampleUser['user_type'] == 'teacher') this.router.navigate(['/teacher-pages/teacher-landing']);
          else if (exampleUser['user_type'] == 'student') this.router.navigate(['/student-pages/student-landing']);
        }
      }
    );
  }

  async HandleCreateAccountForm(in_FormData: {name: string, username: string, password: string, user_type: string}, in_FormName: string) {

    // After adding the new user to the database, set them as the current user and navigate to the correct landing page
    this.CreateNewUser(in_FormData.name, in_FormData.username, in_FormData.password, in_FormData.user_type).then(
      (val: any) => {
        let newUser = JSON.parse(val);
        console.log(newUser["name"], newUser["id"], newUser["user_type"]);

        // Set the new user as the current user
        SessionService.SetCurrentUser(newUser["name"], newUser["id"], newUser["user_type"]);
    
        // Navigate to the correct landing page
        if (newUser.user_type == 'teacher') this.router.navigate(['/teacher-pages/teacher-landing']);
        else if (newUser.user_type == 'student') this.router.navigate(['/student-pages/student-landing']);
      }
    );
  }

  HandleCourseForm(in_FormData: {coursename: string, students: string[]}, in_FormName: string) {
    console.log(`${in_FormName} - Add a new course to the database with the following data:`);
    this.logFormData(in_FormData);

    const currentUser: {name: string, id: string, user_type: string} | undefined = SessionService.GetCurrentUser();
    if (typeof currentUser == 'undefined') {
      console.log("Error: current user is undefined");
      this.router.navigate(['/login-pages/sign-in']);
    }
    else {
      console.log(`Teacher: ${currentUser.id}`);
  
      this.CreateNewCourse(in_FormData.coursename, in_FormData.students, currentUser.id);
      // navigate back to teacher landing after making the new course
      this.router.navigate(['/teacher-pages/teacher-landing']);
    }
  }

  HandleEditProjectForm(in_FormData: {projectname: string, description: string, id: string}, in_FormName: string) {
    console.log(`${in_FormName} - Modify an existing project in the database with the following data:`);
    this.logFormData(in_FormData);

    // Edit the project
    this.EditProject(in_FormData.projectname, in_FormData.description, in_FormData.id);

    // Navigate back to the project list view
    const currentList = SessionService.GetCurrentList();
    if (typeof currentList !== 'undefined') this.router.navigateByUrl('/teacher-pages/teacher-list-view', {state: {listname: currentList.listname, listID: currentList.listID, courseID: currentList.courseID}});
  }

  HandleNewProjectForm(in_FormData: {projectname: string, description: string}, in_FormName: string) {
    console.log(`${in_FormName} - Add a new project to the database with the following data:`);
    this.logFormData(in_FormData);

    // Add a new project to the database
    const currentList = SessionService.GetCurrentList();
    if (typeof currentList !== 'undefined') {
      this.CreateNewProject(in_FormData.projectname, in_FormData.description, currentList.listID)      
      
      // Navigate back to the project list view
      this.router.navigateByUrl('/teacher-pages/teacher-list-view', {state: {listname: currentList.listname, listID: currentList.listID, courseID: currentList.courseID}});
    }
  }

  async HandleNewListForm(in_FormData: {listname: string, course: string}, in_FormName: string) {
    console.log(`${in_FormName} - Add a new list to the database with the following data:`);

    //const newList: {listname: string, listID: string, courseID: string} = this.CreateNewProjectList(in_FormData.listname, in_FormData.course);
    this.CreateNewProjectList(in_FormData.listname, in_FormData.course).then(
      (value: any) => {
        let newList = JSON.parse(value)
        this.router.navigateByUrl('/teacher-pages/teacher-list-view', {state: {listname: newList.listname, listID: newList.listID, courseID: newList.courseID}});
      }
    );


  }

  postData(in_FormData: {[index: string]: any}, in_FormName: string) {
    console.log(in_FormName);
    console.log(in_FormData);
    
    // Don't do anything if the form isn't recognized
    const validFormNames = ["login form", "create account form", "course form", "edit project form", "new project form", "new list form"];
    if (!validFormNames.includes(in_FormName)) {
      console.log("ERROR: Form name not recognized");
      return;
    }

    // Log the form data

    switch (in_FormName) {
      case "login form":
        this.HandleLoginForm(in_FormData as {username: string, password: string}, in_FormName);
        break;
      case "create account form":
        this.HandleCreateAccountForm(in_FormData as {name: string, username: string, password: string, user_type: string}, in_FormName);        
        break;
      case "course form":
        this.HandleCourseForm(in_FormData as {coursename: string, students: string[]}, in_FormName);
        break;
      case "edit project form":
        this.HandleEditProjectForm(in_FormData as {projectname: string, description: string, id: string}, in_FormName);        
        break;
      case "new project form":
        this.HandleNewProjectForm(in_FormData as {projectname: string, description: string}, in_FormName);        
        break;
      case "new list form":
        this.HandleNewListForm(in_FormData as {listname: string, course: string}, in_FormName);
        break;
      default:
        console.log(`ERROR: Form '${in_FormName}' not implemented yet`);
        break;
    }
  }  
}