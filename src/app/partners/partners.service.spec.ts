import { TestBed, inject } from '@angular/core/testing';

import { PartnersService } from './partners.service';
import { HttpModule } from '@angular/http';

describe('PartnersService', () => {
  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [PartnersService]
    })
    .compileComponents();
  });

  it('should be created', inject([PartnersService], (service: PartnersService) => {
    expect(service).toBeTruthy();
  }));
});
