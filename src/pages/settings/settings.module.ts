import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingsPage } from './settings';

import { WagdagHeaderComponentModule } from "../../components/wagdag-header/wagdag-header.module";

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(SettingsPage),
    WagdagHeaderComponentModule,
    TranslateModule,
  ],
  exports: [
    SettingsPage
  ]
})
export class SettingsPageModule {}
