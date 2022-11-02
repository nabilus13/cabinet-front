import { TestBed } from '@angular/core/testing';

import { ShareDataOfApiService } from './share-data-of-api.service';

describe('ShareDataOfApiService', () => {
  let service: ShareDataOfApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareDataOfApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
