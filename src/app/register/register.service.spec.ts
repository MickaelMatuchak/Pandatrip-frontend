import { TestBed, inject } from '@angular/core/testing';

import { RegisterService } from './register.service';
import { HttpModule } from '@angular/http';

describe('RegisterService', () => {
  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [RegisterService]
    })
    .compileComponents();
  });

  it('should be created', inject([RegisterService], (service: RegisterService) => {
    expect(service).toBeTruthy();
  }));
});
