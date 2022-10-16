import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher-pages',
  templateUrl: './teacher-pages.component.html',
  styleUrls: ['./teacher-pages.component.css']
})
export class TeacherPagesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
