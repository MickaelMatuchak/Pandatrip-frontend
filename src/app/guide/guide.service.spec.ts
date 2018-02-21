import { TestBed, inject } from '@angular/core/testing';

import { GuideService } from './guide.service';
import { HttpModule } from '@angular/http';

describe('GuideService', () => {
  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [GuideService]
    })
    .compileComponents();
  });

  it('should be created', inject([GuideService], service => {
    expect(service).toBeTruthy();
  }));
});
