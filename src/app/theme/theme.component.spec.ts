import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {ThemeComponent} from './theme.component';
import {HttpModule} from '@angular/http';
import {RouterTestingModule} from "@angular/router/testing";

describe('ThemeComponent', () => {
  let component: ThemeComponent;
  let fixture: ComponentFixture<ThemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, RouterTestingModule],
      declarations: [ThemeComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
