import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {List, WaterCounterData} from '../models/item.model';
import { FormsModule } from '@angular/forms';
import {StorageService} from '../storage';


@Component({
	selector: 'app-header',
	imports: [FormsModule],
	templateUrl: './header.html',
	styleUrl: './header.css',
})
export class Header implements OnInit {
	name: string = '';
	newList: List[] = [];
	isOpen: boolean = false;
  configOpen: boolean = false;
  waterCounterActived: boolean = true;

	@Input() lists: List[] = [];
	@Output() selectedList = new EventEmitter<string>(); // Emite o valor da opção selecionada
	@Output() newListUpdated = new EventEmitter<List[]>(); // Novo Array de listas com a nova lista adicionada

  @Input() waterCounterData: WaterCounterData = {
    dayCounter: 0,
    isVisible: true,
  };

	constructor(private storageService: StorageService) {}

  ngOnInit() {
    const loadedData: WaterCounterData = this.storageService.getItemLocalStorage('hydrationData');
    this.waterCounterData.dayCounter = loadedData.dayCounter;
    this.waterCounterData.isVisible = loadedData.isVisible;
    this.waterCounterActived = loadedData.isVisible;
  }

	toggleInputAddList(): void {
		this.isOpen = !this.isOpen;
	}

	removeAccents(texto: string) {
		return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
	}

	addList(): void {
    let listNameValid = this.name.trim();
		let nameWithoutAccentuation: string = this.removeAccents(listNameValid);
		let listAdded = {
			label: listNameValid,
			value: nameWithoutAccentuation,
			items: [],
		};
		this.newList = [...this.lists, listAdded];
		this.newListUpdated.emit(this.newList);
		this.selectedList.emit(listAdded.value);
    this.isOpen = !this.isOpen;
    this.name = '';
	}

  toggleConfigOpen() {
    this.configOpen = !this.configOpen;
  }

  waterCounterCheckboxChange() {
    let isVisible = this.waterCounterActived;
    this.waterCounterData.isVisible = isVisible
    this.storageService.setItemLocalStorage('hydrationData', { ...this.waterCounterData, 'isVisible': isVisible});
  }
}
