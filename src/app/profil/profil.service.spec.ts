import { TestBed, inject } from '@angular/core/testing';

import { ProfilService } from './profil.service';
import { HttpModule } from '@angular/http';

describe('ProfilService', () => {
  let service;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [ProfilService]
    })
    .compileComponents();
  });

  beforeEach(inject([ProfilService], s => {
    service = s;
  })); 

  it('should be created', inject([ProfilService], service => {
    expect(service).toBeTruthy();
  }));
});
