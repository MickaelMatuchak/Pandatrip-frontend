import { TestBed, inject } from '@angular/core/testing';

import { LoginService } from './login.service';
import { HttpModule } from '@angular/http';

describe('LoginService', () => {
  let service;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [LoginService]
    })
    .compileComponents();
  });

  beforeEach(inject([LoginService], s => {
    service = s;
  })); 

  it('should be created', inject([LoginService], service => {
    expect(service).toBeTruthy();
  }));
});
