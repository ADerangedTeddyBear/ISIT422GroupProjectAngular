import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-teacher-landing',
  templateUrl: './teacher-landing.component.html',
  styleUrls: ['./teacher-landing.component.css']
})
export class TeacherLandingComponent implements OnInit {

  currentTeacher = SessionService.GetCurrentUser();

  constructor() { }

  ngOnInit(): void {
    SessionService.UnsetCurrentList();
  }

}
