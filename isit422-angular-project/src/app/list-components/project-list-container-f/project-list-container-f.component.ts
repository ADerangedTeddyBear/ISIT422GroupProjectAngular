import { Component, OnInit } from '@angular/core';
import { ListDisplayService } from '../../services/list-display.service';
import { ProjectList } from '../../control-tests/mock-project-list';



@Component({
  selector: 'app-project-list-container-f',
  templateUrl: './project-list-container-f.component.html',
  styleUrls: ['./project-list-container-f.component.css']
})
export class ProjectListContainerFComponent implements OnInit {
  //projectListName: string = "Project List Name"
  
  projectListName: string = "Project List Name"


  projectListNames:ProjectList[] = [];

  projectListsApiUrl = 'http://localhost:5000/api/projectlistsnames';

  constructor(
    private listDisplayService: ListDisplayService

  ) { }

  ngOnInit(): void {
     // On load call courses API
     this.getProjectListName();
  }

  getProjectListName(): void {
    this.listDisplayService.getProjectListName(this.projectListsApiUrl)
    .subscribe(projectListNames => this.projectListNames = projectListNames);
  }

}
