import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherProjectViewComponent } from './teacher-project-view.component';

describe('TeacherProjectViewComponent', () => {
  let component: TeacherProjectViewComponent;
  let fixture: ComponentFixture<TeacherProjectViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherProjectViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherProjectViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
