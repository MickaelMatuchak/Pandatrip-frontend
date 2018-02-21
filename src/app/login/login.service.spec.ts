import { TestBed, inject } from '@angular/core/testing';

import { LoginService } from './login.service';
import { HttpModule } from '@angular/http';

describe('LoginService', () => {
  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [LoginService]
    })
    .compileComponents();
  });

  it('should be created', inject([LoginService], service => {
    expect(service).toBeTruthy();
  }));
});
