import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/services/form.service';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-new-list-page',
  templateUrl: './new-list-page.component.html',
  styleUrls: ['./new-list-page.component.css']
})
export class NewListPageComponent implements OnInit {

  public newListForm: FormGroup | undefined;
  courseArray: { name: string; id: string; }[] | undefined;

  teacher = SessionService.GetCurrentUser();

  constructor(
    private FormService: FormService,
    private formBuilder: FormBuilder,
    private router: Router) {
      if (typeof this.teacher !== 'undefined') {
        this.FormService.GetCourseNamesAndIDs(this.teacher.id).then((
          (value: any) => {
            this.courseArray = value;
            this.newListForm = this.createForm();
            this.newListForm.reset();
          }
        ));
      }
      else {
        this.router.navigate(['/teacher-pages/teacher-landing']);
        throw new Error("Invalid state: list view loaded without a teacher ID");
      }
  }


  ngOnInit(): void {
  }

  // Initialize the form with form boulder controls mapped to dynamically created elements
  createForm() {
    // Create group
    let form = this.formBuilder.group({
      listname: '',
      course: this.formBuilder.array([])
    });

    // Set the 'students' formBuilder array to a variable
    let courseControls = form.get('course') as FormArray;
    
    // Add all students in the studentsArray to the form
    if (typeof this.courseArray !== 'undefined') for (let course in this.courseArray) {
      courseControls.push(this.formBuilder.control(this.courseArray[course]));
      console.log(this.courseArray[course]);
    }

    // return fully created form
    return form;
  }
  

  submitForm(in_formName: string) {
    // Process radio button input
    if (typeof this.newListForm !== 'undefined') {
      let selectedCourse = "";
      for (let course in this.newListForm.value.course) {
        if (this.newListForm.value.course[course] != null) {
          selectedCourse = this.newListForm.value.course[course];
          break;
        }
      }
      this.newListForm.value["course"] = selectedCourse;
  
      this.FormService.postData(this.newListForm.value, in_formName);
      this.newListForm.reset();

    }
  }

}
