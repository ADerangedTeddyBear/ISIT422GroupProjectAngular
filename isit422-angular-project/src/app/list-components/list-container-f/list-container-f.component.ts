import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-container-f',
  templateUrl: './list-container-f.component.html',
  styleUrls: ['./list-container-f.component.css']
})
export class ListContainerFComponent implements OnInit {
  //modify these variables to use database values
  projectName: string = "Project 1"

  constructor() { }
  
  ngOnInit(): void {
  }

}