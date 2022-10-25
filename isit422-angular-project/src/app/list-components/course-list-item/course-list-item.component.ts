import { Component, OnInit } from '@angular/core';
import { COURSELISTITEM } from '../list-component-interfaces/mock-course-list-item';

@Component({
  selector: 'app-course-list-item',
  templateUrl: './course-list-item.component.html',
  styleUrls: ['./course-list-item.component.css']
})
export class CourseListItemComponent implements OnInit {

  courseListItem = COURSELISTITEM;

  constructor() { }

  ngOnInit(): void {
  }

}
