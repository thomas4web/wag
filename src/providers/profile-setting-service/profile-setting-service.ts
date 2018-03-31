import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {BaseServiceProvider} from "../base-service/base-service";

/*
  Generated class for the ProfileSettingServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ProfileSettingServiceProvider {

  constructor(private baseService: BaseServiceProvider) {
    console.log('Hello ProfileSettingServiceProvider Provider');
  }

  getSettings() {
    return this.baseService.get('/profile/settings');
  }

  patchSettings(data) {
    return this.baseService.patch('/profile/settings', data);
  }

}
