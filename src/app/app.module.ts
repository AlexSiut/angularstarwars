import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SpaceshipComponent } from './spaceship/spaceship.component';
import { SpaceshipListComponent } from './spaceship-list/spaceship-list.component';
import { HttpClientModule } from "@angular/common/http";
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { SingleSpaceshipComponent } from './single-spaceship/single-spaceship.component';
import { PilotComponent } from './pilot/pilot.component';
import { SinglePilotComponent } from './single-pilot/single-pilot.component';

@NgModule({
  declarations: [
    AppComponent,
    SpaceshipComponent,
    SpaceshipListComponent,
    HeaderComponent,
    SingleSpaceshipComponent,
    PilotComponent,
    SinglePilotComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
