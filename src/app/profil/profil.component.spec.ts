import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from "@angular/router/testing";
import {ProfilComponent} from './profil.component';
import {ProfilService} from './profil.service';
import {AppSharedService} from '../app-shared-service';
import {AppService} from '../app.service';
import { timeout } from 'rxjs/operator/timeout';

describe('ProfilComponent', () => {
  let component: ProfilComponent;
  let fixture: ComponentFixture<ProfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, FormsModule, RouterTestingModule],
      declarations: [ProfilComponent],
      providers: [AppService, ProfilService, AppSharedService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
  it('should create', () => {
    expect(component).toBeTruthy();
  });
}); 
