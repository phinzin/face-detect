import { TestBed, inject } from '@angular/core/testing';

import { FaceDetectService } from './face-detect.service';

describe('FaceDetectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FaceDetectService]
    });
  });

  it('should be created', inject([FaceDetectService], (service: FaceDetectService) => {
    expect(service).toBeTruthy();
  }));
});
