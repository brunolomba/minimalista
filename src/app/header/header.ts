import { Component, EventEmitter, Input, Output } from '@angular/core';
import { List } from '../models/item.model';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-header',
	imports: [FormsModule],
	templateUrl: './header.html',
	styleUrl: './header.css',
})
export class Header {
	name: string = '';
	newList: List[] = [];
	isOpen: boolean = false;

	@Input() lists: List[] = [];
	@Output() selectedList = new EventEmitter<string>(); // Emite o valor da opção selecionada
	@Output() newListUpdated = new EventEmitter<List[]>(); // Novo Array de listas com a nova lista adicionada

	constructor() {}

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
}
