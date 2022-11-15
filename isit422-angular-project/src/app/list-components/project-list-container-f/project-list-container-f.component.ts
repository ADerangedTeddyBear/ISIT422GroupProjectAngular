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
  @Input() currentProjecNameState!: string;

  accountCurrent: string = "";



  projectListNameStudentListView: ProjectList = {} as ProjectList;
  currentProjectName: string =  this.currentProjecNameState;

  //this.currentProjectName =
  buttonValue: string = "";

  
  //@ViewChild("projectListNameHeading") projectListNameHeading: ElementRef<any>;


  constructor(
    private router: Router,
    private accountCheck: AccountCheckService
    ) {
   }

  ngOnInit(): void { 

    // Account testing code
    this.accountCheck.currentAccountType.subscribe(accountCurrent => this.accountCurrent = accountCurrent);
    //this.accountCurrent = this.accountCheck.updateAccountType
    console.log("The current account is of type " + this.accountCurrent);


    if (!this.projectListName){
      this.projectListNameStudentListView.name = this.currentProjectName;
      this.buttonValue = "View Project Details";
    }else{
      this.projectListNameStudentListView = this.projectListName;
      this.buttonValue = "View Projects Listed"
    }

    console.log("the current project is " + this.currentProjecNameState);
    console.log("the current projects listed is " + this.projectListName);
  }

  setProjName(projName: string){
    this.projectListNameStudentListView.name = projName;
    console.log("The WORD is " + projName);
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

 

}
