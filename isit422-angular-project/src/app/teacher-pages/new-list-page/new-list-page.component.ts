import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/services/form.service';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-list-page',
  templateUrl: './new-list-page.component.html',
  styleUrls: ['./new-list-page.component.css']
})
export class NewListPageComponent implements OnInit {

  public newListForm: FormGroup;
  courseArray = ["course 1", "course 2"];

  constructor(
    private FormService: FormService,
    private formBuilder: FormBuilder) {
      this.newListForm = this.createForm();
      this.newListForm.reset();
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
    for (let student in this.courseArray) {
      courseControls.push(this.formBuilder.control(this.courseArray[student]))
    }

    // return fully created form
    return form;
  }
  

  submitForm(in_formName: string) {
    // Process radio button input
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
