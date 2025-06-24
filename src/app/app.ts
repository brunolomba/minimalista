import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importe CommonModule para *ngIf, *ngFor
import { FormsModule } from '@angular/forms'; // Importe FormsModule para [(ngModel)]
import { Item, List } from './models/item.model'; // Importa a interface
import { v4 as uuidv4 } from 'uuid'; // Para gerar IDs únicos (instalar se não tiver)
import { Header } from './header/header';
import { AddItem } from './add-item/add-item';
import { ItemList } from './item-list/item-list';
import { ItemCounter } from './item-counter/item-counter';
import { Lists } from './list/list';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [
		CommonModule,
		FormsModule,
		Header,
		Lists,
		AddItem,
		ItemList,
		ItemCounter,
	],
	templateUrl: './app.html',
	styleUrl: './app.css',
})
export class App implements OnInit {
	protected title = 'minimaLISTA'; // Título da aplicação

	lists: List[] = [];
	selectedListIndex: number = 0;
	listExample: List[] = [
		{
			label: 'Label',
			value: 'value',
			items: [
				{
					id: uuidv4(),
					description: 'Description',
					completed: true,
				},
				{
					id: uuidv4(),
					description: 'Description 2',
					completed: false,
				},
			],
		},
	];

	// statuses = [
	//   { label: 'Ativo', value: 'active' },
	//   { label: 'Inativo', value: 'inactive' },
	//   { label: 'Pendente', value: 'pending' }
	// ];

	// selectedStatus: string | null = null;

	ngOnInit() {
		// Modelo para testes
		this.lists.push({
			label: 'Eletrônicos',
			value: 'electronics',
			items: [
				{ id: uuidv4(), description: 'PC', completed: true },
				{ id: uuidv4(), description: 'Celular', completed: false },
			],
		});
		this.lists.push({
			label: 'Mercado',
			value: 'shopping',
			items: [
				{ id: uuidv4(), description: 'Pão', completed: false },
				{ id: uuidv4(), description: 'Leite', completed: false },
			],
		});
	}

	constructor() {}

	addOrUpdateItemInList(listValue: string, newItemDescription: string): void {
		// 1. Criar o novo item
		const newItem: Item = {
			id: uuidv4(), // Gera um novo ID para o item
			description: newItemDescription,
			completed: false,
		};

		// 2. Mapear sobre o array principal 'lists'
		this.lists = this.lists.map((list) => {
			if (list.value === listValue) {
				// Encontramos a lista correta
				// 3. Criar uma NOVA referência para o array 'items' desta lista,
				const updatedItems = [...list.items, newItem]; // <-- Novo array de items

				// 4. Criar uma NOVA referência para a lista modificada,
				return { ...list, items: updatedItems }; // Nova referência para a List
			}
			// Se não for a lista que queremos modificar, retorna a lista original sem alterações.
			return list;
		});
	}

	toggleItemCompletionInList(listValue: string, itemId: string): void {
		this.lists = this.lists.map((list) => {
			if (list.value === listValue) {
				// Encontramos a lista correta
				const updatedItems = list.items.map((item) => {
					if (item.id === itemId) {
						// Cria um NOVO objeto Item com o 'completed' invertido
						return { ...item, completed: !item.completed };
					}
					return item; // Retorna os outros itens sem alteração
				});
				// Cria uma NOVA referência para a lista, com o array de 'items' atualizado
				return { ...list, items: updatedItems };
			}
			return list; // Retorna as outras listas sem alteração
		});
	}

	handleSelectedList(selectedList: string): void {
		this.lists.forEach((item, index) => {
			if (item.value === selectedList) {
				this.selectedListIndex = index;
			}
		});
	}

	// onStatusSelected(status: string): void {
	//   this.selectedStatus = status;
	// }

	handleListsUpdated(listsUpdated: List[]): void {
		if (listsUpdated.length > 0) {
			this.lists = listsUpdated;
		} else {
			this.lists = this.listExample;
		}
	}

	// Função chamada quando uma tarefa é removida pelo Item-list.component
	onItemRemoved(listValue: string, id: string): void {
		this.lists = this.lists.map((list) => {
			if (list.value === listValue) {
				return {
					...list,
					items: list.items.filter((item) => item.id !== id),
				};
			}
			return list;
		}); // Filtra o array, removendo a tarefa com o ID correspondente
	}
}
