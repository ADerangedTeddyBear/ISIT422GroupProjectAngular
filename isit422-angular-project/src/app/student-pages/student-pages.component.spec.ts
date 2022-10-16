import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPagesComponent } from './student-pages.component';

describe('StudentPagesComponent', () => {
  let component: StudentPagesComponent;
  let fixture: ComponentFixture<StudentPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentPagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
