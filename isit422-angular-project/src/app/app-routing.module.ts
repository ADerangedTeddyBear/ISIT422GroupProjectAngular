import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginPagesComponent } from './login-pages/login-pages.component';
import { SignInComponent } from './login-pages/sign-in/sign-in.component';
import { CreateAccountComponent } from './login-pages/create-account/create-account.component';

import { StudentPagesComponent } from './student-pages/student-pages.component';
import { StudentLandingComponent } from './student-pages/student-landing/student-landing.component';
import { StudentListViewComponent } from './student-pages/student-list-view/student-list-view.component';
import { StudentProjectViewComponent } from './student-pages/student-project-view/student-project-view.component';

import { TeacherPagesComponent } from './teacher-pages/teacher-pages.component';
import { TeacherLandingComponent } from './teacher-pages/teacher-landing/teacher-landing.component';
import { CoursePageComponent } from './teacher-pages/course-page/course-page.component';
import { EditProjectPageComponent } from './teacher-pages/edit-project-page/edit-project-page.component';
import { NewListPageComponent } from './teacher-pages/new-list-page/new-list-page.component';
import { TeacherListViewComponent } from './teacher-pages/teacher-list-view/teacher-list-view.component';
import { TeacherProjectViewComponent } from './teacher-pages/teacher-project-view/teacher-project-view.component';
import { NewProjectPageComponent } from './teacher-pages/new-project-page/new-project-page.component';
import { StylingTestbenchComponent } from './styling-testbench/styling-testbench.component';
import { DatabaseComponent } from './database/database.component';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/login-pages/sign-in', 
    pathMatch: 'full' 
  },
  {
    path: 'testbench',
    component: StylingTestbenchComponent
  },
  {
    path: 'database',
    component: DatabaseComponent
  },
  { 
    path: 'login-pages', 
    component: LoginPagesComponent,
    children: [
      { 
        path: '', 
        redirectTo: '/login-pages/sign-in', 
        pathMatch: 'full' 
      },
      { 
        path: 'sign-in', 
        component: SignInComponent
      },
      { 
        path: 'create-account', 
        component: CreateAccountComponent
      },

    ]
  },
  {
    path: 'student-pages',
    component: StudentPagesComponent,
    children: [
      { 
        path: '', 
        redirectTo: '/student-pages/student-landing', 
        pathMatch: 'full' 
      },
      { 
        path: 'student-landing', 
        component: StudentLandingComponent
      },
      { 
        path: 'student-list-view', 
        component: StudentListViewComponent
      },
      { 
        path: 'student-project-view', 
        component: StudentProjectViewComponent
      }
    ]
  },
  { 
    path: 'teacher-pages', 
    component: TeacherPagesComponent,
    children: [
      { 
        path: '', 
        redirectTo: '/teacher-pages/teacher-landing', 
        pathMatch: 'full' 
      },
      { 
        path: 'teacher-landing', 
        component: TeacherLandingComponent
      },
      { 
        path: 'course-page', 
        component: CoursePageComponent
      },
      { 
        path: 'edit-project-page', 
        component: EditProjectPageComponent
      },
      { 
        path: 'new-list-page', 
        component: NewListPageComponent
      },
      { 
        path: 'new-project-page', 
        component: NewProjectPageComponent
      },
      { 
        path: 'teacher-list-view', 
        component: TeacherListViewComponent
      },
      { 
        path: 'teacher-project-view', 
        component: TeacherProjectViewComponent
      },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }