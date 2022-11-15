import { Component, OnInit } from '@angular/core';
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

  // teacherAccount: string = "teacher";
  projects:Project[] = [];
  projectListNames: ProjectList[] = []; 
  accountCurrent: string = "";
  currentProjectNameState: string = "";

  projectsApiUrl = 'http://localhost:5000/api/projects';
  projectListsApiUrl = 'http://localhost:5000/api/projectlistsnames';

  constructor(private accountCheck: AccountCheckService, 
    private listDisplayService: ListDisplayService) { }

    ngAfterViewInit(){

    }
    
  ngOnInit(): void {

    // Account testing code
    this.accountCheck.currentAccountType.subscribe(accountCurrent => this.accountCurrent = accountCurrent);
    this.setAccountType();
    //Get courses in array
    this.getProjects();
    this.currentProjectNameState = history.state.projectName;

    //Get project list names array
    this.getProjectListName();
  }

    // Account testing code
    setAccountType(){
      this.accountCheck.updateAccountType("teacher")
    }
  
     // Get courses
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
