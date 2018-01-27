import { TestBed, inject } from '@angular/core/testing';

import { UtilityProviderService } from './utility-provider.service';

describe('UtilityProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtilityProviderService]
    });
  });

  it('should be created', inject([UtilityProviderService], (service: UtilityProviderService) => {
    expect(service).toBeTruthy();
  }));
});
