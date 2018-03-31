import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {BaseServiceProvider} from "../base-service/base-service";

/*
 Generated class for the UserServiceProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class ProfileServiceProvider {
  private PATH: string = '/profile';

  constructor(public http: Http, public baseService: BaseServiceProvider) {
  }

  public getMyProfile() {
    return this.baseService.get(this.PATH + '/me');
  }

  public getUserProfile(id) {
    return this.baseService.get(this.PATH + '/' + id);
  }

}
