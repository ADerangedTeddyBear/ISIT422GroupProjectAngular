import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewListPageComponent } from './new-list-page.component';

describe('NewListPageComponent', () => {
  let component: NewListPageComponent;
  let fixture: ComponentFixture<NewListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewListPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
