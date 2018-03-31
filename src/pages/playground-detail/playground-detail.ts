import { PlaygroundServiceProvider } from './../../providers/playground-service/playground-service';
import { UserProfilePage } from './../user-profile/user-profile';
import { deserialize } from 'jsonapi-deserializer';
import { ProfileServiceProvider } from './../../providers/profile-service/profile-service';
import { GoogleMapsComponent, GoogleMapsComponentOptions } from './../../components/google-maps/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Loading, LoadingController, ModalController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SharedServiceProvider } from '../../providers/shared-service/shared-service';

declare var google;

/**
 * Generated class for the PlaygroundDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-playground-detail',
  templateUrl: 'playground-detail.html',
})
export class PlaygroundDetailPage {
  @ViewChild(GoogleMapsComponent) googleMaps: GoogleMapsComponent;

  playground: any;
  viewMode: string = 'details';
  loading: Loading;

  currentPosition: google.maps.LatLng;

  mapComponentOptions: GoogleMapsComponentOptions = {
    showMarkerAtCurrentLocation: false,
  };

  defaultMapOptions: google.maps.MapOptions;

  shareOptions = {
    message: 'Check out this awesome playground',
    subject: 'Check out this awesome playground',
    files: [],
    url: 'https://www.wagdag.com'
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public profileService: ProfileServiceProvider,
    public playgroundService: PlaygroundServiceProvider,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public socialSharing: SocialSharing,
    public sharedService: SharedServiceProvider,
    public geolocation: Geolocation) {

    this.playground = navParams.data;
    // if (this.playground.checkedin_profiles.length) for (let i = 0; i < 20; i++) this.playground.checkedin_profiles.push(this.playground.checkedin_profiles[0]);
    // if (this.playground.checkingins.length) for (let i = 0; i < 20; i++) this.playground.checkingins.push(this.playground.checkingins[0]);
    if (this.playground.image) {
      this.shareOptions.files.push(this.playground.image)
      this.defaultMapOptions = {
        center: {
          lat : this.playground.lat,
          lng : this.playground.lng,
        },
        zoom: 15,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
    }

    debugger;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlaygroundDetailPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  showMarker() {
    debugger;
    let latLng = new google.maps.LatLng(this.playground.lat, this.playground.lng);
    let marker = this.googleMaps.addMarker({
      position: latLng,
      icon: this.sharedService.markerIconRed,
    });

    this.googleMaps.map.setCenter(latLng);

    marker.addListener('click', () => {
      // this.viewingPlayground = playground;
      // this.cd.detectChanges();
    });
  }

  toggleFavorite() {
    this.loading = this.loadingCtrl.create();
    this.loading.setContent('Processing...');
    this.loading.present();
    if (this.playground.is_favorite) {
      this.playgroundService.deleteFromFavorite(this.playground.id).subscribe(
        (response: any) => {
          debugger;
          this.loading.dismiss();
          this.reloadData();
        },
        (error) => {
          this.loading.dismiss();
          console.log(error)
        }
      )
    } else {
      this.playgroundService.addToFavorite({id: this.playground.id}).subscribe(
        (response: any) => {
          debugger;
          this.loading.dismiss();
          this.reloadData();
        },
        (error) => {
          this.loading.dismiss();
          console.log(error)
        }
      )
    }
  }

  checkIn() {
    this.loading = this.loadingCtrl.create();
    this.loading.setContent('Processing...');
    this.loading.present();
    this.playgroundService.checkInExisting({id: this.playground.id}).subscribe(
      (response: any) => {
        debugger;
        this.loading.dismiss();
      },
      (errorResponse) => {
        this.loading.dismiss();
        let error = deserialize(errorResponse._body);
        console.log(error.message)
      }
    )
  }

  share() {
    this.socialSharing.share(this.shareOptions.message, this.shareOptions.subject, this.shareOptions.files, null);
    // this.socialSharing.shareWithOptions(this.shareOptions);
  }

  reloadData() {
    this.playgroundService.findPlaygroundById(this.playground.id).subscribe(
      (response: any) => {
        this.playground = deserialize(response);
        debugger;
      },
      (error) => {
        this.loading.dismiss();
        console.log(error)
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

  toggleBounce(marker) {
    debugger;
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  }
}
