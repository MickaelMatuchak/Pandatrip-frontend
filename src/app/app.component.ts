import {Component, OnInit, OnChanges} from '@angular/core';
import {Router} from '@angular/router';
import {AppService} from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../../node_modules/bulma/css/bulma.css', '../../node_modules/font-awesome/css/font-awesome.css'],
  providers: [AppService]
})

export class AppComponent implements OnInit, OnChanges {

  isConnected: boolean = false;
  isGuide: boolean = false;
  search: string = '';

  constructor(
    private router: Router,
    private appService: AppService) {

    }

  ngOnInit() {
    this.isConnected = this.appService.loggedIn();

    if (this.isConnected) {
      const tokenDecoded = this.appService.decodeToken();
      this.isGuide = this.appService.initialiseIsGuide(tokenDecoded.roles);
    } else {
      this.isGuide = false;
    }
  }

  ngOnChanges() {
    this.isConnected = this.appService.loggedIn();

    if (this.isConnected) {
      const tokenDecoded = this.appService.decodeToken();
      this.appService.initialiseIsGuide(tokenDecoded.roles);
    } else {
      this.isGuide = false;
    }
  }


  logIn(event: any) {
    this.router.navigate(['/login']);
  }

  logOut(event: any) {
    event.stopPropagation();

    this.appService.logOut();
    this.isConnected = false;
    this.isGuide = false;

    this.router.navigate(['/home']);
  }
}
