import { Component, ContentChild, OnInit, TemplateRef } from '@angular/core';
import { StudentPagesComponent } from '../student-pages.component';

@Component({
  selector: 'app-student-landing',
  templateUrl: './student-landing.component.html',
  styleUrls: ['./student-landing.component.css']
})
export class StudentLandingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
