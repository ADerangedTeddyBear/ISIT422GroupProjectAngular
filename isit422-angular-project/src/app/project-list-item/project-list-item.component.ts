import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-list-item',
  templateUrl: './project-list-item.component.html',
  styleUrls: ['./project-list-item.component.css']
})
export class ProjectListItemComponent implements OnInit {
  //modify these variables to use database values
  projectName: string = "Project 1"
  projectDescription: string = "this is a random description"
  studentsAssigned: string = "[Students assigned go here]"

  constructor() { }
  
  ngOnInit(): void {
  }

}
