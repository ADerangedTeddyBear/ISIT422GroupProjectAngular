import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-teacher-list-view',
  templateUrl: './teacher-list-view.component.html',
  styleUrls: ['./teacher-list-view.component.css']
})
export class TeacherListViewComponent implements OnInit {

  constructor(private router: Router) { }

  listID = '';
  teacher = SessionService.GetCurrentUser();

  ngOnInit(): void {
    console.log(history.state.listID);
    this.listID = history.state.listID;

    if (typeof this.listID == 'undefined') {
      this.router.navigate(['/teacher-pages/teacher-landing']);
      throw new Error("Invalid state: list view loaded without a list ID");
    }
  }

}
