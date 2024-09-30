import { TestBed } from '@angular/core/testing';

import { StateFormService } from './state-form.service';

describe('StateFormService', () => {
  let service: StateFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
