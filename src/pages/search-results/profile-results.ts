import { deserialize } from 'jsonapi-deserializer';
import { UserProfilePage } from './../user-profile/user-profile';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController, Loading, LoadingController, ToastController, App } from 'ionic-angular';
import { ProfileServiceProvider } from '../../providers/profile-service/profile-service';
import { SearchOptionsPage } from '../search-options/search-options';

/**
 * Generated class for the ProfileResultsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile-results',
  templateUrl: 'profile-results.html',
})
export class ProfileResultsPage {
  loading: Loading;

  public results: Array<any> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public profileService: ProfileServiceProvider,
    public toastCtrl: ToastController,
    public app: App) {

    navParams.data.forEach(element => {
      if (element.type === 'profile') {
        this.results.push(element);
      }
    });

    console.log(JSON.stringify(this.results));

    this.events.subscribe('search-results', (response) => {
      this.results = [];
      response.forEach(element => {
        if (element.type === 'profile') {
          this.results.push(element);
        }
      })
    })
  }

  showSearchOptions() {
    this.app.getRootNav().push(SearchOptionsPage);
  }

  showDetails(result) {
    if (result.type == 'profile') {
      this.loading = this.loadingCtrl.create();
      this.loading.setContent('Processing...');
      this.loading.present();
      this.profileService.getUserProfile(result.object.id).subscribe(
        (response) => {
          this.loading.dismiss().then(() => {
            let userProfile = deserialize(response);
            let modal = this.modalCtrl.create(UserProfilePage, userProfile);
            modal.present();
          });
        },
        (errorResponse) => {
          this.loading.dismiss();
          let toast = this.toastCtrl.create({
            message: 'Unable to fetch user profile: ' + errorResponse,
            duration: 3000
          });
          toast.present();
          let error = deserialize(errorResponse._body);
          console.log(error.message)
        }
      )
    }
  }

}
