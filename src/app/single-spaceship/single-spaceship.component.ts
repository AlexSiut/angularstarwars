import {Component, OnInit} from '@angular/core';
import {detailSpaceship} from "../models/spaceship.model";
import {SpaceshipsService} from "../services/spaceships.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-single-spaceship',
  templateUrl: './single-spaceship.component.html',
  styleUrls: ['./single-spaceship.component.scss']
})
export class SingleSpaceshipComponent implements OnInit {
  Spaceship!: detailSpaceship;
  isDataAvailable: boolean = false;
  Breadcrumb: string = "Spaceship overview";

  constructor(private SpaceshipsService: SpaceshipsService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const spaceshipId = +this.route.snapshot.params['id'];
    this.getDetailsCurrentSpaceship(spaceshipId);
  }

  getDetailsCurrentSpaceship(spaceshipId: number) {
    if (this.SpaceshipsService.listSpaceships) {
      this.Spaceship = this.SpaceshipsService.listSpaceships.filter(item => item.id === spaceshipId)[0];
      this.isDataAvailable = true;
    } else {
      this.isDataAvailable = false;
      this.SpaceshipsService.getSingleSpaceShipbyURL(this.SpaceshipsService.apiURLSpaceship + spaceshipId + '/').subscribe(Spaceship => {
          this.Spaceship = Spaceship;
        }, () => {
          return false;
        },
        () => {
          this.loadDataOnInit();
        });
    }
    return false;
  }

  loadDataOnInit() {
    var j: number;
    var lastPilot: number;
    var numberRequiredPilots: number = 0;
    this.SpaceshipsService.listPilots = [];
    this.SpaceshipsService.listHomeWorld = [];
    if (this.Spaceship.pilots !== undefined && this.Spaceship.pilots!.length > 0) {
      lastPilot = this.Spaceship.pilots!.length;
      for (j = 0; j < lastPilot; j++) {
        if (this.Spaceship.pilots![j] !== undefined) {
          numberRequiredPilots++;
          var urlPilotDecoup = this.Spaceship.pilots![j].substr(0, this.Spaceship.pilots![j].length - 1).split('/');
          var pilotIdentifiant = urlPilotDecoup[urlPilotDecoup.length - 1];
          if (pilotIdentifiant > 0) {
            this.Spaceship.listPilots!.push(pilotIdentifiant);
            this.SpaceshipsService.getPilotDetailbyID(this.Spaceship.pilots![j]).subscribe(detailPilotTemp => {
                this.SpaceshipsService.listPilots.push(detailPilotTemp);
              }, () => {
                return false;
              },
              () => {
                if (this.SpaceshipsService.listPilots.length == numberRequiredPilots)
                  this.isDataAvailable = true;
              });
          }
        }
      }
    } else {
      this.isDataAvailable = true;
    }
    return false;
  }

}


