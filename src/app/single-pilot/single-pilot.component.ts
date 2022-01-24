import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SpaceshipsService} from "../services/spaceships.service";
import {detailPilot} from "../models/detailpilots.model";
import {detailPlanet} from "../models/detailplanet.model";
import {detailSpecie} from "../models/detailspecie.model";
import {detailSpaceship} from "../models/spaceship.model";


@Component({
  selector: 'app-single-pilot',
  templateUrl: './single-pilot.component.html',
  styleUrls: ['./single-pilot.component.scss']
})
export class SinglePilotComponent implements OnInit {
  detailPilotReturned!: detailPilot;
  isDataAvailable: boolean = false;
  numberDatatoComplet: number = 0;
  numberDataCompleted: number = 0;
  detailHomeWorld: detailPlanet;
  listSpaceshipsPilot: detailSpaceship[];
  listSpeciesPilot: detailSpecie[];
  displayListSpaceshipPilotCapacities: any;


  constructor(private SpaceshipsService: SpaceshipsService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const pilotId = +this.route.snapshot.params['id'];
    this.getDetailsCurrentPilot(pilotId);
  }

  getDetailsCurrentPilot(pilotId: number) {
    if (this.SpaceshipsService.listPilots) {
      this.isDataAvailable = false;
      this.detailPilotReturned = this.SpaceshipsService.listPilots.filter(item => item.id === pilotId)[0];
      this.getOtherDatasbyPilot();
    } else {
      this.isDataAvailable = false;
      this.SpaceshipsService.getPilotDetailbyID(this.SpaceshipsService.apiURLPilot + pilotId + '/').subscribe(detailPilot => {
          this.detailPilotReturned = detailPilot;
        }, () => {
          return false;
        },
        () => {
          this.getOtherDatasbyPilot();
        });
    }
  }

  getOtherDatasbyPilot() {
    if (this.detailPilotReturned.starships) {
      this.numberDatatoComplet++;
      var self = this;
      var itemsProcessed = 0;
      this.detailPilotReturned.starships.forEach(function (item) {
        self.listSpaceshipsPilot = [];
        self.SpaceshipsService.getSingleSpaceShipbyURL(item).subscribe(detailSpaceship => {
            self.listSpaceshipsPilot.push(detailSpaceship);
          }, () => {
            return false;
          },
          () => {
            itemsProcessed++;
            if (itemsProcessed === self.detailPilotReturned.starships!.length) {
              self.setPilotCapacities();
            }
          });
      });
    }


    if (this.detailPilotReturned.urlHomeWorld) {
      this.SpaceshipsService.getObservableDetailHomeWordlbyURL(this.detailPilotReturned.homeworld!).subscribe(detailPlanet => {
        this.detailHomeWorld = detailPlanet;
        }, () => {
          return false;
        },
        () => {
          this.numberDataCompleted++;
          this.displayDataCompleted();
        });
    }

    if (this.detailPilotReturned.species) {
      var self = this;
      this.detailPilotReturned.species.forEach(function (item) {
        self.listSpeciesPilot = [];
        self.SpaceshipsService.getSingleSpeciebyURL(item).subscribe(detailSpecie => {
            self.listSpeciesPilot.push(detailSpecie);
          }, () => {
            return false;
          },
            () => {
              self.numberDataCompleted++;
              self.displayDataCompleted();
            });
      });
    }

  }

  getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  setPilotCapacities() {
    this.displayListSpaceshipPilotCapacities = [];
    var self = this;
    this.listSpaceshipsPilot.forEach(function (item) {
      self.displayListSpaceshipPilotCapacities.push({'name': item['name'], 'number':self.getRandomIntInclusive(50, 90), 'numberCrashes':self.getRandomIntInclusive(0, 40)})
    });
    this.numberDataCompleted++;
    this.displayDataCompleted();
  }

  displayDataCompleted() {
    console.log(this.displayListSpaceshipPilotCapacities);
    if(this.numberDataCompleted === this.numberDatatoComplet){
      this.isDataAvailable = true;
    }
  }

}
