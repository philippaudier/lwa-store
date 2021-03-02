import { JitEmitterVisitor } from '@angular/compiler/src/output/output_jit';
import { Injectable, Input } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartManagerService {

  currentCart: Product[];

  productCount: BehaviorSubject<number>;


  constructor() {
    this.productCount = new BehaviorSubject<number>(0);
  }

  convertToNumber(value: string) {
    const numeric = Number(value);
    return numeric;
  }









  addProduct(key: string, product: any): void {
    try {
      if (localStorage.getItem(key) === null) {
        localStorage.setItem(key, JSON.stringify(product));
        console.log('product added to the local storage');
      }
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  getProductByKey(key: string) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }

  removeProductByKey(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Error removing data from localStorage');
    }
  }

  setProductQuantityByKey(key, value) {
    try {
      const localStorageProduct = this.getProductByKey(key);
      if (localStorageProduct) {
        localStorageProduct.quantity = value;
        this.removeProductByKey(key);
        this.addProduct(key, localStorageProduct);
        console.log('gogol = ' + value);
      }
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  getProductQuantityByKey(key) {
    try {
      const localStorageProduct = this.getProductByKey(key);
      let quantity = 0;
      if (localStorageProduct) {
        quantity = localStorageProduct.quantity;
        console.log('localStorageProduct.property = ' + localStorageProduct.quantity);
        console.log('quantity of products : ' + key + ' is equal to = ' + quantity);
        return quantity;
      }
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }






  getQuantity(key: string) {
    try {
      const product = this.getProductByKey(key);
      console.log(product);
      return product.quantity;
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
