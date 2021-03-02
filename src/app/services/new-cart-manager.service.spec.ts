import { TestBed } from '@angular/core/testing';

import { NewCartManagerService } from './new-cart-manager.service';

describe('NewCartManagerService', () => {
  let service: NewCartManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewCartManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
