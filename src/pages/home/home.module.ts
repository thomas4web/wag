import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';

import { WagdagHeaderComponentModule } from "../../components/wagdag-header/wagdag-header.module";

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    WagdagHeaderComponentModule,
    TranslateModule,
  ]
})
export class HomePageModule {}
