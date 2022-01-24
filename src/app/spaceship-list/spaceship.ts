import {detailSpaceship} from "../models/spaceship.model";

export interface SpaceshipListResponse  {
  count: number;
  next: string;
  previous: string;
  results: Array<
    detailSpaceship
  >;
}
