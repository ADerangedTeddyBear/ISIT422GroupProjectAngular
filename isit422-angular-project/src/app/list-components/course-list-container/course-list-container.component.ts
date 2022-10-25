import { Component, OnInit } from '@angular/core';
import { COURSE } from '../list-component-interfaces/mock-course-list';

@Component({
  selector: 'app-course-list-container',
  templateUrl: './course-list-container.component.html',
  styleUrls: ['./course-list-container.component.css']
})
export class CourseListContainerComponent implements OnInit {

  courses = COURSE;

  constructor() { }

  ngOnInit(): void {
  }

}
