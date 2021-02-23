import { Injectable, Input } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartManagerService {

  public productCount: number;

  constructor( ) { }

  set(key: string, product: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(product));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  get(key: string) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }

  remove(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Error removing data from localStorage');
    }
  }
}
