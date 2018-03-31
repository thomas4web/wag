import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewPlaygroundModalPage } from './new-playground-modal';
import { CheckInComponentModule } from "../../components/check-in/check-in.module";

@NgModule({
  declarations: [
    NewPlaygroundModalPage,
  ],
  imports: [
    IonicPageModule.forChild(NewPlaygroundModalPage),
    CheckInComponentModule,
  ],
  exports: [
    NewPlaygroundModalPage
  ]
})
export class NewPlaygroundModalPageModule {}
