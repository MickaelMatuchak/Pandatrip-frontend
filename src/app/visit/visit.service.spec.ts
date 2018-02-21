import { TestBed, inject } from '@angular/core/testing';

import { VisitService } from './visit.service';
import { HttpModule } from '@angular/http';

describe('VisitService', () => {
  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [VisitService]
    })
    .compileComponents();
  });

  it('should be created', inject([VisitService], (service : VisitService) => {
    expect(service).toBeTruthy();
  }));

});
