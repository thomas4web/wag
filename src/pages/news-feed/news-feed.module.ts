import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewsFeedPage } from './news-feed';

import { WagdagHeaderComponentModule } from "../../components/wagdag-header/wagdag-header.module";

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    NewsFeedPage,
  ],
  imports: [
    IonicPageModule.forChild(NewsFeedPage),
    WagdagHeaderComponentModule,
    TranslateModule,
  ],
  exports: [
    NewsFeedPage
  ]
})
export class NewsFeedPageModule {}
