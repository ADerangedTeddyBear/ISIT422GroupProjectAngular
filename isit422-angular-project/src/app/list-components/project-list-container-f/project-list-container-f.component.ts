import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ListDisplayService } from '../../services/list-display.service';
import { AccountCheckService } from '../../control-tests/account-check.service';
import { SessionService } from '../../services/session.service';
import {DatabaseService} from '../../services/database.service';

import { ProjectList } from '../../control-tests/mock-project-list'
import { Router } from '@angular/router';
import { CurrentUser } from '../../control-tests/mock-current-user';


@Component({
  selector: 'app-project-list-container-f',
  templateUrl: './project-list-container-f.component.html',
  styleUrls: ['./project-list-container-f.component.css']
})
export class ProjectListContainerFComponent implements OnInit {

  @Input() projectListName!: ProjectList;
  @Input() currentProjectNameState!: string;

  currentProjectName: string = "";

  currentUserAccount: CurrentUser = {
    name: "",
    id: 0,
    user_type: ""
  };


  //projectListNameStudentListView: ProjectList = {} as ProjectList;
  //currentProjectName: string =  this.currentProjectNameState;

  constructor(
    private router: Router,
    private accountCheck: AccountCheckService,
    private listDisplayService: ListDisplayService,
    private sessionService: SessionService,
    private databaseService: DatabaseService

  ) {
  }

  ngOnInit(): void {

    // Get user accunt type
    this.currentUserAccount = SessionService.GetCurrentUser();


  }

  setCurrentProjectList() {

    SessionService.SetCurrentProjectList(
      this.projectListName.id,
      this.projectListName.name,
      this.projectListName.course_id,
      this.projectListName.project_ids)
  }

  /*

  setProjNameAndID() {
    this.listDisplayService.setProjectListNameAndProjectListID(this.projectListName.name, this.projectListName.id);

    SessionService.SetCurrentList(this.projectListName.name, "Try this 1", "Try this 2");
  }
*/
  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  deleteItem(id: number) {
    let url = `http://localhost:5000/api/delete/${id}/`;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url)
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        console.log(`xhr.response from deleteItem: ${xhr.response}`)
      }
      xhr.send();
    }  
    console.log(id);
  }

}
