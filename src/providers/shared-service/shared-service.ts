import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { LoadingController, Loading } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {DeviceTokenServiceProvider} from "../device-token-service/device-token-service";
import {AppConfig} from "../../app/app.config";
import {Device} from "@ionic-native/device";
import {Observable} from "rxjs/Observable";

declare var google;

/*
  Generated class for the SharedServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SharedServiceProvider {
  public currentPlaygroundOnMap: any;

  tempCoordinate: any = {
    latitude: 25.1191185,
    longitude: 55.1259269
  };

  markerIcon: any = {
    url: 'assets/images/map-marker.png',
    // size: new google.maps.Size(20, 20),
    // origin: new google.maps.Point(0, 0), // origin
    // anchor: new google.maps.Point(0, 0), // anchor
  };

  markerIconRed: any = {
    url: 'assets/images/map-marker-red.png',
    // size: new google.maps.Size(20, 20),
    // origin: new google.maps.Point(0, 0), // origin
    // anchor: new google.maps.Point(0, 0), // anchor
  };

  private _userDetails: any;
  private _searchOptions: any;

  get userDetails() {
    return this._userDetails;
  }

  set userDetails(value) {
    this._userDetails = value;
    if (value) {
      this.storage.set('user', value);
    } else {
      this.storage.remove('user');
    }
  }

  get searchOptions() {
    if (this._searchOptions) {
      return this._searchOptions;
    } else {
      this.storage.get('searchOptions').then((val) => {
        this._searchOptions = val;
      });
      return this._searchOptions;
    }
  }

  set searchOptions(options) {
    this._searchOptions = options;
    if (options) {
      this.storage.set('searchOptions', options);
    }
  }

  get currentProfile() {
    return this.userDetails ? this.userDetails.profile : null;
  }

  loading: Loading;

  constructor(
    private loadingCtrl: LoadingController,
    private deviceTokenService: DeviceTokenServiceProvider,
    private appConfig: AppConfig,
    private storage: Storage,
    private device: Device,
  ) {
    this.loading = this.loadingCtrl.create({
      content: 'Processing ...'
    });
  }

  isEmulator() {
    return this.device.isVirtual;
  }

  readFileInput(fileInput): Promise<{name: string, size: number, type: string, base64String: string}> {
    let promise = new Promise((resolve, reject) => {
      if (fileInput.files.length) {
        let file: File = fileInput.files[0];
        let myReader: FileReader = new FileReader();

        myReader.onloadend = (e) => {
          resolve({
            name: file.name,
            size: file.size,
            type: file.type,
            base64String: myReader.result.substr(myReader.result.indexOf(',') + 1, myReader.result.length),
          })
        }

        myReader.readAsDataURL(file);

      } else {
        resolve(null);
      }
    });

    return promise;
  }
}
