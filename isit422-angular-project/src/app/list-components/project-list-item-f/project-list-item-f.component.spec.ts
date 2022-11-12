import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListItemFComponent } from './project-list-item-f.component';

describe('ProjectListItemFComponent', () => {
  let component: ProjectListItemFComponent;
  let fixture: ComponentFixture<ProjectListItemFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectListItemFComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectListItemFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
