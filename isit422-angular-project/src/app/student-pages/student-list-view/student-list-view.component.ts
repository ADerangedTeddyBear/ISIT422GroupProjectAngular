import { Component, OnInit } from '@angular/core';
import { AccountCheckService } from '../../control-tests/account-check.service';
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

  projectsApiUrl = 'http://localhost:5000/api/projects';
  projectListsApiUrl = 'http://localhost:5000/api/projectlistsnames';


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
    this.getProjects();
    this.currentProjectListName = this.listDisplayService.projectListName;
    this.currentProjectListCourseId = this.listDisplayService.projectListId


    //Get project list names array
    this.getProjectListName();

    //console.log(this.currentProjectNameState);
    console.log("Welcome to student view list for " + " " + this.currentProjectListName + " " + this.currentProjectListCourseId);

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
