import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from './session.service';
import { NewListPageComponent } from '../teacher-pages/new-list-page/new-list-page.component';
import { DatabaseService } from 'src/app/services/database.service';
import $ from 'jquery';
import { async } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private router: Router) { }

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

  GetStudentNamesAndIDs() {
    // TODO: replace with database call that gets the names and IDs of all users with the "student" user type
    DatabaseService.one();
    return [{name: "student 1", id: "student-id-1"}, {name: "student 2", id: "student-id-2"}];
  }
  GetCourseNamesAndIDs(in_teacherID: string) {
    // TODO: replace with database call that gets all of the current teacher's courses
    DatabaseService.two()
    DatabaseService.createNewProjectList(Number(in_teacherID));
    return [{name: "course 1", id: "course-id-1"}, {name: "course 2", id: "course-id-2"}];
  }
  GetProject(in_projectID: string) {
    DatabaseService.three();
    // TODO: replace with database call to get all of the data for the input project
    return {projectName: "Name of project", projectDescription: "Description of project"};
  }
  
  GetExistingUser(in_username: string, in_password: string) {
    // TODO: replace with database call that looks for a user in the user table with the input username
    // and passowrd.
    // If the user was not found, set user found to false and all other return values to empty strings
    
    
    /***************START ERICS MODIFICATIONS*************************/
    //call to establish the url to use as parameter in the request login promise see database service line 66
    let url = DatabaseService.dbLogIn(in_username, in_password);
    
    //Promise api call see database service line 78
    let user = DatabaseService.requestLogin('GET', url)
    .then(function(d:any) {      
      let found = false;
      let usertype;
      //The returned values being turned into an array -> array values are the user's real name, username, id, and user type as a number
      let dArr:any = d.split('|');
      //if the array length is greater than 0 then the api call successfully returned data and therefore the user does exist and was found in the database
      if (dArr.length > 0) {
        //if so set found to true
        found = true;
      }
      //if the usertype value is a 1 then the user that was found in the database was a student
      if(dArr[2] === '1') {
        usertype = 'student';
      } else {
        //otherwise the user that was found would be a teacher
        usertype = 'teacher';
      }
      //user object signature to match the object signature in the "To Do" and what the predefined needed data is 
      let user = {wasfound:found, realname:dArr[0], username:dArr[1], userid:dArr[3], user_type:usertype };
      
      //verify the values
      console.log(`
        user.wasFound: ${user.wasfound} 
        user.realname: ${user.realname} 
        user.username:$${user.username} 
        user.id: ${user.userid} 
        user.user_type: ${user.user_type}
      `);
      //Testing purposes - I can get this to work by directly calling this from here
      /*SessionService.SetCurrentUser(user.username, user.userid, user.user_type);*/
      //not working Please correct   
      return user;
      })
      //error handling 
    .catch(function(err:any) {
      console.log('error', err.statusText);
    });
    //returns ZoneAwarePromise {__zone_symbol__state: null, __zone_symbol__value: Array(0)} which does have the values in the prototype
    console.log(user);


    //const user:{wasfound:boolean, realname:string, username:string, userid:string, user_type:string} = DatabaseService.requestLogin(method, url)
    
    /***************END ERICS MODIFICATIONS*************************/
    const userFound = true;
    //const userFound = user.found;    
    return {
      wasFound: userFound,
      name: (userFound)? in_username : '',
      id: (userFound)? 'Unique ID for Existing User' : '',
      user_type: (userFound)? 'teacher' : ''
    }
  }
  CreateNewUser(in_name: string, in_username: string, in_password: string, in_user_type: string) {        
    DatabaseService.createNewUser(in_name, in_username, in_password, in_user_type);
    
    // Return a user data object to set as the current user
    return {
      name: in_name,
      id: 'Unique ID for Created User',
      user_type: in_user_type
    }
  }
  CreateNewCourse(in_name: string, in_students: string[], in_teacherID: string) {
    // TODO: Replace with database call that creates a new course using the input data
    DatabaseService.six();
  }
  CreateNewProjectList(in_name: string, in_course: string) {
    // TODO: Replace with database call that creates a new list in the database
    DatabaseService.one();
    // TODO: Return the ID of the newly generated list
    return {listname: 'New List', listID: 'New List ID', courseID: 'Existing Course ID'}
  }
  CreateNewProject(in_name: string, in_description: string, in_projectListID: string) {
    // TODO: Replace with a database call that creates a new project in the database\
    DatabaseService.newProject(in_name, in_description, in_projectListID);
  }
  EditProject(in_name: string, in_description: string, in_id: string) {
    // TODO: Replace with a database call that updates a project record (found with the given id) to have the new input values
    DatabaseService.eight();
  }


  //
  // --=|| FORM HANDLERS ||=--
  //
  HandleLoginForm(in_FormData: {username: string, password: string}, in_FormName: string) {
    console.log(`${in_FormName} - Check the users table for a user that has the following usename and password:`);
    this.logFormData(in_FormData);

    // TODO: Replace with database call to get user data
    
    const exampleUser: {wasFound: boolean, name: string, id: string, user_type: string} = this.GetExistingUser(in_FormData.username, in_FormData.password);
    // If the user was found
    const userFound = true;
    if (userFound) {
      // Set the new user
      SessionService.SetCurrentUser(exampleUser.name, exampleUser.id, exampleUser.user_type);
      // Navigate to the correct landing page
      if (exampleUser.user_type == 'teacher') this.router.navigate(['/teacher-pages/teacher-landing']);
      else if (exampleUser.user_type == 'student') this.router.navigate(['/student-pages/student-landing']);
    }
  }

  HandleCreateAccountForm(in_FormData: {name: string, username: string, password: string, user_type: string}, in_FormName: string) {
    console.log(`${in_FormName} - Add a new user to the database with the following credentials:`);
    this.logFormData(in_FormData);

    // After adding the new user to the database, set them as the current user and navigate to the correct landing page
    const newUser = this.CreateNewUser(in_FormData.name, in_FormData.username, in_FormData.password, in_FormData.user_type);

    // Set the new user as the current user
    SessionService.SetCurrentUser(newUser.name, newUser.id, newUser.user_type);

    // Navigate to the correct landing page
    if (newUser.user_type == 'teacher') this.router.navigate(['/teacher-pages/teacher-landing']);
    else if (newUser.user_type == 'student') this.router.navigate(['/student-pages/student-landing']);
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

  HandleNewListForm(in_FormData: {listname: string, course: string}, in_FormName: string) {
    console.log(`${in_FormName} - Add a new list to the database with the following data:`);

    const newList: {listname: string, listID: string, courseID: string} = this.CreateNewProjectList(in_FormData.listname, in_FormData.course);

    this.router.navigateByUrl('/teacher-pages/teacher-list-view', {state: {listname: newList.listname, listID: newList.listID, courseID: newList.courseID}});

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