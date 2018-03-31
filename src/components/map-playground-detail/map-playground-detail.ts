import { deserialize } from 'jsonapi-deserializer';
import { PlaygroundServiceProvider } from './../../providers/playground-service/playground-service';
import { PlaygroundDetailPage } from './../../pages/playground-detail/playground-detail';
import { Component, Input } from '@angular/core';
import { ModalController, Loading, LoadingController } from 'ionic-angular';

/**
 * Generated class for the MapPlaygroundDetailComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'map-playground-detail',
  templateUrl: 'map-playground-detail.html'
})
export class MapPlaygroundDetailComponent {
  loading: Loading;

  @Input('playground') playground: any;

  constructor(
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public playgroundService: PlaygroundServiceProvider) {

  }

  showDetail(playground) {
    this.loading = this.loadingCtrl.create();
    this.loading.setContent('Processing...');
    this.loading.present();
    this.playgroundService.findPlaygroundById(playground.id).subscribe(
      (response: any) => {
        let playgroundResponse = deserialize(response);
        debugger;
        this.loading.dismiss();
        let modal = this.modalCtrl.create(PlaygroundDetailPage, playgroundResponse);
        modal.present();
      },
      (error) => {
        this.loading.dismiss();
        console.log(error)
      }
    )
  }

}
