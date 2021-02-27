import { Injectable } from '@angular/core';
import { count } from 'rxjs/operators';
import { CartManagerService } from './cart-manager.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageManagerService {



  constructor(
    private cartManagerService: CartManagerService
  ) { }

  increment(key: string, value: string): void {
    try {
      if (this.cartManagerService.get(value) === null) {
        const addCount = JSON.parse(localStorage.getItem(key)) + 1;
        console.log('addCount = ' + addCount);
        localStorage.setItem(key, JSON.stringify(addCount));
        console.log('addCount' + addCount);
      }
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  decrement(key: string): void {
    try {
      const subCount = JSON.parse(localStorage.getItem(key)) - 1;
      localStorage.setItem(key, JSON.stringify(subCount));
      console.log('subCount' + subCount);
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
