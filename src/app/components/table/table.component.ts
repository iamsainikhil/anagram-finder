import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() data: any;
  @Input() level: string;
  @Output() index: EventEmitter<Number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  favoriteAnagram(i) {
    this.index.emit(i);
  }

}
