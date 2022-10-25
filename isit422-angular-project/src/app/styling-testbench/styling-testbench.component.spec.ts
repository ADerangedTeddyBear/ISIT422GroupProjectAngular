import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StylingTestbenchComponent } from './styling-testbench.component';

describe('StylingTestbenchComponent', () => {
  let component: StylingTestbenchComponent;
  let fixture: ComponentFixture<StylingTestbenchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StylingTestbenchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StylingTestbenchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
