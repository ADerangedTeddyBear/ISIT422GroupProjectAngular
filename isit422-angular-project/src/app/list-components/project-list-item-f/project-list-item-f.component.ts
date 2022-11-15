import { Component, OnInit } from '@angular/core';
import { AccountCheckService } from '../../control-tests/account-check.service';
import { ListDisplayService } from '../../services/list-display.service';
import { ProjectList } from '../../control-tests/mock-project-list';




@Component({
  selector: 'app-project-list-item-f',
  templateUrl: './project-list-item-f.component.html',
  styleUrls: ['./project-list-item-f.component.css']
})
export class ProjectListItemFComponent implements OnInit {

  //modify these variables to use database values
  //projectListName: string = "Project List Name"
  studentsAssigned: string = "[Students assigned go here]"

  accountCurrent: string = "";

  constructor(private accountCheck: AccountCheckService,
    private listDisplayService: ListDisplayService
    
    ) { }

  ngOnInit(): void {
    this.accountCheck.currentAccountType.subscribe(accountCurrent => this.accountCurrent = accountCurrent);
      // On load call courses API
      this.getProjectListName();
  }

  projectListNames:ProjectList[] = [];

  projectListsApiUrl = 'http://localhost:5000/api/projectlistsnames';

  getProjectListName(): void {
    this.listDisplayService.getProjectListName(this.projectListsApiUrl)
    .subscribe(projectListNames => this.projectListNames = projectListNames);
  }

}
