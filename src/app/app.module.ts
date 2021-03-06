import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { HttpModule } from '@angular/http'
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { VisitComponent, VisitSuggestionComponent } from './visit/visit.component';
import { ThemeComponent } from './theme/theme.component';
import { GuideComponent } from './guide/guide.component';
import { ResearchComponent } from './research/research.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ThemeDetailComponent } from './theme-detail/theme-detail.component';
import { VisitDetailsComponent } from './visit-details/visit-details.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ProfilComponent } from './profil/profil.component';
import { RecapComponent } from './recap/recap.component';
import { PartnersComponent } from './partners/partners.component';
import { StarRatingModule } from 'angular-star-rating';
import { CarouselModule } from 'angular4-carousel';
import { SearchComponent } from "./search/search.component";
import { VisitFilterPipe } from './search/visit-filter.pipe';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'theme/:name', component: ThemeDetailComponent},
  {path: 'visit/:name', component: VisitDetailsComponent},
  {path: 'profil', component: ProfilComponent},
  {path: 'recap', component: RecapComponent},
  {path: 'partners', component: PartnersComponent},
  {path: 'search', component: SearchComponent}
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
    ThemeDetailComponent,
    VisitDetailsComponent,
    ReviewsComponent,
    ProfilComponent,
    RecapComponent,
    PartnersComponent,
    SearchComponent,
    VisitFilterPipe
  ],
  imports: [
    BrowserModule, FormsModule,HttpModule, RouterModule.forRoot(routes), StarRatingModule.forRoot(), CarouselModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})

export class AppModule {
}
