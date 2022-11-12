import { Component, OnInit } from '@angular/core';
import { AccountCheckService } from '../../control-tests/account-check.service';


@Component({
  selector: 'app-teacher-list-view',
  templateUrl: './teacher-list-view.component.html',
  styleUrls: ['./teacher-list-view.component.css']
})
export class TeacherListViewComponent implements OnInit {

  accountCurrent: string = "";

  constructor(private accountCheck: AccountCheckService) { }


  ngOnInit(): void {

    // Account testing code
    this.accountCheck.currentAccountType.subscribe(accountCurrent => this.accountCurrent = accountCurrent);
    this.setAccountType();
  }

    // Account testing code
  setAccountType(){
    this.accountCheck.updateAccountType("teacher")
  }

}
