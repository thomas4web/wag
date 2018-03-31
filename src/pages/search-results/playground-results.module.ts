import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlaygroundResultsPage } from './playground-results';
import { WagdagHeaderComponentModule } from "../../components/wagdag-header/wagdag-header.module";
import { TranslateModule } from '@ngx-translate/core';
import { SearchToolbarComponentModule } from '../../components/search-toolbar/search-toolbar.module';

@NgModule({
  declarations: [
    PlaygroundResultsPage,
  ],
  imports: [
    IonicPageModule.forChild(PlaygroundResultsPage),
    WagdagHeaderComponentModule,
    TranslateModule,
    SearchToolbarComponentModule
  ],
  exports: [
    PlaygroundResultsPage
  ]
})
export class PlaygroundResultsPageModule {}
