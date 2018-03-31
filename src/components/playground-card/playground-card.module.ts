import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlaygroundCardComponent } from './playground-card';

@NgModule({
  declarations: [
    PlaygroundCardComponent,
  ],
  imports: [
    IonicPageModule.forChild(PlaygroundCardComponent),
  ],
  exports: [
    PlaygroundCardComponent
  ]
})
export class PlaygroundCardComponentModule {}
