import { NgModule } from '@angular/core';
import { DateHumanReadablePipe } from './date-human-readable/date-human-readable';

@NgModule({
  declarations: [
    DateHumanReadablePipe,
  ],
  imports: [
  ],
  exports: [
    DateHumanReadablePipe,
  ]
})
export class ApplicationPipesModule {}
