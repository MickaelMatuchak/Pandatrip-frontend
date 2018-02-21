import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {VisitDetailsComponent} from './visit-details.component';
import {HttpModule} from '@angular/http';
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule} from '@angular/forms';
import {CarouselModule} from 'angular4-carousel';
import {ReviewsComponent} from '../reviews/reviews.component';
import {VisitSuggestionComponent} from '../visit/visit.component';
import {StarRatingComponent} from 'angular-star-rating';
import {AppSharedService} from '../app-shared-service';
import {AppService} from '../app.service';
import {VisitService} from '../visit/visit.service';

describe('VisitDetailsComponent', () => {
  let component: VisitDetailsComponent;
  let fixture: ComponentFixture<VisitDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, FormsModule, CarouselModule, RouterTestingModule],
      declarations: [VisitDetailsComponent, ReviewsComponent, StarRatingComponent, VisitSuggestionComponent],
      providers: [AppService, AppSharedService, VisitService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
  it('should create', () => {
    expect(component).toBeTruthy(); 
  });
}); 
