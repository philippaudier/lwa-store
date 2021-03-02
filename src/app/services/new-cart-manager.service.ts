import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewCartManagerService {

  cart: BehaviorSubject<any[]>;
  totalProduct: BehaviorSubject<number>;

  count: number;

  constructor(
    private router: Router
  ) {
    this.cart = new BehaviorSubject<any[]>(null);
    this.totalProduct = new BehaviorSubject<number>(0);
   }



  // ADD A PRODUCT TO THE LOCALSTORAGE CART
  addProduct(key: string, product: any): void {
    try {
      if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify(product));
        console.log('product added to the local storage');
      }
    } catch (e) {
      console.error('Error saving to localStorage', e);
      console.log('product already exists');
    }
  }

  // GET A PRODUCT FROM THE LOCALSTORAGE CART BY KEY
  getProductByKey(key: string) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }

  // REMOVE A PRODUCT FROM THE LOCALSTORAGE CART BY KEY
  removeProductByKey(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Error removing data from localStorage');
    }
  }

  // SET TOTAL PRODUCTS
  setTotalProducts(total) {
    this.totalProduct.next(total);
    console.log('total products = ' + total);
  }
  // RETURN THE TOTAL OF THE PRODUCTS IN THE CART
  getTotalProducts() {
    return this.totalProduct.asObservable();
  }

  // UPDATE PRODUCT QUANTITY BY KEY
  setProductQuantityByKey(key, value) {
    try {
      const localStorageProduct = this.getProductByKey(key);
      if (localStorageProduct) {
        localStorageProduct.quantity = value;
        console.log('value ' + value);
        this.removeProductByKey(key);
        this.addProduct(key, localStorageProduct);
        console.log('NEW PRODUCT = ' + localStorageProduct);
      }
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  // GET PRODUCT QUANTITY BY KEY
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

  // CLEAR CART
  clearCart() {
    window.localStorage.clear();
    this.router.navigate(['/home']);
  }


  // SET GET TOTAL PRODUCT
  setTotalProduct(value) {
    this.totalProduct.next(value);
  }

  getTotalProduct() {
    return this.totalProduct.asObservable();
  }



  /* getQuantity(key: string) {
    try {
      const product = this.getProductByKey(key);
      console.log(product);
      return product.quantity;
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  } */

  remove(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Error removing data from localStorage');
    }
  }

  convertToNumber(value: string) {
    const numeric = Number(value);
    return numeric;
  }

}
