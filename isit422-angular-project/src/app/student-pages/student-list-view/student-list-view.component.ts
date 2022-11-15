import { Component, OnInit } from '@angular/core';
import { AccountCheckService } from '../../control-tests/account-check.service';
import { ListDisplayService } from '../../services/list-display.service';
import { Course } from '../../control-tests/mock-course';
import { Router } from '@angular/router';
import { Project }from '../../control-tests/mock-project';

@Component({
  selector: 'app-student-list-view',
  templateUrl: './student-list-view.component.html',
  styleUrls: ['./student-list-view.component.css']
})
export class StudentListViewComponent implements OnInit {

  accountCurrent: string = "";
  projects:Project[] = [];

  currentProjecNameState: string = "";

  projectsApiUrl = 'http://localhost:5000/api/projects';


  constructor(
    private accountCheck: AccountCheckService,
    private listDisplayService: ListDisplayService,
    private router: Router
    ) { }

   

  ngOnInit(): void {

    // Account testing code
    this.accountCheck.currentAccountType.subscribe(accountCurrent => this.accountCurrent = accountCurrent);
    this.setAccountType();

    //Get courses in array
    this.getProjects();

    this.currentProjecNameState = history.state.projectName;
    console.log(this.currentProjecNameState);

  }

    // Account testing code
  setAccountType(){
    this.accountCheck.updateAccountType("student")
  }

   // Get courses
   getProjects(): void {
    this.listDisplayService.getProjectName(this.projectsApiUrl)
    .subscribe(projects => this.projects = projects);
  }

}
