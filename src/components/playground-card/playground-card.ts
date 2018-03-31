import { PlaygroundDetailPage } from './../../pages/playground-detail/playground-detail';
import { deserialize } from 'jsonapi-deserializer';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PlaygroundServiceProvider } from '../../providers/playground-service/playground-service';
import { ModalController, Loading, LoadingController } from 'ionic-angular';
import { UserProfilePage } from '../../pages/user-profile/user-profile';
import { ProfileServiceProvider } from '../../providers/profile-service/profile-service';

/**
 * Generated class for the PlaygroundCardComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'playground-card',
  templateUrl: 'playground-card.html'
})
export class PlaygroundCardComponent {

  loading: Loading;

  @Input() playground: any;
  @Output() onShowMapEvent: EventEmitter<{}> = new EventEmitter<{}>();
  @Output() onCheckInEvent: EventEmitter<{}> = new EventEmitter<{}>();
  @Output() onToggleFavoriteEvent: EventEmitter<{}> = new EventEmitter<{}>();

  constructor(
    private playgroundService: PlaygroundServiceProvider,
    public modalCtrl: ModalController,
    public profileService: ProfileServiceProvider,
    public loadingCtrl: LoadingController) {
  }

  showOnMap(playground) {
    this.onShowMapEvent.emit(playground);
  }

  toggleFavorite(playground) {
    this.loading = this.loadingCtrl.create();
    this.loading.setContent('Processing...');
    this.loading.present();
    if (playground.is_favorite) {
      this.playgroundService.deleteFromFavorite(playground.id).subscribe(
        (response: any) => {
          debugger;
          this.loading.dismiss();
          this.onToggleFavoriteEvent.emit(playground);
        },
        (error) => {
          this.loading.dismiss();
          console.log(error)
        }
      )
    } else {
      this.playgroundService.addToFavorite({id: playground.id}).subscribe(
        (response: any) => {
          debugger;
          this.loading.dismiss();
          this.onToggleFavoriteEvent.emit(playground);
        },
        (error) => {
          this.loading.dismiss();
          console.log(error)
        }
      )
    }
  }

  checkIn(playground) {
    this.loading = this.loadingCtrl.create();
    this.loading.setContent('Processing...');
    this.loading.present();
    this.playgroundService.checkInExisting({id: playground.id}).subscribe(
      (response: any) => {
        debugger;
        this.loading.dismiss();
        this.onCheckInEvent.emit(playground);
      },
      (errorResponse) => {
        this.loading.dismiss();
        let error = deserialize(errorResponse._body);
        console.log(error.message)
      }
    )
  }

  showProfile(profile) {
    this.loading = this.loadingCtrl.create();
    this.loading.setContent('Processing...');
    this.loading.present();
    this.profileService.getUserProfile(profile.id).subscribe(
      (response) => {
        this.loading.dismiss().then(() => {
          let userProfile = deserialize(response);
          let modal = this.modalCtrl.create(UserProfilePage, userProfile);
          modal.present();
        });
      },
      (errorResponse) => {
        this.loading.dismiss();
        let error = deserialize(errorResponse._body);
        console.log(error.message)
      }
    )

  }

  showPlayground(playground) {
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
