import { TestBed, inject, async } from '@angular/core/testing';

import { AppService } from './app.service';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { AppSharedService } from './app-shared-service';

describe('AppService', () => {
  let service;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [AppService, AppSharedService]
    })
    .compileComponents();
  });

  beforeEach(inject([AppService], s => {
    service = s;
  })); 


  it('should be created', inject([AppService], service => {
    expect(service).toBeTruthy();
  }));

  it('test AppService loggedIn', inject([AppService], service => {
    expect(service.loggedIn()).toBe(false);
  }));

});