import { TestBed } from '@angular/core/testing';

import { ListDisplayService } from './list-display.service';

describe('ListDisplayService', () => {
  let service: ListDisplayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListDisplayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
