import { Component, OnInit, Input } from '@angular/core';
import { detailSpaceship } from "../models/spaceship.model";
import { SpaceshipsService } from "../services/spaceships.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-spaceship',
  templateUrl: './spaceship.component.html',
  styleUrls: ['./spaceship.component.scss']
})

export class SpaceshipComponent implements OnInit {
 @Input() Spaceship!: detailSpaceship;

 constructor(private spaceshipService: SpaceshipsService, private router: Router) { }

  ngOnInit() {
  }

  onViewSpaceship(){
    this.router.navigateByUrl(`spaceship/${this.Spaceship.id}`);
  }
}
