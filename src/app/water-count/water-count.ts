import {Component, Input, OnInit} from '@angular/core';
import {StorageService} from '../storage';
import {WaterCounterData} from '../models/item.model';

@Component({
  selector: 'app-water-count',
  imports: [],
  templateUrl: './water-count.html',
  styleUrl: './water-count.css'
})
export class WaterCount implements OnInit {
  @Input() waterCounterData: WaterCounterData = {
    dayCounter: 0,
    isVisible: true,
  };

  constructor(private storageService: StorageService) { }

  ngOnInit() {
    this.waterCounterData.dayCounter = this.storageService.getItemLocalStorage('waterDayCounter');
    if (!this.waterCounterData.dayCounter) {
      this.waterCounterData.dayCounter = 0;
    }
    this.waterCounterData.isVisible = this.storageService.getItemLocalStorage('isVisible');
  }

  decrement() {
    if (this.waterCounterData.dayCounter > 0) {
      this.waterCounterData.dayCounter = this.waterCounterData.dayCounter - 1;
      this.storageService.setItemLocalStorage('waterDayCounter', this.waterCounterData.dayCounter);
    }
  }

  increment() {
    this.waterCounterData.dayCounter = this.waterCounterData.dayCounter + 1;
    this.storageService.setItemLocalStorage('waterDayCounter', this.waterCounterData.dayCounter);
  }
}
