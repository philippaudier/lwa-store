import { isTemplateDiagnostic } from '@angular/compiler-cli/src/ngtsc/typecheck/diagnostics';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewCartManagerService {

  cart: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  totalProduct: BehaviorSubject<number>;
  totalCost: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  count: number;

  constructor(
    private router: Router
  ) {
    this.totalProduct = new BehaviorSubject<number>(0);
   }

   // GET CART
   getCartList(skip: number = 0, limit: number = 0): BehaviorSubject<any[]> {
     return this.cart;
   }

   // ADD PRODUCT TO CART
   updateCartProduct(product): void {
     const myProducts = this.cart.getValue();
     myProducts.push(JSON.stringify(product));
     this.cart.next(myProducts);
   }

   // REMOVE PRODUCT FROM CART
   removeCartProduct(product): void {
     const myProducts = this.cart.getValue();
     const newCart = myProducts.filter(({idProduct}) => idProduct !== product.idProduct);
     this.cart.next(newCart);
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
  removeProductByKey(key): void {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Error removing data from localStorage');
    }
  }

  // SET TOTAL PRODUCTS
  setTotalProducts(total): void {
    this.totalProduct.next(total);
    console.log('total products = ' + total);
  }
  // RETURN THE TOTAL OF THE PRODUCTS IN THE CART
  getTotalProducts(): Observable<number> {
    return this.totalProduct.asObservable();
  }

  // UPDATE PRODUCT QUANTITY BY KEY
  setProductQuantityByKey(key, value): void {
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
  getProductQuantityByKey(key): number {
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

  // CLEAR CART LOCALSTORAGE
  clearCart(): void {
    window.localStorage.clear();
    this.router.navigate(['/home']);
  }


  // SET GET TOTAL PRODUCT
  setTotalProduct(value): void {
    this.totalProduct.next(value);
  }

  getTotalProduct(): Observable<number> {
    return this.totalProduct.asObservable();
  }

  setTotalCost(value): void {
    this.totalCost.next(value);
  }

  getTotalCost(): Observable<number> {
    return this.totalCost.asObservable();
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

  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Error removing data from localStorage');
    }
  }

  convertToNumber(value: string): number {
    const numeric = Number(value);
    return numeric;
  }

}
