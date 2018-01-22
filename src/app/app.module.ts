import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { VisitComponent, VisitSuggestionComponent, VisitForOneThemeComponent } from './visit/visit.component';
import { ThemeComponent } from './theme/theme.component';
import { GuideComponent } from './guide/guide.component';
import { ResearchComponent } from './research/research.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { VisitDetailsComponent } from './visit-details/visit-details.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ProfilComponent } from './profil/profil.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'visit', component: VisitDetailsComponent },
  { path: 'theme', component: VisitForOneThemeComponent},
  { path: 'profil', component: ProfilComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    VisitComponent,
    VisitSuggestionComponent,
    ThemeComponent,
    GuideComponent,
    ResearchComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    VisitDetailsComponent,
    ReviewsComponent,
    ProfilComponent,
    VisitForOneThemeComponent
  ],
  imports: [
    BrowserModule, HttpModule, RouterModule.forRoot(routes)
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
