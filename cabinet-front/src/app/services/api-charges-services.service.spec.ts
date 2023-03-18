import { TestBed } from '@angular/core/testing';

import { ApiChargesServices } from './api-charges.service';

describe('ApiChargesServicesService', () => {
  let service: ApiChargesServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiChargesServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
