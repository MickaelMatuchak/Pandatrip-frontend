import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {VisitComponent} from './visit.component';
import {HttpModule} from '@angular/http';
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule} from '@angular/forms';
import {AppSharedService} from '../app-shared-service';

describe('VisitComponent', () => {
  let component: VisitComponent;
  let fixture: ComponentFixture<VisitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, FormsModule, RouterTestingModule],
      declarations: [VisitComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
  it('should create', () => {
    expect(component).toBeTruthy(); 
  });
}); 
