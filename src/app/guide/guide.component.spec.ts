import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {HttpModule} from '@angular/http';
import {RouterTestingModule} from "@angular/router/testing";
import {GuideComponent} from './guide.component';
import {StarRatingComponent} from 'angular-star-rating';
import {GuideService} from './guide.service';
import {AppSharedService} from '../app-shared-service';

describe('GuideComponent', () => {
  let component: GuideComponent;
  let fixture: ComponentFixture<GuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, RouterTestingModule],
      declarations: [GuideComponent, StarRatingComponent],
      providers: [GuideService, AppSharedService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
  it('should create', () => {
    expect(component).toBeTruthy(); 
  });
}); 
