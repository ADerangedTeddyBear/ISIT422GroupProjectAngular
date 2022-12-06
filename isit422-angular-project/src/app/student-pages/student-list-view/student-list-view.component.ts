import { Component, OnInit } from '@angular/core';
import { AccountCheckService } from '../../control-tests/account-check.service';
import { SessionService } from '../../services/session.service';

import { ListDisplayService } from '../../services/list-display.service';
import { Course } from '../../control-tests/mock-course';
import { Router } from '@angular/router';
import { Project }from '../../control-tests/mock-project';
import { ProjectList } from '../../control-tests/mock-project-list';


@Component({
  selector: 'app-student-list-view',
  templateUrl: './student-list-view.component.html',
  styleUrls: ['./student-list-view.component.css']
})
export class StudentListViewComponent implements OnInit {

  accountCurrent: string = "";
  projects: Project[] = [];
  projectListNames: ProjectList[] = []; 


  currentProjectListName = "";
  currentProjectListCourseId = 0;

  currentProjectNameState: string = "";

  projectsApiUrl = 'https://isit422-node-finale-2022.azurewebsites.net/api/projects';
  projectListsApiUrl = 'https://isit422-node-finale-2022.azurewebsites.net/api/projectlistsnames';

  currentProjectList: ProjectList = {
    id: 0,
    name: "",
    course_id: 0,
    project_ids: []
  };

  constructor(
    private accountCheck: AccountCheckService,
    private listDisplayService: ListDisplayService,
    private router: Router

    ) { }

   

  ngOnInit(): void {

    // Account testing code
    this.accountCheck.currentAccountType.subscribe(accountCurrent => this.accountCurrent = accountCurrent);
    this.setAccountType();

    //Get projects in array
    //Get projects in array   
    this.currentProjectList = SessionService.GetCurrentProjectList();
    //this.currentProjectListCourseId = this.currentProjectList.course_id;
    this.getProjects();

    //Get project list names array
   //this.getProjectListName();


  }

    // Account testing code
  setAccountType(){
    this.accountCheck.updateAccountType("student")
  }

   // Get projects
   getProjects(): void {
    this.listDisplayService.getProjectName(this.projectsApiUrl)
    .subscribe(projects => this.projects = projects);
  }

  // Get project list names
  getProjectListName(): void {
    this.listDisplayService.getProjectListName(this.projectListsApiUrl)
    .subscribe(projectListNames => this.projectListNames = projectListNames);
  }


}
