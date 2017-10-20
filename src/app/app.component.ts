import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../../node_modules/bulma/css/bulma.css']
})



export class AppComponent {

  // private errorMsg: string;
  // private errorFlag: boolean;

  // callService() {
  //   this.appService.getVisits()
  //     .subscribe(
  //       (data: VisitModel[]) => { this.visits = data; },
  //       (error) =>  { this.errorMsg = error; this.errorFlag = true; }
  //     );
  // }

  // constructor(private appService: AppService) {}

  // ngOnInit() {
  //   this.callService();
  // }
}
