import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { VisitComponent } from './visit/visit.component';
import { ThemeComponent } from './theme/theme.component';
import { GuideComponent } from './guide/guide.component';
import { ResearchComponent } from './research/research.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ThemeDetailComponent } from './theme-detail/theme-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'auth', component: AuthenticationComponent },
  { path: 'theme', component: ThemeDetailComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    VisitComponent,
    ThemeComponent,
    GuideComponent,
    ResearchComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AuthenticationComponent,
    ThemeDetailComponent
  ],
  imports: [
    BrowserModule, HttpModule, RouterModule.forRoot(routes)
  ],
  providers: [ AppService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
