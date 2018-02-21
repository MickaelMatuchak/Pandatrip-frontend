import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {SearchComponent} from './search.component';
import {HttpModule} from '@angular/http';
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule} from '@angular/forms';
import {AppSharedService} from '../app-shared-service';
import {VisitFilterPipe} from './visit-filter.pipe';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, FormsModule, RouterTestingModule],
      declarations: [SearchComponent, VisitFilterPipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
  it('should create', () => {
    expect(component).toBeTruthy(); 
  });
}); 
