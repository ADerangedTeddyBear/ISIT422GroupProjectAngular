import { Component, OnInit, Input } from '@angular/core';
import { ListDisplayService } from '../../services/list-display.service';
import { Course } from '../../control-tests/mock-course';
import { ProjectList } from '../../control-tests/mock-project-list';





@Component({
  selector: 'app-list-container-f',
  templateUrl: './list-container-f.component.html',
  styleUrls: ['./list-container-f.component.css']
})
export class ListContainerFComponent implements OnInit {
  //modify these variables to use database values
  //courseName: string = "Course Name"

  @Input() course!:Course;
  projectListNames: ProjectList[] = []; 

  projectListsApiUrl = 'https://isit422-node-finale-2022.azurewebsites.net/api/projectlistsnames';


  

  //courses:Course[] = [];

  //coursesApiUrl = 'https://isit422-node-finale-2022.azurewebsites.net/api/courses';


  constructor(
    private listDisplayService: ListDisplayService

  ) { }
  
  ngOnInit(): void {
    // On load call courses API
    //Get Project List Names in array
    //this.getProjectListName();
  }

  // Get project list names
  getProjectListName(): void {
    this.listDisplayService.getProjectListName(this.projectListsApiUrl)
    .subscribe(projectListNames => this.projectListNames = projectListNames);
  }
  

}