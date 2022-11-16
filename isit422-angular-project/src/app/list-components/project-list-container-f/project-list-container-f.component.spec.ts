import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListContainerFComponent } from './project-list-container-f.component';

describe('ProjectListContainerFComponent', () => {
  let component: ProjectListContainerFComponent;
  let fixture: ComponentFixture<ProjectListContainerFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectListContainerFComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectListContainerFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
