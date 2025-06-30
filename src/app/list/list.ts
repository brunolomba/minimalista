import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { List } from '../models/item.model';

@Component({
	selector: 'app-list',
	imports: [CommonModule],
	templateUrl: './list.html',
	styleUrl: './list.css',
})
export class Lists {
	@Input() title: string = ''; // Título que será exibido no botão/cabeçalho
	@Input() lists: List[] = []; // Array de opções
	@Input() handleSelectedList: number = 0;
	@Output() selectedList = new EventEmitter<string>(); // Emite o valor da opção selecionada
	@Output() listsUpdated = new EventEmitter<List[]>(); // Nova lista

	listRemoved: boolean = false;
	isOpen: boolean = false; // Variável de controle para expandir/colapsar
	selectedOptionLabel: string | null = null; // Para exibir a opção selecionada

	constructor() {}

	ngOnInit(): void {
		// Ao iniciar, se houver listas, selecione a primeira por padrão
		if (this.lists && this.lists.length > 0) {
			this.selectOption(this.lists[0]);
		}
	}

	ngOnChanges(changes: any): void {
    // Verifica se a propriedade 'lists' realmente mudou
    if (changes['lists']) {
      const currentLists: List[] = changes['lists'].currentValue;
      const previousLists: List[] = changes['lists'].previousValue;

      // --- Lógica para ADIÇÃO de itens ---
      // Verifica se houve uma mudança e se a nova lista tem mais itens que a anterior
      if (currentLists.length > previousLists?.length) {
        // Assume que o item adicionado é o último da nova lista (se for sempre adicionado ao final)
        const newlyAddedItem = currentLists[currentLists.length - 1];
        if (newlyAddedItem) {
          this.selectOption(newlyAddedItem);
          return; // Sai da função após lidar com a adição
        }
      }

      // --- Lógica para REMOÇÃO de itens e outras mudanças ---
      // (Mantida e ligeiramente ajustada da sua lógica original)

      // Se a lista atual está vazia (todos os itens removidos ou inicial vazia)
      if (currentLists.length === 0) {
        if (this.selectedOptionLabel !== this.title) { // Evita emitir se já estiver no estado padrão
          this.selectedOptionLabel = this.title;
          this.selectedList.emit('');
        }
        return; // Sai da função após lidar com lista vazia
      }

      // Se a lista não está vazia, mas a opção selecionada atual não existe mais
      // (Isso lida com a remoção da opção selecionada, garantindo que algo seja selecionado)
      const isSelectedOptionStillPresent: boolean = currentLists.some(
        (list: List) => list.label === this.selectedOptionLabel
      );

      if (!isSelectedOptionStillPresent) {
        // Seleciona o primeiro item da lista atual se o selecionado sumiu
        this.selectOption(currentLists[0]);
      }
    }
  }

	toggleDropdown(): void {
		this.isOpen = !this.isOpen; // Alterna o estado de aberto/fechado
	}

	selectOption(list: List): void {
		this.selectedOptionLabel = list.label; // Atualiza o texto exibido
		this.selectedList.emit(list.value); // Emite o valor para o componente pai
		this.isOpen = false; // Fecha o dropdown após a seleção
	}

	removeList(listValue: string): void {
		const updatedLists = this.lists.filter(
			(list) => list.value !== listValue
		);

		this.listsUpdated.emit(updatedLists); // Emite a nova lista para o componente pai
	}
}
