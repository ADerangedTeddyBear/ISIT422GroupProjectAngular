import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectItemFComponent } from './project-item-f.component';

describe('ProjectItemFComponent', () => {
  let component: ProjectItemFComponent;
  let fixture: ComponentFixture<ProjectItemFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectItemFComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectItemFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
