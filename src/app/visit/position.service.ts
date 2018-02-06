import {Injectable} from "@angular/core";
import {Http} from "@angular/http";


@Injectable()
export class PositionService {

  constructor(private http: Http) {
  }

  getPosition(latitude, longitude) {
    const url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+'%2C'+longitude+'&sensor=true';
    return this.http.get(url)
      .toPromise()
      .then(response => response.json());
  }
}
