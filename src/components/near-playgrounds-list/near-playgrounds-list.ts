import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Generated class for the NearPlaygroundsListComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'near-playgrounds-list',
  templateUrl: 'near-playgrounds-list.html'
})
export class NearPlaygroundsListComponent {

  @Input('playgrounds') playgrounds: Array<any>;
  @Output() showOnMapEvent: EventEmitter<{}> = new EventEmitter<{}>();
  @Output() checkInEvent: EventEmitter<{}> = new EventEmitter<{}>();
  @Output() toggleFavoriteEvent: EventEmitter<{}> = new EventEmitter<{}>();

  constructor() {
  }

  showOnMap(playground) {
    this.showOnMapEvent.emit(playground);
  }

  toggleFavorite(playground) {
    this.toggleFavoriteEvent.emit(playground);
  }

  checkIn(playground) {
    this.checkInEvent.emit(playground);
  }

}
