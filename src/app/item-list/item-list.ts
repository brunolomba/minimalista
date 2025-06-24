import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../models/item.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-list',
  imports: [CommonModule],
  templateUrl: './item-list.html',
  styleUrl: './item-list.css'
})
export class ItemList {
  @Input() items: Item[] = [];
  @Input() listSelected: string = '';

  @Output() itemCompleted = new EventEmitter<string>(); // Evento para informar ao pai que uma tarefa foi concluída
  @Output() itemRemoved = new EventEmitter<string>(); // Evento para informar ao pai que uma tarefa foi removida

  constructor() { }

  toggleComplete(id: string): void {
    this.itemCompleted.emit(id); // Emite o ID da tarefa que precisa ter o status alterado
  }

  removeItem(id: string): void {
    this.itemRemoved.emit(id); // Emite o ID da tarefa que precisa ser removida
  }
}
