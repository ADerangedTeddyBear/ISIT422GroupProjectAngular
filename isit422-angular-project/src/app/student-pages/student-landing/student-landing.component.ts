import { Component, ContentChild, OnInit, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { StudentPagesComponent } from '../student-pages.component';
import { AccountCheckService } from '../../control-tests/account-check.service';
import { ListDisplayService } from '../../services/list-display.service';
import { Course } from '../../control-tests/mock-course';
import { ProjectList } from '../../control-tests/mock-project-list';
import { SessionService } from '../../services/session.service';


@Component({
  selector: 'app-student-landing',
  templateUrl: './student-landing.component.html',
  styleUrls: ['./student-landing.component.css']
})
export class StudentLandingComponent implements OnInit {

  studentAccount: string = "student";
  courses:Course[] = [];
  projectListNames: ProjectList[] = []; 


  accountCurrent: string = "";
  currentStudent = SessionService.GetCurrentUser();

  projectListsApiUrl = 'http://localhost:5000/api/projectlistsnames';
  coursesApiUrl = 'http://localhost:5000/api/courses';


  constructor(
    private accountCheck: AccountCheckService,
    private listDisplayService: ListDisplayService

    ) { }

 

  ngOnInit(): void {   

     // Account testing code
     this.accountCheck.currentAccountType.subscribe(accountCurrent => this.accountCurrent = accountCurrent);
     this.setAccountType();

     //Get courses in array
     this.getCourses();


     //Get project list names array
     this.getProjectListName();

     console.log("THE CURRENT STUDENT IS : " + this.currentStudent.id);


  }


    // Account testing code
  setAccountType(){
    this.accountCheck.updateAccountType(this.studentAccount)
  }

  // Get courses
  getCourses(): void {
    this.listDisplayService.getCourses(this.coursesApiUrl)
    .subscribe(courses => this.courses = courses);
    //return this.courses;
  }

  // Get project list names
  getProjectListName(): void {
    this.listDisplayService.getProjectListName(this.projectListsApiUrl)
    .subscribe(projectListNames => this.projectListNames = projectListNames);
  }

  
}
