import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartUpdateService {
  public productCount: BehaviorSubject<number>;
  public isShopping: BehaviorSubject<boolean>;
  public onCheckout: BehaviorSubject<boolean>;
  public cartProductQuantity: BehaviorSubject<number>;
  /* public checkoutData: any[]; */
  public checkoutData: any[];
  public total: number;

  // cart counter for "cart bar" at the bottom
  public cartCounter: BehaviorSubject<number>;

  private trouve = false;
  constructor(
    private router: Router,
  ) {
    this.productCount = new BehaviorSubject<number>(0);
    this.checkoutData = [];
    this.total = 0;
    this.isShopping = new BehaviorSubject<boolean>(true);
    this.onCheckout = new BehaviorSubject<boolean>(false);
    this.cartProductQuantity = new BehaviorSubject<number>(0);
    this.cartCounter = new BehaviorSubject<number>(0);
  }

  setCount(count: number) {
    this.productCount.next(count);
  }

  getCount(): Observable<number> {
    return this.productCount.asObservable();
  }

   setCheckoutData(dataSource: any) {
    
    dataSource.forEach((product: any) => {
      if (!this.checkoutData.find(p => p.idProduct === product.idProduct)) {
        this.checkoutData.push(product);
      }
    });
    console.log(this.checkoutData);
  }

  removeCheckoutData(key: string) {
    this.checkoutData.splice(this.checkoutData.indexOf(key));
    console.log('length = ' + this.checkoutData.length);
  }

  setTotalCost(total: number) {
    this.total = total;
  }

  getTotalCost() {
    return this.total;
  }

  getCheckoutData() {
    return this.checkoutData;
  }

  setIsShopping() {
    if (this.router.url !== '/shopping-cart') {
      this.isShopping.next(true);
    } else {
      this.isShopping.next(false);
    }
  }

  getIsShopping() {
    return this.isShopping.asObservable();
  }

  setCheckoutState(value) {
    this.onCheckout.next(value);
  }

  getCheckoutState() {
    return this.onCheckout.asObservable();
  }

  setCartProductQuantity(value) {
    this.cartProductQuantity.next(value);
  }

  getCartProductQuantity() {
    return this.cartProductQuantity.asObservable();
  }

  updateCartCounter(value) {
    this.cartCounter.next(value);
  }
}
