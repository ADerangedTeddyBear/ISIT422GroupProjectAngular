import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProjectViewComponent } from './student-project-view.component';

describe('StudentProjectViewComponent', () => {
  let component: StudentProjectViewComponent;
  let fixture: ComponentFixture<StudentProjectViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentProjectViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentProjectViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
