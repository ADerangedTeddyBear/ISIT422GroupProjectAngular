import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from './session.service';
import { NewListPageComponent } from '../teacher-pages/new-list-page/new-list-page.component';

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
    return [{name: "student 1", id: "student-id-1"}, {name: "student 2", id: "student-id-2"}];
  }
  GetCourseNamesAndIDs(in_teacherID: string) {
    // TODO: replace with database call that gets all of the current teacher's courses
    return [{name: "course 1", id: "course-id-1"}, {name: "course 2", id: "course-id-2"}];
  }
  GetProject(in_projectID: string) {
    // TODO: replace with database call to get all of the data for the input project
    return {projectName: "Name of project", projectDescription: "Description of project"};
  }
  GetExistingUser(in_username: string, in_password: string) {
    // TODO: replace with database call that looks for a user in the user table with the input username
    // and passowrd.

    // If the user was not found, set user found to false and all other return values to empty strings
    const userFound = true;
    return {
      wasFound: userFound,
      name: (userFound)? 'Name of Existing User' : '',
      id: (userFound)? 'Unique ID for Existing User' : '',
      user_type: (userFound)? 'teacher' : ''
    }
  }
  CreateNewUser(in_name: string, in_username: string, in_password: string, in_user_type: string) {
    // TODO: Replace with database call that adds a new user to the databse with the input data

    // Return a user data object to set as the current user
    return {
      name: in_name,
      id: 'Unique ID for Created User',
      user_type: in_user_type
    }
  }
  CreateNewCourse(in_name: string, in_students: string[], in_teacherID: string) {
    // TODO: Replace with database call that creates a new course using the input data
  }
  CreateNewProjectList(in_name: string, in_course: string) {
    // TODO: Replace with database call that creates a new list in the database

    // TODO: Return the ID of the newly generated list
    return "ID of new list"
  }
  EditProject(in_name: string, in_description: string, in_id: string) {
    // TODO: Replace with a database call that updates a project record (found with the given id) to have the new input values
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

    const currentUser: {name: string, id: string, user_type: string} = SessionService.GetCurrentUser();
    console.log(`Teacher: ${currentUser.id}`);

    this.CreateNewCourse(in_FormData.coursename, in_FormData.students, currentUser.id);
    // navigate back to teacher landing after making the new course
    this.router.navigate(['/teacher-pages/teacher-landing']);
  }

  HandleEditProjectForm(in_FormData: {projectname: string, description: string, id: string}, in_FormName: string) {
    console.log(`${in_FormName} - Modify an existing project in the database with the following data:`);
    this.logFormData(in_FormData);

    // Edit the project
    this.EditProject(in_FormData.projectname, in_FormData.description, in_FormData.id);

    // Navigate back to the project list view

  }

  HandleNewProjectForm(in_FormData: {[index: string]: any}, in_FormName: string) {
    console.log(`${in_FormName} - Add a new project to the database with the following data:`);
    this.logFormData(in_FormData);

  }

  HandleNewListForm(in_FormData: {listname: string, course: string}, in_FormName: string) {
    console.log(`${in_FormName} - Add a new list to the database with the following data:`);

    const newListID = this.CreateNewProjectList(in_FormData.listname, in_FormData.course);

    this.router.navigateByUrl('/teacher-pages/teacher-list-view', {state: {listID: newListID}});

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
        this.HandleNewProjectForm(in_FormData, in_FormName);
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
