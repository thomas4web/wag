import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckInComponent } from './check-in';
import { GoogleMapsComponentModule } from '../google-maps/google-maps.module';

@NgModule({
  declarations: [
    CheckInComponent,
  ],
  imports: [
    IonicPageModule.forChild(CheckInComponent),
    GoogleMapsComponentModule,
  ],
  exports: [
    CheckInComponent
  ]
})
export class CheckInComponentModule {}
