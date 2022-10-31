import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/services/form.service';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.css']
})
export class CoursePageComponent implements OnInit {

  public courseForm: FormGroup;
  studentsArray = ["student 1", "student 2"];

  constructor(
    private FormService: FormService,
    private formBuilder: FormBuilder) {
      this.courseForm = this.createForm();
      this.courseForm.reset();
  }

  ngOnInit(): void {
  }

  // Initialize the form with form boulder controls mapped to dynamically created elements
  createForm() {
    // Create group
    let form = this.formBuilder.group({
      coursename: '',
      students: this.formBuilder.array([])
    });

    // Set the 'students' formBuilder array to a variable
    let studentControls = form.get('students') as FormArray;
    
    // Add all students in the studentsArray to the form
    for (let student in this.studentsArray) {
      studentControls.push(this.formBuilder.control(this.studentsArray[student]))
    }

    // return fully created form
    return form;
  }
  

  submitForm(in_formName: string) {
    this.FormService.postData(this.courseForm.value, in_formName);
    this.courseForm.reset();
  }

}
