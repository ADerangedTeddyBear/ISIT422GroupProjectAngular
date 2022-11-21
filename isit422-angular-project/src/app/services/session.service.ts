import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }
  
  public static currentUser: {name: string, id: string, user_type: string} | undefined;
  public static currentCourse = {};
  public static currentList: {listname: string, listID: string, courseID: string} | undefined;

  static GetCurrentUser() {
    // TODO: replace with code to get the current user from the session data
    if (typeof this.currentUser == 'undefined') return undefined;
    console.log(`current user name: ${this.currentUser.name} current user id ${this.currentUser.id} current user type: ${this.currentUser.user_type}`);
    return SessionService.currentUser;
  }
  static GetCurrentList() {
    // TODO: replace with code to get the current user from the session data
    if (typeof this.currentList == 'undefined') return undefined;
    return SessionService.currentList;
  }

  static SetCurrentList(in_listname: string, in_listID: string, in_courseID: string) {
    SessionService.currentList = {
      listname: in_listname,
      listID: in_listID,
      courseID: in_courseID
    }
  }
  static SetCurrentUser(in_name: string, in_id: string, in_user_type: string) {
    // TODO: Replace with code to set the current user in the session data
    this.currentUser = {
      name: in_name,
      id: in_id,
      user_type: in_user_type
    };
  }

  static UnsetCurrentUser() {
    this.currentUser = undefined;
  }
  static UnsetCurrentList() {
    this.currentList = undefined;
  }

}
