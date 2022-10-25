import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseListContainerComponent } from './course-list-container.component';

describe('CourseListContainerComponent', () => {
  let component: CourseListContainerComponent;
  let fixture: ComponentFixture<CourseListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseListContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
