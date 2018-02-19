import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { PartnersService } from './partners.service';

describe('PartnersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [PartnersService]
    });
  });

  it('should be created', inject([PartnersService], (service: PartnersService) => {
    expect(service).toBeTruthy();
  }));
});
