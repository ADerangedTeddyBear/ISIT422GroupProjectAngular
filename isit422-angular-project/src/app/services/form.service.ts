import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  logFormData(in_formData: object, in_formName: string) {
    console.log(in_formName);
    for (let entry in in_formData) {
      let key = entry as keyof typeof in_formData
      console.log(`${entry}: ${in_formData[key]}`);
    }
  }

  postData(in_FormData: object, in_FormName: string) {
    console.log(in_FormData);
    
    // Don't do anything if the form isn't recognized
    const validFormNames = ["login form", "create account form", "course form"];
    if (!validFormNames.includes(in_FormName)) {
      console.log("ERROR: Form name not recognized");
      return;
    }

    // Log the form data
    this.logFormData(in_FormData, in_FormName);

    switch (in_FormName) {
      case "login form":
        // TODO: Send data to correct database table
        break;
      default:
        console.log(`ERROR: Form '${in_FormName}' not implemented yet`);
        break;
    }
  }
}
