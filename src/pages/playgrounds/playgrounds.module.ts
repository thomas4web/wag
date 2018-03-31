import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlaygroundsPage } from './playgrounds';

import { WagdagHeaderComponentModule } from "../../components/wagdag-header/wagdag-header.module";
import { GoogleMapsComponentModule } from "../../components/google-maps/google-maps.module";
import { NearPlaygroundsListComponentModule } from "../../components/near-playgrounds-list/near-playgrounds-list.module";
import { MapPlaygroundDetailComponentModule } from "../../components/map-playground-detail/map-playground-detail.module";

import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    PlaygroundsPage
  ],
  imports: [
    IonicPageModule.forChild(PlaygroundsPage),
    WagdagHeaderComponentModule,
    GoogleMapsComponentModule,
    NearPlaygroundsListComponentModule,
    MapPlaygroundDetailComponentModule,
    TranslateModule,
  ],
  exports: [
    PlaygroundsPage
  ]
})
export class PlaygroundsPageModule {}
