import { Component, OnInit } from '@angular/core';
import { ListDisplayService } from '../../services/list-display.service';
import { Course } from '../../control-tests/mock-course';




@Component({
  selector: 'app-list-container-f',
  templateUrl: './list-container-f.component.html',
  styleUrls: ['./list-container-f.component.css']
})
export class ListContainerFComponent implements OnInit {
  //modify these variables to use database values
  courseName: string = "Course Name"


  courses:Course[] = [];

  coursesApiUrl = 'http://localhost:5000/api/courses';


  constructor(
    private listDisplayService: ListDisplayService

  ) { }
  
  ngOnInit(): void {
    // On load call courses API
    this.getCourses();
  }

  getCourses(): void {
    this.listDisplayService.getCourses(this.coursesApiUrl)
    .subscribe(courses => this.courses = courses);
  }

}