import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ListDisplayService } from '../../services/list-display.service';
import { AccountCheckService } from '../../control-tests/account-check.service';
import { SessionService } from '../../services/session.service';

import { ProjectList } from '../../control-tests/mock-project-list'
import { Router } from '@angular/router';


@Component({
  selector: 'app-project-list-container-f',
  templateUrl: './project-list-container-f.component.html',
  styleUrls: ['./project-list-container-f.component.css']
})
export class ProjectListContainerFComponent implements OnInit {

  @Input() projectListName!: ProjectList;
  @Input() currentProjectNameState!: string;

  accountCurrent: string = "";
  currentProjectName: string = "";


  //projectListNameStudentListView: ProjectList = {} as ProjectList;
  //currentProjectName: string =  this.currentProjectNameState;

  constructor(
    private router: Router,
    private accountCheck: AccountCheckService,
    private listDisplayService: ListDisplayService,
    private sessionService: SessionService

  ) {
  }

  ngOnInit(): void {

    // Account testing code
    this.accountCheck.currentAccountType.subscribe(accountCurrent => this.accountCurrent = accountCurrent);

  }


  setProjNameAndID() {
    this.listDisplayService.setProjectListNameAndProjectListID(this.projectListName.name, this.projectListName.id);

    SessionService.SetCurrentList(this.projectListName.name, "Try this 1", "Try this 2");
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }



}
