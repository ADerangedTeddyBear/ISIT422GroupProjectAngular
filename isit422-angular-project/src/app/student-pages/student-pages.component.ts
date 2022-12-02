import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-pages',
  templateUrl: './student-pages.component.html',
  styleUrls: ['./student-pages.component.css']
})
export class StudentPagesComponent implements OnInit {

  constructor(private router: Router) { }

  currentStudent = SessionService.GetCurrentUser();

  ngOnInit(): void {
    if (typeof this.currentStudent == 'undefined' || this.currentStudent.user_type != "student") {
      this.router.navigate(['/login-pages/sign-in']);
      throw new Error("Invalid state: No user was logged in");
    }
  }

  // Apply style changes to <body> while in the student-pages route
  ngAfterViewInit() {
    document.querySelector('body')?.classList.add('student-pages-body');
    document.querySelector('nav')?.classList.add('student-pages-nav');
  }
  ngOnDestroy() {
    document.querySelector('body')?.classList.remove('student-pages-body');
    document.querySelector('nav')?.classList.add('student-pages-nav');
  }

}
