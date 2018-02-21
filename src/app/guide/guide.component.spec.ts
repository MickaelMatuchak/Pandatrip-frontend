import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideComponent } from '../guide/guide.component';
import {GuideService} from "./guide.service";
import {AppService} from "../app.service";
import {StarRatingComponent} from "angular-star-rating";
import {HttpModule} from "@angular/http";
import {AppSharedService} from "../app-shared-service";

describe('GuideComponent', () => {
  let component: GuideComponent;
  let fixture: ComponentFixture<GuideComponent>;
  let guideService: GuideService;
  let appService: AppService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      declarations: [ GuideComponent, StarRatingComponent ],
      providers: [
         GuideService, AppService, AppSharedService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuideComponent);
    guideService = TestBed.get(GuideService);
    appService = TestBed.get(AppService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

/*
  it('should check if the mean is calculated', () => {
    expect(component.calculMoyenne()).
  });
*/

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
