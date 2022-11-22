import { Component, OnInit } from '@angular/core';
import { AccountCheckService } from '../../control-tests/account-check.service';
import { ListDisplayService } from '../../services/list-display.service';


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

  accountCurrent: string = "student";

  constructor(
    private accountCheck: AccountCheckService,
    private listDisplayService: ListDisplayService) { }

  ngOnInit(): void {
    this.accountCheck.currentAccountType.subscribe(accountCurrent => this.accountCurrent = accountCurrent)
    this.selectedProjectName = this.listDisplayService.selectedProjectName;
    this.selectedProjectDescription = this.listDisplayService.selectedProjectDescription;
  }
}
