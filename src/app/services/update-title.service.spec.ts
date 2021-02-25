import { TestBed } from '@angular/core/testing';

import { UpdateTitleService } from './update-title.service';

describe('UpdateTitleService', () => {
  let service: UpdateTitleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateTitleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
