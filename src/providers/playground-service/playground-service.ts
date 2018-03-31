import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { BaseServiceProvider } from '../base-service/base-service';

/*
  Generated class for the PlaygroundServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PlaygroundServiceProvider {

  private PATH: string = '/playground';

  constructor(private baseService: BaseServiceProvider) {
  }

  public checkIn(data) {
    return this.baseService.post(this.PATH + '/checkin', data);
  }

  public checkInExisting(data) {
    return this.baseService.post(this.PATH + '/' + data.id + '/checkin', data);
  }

  public addToFavorite(data) {
    return this.baseService.post(this.PATH + '/' + data.id + '/favorite', data);
  }

  public deleteFromFavorite(id) {
    return this.baseService.delete(this.PATH + '/' + id + '/favorite');
  }

  public findPlaygroundById(id) {
    return this.baseService.get(this.PATH + '/' + id);
  }

  public findCheckedInPlaygrounds() {
    return this.baseService.get(this.PATH + '/checkedin');
  }

  public findNearbyPlaygrounds(params) {
    return this.baseService.get(this.PATH + '/nearby?'
      + 'lat=' + params.lat
      + '&lng=' + params.lng
      + '&show_in=' + params.show_in
    )
  }

  public findFavouritePlaygrounds() {
    return this.baseService.get(this.PATH + '/favorite')
  }

  public getLastCheckin() {
    return this.baseService.get(this.PATH + '/last_checkin');
  }

  public getTopCheckins(limit: number) {
    let params = new URLSearchParams();
    params.set('limit', limit.toString());
    return this.baseService.setParams(params).get(this.PATH + '/top_checkins');
  }

}
