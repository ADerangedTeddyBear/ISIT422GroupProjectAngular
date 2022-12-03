import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
//import { SessionService } from 'src/app/services/session.service';
import { Course } from 'src/app/control-tests/mock-course';
import { Project } from 'src/app/control-tests/mock-project';
import { ProjectList } from 'src/app/control-tests/mock-project-list';
import { AccountCheckService } from '../../control-tests/account-check.service';
import { ListDisplayService } from '../../services/list-display.service';


@Component({
  selector: 'app-teacher-list-view',
  templateUrl: './teacher-list-view.component.html',
  styleUrls: ['./teacher-list-view.component.css']
})
export class TeacherListViewComponent implements OnInit {



  list: {listname: string, listID: string, courseID: string} | undefined;
  teacher = SessionService.GetCurrentUser();
  // teacherAccount: string = "teacher";
  projects:Project[] = [];
  projectListNames: ProjectList[] = []; 
  accountCurrent: string = "";
  currentProjectNameState: string = "";

  //currentProjectListName: string = "";
  //currentProjectListCourseId = 0;

  currentProjectList: ProjectList = {
    id: 0,
    name: "",
    course_id: 0,
    project_ids: []
  };

  projectsApiUrl = 'http://localhost:5000/api/projects';
  projectListsApiUrl = 'http://localhost:5000/api/projectlistsnames';

  constructor(
    private accountCheck: AccountCheckService, 
    private listDisplayService: ListDisplayService,
    private router: Router

    ) { }

    ngAfterViewInit(){

    }
    
    ngOnInit(): void {
      // Account testing code
      this.accountCheck.currentAccountType.subscribe(accountCurrent => this.accountCurrent = accountCurrent);
      this.setAccountType();

      
      //Get projects in array   
      this.currentProjectList = SessionService.GetCurrentProjectList();
      //this.currentProjectListCourseId = this.currentProjectList.course_id;
      this.getProjects();
    
    }

    // Account testing code
    setAccountType(){
      this.accountCheck.updateAccountType("teacher")
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
