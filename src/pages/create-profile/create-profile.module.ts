import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateProfilePage } from './create-profile';
import { TranslateModule } from '@ngx-translate/core';
import { WagdagHeaderComponentModule } from '../../components/wagdag-header/wagdag-header.module';

@NgModule({
  declarations: [
    CreateProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(CreateProfilePage),
    WagdagHeaderComponentModule,
    TranslateModule,
  ],
  exports: [
    CreateProfilePage
  ]
})
export class CreateProfilePageModule {}
