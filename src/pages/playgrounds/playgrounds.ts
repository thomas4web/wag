import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';

import { GoogleMapsComponent, GoogleMapsComponentOptions } from '../../components/google-maps/google-maps';
import { Geolocation } from '@ionic-native/geolocation';

import { SharedServiceProvider } from '../../providers/shared-service/shared-service';
import { PlaygroundServiceProvider } from '../../providers/playground-service/playground-service';

import { deserialize } from "jsonapi-deserializer";
import {NewPlaygroundModalPage} from "../new-playground-modal/new-playground-modal";


declare var google;
declare var MarkerClusterer;

/**
 * Generated class for the PlaygroundsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-playgrounds',
  templateUrl: 'playgrounds.html',
})
export class PlaygroundsPage {
  @ViewChild(GoogleMapsComponent) googleMaps: GoogleMapsComponent;
  // @ViewChild(MapPlaygroundDetailComponent) mapPlaygroundDetail: MapPlaygroundDetailComponent;
  private viewingPlayground: any;
  currentMode: string = 'map';
  playgrounds: Array<any> = [];
  currentPosition: google.maps.LatLng;
  paramPlayground: any;

  mapComponentOptions: GoogleMapsComponentOptions = {
    showMarkerAtCurrentLocation: false,
  };

  markers: Array<google.maps.Marker> = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public cd: ChangeDetectorRef,
              private modalCtrl: ModalController,
              public sharedService: SharedServiceProvider,
              public playgroundService: PlaygroundServiceProvider,
              public geolocation: Geolocation) {
    // let mode = navParams.data.mode;
    // let playground = navParams.data.playground;
    // debugger;
    // if (mode) {
    //   this.currentMode = 'map';
    // }

    // if (playground) {
    //   this.paramPlayground = playground;
    // }
  }

  ngOnInit() {
    console.log('ngOnInit NearPlaygroundsPage');
  }

  ngOnDestroy() {
    console.log('ngOnDestroy NearPlaygroundsPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NearPlaygroundsPage');
    // this.getPlaygrounds();
    debugger;
    this.googleMaps.map.addListener('click', e => {
      console.log(e);
      this.clearSelection();
      this.cd.detectChanges();
    });
    this.googleMaps.map.addListener('dblclick', e => {
      this.doCheckIn();
    });
    
  }

  onCurrentLocation(location: google.maps.LatLng) {
    this.currentPosition = location;
    this.getPlaygrounds();
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter NearPlaygroundsPage');

    if (this.sharedService.currentPlaygroundOnMap) {
      this.paramPlayground = this.sharedService.currentPlaygroundOnMap;
      this.showOnMap(this.paramPlayground)
    }
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave NearPlaygroundsPage');
  }

  clearSelection() {
    this.paramPlayground = null;
    this.viewingPlayground = null;
    this.sharedService.currentPlaygroundOnMap = null;

    for (var i = 0; i < this.markers.length; i++) {
        let marker = this.markers[i];
        marker.setIcon(this.sharedService.markerIcon);
    }
  }

  switchMode() {
    if (this.currentMode == 'map') {
      this.currentMode = 'list';
      this.clearSelection();
      this.reloadListModeView();
    } else {
      this.currentMode = 'map';
      this.clearSelection();
      this.reloadMapModeView();
    }
  }

  reloadListModeView() {
    this.getPlaygrounds();
  }

  reloadMapModeView() {
    this.getPlaygrounds();
  }

  getPlaygrounds() {
    let params = {
      lat: this.currentPosition ? this.currentPosition.lat() : null,
      lng: this.currentPosition ? this.currentPosition.lng() : null,
      show_in: this.currentMode
    }
    this.playgroundService.findNearbyPlaygrounds(params).subscribe(
      (response: any) => {
        let playgroundsResponse = deserialize(response);
        debugger;
        this.playgrounds = playgroundsResponse;
        this.googleMaps.clearMarkers();
        this.loadMarkers();
        var map=this.googleMaps.getMapInstance();
        var markerCluster = new MarkerClusterer(map, this.markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});      

      },
      (error) => {
        console.error(error);
      }
    );
  }

  showOnMap(playground) {
    this.currentMode = 'map';

    let latLng = new google.maps.LatLng(playground.lat, playground.lng);
    var found = false;
    let marker: google.maps.Marker;

    for (var i = 0; i < this.markers.length; i++) {
      if (this.markers[i].getPosition().equals(latLng)) {
        found = true;
        marker = this.markers[i];
        marker.setIcon(this.sharedService.markerIconRed);
      } else {
        this.markers[i].setIcon(this.sharedService.markerIcon);
      }
    }

    if (!found) {
      marker = this.googleMaps.addMarker({
        position: latLng,
        icon: this.sharedService.markerIconRed,
      });
    }

    this.googleMaps.map.setCenter(latLng);

    marker.addListener('click', () => {
      this.viewingPlayground = playground;
      this.cd.detectChanges();
    });

    this.viewingPlayground = playground;
  }

  checkIn(playground) {
    console.log('Done checking in...');
    debugger;
    this.getPlaygrounds();
  }

  toggleFavorite(playground) {
    console.log('Done toggling favorite...');
    debugger;
    this.getPlaygrounds();
  }

  loadMarkers() {
    this.playgrounds.forEach(e => {
      if (e.lat && e.lng) {
        if (!(this.paramPlayground && this.paramPlayground.lat == e.lat && this.paramPlayground.lng == e.lng)) {
          let myLatLng = new google.maps.LatLng(e.lat, e.lng);
          let marker: google.maps.Marker = this.googleMaps.addMarker({
            position: myLatLng,
            animation: google.maps.Animation.DROP,
            icon: this.sharedService.markerIcon,
          });

          this.markers.push(marker);

          marker.addListener('click', () => {
            // this.toggleBounce(currentMarker)
            for (var i = 0; i < this.markers.length; i++) {
              if (this.markers[i].getPosition().equals(marker.getPosition())) {
                this.markers[i].setIcon(this.sharedService.markerIconRed);
                marker.setIcon(this.sharedService.markerIconRed);
              } else {
                this.markers[i].setIcon(this.sharedService.markerIcon);
              }
            }

            this.viewingPlayground = e;
            this.cd.detectChanges();
            console.log(marker);
            console.log(e);
          });
        } else {
          this.showOnMap(this.paramPlayground);
        }

      }
    });
    

  }

  toggleBounce(marker) {
    debugger;
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  }

  doCheckIn() {
    let modal = this.modalCtrl.create(NewPlaygroundModalPage);
    modal.present();
  }

}
