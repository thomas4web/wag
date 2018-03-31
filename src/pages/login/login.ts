import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController, Loading, ToastController} from 'ionic-angular';
import 'rxjs/add/operator/finally';

import { Storage } from '@ionic/storage';

import { AppConfig } from '../../app/app.config';

import { HomePage } from "../home/home";

import { UserServiceProvider } from "../../providers/user-service/user-service";

import { deserialize } from "jsonapi-deserializer";
import { CreateProfilePage } from '../create-profile/create-profile';
import { SharedServiceProvider } from '../../providers/shared-service/shared-service';

import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook";
import { GooglePlus } from "@ionic-native/google-plus";

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private loading: Loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private loadingCtrl: LoadingController,
    private userService: UserServiceProvider,
    private appConfig: AppConfig,
    private sharedService: SharedServiceProvider,
    private fb: Facebook,
    private toastCtrl: ToastController,
    private googlePlus: GooglePlus,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.fb.logout().catch(error => {
      console.error(error);
    });
    this.googlePlus.logout().catch(error => {
      console.error(error);
    });
  }

  login(provider: string) {
    this.loading = this.loadingCtrl.create();
    this.loading.setContent('Please wait...');
    this.loading.present();
    switch (provider) {
      case 'google':
        this.googlePlus.login(this.appConfig.googleLoginOptions).then(
          user => {
            debugger;
            if (user.accessToken) {
              this.doLogin(provider, user.accessToken);
            } else if (user.serverAuthCode) {
              this.doLoginUsingServerAuthCode(provider, user.serverAuthCode);
            }
          }
        ).catch(
          error => {
            console.error(error);
            this.loading.dismiss();
          }
        );
        break;
      case 'facebook':
        this.fb.login(["public_profile", "email"]).then(
          (response: FacebookLoginResponse) => {
            this.doLogin(provider, response.authResponse.accessToken);
          }
        ).catch(
          error => {
            console.error(error);
            this.loading.dismiss();
          }
        );
        break;

      default:
        this.loading.dismiss();
        break;
    }
  }

  private doLogin(provider: string, code: string) {
    this.userService.socialLogin(provider, code).finally(() => {
      this.loading.dismiss();
    }).subscribe(
      (response: any) => {
        this.processLoginResponse(provider, response);
      },
      (error) => {
        try {
          let response = error.json();
          let toast = this.toastCtrl.create({
            message: response.error.message,
            duration: 3000
          });
          toast.present();
        } catch (e) {
          console.error(error);
        }
      }
    );
  }

  private doLoginUsingServerAuthCode(provider: string, serverAuthCode: string) {
    this.userService.socialLoginUsingServerAuthCode(provider, serverAuthCode).finally(() => {
      this.loading.dismiss();
    }).subscribe(
      (response: any) => {
        this.processLoginResponse(provider, response);
      },
      (error) => {
        try {
          let response = error.json();
          let toast = this.toastCtrl.create({
            message: response.error.message,
            duration: 3000
          });
          toast.present();
        } catch (e) {
          console.error(error);
        }
      }
    );
  }

  private processLoginResponse(provider: string, response: any) {
    Promise.all([
      this.storage.set('provider', provider),
    ]).then(() => {
      debugger;
      let user = deserialize(response);
      this.sharedService.userDetails = user;
      if (user && user.profile) {
        this.navCtrl.setRoot(HomePage);
      } else {
        this.navCtrl.setRoot(CreateProfilePage);
      }
    });
  }

}
