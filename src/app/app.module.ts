import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { VisitComponent } from './visit.component'
import { ThemeComponent } from './theme.component'

@NgModule({
  declarations: [
    AppComponent,
    VisitComponent,
    ThemeComponent
  ],
  imports: [
    BrowserModule, HttpModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
