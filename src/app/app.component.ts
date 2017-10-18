import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { VisitModel } from './visit.model';
import { VisitComponent } from './visit.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit {
  visits: VisitModel[];

  private errorMsg: string;
  private errorFlag: boolean;

  callService() {
    this.appService.getVisits()
      .subscribe(
        (data: VisitModel[]) => { this.visits = data; },
        (error) =>  { this.errorMsg = error; this.errorFlag = true; }
      );
  }

  constructor(private appService: AppService) {}

  ngOnInit() {
    // this.callService();
  }
}
