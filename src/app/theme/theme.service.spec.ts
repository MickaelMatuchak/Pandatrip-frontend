import { TestBed, inject } from '@angular/core/testing';

import { ThemeService } from './theme.service';
import { HttpModule } from '@angular/http';

describe('ThemeService', () => {
  
  let service;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [ThemeService]
    })
    .compileComponents();
  });

  beforeEach(inject([ThemeService], s => {
    service = s;
  }));

  it('should be created', inject([ThemeService], service => {
    expect(service).toBeTruthy();
  }));
});
