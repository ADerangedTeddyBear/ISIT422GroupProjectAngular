import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherListViewComponent } from './teacher-list-view.component';

describe('TeacherListViewComponent', () => {
  let component: TeacherListViewComponent;
  let fixture: ComponentFixture<TeacherListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherListViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
