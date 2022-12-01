import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/services/form.service';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-edit-project-page',
  templateUrl: './edit-project-page.component.html',
  styleUrls: ['./edit-project-page.component.css']
})
export class EditProjectPageComponent implements OnInit {

  projectID: string;
  projectData: {projectName: string, projectDescription: string} | undefined;
  editProjectForm: any;
  

  constructor(
    private FormService: FormService,
    private formBuilder: FormBuilder) { 
      console.log(history.state.projectID);
      this.projectID = history.state.projectID;
      this.FormService.GetProject(this.projectID).then(
        (value: any) => {
          let valueObj = JSON.parse(value)
          this.projectData = valueObj;
          if (this.projectData) this.editProjectForm = this.formBuilder.group({
            projectname: [this.projectData.projectName, Validators.required],
            description: [this.projectData.projectDescription, Validators.required]
          });
        }
      )
    }

  // projectData: {projectName: string, projectDescription: string} = this.FormService.GetProject(this.projectID);
  currentList = SessionService.GetCurrentList();

  ngOnInit(): void {
  }

  // TODO: The edit project page should only be accessible from the project list view.
  // Selecting to edit a project from the project list should populate this page with data from the 
  // selected project

  submitForm(in_formName: string) {
    const returnObject = {
      projectname: this.editProjectForm.value.projectname,
      description: this.editProjectForm.value.description,
      id: this.projectID
    }
    this.FormService.postData(returnObject, in_formName);
    this.editProjectForm.reset();
  }

}
