import { TestBed, inject } from '@angular/core/testing';

import { AnagramBuilderService } from './anagram-builder.service';

describe('AnagramBuilderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnagramBuilderService]
    });
  });

  it('should be created', inject([AnagramBuilderService], (service: AnagramBuilderService) => {
    expect(service).toBeTruthy();
  }));
});
