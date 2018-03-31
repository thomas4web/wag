import { PlaygroundCardComponentModule } from './../playground-card/playground-card.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NearPlaygroundsListComponent } from './near-playgrounds-list';

@NgModule({
  declarations: [
    NearPlaygroundsListComponent,
  ],
  imports: [
    IonicPageModule.forChild(NearPlaygroundsListComponent),
    PlaygroundCardComponentModule,
  ],
  exports: [
    NearPlaygroundsListComponent
  ]
})
export class NearPlaygroundsListComponentModule {}
