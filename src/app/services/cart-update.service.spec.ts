import { TestBed } from '@angular/core/testing';

import { CartUpdateService } from './cart-update.service';

describe('CartUpdateService', () => {
  let service: CartUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
