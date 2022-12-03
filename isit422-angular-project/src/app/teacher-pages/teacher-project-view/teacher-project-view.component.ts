import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-teacher-project-view',
  templateUrl: './teacher-project-view.component.html',
  styleUrls: ['./teacher-project-view.component.css']
})
export class TeacherProjectViewComponent implements OnInit {

  constructor() { }

  currentList = SessionService.GetCurrentList();

  ngOnInit(): void {
  }

}
