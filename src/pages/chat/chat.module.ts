import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatPage } from './chat';

import { WagdagHeaderComponentModule } from "../../components/wagdag-header/wagdag-header.module";

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ChatPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatPage),
    WagdagHeaderComponentModule,
    TranslateModule
  ],
  exports: [
    ChatPage
  ]
})
export class ChatPageModule {}
