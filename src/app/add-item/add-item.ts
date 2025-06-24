import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- Adicione esta linha!
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-add-item',
	standalone: true,
	imports: [FormsModule, CommonModule],
	templateUrl: './add-item.html',
	styleUrl: './add-item.css',
})
export class AddItem {
	newItemDescription: string = ''; // Variável para armazenar o texto do input

	@Input() listSelected: string = '';
	@Output() itemAdded = new EventEmitter<string>(); // Evento para comunicar ao componente pai

	constructor() {}

	addItem(): void {
		const itemValid: string = this.newItemDescription.trim();

		if (itemValid) {
			// Verifica se o input não está vazio ou só com espaços
			this.itemAdded.emit(itemValid); // Emite o evento com o texto da tarefa
			this.newItemDescription = ''; // Limpa o input após adicionar
		}
	}
}
