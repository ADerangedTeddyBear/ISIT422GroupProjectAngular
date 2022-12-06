import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { AccountCheckService } from '../../control-tests/account-check.service';
import { ListDisplayService } from '../../services/list-display.service';
import { Course } from '../../control-tests/mock-course';
import { ProjectList } from '../../control-tests/mock-project-list';

@Component({
  selector: 'app-teacher-landing',
  templateUrl: './teacher-landing.component.html',
  styleUrls: ['./teacher-landing.component.css']
})
export class TeacherLandingComponent implements OnInit {

  teacherAccount: string = "teacher";
  courses:Course[] = [];
  projectListNames: ProjectList[] = []; 

  accountCurrent: string = "";
  currentTeacher = SessionService.GetCurrentUser();

  projectListsApiUrl = 'https://isit422-node-finale-2022.azurewebsites.net/api/projectlistsnames';
  coursesApiUrl = 'https://isit422-node-finale-2022.azurewebsites.net/api/courses';
  constructor(
    private accountCheck: AccountCheckService,
    private listDisplayService: ListDisplayService
  ) { }

  ngOnInit(): void {
        SessionService.UnsetCurrentList();
         // Account testing code
         this.accountCheck.currentAccountType.subscribe(accountCurrent => this.accountCurrent = accountCurrent);
         this.setAccountType();
    
         //Get courses in array
         this.getCourses();
    
         //Get project list names array
         this.getProjectListName();

  }
    // Account testing code
    setAccountType(){
      this.accountCheck.updateAccountType(this.teacherAccount)
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
