import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectViewFComponent } from './project-view-f.component';

describe('ProjectViewFComponent', () => {
  let component: ProjectViewFComponent;
  let fixture: ComponentFixture<ProjectViewFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectViewFComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectViewFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
