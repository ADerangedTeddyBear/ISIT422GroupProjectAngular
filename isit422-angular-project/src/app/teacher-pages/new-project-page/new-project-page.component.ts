import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/services/form.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-new-project-page',
  templateUrl: './new-project-page.component.html',
  styleUrls: ['./new-project-page.component.css']
})
export class NewProjectPageComponent implements OnInit {

  constructor(
    private FormService: FormService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  newProjectForm = this.formBuilder.group({
    projectname: '',
    description: ''
  });

  submitForm(in_formName: string) {
    this.FormService.postData(this.newProjectForm.value, in_formName);
    this.newProjectForm.reset();
  }

}
