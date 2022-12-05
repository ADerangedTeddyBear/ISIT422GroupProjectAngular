import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/services/form.service';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-new-project-page',
  templateUrl: './new-project-page.component.html',
  styleUrls: ['./new-project-page.component.css']
})
export class NewProjectPageComponent implements OnInit {

  currentList = SessionService.GetCurrentList();
  projectFormType: string = 'new project form';



  constructor(
    private FormService: FormService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  newProjectForm = this.formBuilder.group({
    projectname: ['', Validators.required],
    description: ['', Validators.required]
  });

  submitForm(in_formName: string) {
    this.FormService.postData(this.newProjectForm.value, in_formName);
    this.newProjectForm.reset();
  }

}
