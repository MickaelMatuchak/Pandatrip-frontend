import { TestBed, inject } from '@angular/core/testing';

import { ProfilService } from './profil.service';
import { HttpModule } from '@angular/http';

describe('ProfilService', () => {
  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [ProfilService]
    })
    .compileComponents();
  });

  it('should be created', inject([ProfilService], (service: ProfilService) => {
    expect(service).toBeTruthy();
  }));
}); 
