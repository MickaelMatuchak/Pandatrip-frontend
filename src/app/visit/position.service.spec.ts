import { TestBed, inject } from '@angular/core/testing';

import { PositionService } from './position.service';
import { HttpModule } from '@angular/http';

describe('VisitService', () => {
  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [PositionService]
    })
    .compileComponents();
  });

  it('should be created', inject([PositionService], (service : PositionService) => {
    expect(service).toBeTruthy();
  }));

});
