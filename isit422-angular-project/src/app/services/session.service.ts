import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  static GetCurrentUser() {
    let currentUser = sessionStorage.getItem('current user');
    if (currentUser != null) {
      return JSON.parse(currentUser);
    } 
    else {
      return undefined
    }
  }
  static GetCurrentList() {
    let currentUser = sessionStorage.getItem('current list');
    if (currentUser != null) {
      return JSON.parse(currentUser);
    } 
    else {
      return undefined
    }
  }

  static SetCurrentList(in_listname: string, in_listID: string, in_courseID: string) {
    let  currentList = {
      listname: in_listname,
      listID: in_listID,
      courseID: in_courseID
    }
    sessionStorage.setItem('current list', JSON.stringify(currentList));
  }
  static SetCurrentUser(in_name: string, in_id: string, in_user_type: string) {
    // TODO: Replace with code to set the current user in the session data
    let currentUser = {
      name: in_name,
      id: in_id,
      user_type: in_user_type
    };
    sessionStorage.setItem('current user', JSON.stringify(currentUser));
  }

  static UnsetCurrentUser() {
    sessionStorage.removeItem('current user');
  }
  static UnsetCurrentList() {
    sessionStorage.removeItem('current list');
  }

}
