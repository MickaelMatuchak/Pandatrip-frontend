import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeComponent } from '../theme/theme.component';
import { VisitComponent } from '../visit/visit.component';
import { GuideComponent } from '../guide/guide.component';

import { HomeComponent } from './home.component';
import {StarRatingComponent} from "angular-star-rating";
import {HttpModule} from "@angular/http";
import {RouterTestingModule} from "@angular/router/testing";
import {AppService} from "../app.service";
import {AppSharedService} from "../app-shared-service";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule, RouterTestingModule ],
      declarations: [ ThemeComponent, VisitComponent, GuideComponent, HomeComponent, StarRatingComponent ],
      providers: [AppService, AppSharedService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
