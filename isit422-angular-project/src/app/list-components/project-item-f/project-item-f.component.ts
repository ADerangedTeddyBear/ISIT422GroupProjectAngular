import { Component, OnInit } from '@angular/core';
import { AccountCheckService } from '../../control-tests/account-check.service';


@Component({
  selector: 'app-project-item-f',
  templateUrl: './project-item-f.component.html',
  styleUrls: ['./project-item-f.component.css']
})
export class ProjectItemFComponent implements OnInit {


  //modify these variables to use database values
  projectName: string = "Project Name"
  studentsAssigned: string = "[Students assigned go here]"

  accountCurrent: string = "";

  constructor(private accountCheck: AccountCheckService) { }

  ngOnInit(): void {
    this.accountCheck.currentAccountType.subscribe(accountCurrent => this.accountCurrent = accountCurrent)
  }
}
