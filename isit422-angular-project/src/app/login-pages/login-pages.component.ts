import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-pages',
  templateUrl: './login-pages.component.html',
  styleUrls: ['./login-pages.component.css']
})
export class LoginPagesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // Apply style changes to <body> while in the student-pages route
  ngAfterViewInit() {
    document.querySelector('body')?.classList.add('login-pages-body');
    document.querySelector('nav')?.classList.add('login-pages-nav');
  }
  ngOnDestroy() {
    document.querySelector('body')?.classList.remove('login-pages-body');
    document.querySelector('nav')?.classList.add('login-pages-nav');
  }

}
