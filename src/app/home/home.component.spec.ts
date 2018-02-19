import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeComponent } from '../theme/theme.component';
import { VisitComponent } from '../visit/visit.component';
import { GuideComponent } from '../guide/guide.component';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemeComponent, VisitComponent, GuideComponent, HomeComponent ]
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
