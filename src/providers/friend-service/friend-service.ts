import {Injectable} from '@angular/core';
import { RequestOptions, URLSearchParams } from '@angular/http';
import { BaseServiceProvider } from '../base-service/base-service';

/*
 Generated class for the FriendServiceProvider provider.
 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class FriendServiceProvider {

  private PATH: string = '/friend';
  options: RequestOptions;

  constructor(public baseService: BaseServiceProvider) {
  }

  public findFriends() {
    return this.baseService.get(this.PATH + '/list');
  }

  public getFriendRequests(page: number, limit: number){
    let params = new URLSearchParams();
    params.set('page', page.toString());
    params.set('limit', limit.toString());
    return this.baseService.setParams(params).get(this.PATH +"/request/list");
  }

  public acceptFriendRequests(id: number){
    return this.baseService.patch(this.PATH + '/request/' + id + '/accept', null);
  }

  public rejectFriendRequests(id: number){
    return this.baseService.delete(this.PATH + '/request/' + id);
  }

  public sendFriendRequest(data) {
    return this.baseService.post(this.PATH + '/request', data);
  }
}
