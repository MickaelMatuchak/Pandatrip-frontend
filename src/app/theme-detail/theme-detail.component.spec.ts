import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeDetailComponent } from './theme-detail.component';
import { HttpModule } from '@angular/http';
import {RouterTestingModule} from "@angular/router/testing";

describe('ThemeDetailComponent', () => {
  let component: ThemeDetailComponent;
  let fixture: ComponentFixture<ThemeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, RouterTestingModule],
      declarations: [ ThemeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
