import { TestBed } from '@angular/core/testing';

import { CheckoutManagerService } from './checkout-manager.service';

describe('CheckoutManagerService', () => {
  let service: CheckoutManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckoutManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
