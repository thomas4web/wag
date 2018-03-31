import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {BaseServiceProvider} from "../base-service/base-service";

/*
  Generated class for the PrivateMessageServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class PrivateMessageServiceProvider {

  constructor(private baseService: BaseServiceProvider) {
  }

  public sendMessage(profileId: number, message: string) {
    let data = {
      message: message,
    };
    return this.baseService.post('/profile/' + profileId + '/message', data);
  }

}
