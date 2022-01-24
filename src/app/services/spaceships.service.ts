import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {detailSpaceship} from "../models/spaceship.model";
import {detailPilot} from "../models/detailpilots.model";
import {detailPlanet} from "../models/detailplanet.model";
import {detailSpecie} from "../models/detailspecie.model";
import {SpaceshipListResponse} from "../spaceship-list/spaceship";
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class SpaceshipsService {

  apiURL = 'https://swapi.dev/api/starships/?format=json';
  nextApiURL:any = null;
  apiURLimg = 'https://api.unsplash.com/search/photos?client_id=WzhWr0Gs2TWNMRioqzx957Hz7NYfLq3nhQTs19Rs-Eo';
  apiURLSpaceship = 'https://swapi.dev/api/starships/';
  apiURLPilot = 'https://swapi.dev/api/people/';
  listSpaceships: detailSpaceship[];
  listPilots: detailPilot[];
  listHomeWorld: detailPlanet[];
  listPictures: any[];
  listPicturesPilots: any[];
  numberPilotsRequired:number;


  constructor(private httpClient: HttpClient) {
    this.listPictures = this.getListPictureSpaceshipbyKeyWord();
    this.listPicturesPilots = this.getListPicturePilotsbyKeyWord();
  }

  getSpaceships(): Observable<detailSpaceship[]> {
    return this.httpClient.get<SpaceshipListResponse>(this.apiURL)
      .pipe(map(listSpaceshipsResponse => {
        var self = this;
        listSpaceshipsResponse.results.forEach(function (value, key) {
          if(value.url){
            var urlSpaceshipDecoup = value.url.substr(0, value.url.length - 1).split('/');
            value.id = Number(urlSpaceshipDecoup[urlSpaceshipDecoup.length - 1]);
          }
          if (value.name) {
            var picture = self.getPictureSpaceshipbyKey(Math.round(value.id/10));
            value.picture = picture;
            value.listPilots = [];
          }
        });
        var MappingResult =
          listSpaceshipsResponse.results.map(
            item => new detailSpaceship(item.id,
              item.name,
              item.model,
              item.picture,
              item.manufacturer,
              item.cost_in_credits,
              item.length,
              item.max_atmosphering_speed,
              item.crew,
              item.passengers,
              item.cargo_capacity,
              item.consumables,
              item.hyperdrive_rating,
              item.MGLT,
              item.starship_class,
              item.pilots,
              item.listPilots,
              item.url,
            ),
          );
        if(this.listSpaceships) {
          this.listSpaceships = this.listSpaceships.concat(MappingResult);
        }else{
          this.listSpaceships = MappingResult;
        }
        return this.listSpaceships;
      }));
  }

  getSpaceshipsNextURL(): Observable<any> {
      return this.httpClient.get<SpaceshipListResponse>(this.apiURL)
        .pipe(map(listSpaceshipsResponse => {
          this.nextApiURL = listSpaceshipsResponse.next;
          return this.nextApiURL;
        }));

  }

  getSingleSpaceShipbyURL(url: string): Observable<detailSpaceship>{
    return this.httpClient.get<detailSpaceship>(url).pipe(map(detailSpaceshipReturn => {
    if(detailSpaceshipReturn.url){
      var urlSpaceshipDecoup = detailSpaceshipReturn.url.substr(0, detailSpaceshipReturn.url.length - 1).split('/');
      detailSpaceshipReturn.id = Number(urlSpaceshipDecoup[urlSpaceshipDecoup.length - 1]);
    }
    if (detailSpaceshipReturn.name) {
      var picture = this.getPictureSpaceshipbyKey(Math.round(detailSpaceshipReturn.id/10));
      detailSpaceshipReturn.picture = picture;
      detailSpaceshipReturn.listPilots = [];
    }

      return new detailSpaceship(
        detailSpaceshipReturn.id,
        detailSpaceshipReturn.name,
        detailSpaceshipReturn.model,
        detailSpaceshipReturn.picture,
        detailSpaceshipReturn.manufacturer,
        detailSpaceshipReturn.cost_in_credits,
        detailSpaceshipReturn.length,
        detailSpaceshipReturn.max_atmosphering_speed,
        detailSpaceshipReturn.crew,
        detailSpaceshipReturn.passengers,
        detailSpaceshipReturn.cargo_capacity,
        detailSpaceshipReturn.consumables,
        detailSpaceshipReturn.hyperdrive_rating,
        detailSpaceshipReturn.MGLT,
        detailSpaceshipReturn.starship_class,
        detailSpaceshipReturn.pilots,
        detailSpaceshipReturn.listPilots,
        detailSpaceshipReturn.url);
    }));
  }

  getSingleSpeciebyURL(url: string): Observable<detailSpecie>{
    return this.httpClient.get<detailSpecie>(url).pipe(map(detailSpecieReturn => {
      return new detailSpecie(
        detailSpecieReturn.name,
        detailSpecieReturn.classification,
        detailSpecieReturn.language);
    }));
  }

  getPictureSpaceshipbyKey(key: number) {
    if (this.listPictures) {
      const foundItem = this.listPictures[key];
      if (foundItem) {
        return foundItem['urls']['regular'];
      }
    }
  }

  getPicturePilotsbyKey(key: number) {
    if (this.listPicturesPilots) {
      const foundItem = this.listPicturesPilots[key];
      if (foundItem) {
        return foundItem['urls']['regular'];
      }
    }
  }

  getPilotDetailbyID(url: string): Observable<detailPilot> {
    this.numberPilotsRequired++;
    return this.httpClient.get<detailPilot>(url).pipe(map(detailPilotReturn =>
    {
      var pilotIdentifiant = detailPilotReturn.id;
      if(detailPilotReturn.url){
        var urlPilotDecoup = detailPilotReturn.url.substr(0, detailPilotReturn.url.length - 1).split('/');
        pilotIdentifiant = Number(urlPilotDecoup[urlPilotDecoup.length - 1]);
      }

      var picture = this.getPicturePilotsbyKey(Math.floor(Math.random() * 10));

          return new detailPilot(pilotIdentifiant,
            detailPilotReturn.name,
            detailPilotReturn.height,
            detailPilotReturn.mass,
            detailPilotReturn.hair_color,
            detailPilotReturn.skin_color,
            detailPilotReturn.eye_color,
            detailPilotReturn.birth_year,
            detailPilotReturn.gender,
            detailPilotReturn.homeworld,
            detailPilotReturn.url,
            picture,
            detailPilotReturn.homeworld,
            detailPilotReturn.starships,
            detailPilotReturn.species
          );
    }
    ));
  }


  getObservableDetailHomeWordlbyURL(url: string):Observable<detailPlanet> {
    return this.httpClient.get<detailPlanet>(url).pipe(map(detailPlanetReturn => {
      return new detailPlanet(detailPlanetReturn.name);
    }));
  }



  getListPictureSpaceshipbyKeyWord(): any {
    var SearcQuery = "spaceship";
    return this.httpClient.get<any>(this.apiURLimg + '&query=' + SearcQuery).subscribe(res => {
      this.listPictures = res.results;
    });
  }

  getListPicturePilotsbyKeyWord(): any {
    var SearcQuery = "single people";
    return this.httpClient.get<any>(this.apiURLimg + '&query=' + SearcQuery).subscribe(res => {
      this.listPicturesPilots = res.results;
    });
  }

}
