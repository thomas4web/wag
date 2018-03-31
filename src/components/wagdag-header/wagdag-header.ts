import { Component, ViewChild, EventEmitter, Input, Output } from '@angular/core';
import { Searchbar, ActionSheetController, App, NavController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { SettingsPage } from "../../pages/settings/settings";
import { LoginPage } from "../../pages/login/login";

import { AppConfig } from "../../app/app.config";
import { SharedServiceProvider } from '../../providers/shared-service/shared-service';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { SearchServiceProvider } from '../../providers/search-service/search-service';

import { deserialize } from "jsonapi-deserializer";
import {UserServiceProvider} from "../../providers/user-service/user-service";

/**
 * Generated class for the WagdagHeaderComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'wagdag-header',
  templateUrl: 'wagdag-header.html'
})
export class WagdagHeaderComponent {

  @ViewChild('searchbar') searchBar: Searchbar;
  @Input() title: string;
  @Input() search: boolean;
  @Output() searchEvent: EventEmitter<{}> = new EventEmitter<{}>();
  @Output() cancelEvent: EventEmitter<{}> = new EventEmitter<{}>();
  showSearchBar: boolean = false;
  searchKeyword: string;
  shouldShowCancel: boolean = true;

  constructor(
    private app: App,
    private storage: Storage,
    private navCtrl: NavController,
    private appConfig: AppConfig,
    private sharedService: SharedServiceProvider,
    private userService: UserServiceProvider,
    private actionSheetCtrl: ActionSheetController,
    private fb: Facebook,
    private googlePlus: GooglePlus,
    private searchService: SearchServiceProvider,
  ) {
    console.log('Hello WagdagHeaderComponent Component');
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      cssClass: 'main-menu',
      buttons: [
        {
          text: 'Settings',
          icon: 'settings',
          cssClass: 'settings',
          handler: () => {
            this.app.getRootNav().push(SettingsPage);
          }
        },
        {
          text: 'Terms of Service',
          icon: 'document',
          cssClass: 'terms-of-service',
          handler: () => {
            console.log('ToS clicked');
          }
        },
        {
          text: 'Help',
          icon: 'help-circle',
          cssClass: 'help',
          handler: () => {
            console.log('Help clicked');
          }
        },
        {
          text: 'Logout',
          cssClass: 'logout',
          icon: 'exit',
          handler: () => {
            this.onClickLogout();
          }
        }
      ]
    });

    actionSheet.present();
  }

  onCancel(event) {
    this.showSearchBar = false;
    this.cancelEvent.emit();
  }

  onInput(event) {
    console.log(event);

    this.searchService.searchForAll(this.searchKeyword.toLowerCase()).subscribe(
        (response: any) => {
          console.log('Done searching');
          console.log(JSON.stringify(response));
          this.searchEvent.emit(deserialize(response));
        },
        error => {
          console.log('Search error: ' + JSON.stringify(error));
          // let toast = this.toastCtrl.create({
          //   message: 'Unable to check-in: ' + error,
          //   duration: 3000
          // });
          // toast.present();
          // this.loading.dismiss();
        }
      );
  }

  enableSearchBar() {
    console.log('clicked enableSearchBar');
    this.searchKeyword = "";
    this.showSearchBar = true;
  }

  onClickLogout() {
    debugger;
    this.storage.get('provider').then(provider => {
      switch (provider) {
        case 'google':
          this.googlePlus.logout().catch(
            (error) => {
              console.error(error);
            }
          );

          break;
        case 'facebook':
          this.fb.logout().catch(
            (error) => {
              console.error(error);
            }
          );

          break;
      }
    });
    this.logout();
  }

  private logout() {
    this.userService.logout().catch(
      (error) => {
        console.error(error);
      }
    ).then( //finally
      () => {
        this.app.getRootNav().setRoot(LoginPage);
      }
    )
  }

}
