import { Component, Output, EventEmitter, ViewChild, isDevMode } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController, LoadingController, Loading } from 'ionic-angular';

import { PlaygroundServiceProvider } from '../../providers/playground-service/playground-service';
import { SharedServiceProvider } from '../../providers/shared-service/shared-service';
import { LocationServiceProvider } from '../../providers/location-service/location-service';
import { GoogleMapsComponentOptions, GoogleMapsComponent } from '../google-maps/google-maps';

declare var google;
/**
 * Generated class for the CheckInComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'check-in',
  templateUrl: 'check-in.html'
})
export class CheckInComponent {
  @ViewChild(GoogleMapsComponent) googleMaps: GoogleMapsComponent;
  private loading: Loading;
  public checkinForm: FormGroup;
  public enableCheckIn: boolean = false;
  public checkedInSuccessful: boolean = false;
  @Output() checkinEvent: EventEmitter<{}> = new EventEmitter<{}>();
  mapComponentOptions: GoogleMapsComponentOptions = {
    showMarkerAtCurrentLocation: true,
  };

  constructor(
    public formBuilder: FormBuilder,
    public sharedService: SharedServiceProvider,
    public locationService: LocationServiceProvider,
    public playgroundService: PlaygroundServiceProvider,
    public toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
  ) {
  }

  ngOnInit() {
    this.checkinForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required]),
      image: null,
      lat: 0,
      lng: 0
    });

    this.loading = this.loadingCtrl.create();
    this.loading.setContent('Processing...');
  }

  onCurrentLocation(location: google.maps.LatLng) {
    this.checkinForm.controls['lat'].setValue(location.lat());
    this.checkinForm.controls['lng'].setValue(location.lng());
    this.setClickable();
    this.enableCheckIn = true;
  }

  submitCheckIn(form: FormGroup) {
    this.loading.present();
    if (form.valid) {
      console.log(JSON.stringify(form.value))

      this.playgroundService.checkIn(form.value).subscribe(
        (response: any) => {
          console.log('Done check in');
          this.checkedInSuccessful = true;
          this.loading.dismiss();
          this.checkinEvent.emit(response);
        },
        error => {
          console.log('Unable to check in: ' + JSON.stringify(error))
          let toast = this.toastCtrl.create({
            message: 'Unable to check-in: ' + error,
            duration: 3000
          });
          toast.present();
          this.loading.dismiss();
        }
      );
    } else {
      let toast = this.toastCtrl.create({
        message: 'Incorrect data',
        duration: 3000
      });
      toast.present();
      this.loading.dismiss();
    }
  }

  private setClickable() {
    if (isDevMode()) {
      this.googleMaps.map.addListener('click', e => {
        this.googleMaps.markerAtCurrentLocation.setPosition(e.latLng);
        this.checkinForm.controls['lat'].setValue(e.latLng.lat());
        this.checkinForm.controls['lng'].setValue(e.latLng.lng());
      });
    }
  }

  fileChanged(event) {
    this.sharedService.readFileInput(event.target).then(
      file => {
        if (file) {
          this.checkinForm.controls.image.setValue(file.base64String);
        } else {
          this.checkinForm.controls.image.setValue(null);
        }
      }
    );
  }

}
