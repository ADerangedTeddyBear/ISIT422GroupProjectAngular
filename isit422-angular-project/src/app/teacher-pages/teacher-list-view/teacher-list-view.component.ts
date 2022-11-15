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

  list: {listname: string, listID: string, courseID: string} | undefined;
  teacher = SessionService.GetCurrentUser();

  ngOnInit(): void {
    console.log(history.state.listID);
    let s_listname = history.state.listname as string;
    let s_listID = history.state.listID;
    let s_courseID = history.state.courseID;

    this.list = {listname: s_listname, listID: s_listID, courseID: s_courseID};
    SessionService.SetCurrentList(s_listname, s_listID, s_courseID);

    if (typeof this.list == 'undefined') {
      this.router.navigate(['/teacher-pages/teacher-landing']);
      throw new Error("Invalid state: list view loaded without a list ID");
    }
  }

}
