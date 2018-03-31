import { ChatPageModule } from './../chat/chat.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';

import { WagdagHeaderComponentModule } from "../../components/wagdag-header/wagdag-header.module";

import { TranslateModule } from '@ngx-translate/core';
import { ApplicationPipesModule } from '../../pipes/application-pipes.module';

@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
    ChatPageModule,
    WagdagHeaderComponentModule,
    TranslateModule,
    ApplicationPipesModule,
  ],
  exports: [
    ProfilePage
  ]
})
export class ProfilePageModule {}
