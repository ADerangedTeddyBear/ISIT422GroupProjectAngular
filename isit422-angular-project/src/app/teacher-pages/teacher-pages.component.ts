import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-pages',
  templateUrl: './teacher-pages.component.html',
  styleUrls: ['./teacher-pages.component.css']
})
export class TeacherPagesComponent implements OnInit {

  constructor(private router: Router) { }

  public currentTeacher = SessionService.GetCurrentUser();

  ngOnInit(): void {
    if (typeof this.currentTeacher == 'undefined') {
      this.router.navigate(['/login-pages/sign-in']);
      throw new Error("Invalid state: No user was logged in");
    }
  }

  // Apply style changes to <body> while in the student-pages route
  ngAfterViewInit() {
    document.querySelector('body')?.classList.add('teacher-pages-body');
    document.querySelector('nav')?.classList.add('teacher-pages-nav');
  }
  ngOnDestroy() {
    document.querySelector('body')?.classList.remove('teacher-pages-body');
    document.querySelector('nav')?.classList.add('teacher-pages-nav');
  }

}
