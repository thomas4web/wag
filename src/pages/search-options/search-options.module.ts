import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchOptionsPage } from './search-options';
import { WagdagHeaderComponentModule } from "../../components/wagdag-header/wagdag-header.module";

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SearchOptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchOptionsPage),
    WagdagHeaderComponentModule,
    TranslateModule,
  ],
  exports: [
    SearchOptionsPage
  ]
})
export class SearchOptionsPageModule {}
