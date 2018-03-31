import { SharedServiceProvider } from './../../providers/shared-service/shared-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the SearchOptionsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-search-options',
  templateUrl: 'search-options.html',
})
export class SearchOptionsPage {

  public searchOptions: any = {
    profile_friends_only: null,
    playground_favorites_only: null,
    profile_age_all: true,
    profile_age_under_2years_old: null,
    profile_age_over_2years_old: null,
    profile_gender_all: true,
    profile_gender_male: null,
    profile_gender_female: null,
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public sharedService: SharedServiceProvider) {

      // Load search options
      debugger;
      if (sharedService.searchOptions) {
        this.searchOptions = sharedService.searchOptions;
      } else {
        sharedService.searchOptions = this.searchOptions;
      }

      // sharedService.searchOptions = this.searchOptions;
  }

  ionViewDidLoad() {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  change(key: string) {
    debugger;
    this.sharedService.searchOptions = this.searchOptions;
  }

}
