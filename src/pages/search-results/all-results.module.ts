import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllResultsPage } from './all-results';
import { WagdagHeaderComponentModule } from "../../components/wagdag-header/wagdag-header.module";
import { TranslateModule } from '@ngx-translate/core';
import { SearchToolbarComponentModule } from '../../components/search-toolbar/search-toolbar.module';

@NgModule({
  declarations: [
    AllResultsPage,
  ],
  imports: [
    IonicPageModule.forChild(AllResultsPage),
    WagdagHeaderComponentModule,
    TranslateModule,
    SearchToolbarComponentModule
  ],
  exports: [
    AllResultsPage
  ]
})
export class AllResultsPageModule {}
