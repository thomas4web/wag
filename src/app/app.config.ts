import { Injectable } from "@angular/core";
import {Device} from "@ionic-native/device";

@Injectable()
export class AppConfig {
    // public readonly API_ENDPOINT = 'http://ngoctp.wagdag.devserver1.ngoctp.com/api';
    // public readonly API_ENDPOINT = 'http://ngoctp.wagdag.localhost.ngoctp.com/api';
    // public readonly API_ENDPOINT = 'http://ngoctp.wagdag.10-0-2-2.ngoctp.com/api';
    public readonly WEB_CLIENT_ID = '414607533023-pcrpi7j1fmiiqeurjrcjd57g2cqbp02r.apps.googleusercontent.com';
    public token: string;
    public deviceToken: string;

    //hoangtv
    // public readonly pubnub = {
    //   publishKey: 'pub-c-081ef20d-c47a-484c-acef-b5f3461e8b39',
    //   subscribeKey: 'sub-c-7ec1f28a-4712-11e7-ac6c-0619f8945a4f',
    // }

    //wagdag.inc
    public readonly pubnub = {
      publishKey: 'pub-c-edbb9dbc-3bae-4d7c-8f09-98c8af8a5bc5',
      subscribeKey: 'sub-c-b54c7e2c-7801-11e7-abcd-02ee2ddab7fe',
    }

    constructor(
      // private sharedService: SharedServiceProvider,
      private device: Device,
    ) {
      console.log('Device', this.device);
    }

    public readonly googleLoginOptions = {
      'scopes': 'profile email', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
      'webClientId': this.WEB_CLIENT_ID, // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
      'offline': true,
    }

    get API_ENDPOINT(): string {
      if (this.device.isVirtual) {

        if (this.device.platform == 'Android') {
          return 'http://ngoctp.wagdag.10-0-2-2.ngoctp.com/api';
        } else if (this.device.platform == 'iOS') {
          return 'http://ngoctp.local/api';
        }

      }

      // return 'http://ngoctp.wagdag.localhost.ngoctp.com/api';
      return 'http://api.wagdag.com/api';
    }
}
