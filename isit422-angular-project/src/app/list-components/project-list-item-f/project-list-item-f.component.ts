import { Component, OnInit } from '@angular/core';
import { AccountCheckService } from '../../control-tests/account-check.service';

@Component({
  selector: 'app-project-list-item-f',
  templateUrl: './project-list-item-f.component.html',
  styleUrls: ['./project-list-item-f.component.css']
})
export class ProjectListItemFComponent implements OnInit {

  //modify these variables to use database values
  projectDescription: string = "this is a random description"
  studentsAssigned: string = "[Students assigned go here]"

  accountCurrent: string = "";

  constructor(private accountCheck: AccountCheckService) { }

  ngOnInit(): void {
    this.accountCheck.currentAccountType.subscribe(accountCurrent => this.accountCurrent = accountCurrent)
  }

}
