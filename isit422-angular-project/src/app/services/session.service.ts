import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }
  
  public static currentUser = {
    name: '',
    id: '',
    user_type: ''
  };

  static GetCurrentUser() {
    // TODO: replace with code to get the current user from the session data
    if (this.currentUser.name == '') this.currentUser = {
      name: 'Will Smith',
      id: 'Set to known teacher id in database',
      user_type: 'teacher'
    };
    return SessionService.currentUser;
  }

  static SetCurrentUser(in_name: string, in_id: string, in_user_type: string) {
    // TODO: Replace with code to set the current user in the session data
    this.currentUser = {
      name: in_name,
      id: in_id,
      user_type: in_user_type
    };
  }

}
