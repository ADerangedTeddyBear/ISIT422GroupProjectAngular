import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/control-tests/mock-course';
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
  courses:Course[] = [];
  projectListNames: ProjectList[] = []; 
  accountCurrent: string = "";

  projectListsApiUrl = 'http://localhost:5000/api/projectlistsnames';
  coursesApiUrl = 'http://localhost:5000/api/courses';

  constructor(private accountCheck: AccountCheckService, 
    private listDisplayService: ListDisplayService) { }

    ngAfterViewInit(){

    }
    
  ngOnInit(): void {

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
    this.accountCheck.updateAccountType("teacher")
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
