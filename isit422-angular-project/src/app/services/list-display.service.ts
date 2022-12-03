import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

//Mock tests
import { Course } from '../control-tests/mock-course'
import { ProjectList } from '../control-tests/mock-project-list';
import { Project } from '../control-tests/mock-project';

import { __values } from 'tslib';
import * as $ from 'jquery';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ListDisplayService {

//coursesApiUrl: string = '';

//Holding course, project-list and projects names tests
courseName: string = "";
projectListName: string = "";
projectListId: number = 0;
projectName: string = "";
selectedProjectName: string = "";
selectedProjectDescription: string = "";


// Tests for getting data

getCourses(coursesApiUrl: string): Observable<Course[]> {
  return this.http.get<Course[]>(coursesApiUrl)
    .pipe(
      tap(_ => console.log('fetched courses')),
      catchError(this.handleError<Course[]>('getCourses', []))
    );
}

getProjectListName(projectListsApiUrl: string): Observable<ProjectList[]> {
  return this.http.get<ProjectList[]>(projectListsApiUrl)
    .pipe(
      tap(_ => console.log(/*'fetched project lists'*/)),
      catchError(this.handleError<ProjectList[]>('getProjectLists', []))
    );
}

getProjectName(projectApiUrl: string): Observable<Project[]> {
  return this.http.get<Project[]>(projectApiUrl)
    .pipe(
      tap(_ => console.log(/*'fetched project lists'*/)),
      catchError(this.handleError<Project[]>('getProjectLists', []))
    );
}

setProjectListName(projectListName: string){
  this.projectListName = projectListName;
}

setProjectListNameAndProjectListID(projListName: string, projListId: number){
  this.projectListName = projListName;
  this.projectListId = projListId;

}

setProjectNameAndProjectDescription(projName: string, projDescription: string){
  this.selectedProjectName = projName;
  this.selectedProjectDescription = projDescription; 
}




  constructor(
    private http: HttpClient
  ) { }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}


