import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-student-project-view',
  templateUrl: './student-project-view.component.html',
  styleUrls: ['./student-project-view.component.css']
})
export class StudentProjectViewComponent implements OnInit {

  constructor() { }

  // Not sure if we need this
  currentList = SessionService.GetCurrentList();

  

  ngOnInit(): void {
  }

}
