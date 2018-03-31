import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WagdagHeaderComponent } from './wagdag-header';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    WagdagHeaderComponent,
  ],
  imports: [
    IonicPageModule.forChild(WagdagHeaderComponent),
    TranslateModule,
  ],
  exports: [
    WagdagHeaderComponent,
  ]
})
export class WagdagHeaderComponentModule {}
