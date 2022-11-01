import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCoursePageComponent } from './new-course-page.component';

describe('NewCoursePageComponent', () => {
  let component: NewCoursePageComponent;
  let fixture: ComponentFixture<NewCoursePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCoursePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCoursePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
