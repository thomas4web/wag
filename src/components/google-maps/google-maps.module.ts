import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoogleMapsComponent } from './google-maps';

@NgModule({
  declarations: [
    GoogleMapsComponent,
  ],
  imports: [
    IonicPageModule.forChild(GoogleMapsComponent),
  ],
  exports: [
    GoogleMapsComponent
  ]
})
export class GoogleMapsComponentModule {}
