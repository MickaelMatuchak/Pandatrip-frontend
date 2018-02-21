import { TestBed, inject } from '@angular/core/testing';

import { RegisterService } from './register.service';
import { HttpModule } from '@angular/http';

describe('RegisterService', () => {
  let service;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [RegisterService]
    })
    .compileComponents();
  });

  beforeEach(inject([RegisterService], s => {
    service = s;
  })); 

  it('should be created', inject([RegisterService], (service: RegisterService) => {
    expect(service).toBeTruthy();
  }));
});
