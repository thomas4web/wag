import { deserialize } from 'jsonapi-deserializer';
import { PlaygroundServiceProvider } from './../../providers/playground-service/playground-service';
import { PlaygroundDetailPage } from './../playground-detail/playground-detail';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController, Loading, LoadingController, ToastController, App } from 'ionic-angular';
import { SearchOptionsPage } from '../search-options/search-options';

/**
 * Generated class for the PlaygroundResultsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-playground-results',
  templateUrl: 'playground-results.html',
})
export class PlaygroundResultsPage {

  loading: Loading;

  public results: Array<any> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public playgroundService: PlaygroundServiceProvider,
    public toastCtrl: ToastController,
    public app: App) {

    navParams.data.forEach(element => {
      if (element.type === 'playground') {
        this.results.push(element);
      }
    });

    this.events.subscribe('search-results', (response) => {
      this.results = [];
      response.forEach(element => {
        if (element.type === 'playground') {
          this.results.push(element);
        }
      })
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
      let modal = this.modalCtrl.create(PlaygroundDetailPage, result.object);
      modal.present();
    }
  }
}
