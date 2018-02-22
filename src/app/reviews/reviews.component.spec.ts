import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {HttpModule} from '@angular/http';
import {RouterTestingModule} from "@angular/router/testing";
import {ReviewsComponent} from './reviews.component';
import {StarRatingComponent} from 'angular-star-rating';
import {ReviewsService} from './reviews.service';
import {AppSharedService} from '../app-shared-service';
import {FormsModule} from '@angular/forms';
import {AppService} from '../app.service';
import {LoginService} from '../login/login.service';
import {LoginComponent} from '../login/login.component';
import { ReviewsModel } from './reviews.model';

describe('ReviewsComponent', () => {
  let component: ReviewsComponent;
  let fixture: ComponentFixture<ReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, FormsModule, RouterTestingModule],
      declarations: [ReviewsComponent, LoginComponent, StarRatingComponent],
      providers: [AppService, LoginService, AppSharedService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy(); 
  });
}); 
