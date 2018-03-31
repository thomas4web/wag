import { GoogleMapsComponentModule } from './../../components/google-maps/google-maps.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlaygroundDetailPage } from './playground-detail';
import {ApplicationPipesModule} from "../../pipes/application-pipes.module";

@NgModule({
  declarations: [
    PlaygroundDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PlaygroundDetailPage),
    GoogleMapsComponentModule,
    ApplicationPipesModule,
  ],
  exports: [
    PlaygroundDetailPage
  ]
})
export class PlaygroundDetailPageModule {}
