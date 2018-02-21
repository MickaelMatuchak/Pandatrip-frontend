import { TestBed, inject } from '@angular/core/testing';

import { AppSharedService } from './app-shared-service';
import { HttpModule } from '@angular/http';

describe('AppSharedService', () => {
  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [AppSharedService]
    })
    .compileComponents();
  });

  it('should be created', inject([AppSharedService], (service : AppSharedService) => {
    expect(service).toBeTruthy();
  }));

});
