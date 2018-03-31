import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileResultsPage } from './profile-results';
import { WagdagHeaderComponentModule } from "../../components/wagdag-header/wagdag-header.module";
import { TranslateModule } from '@ngx-translate/core';
import { SearchToolbarComponentModule } from '../../components/search-toolbar/search-toolbar.module';

@NgModule({
  declarations: [
    ProfileResultsPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileResultsPage),
    WagdagHeaderComponentModule,
    TranslateModule,
    SearchToolbarComponentModule
  ],
  exports: [
    ProfileResultsPage
  ]
})
export class ProfileResultsPageModule {}
