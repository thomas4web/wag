import { Injectable } from '@angular/core';
import {BaseServiceProvider} from "../base-service/base-service";
import {Device} from "@ionic-native/device";

/*
  Generated class for the DeviceTokenServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class DeviceTokenServiceProvider {

  constructor(
    private device: Device,
    private baseService: BaseServiceProvider
  ) {
    console.log('Hello DeviceTokenServiceProvider Provider');
  }

  updateToken(deviceToken: string) {
    let data = {
      'client': this.device.platform,
      'token': deviceToken,
    }
    return this.baseService.put('/device-token', data);
  }

}
