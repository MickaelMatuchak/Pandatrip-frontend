import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {RecapComponent} from './recap.component';
import {HttpModule} from '@angular/http';
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule} from '@angular/forms';
import {AppSharedService} from '../app-shared-service';

describe('RecapComponent', () => {
  let component: RecapComponent;
  let fixture: ComponentFixture<RecapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, FormsModule, RouterTestingModule],
      declarations: [RecapComponent],
      providers: [AppSharedService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
  it('should create', () => {
    expect(component).toBeTruthy(); 
  });
}); 
