import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { SearchToolbarComponent } from './search-toolbar';

@NgModule({
  declarations: [
    SearchToolbarComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    SearchToolbarComponent
  ]
})
export class SearchToolbarComponentModule {}
