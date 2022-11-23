import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
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

  currentProjectListName: string = "";
  currentProjectListCourseId = 0;

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
    this.getProjects();
    this.currentProjectListName = this.listDisplayService.projectListName;
    this.currentProjectListCourseId = this.listDisplayService.projectListId;


    //Get project list names array
    this.getProjectListName();

   
      /*console.log(history.state.listID);
      let s_listname = history.state.listname as string;
      let s_listID = history.state.listID;
      let s_courseID = history.state.courseID;

      this.list = {listname: s_listname, listID: s_listID, courseID: s_courseID};
      SessionService.SetCurrentList(s_listname, s_listID, s_courseID);

      if (typeof this.list == 'undefined') {
        this.router.navigate(['/teacher-pages/teacher-landing']);
        throw new Error("Invalid state: list view loaded without a list ID");
      }

      // Account testing code
      this.accountCheck.currentAccountType.subscribe(accountCurrent => this.accountCurrent = accountCurrent);
      this.setAccountType();
      //Get courses in array
      this.getProjects();
      this.currentProjectNameState = history.state.projectName;

      //Get project list names array
      this.getProjectListName();*/
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
    /*
     // Get courses
     getProjects(): void {
      this.listDisplayService.getProjectName(this.projectsApiUrl)
      .subscribe(projects => this.projects = projects);
    }
  
    // Get project list names
    getProjectListName(): void {
      this.listDisplayService.getProjectListName(this.projectListsApiUrl)
      .subscribe(projectListNames => this.projectListNames = projectListNames);
    }*/
}
