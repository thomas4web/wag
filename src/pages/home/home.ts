import { Component } from '@angular/core';
import { IonicPage, NavController, App, Events } from 'ionic-angular';

/**
 * Generated class for the HomePage tabs.
 *
 * See https://angular.io/docs/ts/latest/guide/dependency-injection.html for
 * more info on providers and Angular DI.
 */
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
@IonicPage()
export class HomePage {

  newsFeedRoot = 'NewsFeedPage'
  playgroundsRoot = 'PlaygroundsPage'
  favoritesRoot = 'FavoritesPage'
  profileRoot = 'ProfilePage'
  currentTabTitle: string = 'Wagger';

  allResults = 'AllResultsPage'
  profileResults = 'ProfileResultsPage'
  playgroundResults = 'PlaygroundResultsPage'

  searchResults: Array<any> = [];
  showSearchTabs: boolean = false

  constructor(public app: App, public navCtrl: NavController, public events: Events) {}

  onSearchResults(response) {
    debugger;
    if (response) {
      this.showSearchTabs = true;
      this.searchResults = response;
      this.events.publish('search-results', response);
    }
  }

  onSearchCancel(event) {
    this.showSearchTabs = false;
  }

  changeTitle(title) {
    this.currentTabTitle = title;
    console.log(this.currentTabTitle);
  }
}
