import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-pages',
  templateUrl: './student-pages.component.html',
  styleUrls: ['./student-pages.component.css']
})
export class StudentPagesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
