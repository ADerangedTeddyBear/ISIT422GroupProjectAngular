import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-view-f',
  templateUrl: './project-view-f.component.html',
  styleUrls: ['./project-view-f.component.css']
})
export class ProjectViewFComponent implements OnInit {

  projectName: string = "Project 1 Name";
  projectDescription: string = "Project 1 description will be here";



  constructor() { }

  ngOnInit(): void {
  }

}
