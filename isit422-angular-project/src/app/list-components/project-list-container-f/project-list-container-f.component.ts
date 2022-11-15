import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ListDisplayService } from '../../services/list-display.service';
import { ProjectList} from '../../control-tests/mock-project-list'
import { Router } from '@angular/router';


@Component({
  selector: 'app-project-list-container-f',
  templateUrl: './project-list-container-f.component.html',
  styleUrls: ['./project-list-container-f.component.css']
})
export class ProjectListContainerFComponent implements OnInit {

  @Input() projectListName!:ProjectList;
  @Input() currentProjecNameState!: string;

  projectListNameStudentListView: ProjectList = {} as ProjectList;
  buttonValue: string = "";

  
  //@ViewChild("projectListNameHeading") projectListNameHeading: ElementRef<any>;


  constructor(private router: Router) {
   

   }

  ngOnInit(): void { 
    if (!this.projectListName){
      this.projectListNameStudentListView.name = this.currentProjecNameState;
      this.buttonValue = "View Project Details";
    }else{
      this.projectListNameStudentListView = this.projectListName;
      this.buttonValue = "View Projects Listed"
    }
  }

  setProjName(projName: string){
    this.projectListNameStudentListView.name = projName;
    console.log("The WORD is " + projName);
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

 

}
