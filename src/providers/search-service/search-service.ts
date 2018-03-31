import { SharedServiceProvider } from './../shared-service/shared-service';
import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';

import { BaseServiceProvider } from "../base-service/base-service";

/*
  Generated class for the SearchServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SearchServiceProvider {
  private PATH: string = '/search';

  constructor(public baseService: BaseServiceProvider, public sharedService: SharedServiceProvider) {
    console.log('Hello SearchServiceProvider Provider');
  }

  public searchForAll(keyword) {
    let params = new URLSearchParams();
    params.set('q', keyword);
    params.append('types[]', 'all');
    if (this.sharedService.searchOptions) {
      params = this.setSearchOptionsParams(params, this.sharedService.searchOptions);
    } else {
      console.log("[SearchForAll] No search options available.");
    }
    return this.baseService.setParams(params).get(this.PATH);
  }

  public searchProfiles(keyword) {
    let params = new URLSearchParams();
    params.set('q', keyword);
    params.append('types[]', 'profiles');
    if (this.sharedService.searchOptions) {
      params = this.setSearchOptionsParams(params, this.sharedService.searchOptions);
    } else {
      console.log("[searchProfiles] No search options available.");
    }
    return this.baseService.setParams(params).get(this.PATH);
  }

  public searchPlaygrounds(keyword) {
    let params = new URLSearchParams();
    params.set('q', keyword);
    params.append('types[]', 'playgrounds');
    if (this.sharedService.searchOptions) {
      params = this.setSearchOptionsParams(params, this.sharedService.searchOptions);
    } else {
      console.log("[searchPlaygrounds] No search options available.");
    }
    return this.baseService.setParams(params).get(this.PATH);
  }

  private setSearchOptionsParams(params, options) {
    if (options['profile_friends_only']) {
      params.set('profile_friends_only', options['profile_friends_only'] ? 1 : 0);
    }
    if (options['playground_favorites_only']) {
      params.set('playground_favorites_only', options['playground_favorites_only'] ? 1 : 0);
    }
    if (options['profile_age_all']) {
      params.set('profile_age_all', options['profile_age_all'] ? 1 : 0);
    }
    if (options['profile_age_under_2years_old']) {
      params.set('profile_age_under_2years_old', options['profile_age_under_2years_old'] ? 1 : 0);
    }
    if (options['profile_age_over_2years_old']) {
      params.set('profile_age_over_2years_old', options['profile_age_over_2years_old'] ? 1 : 0);
    }
    if (options['profile_gender_all']) {
      params.set('profile_gender_all', options['profile_gender_all'] ? 1 : 0);
    }
    if (options['profile_gender_male']) {
      params.set('profile_gender_male', options['profile_gender_male'] ? 1 : 0);
    }
    if (options['profile_gender_female']) {
      params.set('profile_gender_female', options['profile_gender_female'] ? 1 : 0);
    }

    return params;
  }

}
