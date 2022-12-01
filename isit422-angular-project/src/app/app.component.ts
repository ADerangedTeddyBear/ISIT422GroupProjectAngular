import { Component, OnInit } from '@angular/core';
import { AccountCheckService } from './control-tests/account-check.service';
import { ListDisplayService } from './services/list-display.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'isit422-angular-project';
  accountCurrent: string = "";

  constructor(
    private accountCheck: AccountCheckService) { }

  ngOnInit(): void {
    this.accountCheck.currentAccountType.subscribe(accountCurrent => this.accountCurrent = accountCurrent);
    console.log("Account Current: " + this.accountCurrent)
  }
}
