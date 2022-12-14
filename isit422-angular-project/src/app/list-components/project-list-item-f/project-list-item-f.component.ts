import { Component, OnInit } from '@angular/core';
import { AccountCheckService } from '../../control-tests/account-check.service';
import { ListDisplayService } from '../../services/list-display.service';
import { ProjectList } from '../../control-tests/mock-project-list';
import { CurrentUser } from '../../control-tests/mock-current-user';
import { SessionService } from '../../services/session.service';




@Component({
  selector: 'app-project-list-item-f',
  templateUrl: './project-list-item-f.component.html',
  styleUrls: ['./project-list-item-f.component.css']
})
export class ProjectListItemFComponent implements OnInit {

  //modify these variables to use database values
  //projectListName: string = "Project List Name"
  studentsAssigned: string = "[Students assigned go here]"


  currentUserAccount: CurrentUser = {
    name: "",
    id: 0,
    user_type: ""
  };
  
  constructor(private accountCheck: AccountCheckService,
    private listDisplayService: ListDisplayService
    
    ) { }

  ngOnInit(): void {

       // Get user account type
       this.currentUserAccount = SessionService.GetCurrentUser();



    // On load call courses API
      this.getProjectListName();
  }

  projectListNames:ProjectList[] = [];

  projectListsApiUrl = 'https://isit422-node-finale-2022.azurewebsites.net/api/projectlistsnames';

  getProjectListName(): void {
    this.listDisplayService.getProjectListName(this.projectListsApiUrl)
    .subscribe(projectListNames => this.projectListNames = projectListNames);
  }

}
