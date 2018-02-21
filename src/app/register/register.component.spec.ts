import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {RegisterComponent} from './register.component';
import {HttpModule} from '@angular/http';
import {RouterTestingModule} from "@angular/router/testing";
import {RegisterService} from './register.service';
import {FormsModule} from '@angular/forms';
import {AppService} from '../app.service';
import {AppSharedService} from '../app-shared-service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, FormsModule, RouterTestingModule],
      declarations: [RegisterComponent],
      providers: [AppService, AppSharedService, RegisterService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
  it('should create', () => {
    expect(component).toBeTruthy(); 
  });
}); 
