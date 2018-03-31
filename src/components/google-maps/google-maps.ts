import { Component, ViewChild, Input, Output, ElementRef, EventEmitter  } from '@angular/core';
// import { SharedServiceProvider } from '../../providers/shared-service/shared-service';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';

import { SharedServiceProvider } from '../../providers/shared-service/shared-service';

declare var google;
declare var markerCluster;

/**
 * Generated class for the GoogleMapsComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'google-maps',
  templateUrl: 'google-maps.html'
})
export class GoogleMapsComponent {
  @ViewChild('map') mapElement: ElementRef;

  @Input('options') options: GoogleMapsComponentOptions;
  @Input('mapOptions') mapOptions: google.maps.MapOptions;
  @Output('onCurrentLocation') onCurrentLocationEmitter: EventEmitter<google.maps.LatLng> = new EventEmitter<google.maps.LatLng>();
  @Output('onInitDone') onInitDoneEmitter: EventEmitter<{}> = new EventEmitter<{}>();
  map: google.maps.Map;
  markerAtCurrentLocation: google.maps.Marker;
  markers: google.maps.Marker[] = [];
  defaultMapOptions: google.maps.MapOptions = {
    center: {
      lat : 37.0625,
      lng : -95.677068,
    },
    zoom: 4,
    zoomControl: false,
    disableDoubleClickZoom: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  constructor(private geolocation: Geolocation,
              private sharedService: SharedServiceProvider) {
  }

  ngOnInit() {
    console.log('ngOnInit GoogleMapsComponent');

    // this.mapOptions = Object.assign(defaultMapOptions, this.mapOptions);
    this.showMap();
  }

  private showMap() {
    console.log('init Google Maps');
    if (this.mapOptions) {
      this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
      this.map.setCenter(this.mapOptions.center);
      this.markerAtCurrentLocation = new google.maps.Marker({
        position: this.mapOptions.center,
        map: this.map,
        icon: this.sharedService.markerIconRed,
      });
      this.onInitDoneEmitter.emit();
    } else {
      this.map = new google.maps.Map(this.mapElement.nativeElement, this.defaultMapOptions);
      this.geolocation.getCurrentPosition().then(
        (location: Geoposition) => {
          let centerLatLng: google.maps.LatLng = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
          this.map.setOptions({
            center: centerLatLng,
            zoom: 15,
          });
          if (this.options.showMarkerAtCurrentLocation) {
            this.showMarkerAtCurrentLocation(centerLatLng);
          }
          this.onCurrentLocationEmitter.emit(centerLatLng);

        }
      ).catch(
        error => {
          console.log('map error', error);
        }
      );
    }

  }

  getMapInstance(){
    return this.map;
  }

  showMarkerAtCurrentLocation(centerLatLng: google.maps.LatLng) {
    this.markerAtCurrentLocation = new google.maps.Marker({
      position: centerLatLng,
      map: this.map,
      icon: this.sharedService.markerIcon,
    });
  }

  addMarker(markerOptions: google.maps.MarkerOptions): google.maps.Marker {
    markerOptions.map = this.map;
    let marker = new google.maps.Marker(markerOptions);
    this.markers.push(marker);
    return marker;
  }

  removeMaker(marker: google.maps.Marker) {
    return this.markers.splice(this.markers.indexOf(marker));
  }

  hideMarkers(): void {
    this.markers.forEach(
      (e) => {
        e.setMap(null);
      }
    )
  }

  showMarkers(): void {
    this.markers.forEach(
      (e) => {
        e.setMap(this.map);
      }
    )
  }

  clearMarkers() {
    this.hideMarkers();
    this.markers = [];
  }

}

export interface GoogleMapsComponentOptions {
  showMarkerAtCurrentLocation?: boolean,
}
