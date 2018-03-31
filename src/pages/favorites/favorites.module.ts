import { PlaygroundCardComponentModule } from './../../components/playground-card/playground-card.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavoritesPage } from './favorites';

import { WagdagHeaderComponentModule } from "../../components/wagdag-header/wagdag-header.module";

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    FavoritesPage,
  ],
  imports: [
    IonicPageModule.forChild(FavoritesPage),
    WagdagHeaderComponentModule,
    TranslateModule,
    PlaygroundCardComponentModule,
  ],
  exports: [
    FavoritesPage
  ]
})
export class FavoritesPageModule {}
