import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import {routing} from './app.routing';
import { MusicHubComponent } from './music-hub/music-hub.component';
import {PersonServiceClient} from './services/person.service.client';
import {FormsModule} from '@angular/forms';
import {NapsterServiceClient} from './services/napster.service.client';
import { SearchResultsComponent } from './search-results/search-results.component';
import { TrackResultsListComponent } from './track-results-list/track-results-list.component';
import { CriticComponent } from './critic/critic.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    HomeComponent,
    MusicHubComponent,
    SearchResultsComponent,
    TrackResultsListComponent,
    CriticComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    FontAwesomeModule
  ],
  providers: [PersonServiceClient, NapsterServiceClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
