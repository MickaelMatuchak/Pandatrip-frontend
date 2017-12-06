import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { VisitComponent } from './visit/visit.component';
import { ThemeComponent } from './theme/theme.component';
import { GuideComponent } from './guide/guide.component';
import { ResearchComponent } from './research/research.component';

@NgModule({
  declarations: [
    AppComponent,
    VisitComponent,
    ThemeComponent,
    GuideComponent,
    ResearchComponent
  ],
  imports: [
    BrowserModule, HttpModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
