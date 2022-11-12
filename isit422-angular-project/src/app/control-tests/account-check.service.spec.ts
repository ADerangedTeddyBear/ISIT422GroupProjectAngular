import { TestBed } from '@angular/core/testing';

import { AccountCheckService } from './account-check.service';

describe('AccountCheckService', () => {
  let service: AccountCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
