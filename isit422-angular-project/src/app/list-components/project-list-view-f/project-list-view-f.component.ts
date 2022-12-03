import { Component, OnInit, Input } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { ListDisplayService } from '../../services/list-display.service';
import { AccountCheckService } from '../../control-tests/account-check.service';
import { Project } from '../../control-tests/mock-project';
import { DatabaseService } from 'src/app/services/database.service';
import { CurrentUser } from '../../control-tests/mock-current-user';

@Component({
  selector: 'app-project-list-view-f',
  templateUrl: './project-list-view-f.component.html',
  styleUrls: ['./project-list-view-f.component.css']
})
export class ProjectListViewFComponent implements OnInit {

  @Input() project!: Project; 
  currentProjectListName = "";
  currentProjectListCourseId = 0;

  currentUserAccount: CurrentUser = {
    name: "",
    id: 0,
    user_type: ""
  };

  selectedProjectName = "";
  selectedProjectDescription = ""; 
  currentList = {};
  /*currentList: {listname: string, listID: string, courseID: string} | undefined;*/


  constructor(
    private sessionService: SessionService,
    private accountCheck: AccountCheckService,
    private listDisplayService: ListDisplayService,
    private databaseService: DatabaseService

  ) {}

ngOnInit(): void {

    
    // Get user account type
    this.currentUserAccount = SessionService.GetCurrentUser();

    this.currentProjectListName = this.listDisplayService.projectListName;
    this.currentProjectListCourseId = this.listDisplayService.projectListId

  }



setProjectNameAndDescription(){
  this.listDisplayService.setProjectNameAndProjectDescription(this.project.name, this.project.description);

  console.log("The Project name is " + this.listDisplayService.selectedProjectName + " " + this.listDisplayService.selectedProjectDescription);
}

deleteItem(id: number) {
  let mongo_delete_out = `http://localhost:5000/api/delete/${id}/`;
  DatabaseService.deleteRecord(mongo_delete_out);
  console.log(id);
}


}



