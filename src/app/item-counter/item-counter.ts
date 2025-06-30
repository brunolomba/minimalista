import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item } from '../models/item.model';

@Component({
  selector: 'app-item-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-counter.html',
  styleUrls: ['./item-counter.css']
})
export class ItemCounter implements OnChanges {
  @Input() itemsForCounter: Item[] = [];

  quantityCompletedItems: number = 0;

  notCompleted:boolean = false;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void { // Use ngOnChanges para recontar quando o input 'tasks' muda
    if (changes['itemsForCounter']) {
      this.updateStatus();
    }
  }

  private updateStatus(): void {
    let counts: number = 0

    this.itemsForCounter.forEach(item => {
      if (item.completed) {
        counts++;
      }
    });
    this.quantityCompletedItems = counts

    this.notCompleted = this.itemsForCounter.length > 0 && this.quantityCompletedItems != this.itemsForCounter.length;
  }
}
