import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {ResearchComponent} from './research.component';
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule} from '@angular/forms';
import {AppSharedService} from '../app-shared-service';

describe('ResearchComponent', () => {
  let component: ResearchComponent;
  let fixture: ComponentFixture<ResearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule],
      declarations: [ResearchComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
  it('should create', () => {
    expect(component).toBeTruthy(); 
  });
}); 
