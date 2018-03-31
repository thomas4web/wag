import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';

import { TranslateService } from '@ngx-translate/core';

import { Storage } from '@ionic/storage';

import { AppConfig } from "./app.config";
import { deserialize } from 'jsonapi-deserializer';
import { SharedServiceProvider } from '../providers/shared-service/shared-service';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { CreateProfilePage } from '../pages/create-profile/create-profile';
import {Push, PushObject, PushOptions} from "@ionic-native/push";
import {GooglePlus} from "@ionic-native/google-plus";
import {DeviceTokenServiceProvider} from "../providers/device-token-service/device-token-service";
import {Device} from "@ionic-native/device";

@Component({
  templateUrl: 'app.html',
  providers: [Keyboard]
})
export class MyApp {
  rootPage:any;// = LoginPage;

  constructor(
    private device: Device,
    platform: Platform,
    statusBar: StatusBar,
    private storage: Storage,
    private splashScreen: SplashScreen,
    private push: Push,
    translate: TranslateService,
    private appConfig: AppConfig,
    userService: UserServiceProvider,
    sharedService: SharedServiceProvider,
    keyboard: Keyboard,
    private googlePlus: GooglePlus,
    private deviceTokenService: DeviceTokenServiceProvider,
  ) {
    // set language configuration
    translate.setDefaultLang('en');
    translate.use('no');

    platform.ready().then(() => {
      keyboard.disableScroll(true);

      storage.get('token').then(value => {
        if (value) {
          appConfig.token = value;
          userService.getMe().subscribe(
            response => {
              let user = deserialize(response);
              sharedService.userDetails = user;
              if (user) {
                this.trySilentLogin();

                if (user.profile) {
                  this.redirect(HomePage);
                } else {
                  this.redirect(CreateProfilePage);
                }
              } else {
                this.redirect(LoginPage);
              }
            },
            error => {
              alert('Could not get user profile');
              console.error(error);
              this.redirect(LoginPage);
            }
          );
        } else {
          this.redirect(LoginPage);
        }
      }).catch(error => {
        console.error(error);
        this.redirect(LoginPage);
      });
      statusBar.styleDefault();
      this.pushSetup();
    });

  }

  private redirect(page: any) {
    this.splashScreen.hide();
    this.rootPage = page;
  }

  private pushSetup() {
    const options: PushOptions = {
      android: {
        senderID: '414607533023'
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      },
      windows: {}
    };

    const pushObject: PushObject = this.push.init(options);

    pushObject.on('notification').subscribe((notification: any) => {
      console.log('Received a notification', notification);
      if (notification.additionalData.foreground) {
        // alert(notification.message);
      } else {
        // alert('here:' + notification.message);
      }
    });

    pushObject.on('registration').subscribe((registration: any) => {
      this.appConfig.deviceToken = registration.registrationId;
      this.deviceTokenService.updateToken(this.appConfig.deviceToken);
      // alert('Device registered: ' + registration.registrationId);
      console.log('Device registered', registration)
    });

    pushObject.on('error').subscribe(error => {
      // alert('Error with Push plugin');
      console.error('Error with Push plugin', error)
    });
  }

  private trySilentLogin() {
    this.storage.get('provider').then(provider => {
      switch (provider) {
        case 'google':
          this.googlePlus.trySilentLogin(this.appConfig.googleLoginOptions).then(
            response => {
              console.log('trySilentLogin responses: ', response);
            }
          ).catch(
            error => {
              console.error('Error on trySilentLogin: ', error);
            }
          );
          break;
      }
    });

  }
}

