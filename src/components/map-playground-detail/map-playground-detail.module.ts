import { MomentModule } from 'angular2-moment';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapPlaygroundDetailComponent } from './map-playground-detail';

@NgModule({
  declarations: [
    MapPlaygroundDetailComponent,
  ],
  imports: [
    IonicPageModule.forChild(MapPlaygroundDetailComponent),
    MomentModule
  ],
  exports: [
    MapPlaygroundDetailComponent
  ]
})
export class MapPlaygroundDetailComponentModule {}
