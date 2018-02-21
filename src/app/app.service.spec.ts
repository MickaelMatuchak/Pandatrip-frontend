import { TestBed, inject, async } from '@angular/core/testing';

import { AppService } from './app.service';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { AppSharedService } from './app-shared-service';

describe('AppService', () => {
  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [AppService, AppSharedService]
    })
    .compileComponents();
  });

  it('should be created', inject([AppService], (service: AppService) => {
    expect(service).toBeTruthy();
  }));

  it('testLoggedIn', inject([AppService], (service: AppService) => {
    expect(service.loggedIn()).toBe(false);
  }));

});