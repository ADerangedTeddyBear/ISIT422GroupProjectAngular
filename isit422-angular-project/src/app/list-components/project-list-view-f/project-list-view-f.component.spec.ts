import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListViewFComponent } from './project-list-view-f.component';

describe('ProjectListViewFComponent', () => {
  let component: ProjectListViewFComponent;
  let fixture: ComponentFixture<ProjectListViewFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectListViewFComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectListViewFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
