import { Component, OnInit, Input } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { ListDisplayService } from '../../services/list-display.service';
import { AccountCheckService } from '../../control-tests/account-check.service';
import { Project } from '../../control-tests/mock-project';

@Component({
  selector: 'app-project-list-view-f',
  templateUrl: './project-list-view-f.component.html',
  styleUrls: ['./project-list-view-f.component.css']
})
export class ProjectListViewFComponent implements OnInit {

  @Input() project!: Project; 
  currentProjectListName = "";
  currentProjectListCourseId = 0;

  accountCurrent: string = "";

  selectedProjectName = "";
  selectedProjectDescription = ""; 
  currentList = {};
  /*currentList: {listname: string, listID: string, courseID: string} | undefined;*/


  constructor(
    private sessionService: SessionService,
    private accountCheck: AccountCheckService,
    private listDisplayService: ListDisplayService

  ) {}

ngOnInit(): void {

    // Account testing code
    this.accountCheck.currentAccountType.subscribe(accountCurrent => this.accountCurrent = accountCurrent);

    this.currentProjectListName = this.listDisplayService.projectListName;
    this.currentProjectListCourseId = this.listDisplayService.projectListId

    console.log("Display the following: " + 
      this.currentProjectListName +
      " " + this.currentProjectListCourseId);
  }



setProjectNameAndDescription(){
  this.listDisplayService.setProjectNameAndProjectDescription(this.project.name, this.project.description);

  console.log("The Project name is " + this.listDisplayService.selectedProjectName + " " + this.listDisplayService.selectedProjectDescription);
}




}



