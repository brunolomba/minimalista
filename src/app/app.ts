import {Component, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common'; // Importe CommonModule para *ngIf, *ngFor
import {FormsModule} from '@angular/forms'; // Importe FormsModule para [(ngModel)]
import {Item, List, WaterCounterData} from './models/item.model'; // Importa a interface
import {v4 as uuidv4} from 'uuid'; // Para gerar IDs únicos (instalar se não tiver)
import {Header} from './header/header';
import {AddItem} from './add-item/add-item';
import {ItemList} from './item-list/item-list';
import {ItemCounter} from './item-counter/item-counter';
import {Lists} from './list/list';
import {StorageService} from './storage';
import {WaterCount} from './water-count/water-count';

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
    WaterCount,
  ],
	templateUrl: './app.html',
	styleUrl: './app.css',
})
export class App implements OnInit {
	protected title = 'minimalista'; // Título da aplicação

	lists: List[] = [];
	selectedListIndex: number = 0;
	listExample: List[] = [
		{
			label: 'Lista de Exemplo',
			value: 'value',
			items: [
				{
					id: uuidv4(),
					description: 'Item 1',
					completed: true,
				},
				{
					id: uuidv4(),
					description: 'Item 2',
					completed: false,
				},
			],
		},
	];

  // Water Counter
  waterCounterData: WaterCounterData = {
    dayCounter: 0,
    isVisible: true,
  }

	// statuses = [
	//   { label: 'Ativo', value: 'active' },
	//   { label: 'Inativo', value: 'inactive' },
	//   { label: 'Pendente', value: 'pending' }
	// ];

	// selectedStatus: string | null = null;

  constructor(private storageService: StorageService) {}

	ngOnInit() {
    // Exemplo: carregar dados ao iniciar o componente
    const loadedLists = this.loadData();

    this.lists = loadedLists.length > 0 ? loadedLists : this.listExample;
    if (loadedLists.length === 0) {
      this.saveData(this.lists);
    }
    console.log('minimaLISTA iniciada com dados:', this.lists);
	}

  saveData(listsToSave: List[]): void {
    this.storageService.setItemLocalStorage('userData', listsToSave);
    console.log('Dados salvos no localStorage!', listsToSave);
  }

  loadData(): List[] {
    const userData = this.storageService.getItemLocalStorage('userData');
    if (userData && Array.isArray(userData)) {
      console.log('Dados carregados do localStorage:', userData);
      return userData;
    } else {
      console.log('Nenhum dado encontrado ou formato inválido no localStorage para "userData".');
      return [];
    }
  }

  removeData(): void {
    this.storageService.removeItemLocalStorage('userData');
    this.lists = []; // Limpa as listas na memória também
    this.saveData(this.lists); // Salva o estado vazio
    console.log('Dados removidos do localStorage!');
  }


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
        // Retorna uma nova referência para a lista com o array 'items' atualizado
        return { ...list, items: [...list.items, newItem] }; // Nova referência para a List
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
    // Salva o array 'lists' completo após a modificação
    this.saveData(this.lists);
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
    this.saveData(this.lists); // Salva o novo estado completo
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

    // Salva o array 'lists' completo após a remoção
    this.saveData(this.lists);
	}
}
