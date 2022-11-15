import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ListDisplayService } from '../../services/list-display.service';
import { AccountCheckService } from '../../control-tests/account-check.service';

import { ProjectList} from '../../control-tests/mock-project-list'
import { Router } from '@angular/router';


@Component({
  selector: 'app-project-list-container-f',
  templateUrl: './project-list-container-f.component.html',
  styleUrls: ['./project-list-container-f.component.css']
})
export class ProjectListContainerFComponent implements OnInit {

  @Input() projectListName!:ProjectList;
  @Input() currentProjectNameState!: string;

  accountCurrent: string = "";
  currentProjectName: string = "";


  //projectListNameStudentListView: ProjectList = {} as ProjectList;
  //currentProjectName: string =  this.currentProjectNameState;

  constructor(
    private router: Router,
    private accountCheck: AccountCheckService,
    private listDisplayService: ListDisplayService

    ) {
   }

  ngOnInit(): void { 

    // Account testing code
    this.accountCheck.currentAccountType.subscribe(accountCurrent => this.accountCurrent = accountCurrent);
    //this.accountCurrent = this.accountCheck.updateAccountType

    /*if (this.projectListNameStudentListView == undefined){
     //this.projectListNameStudentListView = this.projectListName;

      //this.projectListNameStudentListView.name = this.currentProjectNameState;
      console.log("I am undefined douchebag");
    }else{
      this.projectListNameStudentListView = this.projectListName;

    }*/

    //this.projectListNameStudentListView = this.projectListName;

    history.state.projectName = this.currentProjectName;

    //console.log("the current project is " + this.projectListNameStudentListView);
    console.log("the current projects listed is " + history.state.projectName)//this.projectListName.name);
  }

  setProjName(projName: string){
    this.currentProjectName = history.state.projectName;
    //this.projectListNameStudentListView.name = this.currentProjectNameState;

    console.log("We made it!" + this.currentProjectName);
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

 

}
