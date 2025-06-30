import {Component, Input} from '@angular/core';
import {StorageService} from '../storage';
import {WaterCounterData} from '../models/item.model';

@Component({
  selector: 'app-water-count',
  imports: [],
  templateUrl: './water-count.html',
  styleUrl: './water-count.css'
})
export class WaterCount {
  @Input() waterCounterData: WaterCounterData = {
    dayCounter: 0,
    isVisible: true,
  };

  constructor(private storageService: StorageService) { }

  decrement() {
    if (this.waterCounterData.dayCounter > 0) {
      this.waterCounterData.dayCounter = this.waterCounterData.dayCounter - 1;
      this.storageService.setItemLocalStorage('hydrationData', {...this.waterCounterData, 'dayCounter': this.waterCounterData.dayCounter});
    }
  }

  increment() {
    this.waterCounterData.dayCounter = this.waterCounterData.dayCounter + 1;
    this.storageService.setItemLocalStorage('hydrationData', { ...this.waterCounterData, 'dayCounter': this.waterCounterData.dayCounter});
  }
}
