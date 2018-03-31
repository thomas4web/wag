import { Component, Output, EventEmitter } from '@angular/core';

/**
 * Generated class for the SearchToolbarComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'search-toolbar',
  templateUrl: 'search-toolbar.html'
})
export class SearchToolbarComponent {

  @Output() searchOptionsEvent: EventEmitter<{}> = new EventEmitter<{}>();

  constructor() {
  }

  showSearchOptions() {
    this.searchOptionsEvent.emit();
  }

}
