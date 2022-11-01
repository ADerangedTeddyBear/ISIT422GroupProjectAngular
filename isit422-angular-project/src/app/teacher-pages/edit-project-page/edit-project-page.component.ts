import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/services/form.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-project-page',
  templateUrl: './edit-project-page.component.html',
  styleUrls: ['./edit-project-page.component.css']
})
export class EditProjectPageComponent implements OnInit {

  constructor(
    private FormService: FormService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  editProjectForm = this.formBuilder.group({
    projectname: '',
    description: ''
  });

  submitForm(in_formName: string) {
    this.FormService.postData(this.editProjectForm.value, in_formName);
    this.editProjectForm.reset();
  }

}
