import { TestBed, inject } from '@angular/core/testing';

import { ReviewsService } from './reviews.service';
import { HttpModule } from '@angular/http';

describe('ReviewsService', () => {
  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [ReviewsService]
    })
    .compileComponents();
  });

  it('should be created', inject([ReviewsService], (service: ReviewsService) => {
    expect(service).toBeTruthy();
  }));
});
