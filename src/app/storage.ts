import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  // Métodos para localStorage
  public setItemLocalStorage(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getItemLocalStorage(key: string): any | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  public removeItemLocalStorage(key: string): void {
    localStorage.removeItem(key);
  }

  // public clearLocalStorage(): void {
  //   localStorage.clear();
  // }
}
