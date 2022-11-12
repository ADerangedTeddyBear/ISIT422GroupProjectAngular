import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ACCOUNT_TYPE } from './account-type';

@Injectable({
  providedIn: 'root'
})
export class AccountCheckService {

  private accountType = new BehaviorSubject<string>("checking account type");
  currentAccountType = this.accountType.asObservable();
  
  updateAccountType(accountCurrent: string) {
    this.accountType.next(accountCurrent)
    return accountCurrent;
  }


  constructor() { }
}
