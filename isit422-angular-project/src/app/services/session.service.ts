import { Injectable } from '@angular/core';
import { Project } from '../control-tests/mock-project';
import { ProjectList } from '../control-tests/mock-project-list';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  static GetCurrentUser() {
    let currentUser = sessionStorage.getItem('current user');
    if (currentUser != null) {
      return JSON.parse(currentUser);
    } 
    else {
      return undefined
    }
  }
  static GetCurrentList() {
    let currentUser = sessionStorage.getItem('current list');
    if (currentUser != null) {
      return JSON.parse(currentUser);
    } 
    else {
      return undefined
    }
  }

  static SetCurrentList(in_listname: string, in_listID: string, in_courseID: string) {
    let  currentList = {
      listname: in_listname,
      listID: in_listID,
      courseID: in_courseID
    }
    console.log("current list: ", currentList);
    sessionStorage.setItem('current list', JSON.stringify(currentList));
  }
  static SetCurrentUser(in_name: string, in_id: string, in_user_type: string) {
    // TODO: Replace with code to set the current user in the session data
    let currentUser = {
      name: in_name,
      id: in_id,
      user_type: in_user_type
    };
    sessionStorage.setItem('current user', JSON.stringify(currentUser));
    console.log(currentUser);
  }

  static UnsetCurrentUser() {
    console.log("Unset User");
    sessionStorage.removeItem('current user');
  }
  static UnsetCurrentList() {
    sessionStorage.removeItem('current list');
  }


  //ADDED 12/3/22
  // Set current project
  static SetCurrentProject (
      in_projectId: number, 
      in_projectName: string, 
      in_projectDescription: string, 
      in_projectListId: number,
      in_projectStudenIds:number[]) {
  
      let  currentProject: Project = {
        id: in_projectId,
        name: in_projectName,
        description: in_projectDescription,
        project_list_id: in_projectListId, 
        student_ids: in_projectStudenIds
  
      }
      sessionStorage.setItem('current project', JSON.stringify(currentProject));
  }

  // Get current project
  static GetCurrentProject() {
    let currentProjectView = sessionStorage.getItem('current project');

    if (currentProjectView != null) {

      let assignProject = JSON.parse(currentProjectView);

      let proj: Project = {
        id: Number(assignProject.id),
        name: assignProject.name,
        description: assignProject.description,
        project_list_id: Number(assignProject.project_list_id),
        student_ids: assignProject.student_ids
      };

      return proj;
    } 
    else {
      let proj: Project = {
        id: 0,
        name: "",
        description: "",
        project_list_id: 0,
        student_ids: []
      };
      return proj
    }
  }

  // Set current project list
  static SetCurrentProjectList(
  in_projectListId: number, 
  in_projectListName: string, 
  in_projectListCourseId: number, 
  in_projectListProjectIds: number[]) {

  let currentProjectList = {
    projectListId: in_projectListId,
    projectListName: in_projectListName,
    ProjectListCourseId: in_projectListCourseId,
    projectListProjectIds: in_projectListProjectIds 
  }
  console.log(currentProjectList);
  sessionStorage.setItem('current project list', JSON.stringify(currentProjectList));
  }

  // Get current project list
  static GetCurrentProjectList() {
    let currentProjectList = sessionStorage.getItem('current project list');

    if (currentProjectList != null) {
      var assignProjectList = JSON.parse(currentProjectList);

      let projList: ProjectList = {
        id: Number(assignProjectList.projectListId),
        name: assignProjectList.projectListName,
        course_id: Number(assignProjectList.ProjectListCourseId),
        project_ids: assignProjectList.projectListProjectIds
      };
       return projList;
    } 
    else {
      let projList: ProjectList = {
        id: 0,
        name: "",
        course_id: 0,
        project_ids: []
      };
      return projList
    }
   } 

}
