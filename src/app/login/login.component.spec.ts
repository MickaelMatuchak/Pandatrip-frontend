import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from "@angular/router/testing";
import {LoginComponent} from './login.component';
import {LoginService} from './login.service';
import {AppSharedService} from '../app-shared-service';
import {AppService} from '../app.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, FormsModule, RouterTestingModule],
      declarations: [LoginComponent],
      providers: [AppService, LoginService, AppSharedService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
  it('should create', () => {
    expect(component).toBeTruthy(); 
  });
}); 
