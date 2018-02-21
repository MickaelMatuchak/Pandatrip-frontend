import { TestBed, inject } from '@angular/core/testing';

import { PartnersService } from './partners.service';
import { HttpModule } from '@angular/http';

describe('PartnersService', () => {
  let service;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [PartnersService]
    })
    .compileComponents();
  });

  beforeEach(inject([PartnersService], s => {
    service = s;
  })); 

  it('should be created', inject([PartnersService], service => {
    expect(service).toBeTruthy();
  }));
});
