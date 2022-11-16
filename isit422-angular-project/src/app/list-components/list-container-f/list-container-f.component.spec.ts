import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListContainerFComponent } from './list-container-f.component';

describe('ListContainerFComponent', () => {
  let component: ListContainerFComponent;
  let fixture: ComponentFixture<ListContainerFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListContainerFComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListContainerFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
