import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SpaceshipListComponent} from "./spaceship-list/spaceship-list.component";
import {SingleSpaceshipComponent} from "./single-spaceship/single-spaceship.component";
import {SinglePilotComponent} from "./single-pilot/single-pilot.component";

const routes: Routes = [
  {path: 'pilot/:id', component: SinglePilotComponent, data: {routeName: "Pilot's resume"}},
  {path: 'spaceship/:id', component: SingleSpaceshipComponent, data: {routeName: "Spaceship overview"}},
  {path: 'spaceship', component: SpaceshipListComponent},
  {path: '', component: SpaceshipListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
