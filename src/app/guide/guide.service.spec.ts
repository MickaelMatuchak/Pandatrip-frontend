import { TestBed, inject } from '@angular/core/testing';

import { GuideService } from './guide.service';
import { HttpModule } from '@angular/http';

describe('GuideService', () => {
  let service;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [GuideService]
    })
    .compileComponents();
  });

  beforeEach(inject([GuideService], s => {
    service = s;
  })); 


  it('should be created', inject([GuideService], service => {
    expect(service).toBeTruthy();
  }));
});
