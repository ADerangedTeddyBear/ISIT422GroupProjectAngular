import { Component, ContentChild, OnInit, TemplateRef } from '@angular/core';
import { StudentPagesComponent } from '../student-pages.component';
import { AccountCheckService } from '../../control-tests/account-check.service';
import { ListDisplayService } from '../../services/list-display.service';
import { Course } from '../../control-tests/mock-course';


@Component({
  selector: 'app-student-landing',
  templateUrl: './student-landing.component.html',
  styleUrls: ['./student-landing.component.css']
})
export class StudentLandingComponent implements OnInit {

  accountCurrent: string = "";
  courses:Course[] = [];

  coursesApiUrl = 'http://localhost:5000/api/courses';

  constructor(
    private accountCheck: AccountCheckService,
    private listDisplayService: ListDisplayService
    ) { }


  ngOnInit(): void {

    // Account testing code
    this.accountCheck.currentAccountType.subscribe(accountCurrent => this.accountCurrent = accountCurrent);
    this.setAccountType();

    // On load call courses API
    this.getCourses();
  }

  getCourses(): void {
    this.listDisplayService.getCourses(this.coursesApiUrl)
    .subscribe(courses => this.courses = courses);
  }

    // Account testing code
  setAccountType(){
    this.accountCheck.updateAccountType("student")
  }

}
