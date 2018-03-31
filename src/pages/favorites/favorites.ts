import { SharedServiceProvider } from './../../providers/shared-service/shared-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Tabs } from 'ionic-angular';

import { PlaygroundServiceProvider } from '../../providers/playground-service/playground-service';

import { deserialize } from "jsonapi-deserializer";

/**
 * Generated class for the FavoritesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {

  viewMode: string = 'favorite';
  favoritePlaygrounds: Array<any> = [];
  checkedInPlaygrounds: Array<any> = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public app: App,
              public sharedService: SharedServiceProvider,
              public playgroundService: PlaygroundServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');

  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter FavoritesPage');

    if (this.viewMode == 'favorite') {
      this.getFavoritePlaygrounds();
    } else {
      this.getCheckedInPlaygrounds();
    }

  }

  changeViewMode() {
    this.loadData();
  }

  loadData() {
    if (this.viewMode == 'favorite') {
      this.getFavoritePlaygrounds();
    } else {
      this.getCheckedInPlaygrounds();
    }
  }

  getFavoritePlaygrounds() {
    this.playgroundService.findFavouritePlaygrounds().subscribe(
      (response: any) => {
        let playgrounds = deserialize(response);
        debugger;
        console.log(playgrounds);

        this.favoritePlaygrounds = playgrounds;
      },
      (error) => {
        console.error(error);
      }
    )
  }

  getCheckedInPlaygrounds() {
    this.playgroundService.findCheckedInPlaygrounds().subscribe(
      (response: any) => {
        let playgrounds = deserialize(response);
        debugger;
        console.log(playgrounds);

        this.checkedInPlaygrounds = playgrounds;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  showOnMap(playground) {
    this.sharedService.currentPlaygroundOnMap = playground;
    var tabs: Tabs = this.navCtrl.parent;
    if (tabs) {
      tabs.select(0)
    }
  }

  toggleFavorite(playground) {
    this.loadData();
  }

  checkIn(playground) {
    this.loadData();
  }

}
