import { Component, OnInit } from '@angular/core';
import { AccountCheckService } from '../../control-tests/account-check.service';
import { CurrentUser } from '../../control-tests/mock-current-user';
import { Project } from '../../control-tests/mock-project';
import { ListDisplayService } from '../../services/list-display.service';
import { SessionService } from '../../services/session.service';


@Component({
  selector: 'app-project-item-f',
  templateUrl: './project-item-f.component.html',
  styleUrls: ['./project-item-f.component.css']
})
export class ProjectItemFComponent implements OnInit {


  //modify these variables to use database values
  selectedProjectName: string = "";
  selectedProjectDescription: string = "";
  studentsAssigned: string = "[Students assigned go here]"

  currentUserAccount: CurrentUser = {
    name: "",
    id: 0,
    user_type: ""
  };

  currentProject: Project = {
    id: 0,
    name: "",
    description: "",
    project_list_id: 0,
    student_ids: []
}

  constructor(
    private accountCheck: AccountCheckService,
    private listDisplayService: ListDisplayService) { }

  ngOnInit(): void {
    // Get user account type
    this.currentUserAccount = SessionService.GetCurrentUser();

    // Get current project
    this.currentProject = SessionService.GetCurrentProject();


    this.selectedProjectName = this.listDisplayService.selectedProjectName;
    this.selectedProjectDescription = this.listDisplayService.selectedProjectDescription;
  }
}
