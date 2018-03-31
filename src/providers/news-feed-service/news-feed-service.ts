import {Injectable} from '@angular/core';
import {URLSearchParams} from '@angular/http';

import {BaseServiceProvider} from "../base-service/base-service";

/*
 Generated class for the UserServiceProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class NewsFeedServiceProvider {

  constructor(private baseService: BaseServiceProvider,) {
    console.log('Hello NewsFeedServiceProvider Provider');
  }

  public getList(latest_id: number, limit: number, page: number) {
    let params = new URLSearchParams();
    params.set('limit', limit.toString());
    params.set('page', page.toString());
    if (latest_id) {
      params.set('lastest_id', latest_id.toString());
    }
    return this.baseService.setParams(params).get('/news_feed');
  }

}
