import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ProfileSettingServiceProvider} from "../../providers/profile-setting-service/profile-setting-service";
import {deserialize} from "jsonapi-deserializer";

/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  public settings: any = {
    notify_all: null,
    notify_dog_checkin_fav_playground: null,
    notify_friend_checkin_fav_playground: null,
    notify_new_chat_message: null,
    notify_new_friend_request: null,
    privacy_breed: null,
    privacy_health: null,
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private profileSetting: ProfileSettingServiceProvider,
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
    this.getSettings();
  }

  private getSettings() {
    this.profileSetting.getSettings().subscribe(
      (response) => {
        let data = deserialize(response);
        this.settings.notify_all = data.notify_all;
        this.settings.notify_dog_checkin_fav_playground = data.notify_dog_checkin_fav_playground;
        this.settings.notify_friend_checkin_fav_playground = data.notify_friend_checkin_fav_playground;
        this.settings.notify_new_chat_message = data.notify_new_chat_message;
        this.settings.notify_new_friend_request = data.notify_new_friend_request;
        this.settings.privacy_breed = data.privacy_breed;
        this.settings.privacy_health = data.privacy_health;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  change(key: string) {
    let data = {};
    data[key] = this.settings[key];
    this.profileSetting.patchSettings(data).subscribe(
      (response) => {

      },
      (error) => {
        console.error(error);
      }
    );
  }
}
