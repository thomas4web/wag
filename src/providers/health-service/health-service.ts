import {Injectable} from '@angular/core';

import {BaseServiceProvider} from "../base-service/base-service";

/*
 Generated class for the UserServiceProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class HealthServiceProvider {
  private PATH: string = '/health';

  constructor(private baseService: BaseServiceProvider,) {
    console.log('Hello HealthServiceProvider Provider');
  }

  public getAll() {
    return this.baseService.get(this.PATH + '/all');
  }

}
