import {Component, OnInit} from '@angular/core';
import {detailSpaceship} from "../models/spaceship.model";
import {SpaceshipsService} from "../services/spaceships.service";

@Component({
  selector: 'app-spaceship-list',
  templateUrl: './spaceship-list.component.html',
  styleUrls: ['./spaceship-list.component.scss']
})

export class SpaceshipListComponent implements OnInit {

  Spaceships!: detailSpaceship[];
  isDataAvailable: boolean = false;


  constructor(private SpaceshipsService: SpaceshipsService) {
  }

  ngOnInit() {
    var self = this;
    if (this.SpaceshipsService.listSpaceships) {
      this.Spaceships = this.SpaceshipsService.listSpaceships;
      this.isDataAvailable = true;
    } else {
      this.callSpaceShipsAPI();
    }

  }


  callSpaceShipsAPI() {
    this.SpaceshipsService.getSpaceships().subscribe(Spaceships => {
        this.Spaceships = Spaceships;
      }, () => {
        return false;
      },
      () => {
        this.SpaceshipsService.getSpaceshipsNextURL().subscribe(SpaceshipsNextUrl => {
          this.SpaceshipsService.nextApiURL = SpaceshipsNextUrl;
          if (SpaceshipsNextUrl && this.SpaceshipsService.apiURL != SpaceshipsNextUrl) {
            this.SpaceshipsService.apiURL = SpaceshipsNextUrl;
            this.callSpaceShipsAPI();
          } else if (SpaceshipsNextUrl === null) {
            this.loadDataOnInit();
          }
        });
      });
  }


  loadDataOnInit() {
    var i: number;
    var j: number;
    var lastShip: number;
    var lastPilot: number;
    var numberRequiredPilots: number;
    if (this.Spaceships !== undefined && this.Spaceships.length > 0) {
      lastShip = this.Spaceships.length;
      numberRequiredPilots = 0;
      this.SpaceshipsService.listPilots = [];
      for (i = 0; i < lastShip; i++) {
        if (this.Spaceships[i].pilots! !== undefined && this.Spaceships[i].pilots!.length > 0) {
          lastPilot = this.Spaceships[i].pilots!.length;
          for (j = 0; j < lastPilot; j++) {
            if (this.Spaceships[i].pilots![j] !== undefined) {
              numberRequiredPilots++;
              var urlPilotDecoup = this.Spaceships[i].pilots![j].substr(0, this.Spaceships[i].pilots![j].length - 1).split('/');
              var pilotIdentifiant = urlPilotDecoup[urlPilotDecoup.length - 1];
              if (pilotIdentifiant > 0) {
                this.Spaceships[i].listPilots!.push(pilotIdentifiant);
                this.SpaceshipsService.getPilotDetailbyID(this.Spaceships[i].pilots![j]).subscribe(detailPilotTemp => {
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
        }
      }
    }
    return false;
  }
}
