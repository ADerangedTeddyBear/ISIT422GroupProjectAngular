import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpXhrBackend } from '@angular/common/http';
//import { MockXHRBackend } from './mock-xhr-backend'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './login-pages/sign-in/sign-in.component';
import { CreateAccountComponent } from './login-pages/create-account/create-account.component';
import { StudentLandingComponent } from './student-pages/student-landing/student-landing.component';
import { StudentListViewComponent } from './student-pages/student-list-view/student-list-view.component';
import { StudentProjectViewComponent } from './student-pages/student-project-view/student-project-view.component';
import { StudentPagesComponent } from './student-pages/student-pages.component';
import { LoginPagesComponent } from './login-pages/login-pages.component';
import { TeacherPagesComponent } from './teacher-pages/teacher-pages.component';
import { TeacherLandingComponent } from './teacher-pages/teacher-landing/teacher-landing.component';
import { CoursePageComponent } from './teacher-pages/course-page/course-page.component';
import { NewListPageComponent } from './teacher-pages/new-list-page/new-list-page.component';
import { TeacherListViewComponent } from './teacher-pages/teacher-list-view/teacher-list-view.component';
import { TeacherProjectViewComponent } from './teacher-pages/teacher-project-view/teacher-project-view.component';
import { NewProjectPageComponent } from './teacher-pages/new-project-page/new-project-page.component';
//import { EditProjectPageComponent } from './teacher-pages/edit-project-page/edit-project-page.component';
import { EditProjectPageComponent } from'./teacher-pages/edit-project-page/edit-project-page.component';
import { StylingTestbenchComponent } from './styling-testbench/styling-testbench.component';
import { DatabaseComponent } from './database/database.component';
import { NewCoursePageComponent } from './teacher-pages/new-course-page/new-course-page.component';
import { ProjectListItemComponent } from './project-list-item/project-list-item.component';
import { ListContainerFComponent } from './list-components/list-container-f/list-container-f.component';
import { ProjectListItemFComponent } from './list-components/project-list-item-f/project-list-item-f.component';
import { ProjectListContainerFComponent } from './list-components/project-list-container-f/project-list-container-f.component';
import { ProjectViewFComponent } from './list-components/project-view-f/project-view-f.component';
import { ProjectItemFComponent } from './list-components/project-item-f/project-item-f.component';
import { ProjectListViewFComponent } from './list-components/project-list-view-f/project-list-view-f.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    CreateAccountComponent,
    StudentLandingComponent,
    StudentListViewComponent,
    StudentProjectViewComponent,
    StudentPagesComponent,
    LoginPagesComponent,
    TeacherPagesComponent,
    TeacherLandingComponent,
    CoursePageComponent,
    NewListPageComponent,
    TeacherListViewComponent,
    TeacherProjectViewComponent,
    NewProjectPageComponent,
    EditProjectPageComponent,
    StylingTestbenchComponent,
    NewCoursePageComponent,
    DatabaseComponent,
    ProjectListItemComponent,
    ListContainerFComponent,
    ProjectListItemFComponent,
    ProjectListContainerFComponent,
    ProjectViewFComponent,
    ProjectItemFComponent,
    ProjectListViewFComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
