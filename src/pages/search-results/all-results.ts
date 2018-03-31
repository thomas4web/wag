import { SearchOptionsPage } from './../search-options/search-options';
import { ProfileServiceProvider } from './../../providers/profile-service/profile-service';
import { PlaygroundDetailPage } from './../playground-detail/playground-detail';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController, Loading, LoadingController, ToastController, App } from 'ionic-angular';
import { UserProfilePage } from '../user-profile/user-profile'
import { PlaygroundServiceProvider } from '../../providers/playground-service/playground-service';
import { deserialize } from 'jsonapi-deserializer';

@Component({
  selector: 'page-all-results',
  templateUrl: 'all-results.html',
})
@IonicPage()
export class AllResultsPage {
  public results: Array<any> = [];
  loading: Loading;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public events: Events,
              public modalCtrl: ModalController,
              public loadingCtrl: LoadingController,
              public playgroundService: PlaygroundServiceProvider,
              public profileService: ProfileServiceProvider,
              public toastCtrl: ToastController,
              public app: App) {

    navParams.data.forEach(element => {
      this.results.push(element);
    });

    this.events.subscribe('search-results', (response) => {
      this.results = response;
    })
  }

  showSearchOptions() {
    this.app.getRootNav().push(SearchOptionsPage);
  }

  showDetails(result) {
    this.loading = this.loadingCtrl.create();
    this.loading.setContent('Processing...');
    this.loading.present();
    if (result.type == 'playground') {
      this.playgroundService.findPlaygroundById(result.object.id).subscribe(
        (response: any) => {
          let playground = deserialize(response);
          debugger;
          this.loading.dismiss();
          let modal = this.modalCtrl.create(PlaygroundDetailPage, playground);
          modal.present();
        },
        (error) => {
          this.loading.dismiss();
          let toast = this.toastCtrl.create({
            message: 'Unable to fetch playground details: ' + error,
            duration: 3000
          });
          toast.present();
        }
      )
    } else {
      this.profileService.getUserProfile(result.object.id).subscribe(
        (response) => {
          this.loading.dismiss().then(() => {
            let userProfile = deserialize(response);
            let modal = this.modalCtrl.create(UserProfilePage, userProfile);
            modal.present();
          });
        },
        (error) => {
          this.loading.dismiss();
          let toast = this.toastCtrl.create({
            message: 'Unable to fetch user profile: ' + error,
            duration: 3000
          });
          toast.present();
        }
      )
    }
  }

}
