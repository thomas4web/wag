import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

import { AppConfig } from '../../app/app.config';

import { Storage } from "@ionic/storage";

/*
  Generated class for the CustomHttpProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class BaseServiceProvider {

  private isJsonResponse: boolean = true;
  private isSendingFormData: boolean = false;
  private tempParams: URLSearchParams;
  private tempHeaders: Headers;

  constructor(
    private http: Http,
    private appConfig: AppConfig,
    private storage: Storage,
  ) {
    console.log('Hello BaseServiceProvider Provider');

  }

  private getDefaulRequestOptions() {
    let headers = new Headers();
    if (this.appConfig.token) {
      headers.set('Authorization', `Bearer ${this.appConfig.token}`);
    }
    let requestOptions = new RequestOptions({
      headers: headers,
    });

    return requestOptions;
  }

  private getUrl(url: string) {
    if (url.startsWith('/')){
      url = this.appConfig.API_ENDPOINT + url; // prefix base url
    }

    return url;
  }

  responseAsText() {
    this.isJsonResponse = false;
    return this;
  }

  sendFormData() {
    this.isSendingFormData = true;
    return this;
  }

  setHeaders(headers: Headers) {
    this.tempHeaders = headers;
    return this;
  }

  private makeReqestOptions(): RequestOptions {
    let options: RequestOptions = this.getDefaulRequestOptions();
    if (this.tempParams) {
      options.params = this.tempParams;
      this.tempParams = null;
    }

    if (this.isSendingFormData) {
      options.headers.set('Content-Type','multipart/form-data');
      this.isSendingFormData = false;
    } else {
      options.headers.set('Content-Type','application/json');
    }

    return options;
  }

  setParams(params: URLSearchParams) {
    this.tempParams = params;
    return this;
  }

  private mapResponse(observer: Observable<Response>): Observable<Response> {
    // catch global errors
    observer = this.catchGlobalErrors(observer);

    // get and store new token from response header
    observer = this.updateToken(observer);

    if (this.isJsonResponse) {
      return observer.map((res: Response) => res.json());
    } else {
      this.isJsonResponse = true;
      return observer;
    }
  }

  private catchGlobalErrors(observer: Observable<Response>): Observable<Response> {
    return observer.catch((error: Response) => {
      if (error.status !== 400) {
        alert('Could not get data due to: ' + error.statusText);
        // try {
        //   let json = error.json();
        //   if (json.error) {
        //     alert(json.error.message);
        //   }
        // } catch (e) {
        //   console.error(e);
        // }
      }
      // if ((error.status === 401 || error.status === 403) && (window.location.href.match(/\?/g) || []).length < 2) {
      //     console.log('The authentication session expires or the user is not authorised. Force refresh of the current page.');
      //     window.location.href = window.location.href + '?' + new Date().getMilliseconds();
      // }
      return Observable.throw(error);
    });
  }

  private updateToken(observer: Observable<Response>): Observable<Response> {
    return observer.map((res: Response) => {
      let token = res.headers.get('Authorization');
      if (token) {
        if (token.startsWith('Bearer ')) {
          token = token.substring(7);
        }
        console.log('token', token);
        this.appConfig.token = token;
        this.storage.set('token', token);
      }
      return res;
    });
  }

  get(url: string): Observable<Response> {
    return this.mapResponse(this.http.get(this.getUrl(url), this.makeReqestOptions()));
  }

  post(url: string, body: any): Observable<Response> {
    return this.mapResponse(this.http.post(this.getUrl(url), body, this.makeReqestOptions()));
  }

  put(url: string, body: any): Observable<Response> {
    return this.mapResponse(this.http.put(this.getUrl(url), body, this.makeReqestOptions()));
  }

  patch(url: string, body: any): Observable<Response> {
    return this.mapResponse(this.http.patch(this.getUrl(url), body, this.makeReqestOptions()));
  }

  delete(url: string): Observable<Response> {
    return this.mapResponse(this.http.delete(this.getUrl(url), this.makeReqestOptions()));
  }


}
