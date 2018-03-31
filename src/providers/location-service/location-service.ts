import { Injectable, isDevMode } from '@angular/core';
import 'rxjs/add/operator/map';

import { Geolocation, Coordinates } from '@ionic-native/geolocation';

import { SharedServiceProvider } from '../shared-service/shared-service';

/*
  Generated class for the LocationServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LocationServiceProvider {

  constructor(private sharedService: SharedServiceProvider, private geolocation: Geolocation) {
  }

  getCurrentPosition(): Promise<Coordinates> {
    return new Promise((resolve, reject) => {
      this.geolocation.getCurrentPosition().then(response => {
        resolve(response.coords);
      }).catch(error => {
        console.log('Could not find current location: ' + error.message);

        if (isDevMode()) {
          resolve({
            latitude: this.sharedService.tempCoordinate.latitude,
            longitude: this.sharedService.tempCoordinate.longitude,
          });
        } else {
          reject(error);
        }

      });
    });

  }

  distance(lat1, lon1, lat2, lon2) {
    let deg2rad = 0.017453292519943295; // === Math.PI / 180
    let cos = Math.cos;
    lat1 *= deg2rad;
    lon1 *= deg2rad;
    lat2 *= deg2rad;
    lon2 *= deg2rad;
    let diam = 12742; // Diameter of the earth in km (2 * 6371)
    let dLat = lat2 - lat1;
    let dLon = lon2 - lon1;
    let a = (
      (1 - cos(dLat)) +
      (1 - cos(dLon)) * cos(lat1) * cos(lat2)
    ) / 2;

    return diam * Math.asin(Math.sqrt(a));
  }

}
