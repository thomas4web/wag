import {Injectable} from '@angular/core';
import {URLSearchParams} from '@angular/http';

import {BaseServiceProvider} from "../base-service/base-service";
import {AppConfig} from "../../app/app.config";
import {Device} from "@ionic-native/device";
import {Storage} from "@ionic/storage";
import {DeviceTokenServiceProvider} from "../device-token-service/device-token-service";

/*
 Generated class for the UserServiceProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class UserServiceProvider {

  constructor(
    private appConfig: AppConfig,
    private device: Device,
    private storage: Storage,
    private deviceTokenService: DeviceTokenServiceProvider,
    private baseService: BaseServiceProvider,
  ) {
    console.log('Hello UserServiceProvider Provider');
  }

  public socialLogin(provider: string, token: string) {
    let params = new URLSearchParams();
    params.set('code', token);
    params.set('client', this.device.platform);
    params.set('device_token', this.appConfig.deviceToken);
    return this.baseService.setParams(params).get('/auth/social/' + provider + '/handle_access_token');
  }

  public socialLoginUsingServerAuthCode(provider: string, code: string) {
    let params = new URLSearchParams();
    params.set('code', code);
    params.set('client', this.device.platform);
    params.set('device_token', this.appConfig.deviceToken);
    return this.baseService.setParams(params).get('/auth/social/' + provider + '/handle');
  }

  public getMe() {
    return this.baseService.get('/user/me');
  }

  private PATH_PROFILE = '/profile'

  public updateProfile(data) {
    return this.baseService.put(this.PATH_PROFILE + '/me', data);
  }

  public createProfile(data) {
    return this.baseService.post(this.PATH_PROFILE, data);
  }

  public logout(): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      Promise.all([
        this.storage.remove('provider'),
        this.storage.remove('token'),
        this.storage.remove('user'),
      ]).then(() => {
        debugger;
        this.appConfig.token = null;
        this.deviceTokenService.updateToken(this.appConfig.deviceToken).subscribe();
        resolve();
      }).catch((error) => {
        reject(error);
      });
    });

    return promise;
  }

}
