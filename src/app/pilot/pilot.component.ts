import {Component, Input, OnInit} from '@angular/core';
import {detailPilot} from "../models/detailpilots.model";
import {detailPlanet} from "../models/detailplanet.model";
import {SpaceshipsService} from "../services/spaceships.service";
import {Router} from "@angular/router";
import {detailSpaceship} from "../models/spaceship.model";

@Component({
  selector: 'app-pilot',
  templateUrl: './pilot.component.html',
  styleUrls: ['./pilot.component.scss']
})
export class PilotComponent implements OnInit {
  @Input() idPilot!: number;
  detailPilotReturned: detailPilot;
  detailHomeWorld: detailPlanet;
  listSpaceshipsPilot: detailSpaceship[];

  constructor(private SpaceshipsService: SpaceshipsService, private router: Router) {
  }

  ngOnInit(): void {
    var idPilotNumber: number = +this.idPilot;
    this.detailPilotReturned =  this.SpaceshipsService.listPilots.filter(item => item.id === idPilotNumber)[0];
    if(this.detailPilotReturned.urlHomeWorld) {
      this.SpaceshipsService.getObservableDetailHomeWordlbyURL(this.detailPilotReturned.homeworld!).subscribe(detailPlanet => {
        this.detailHomeWorld = detailPlanet;
      });
      if(this.detailPilotReturned.starships) {
        var self = this;
        this.detailPilotReturned.starships.forEach(function(item){
          self.listSpaceshipsPilot = [];
          self.SpaceshipsService.getSingleSpaceShipbyURL(item).subscribe(detailSpaceship => {
            self.listSpaceshipsPilot.push(detailSpaceship);
          });
        });
      }

    }

  }

  onViewPilot(){
    this.router.navigateByUrl(`pilot/${this.detailPilotReturned.id}`);
  }



}
