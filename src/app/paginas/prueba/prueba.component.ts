import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent {
  @Output() filterApplied = new EventEmitter<string>();

  applyFilter(value: string) {
    this.filterApplied.emit(value);
  }

  isHTMLInputElement(target: EventTarget | null): target is HTMLInputElement {
    return target instanceof HTMLInputElement;
  }
}