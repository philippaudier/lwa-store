import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartUpdateService {
  private productCount: BehaviorSubject<number>;
  private isShopping: BehaviorSubject<boolean>;
  private onCheckout: BehaviorSubject<boolean>;
  private cartProductQuantity: BehaviorSubject<number>;
  /* public checkoutData: any[]; */
  public checkoutData: any[];
  public total: number;
  public onContact: BehaviorSubject<boolean>;

  // cart counter for "cart bar" at the bottom
  private cartCounter: BehaviorSubject<number>;

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
    this.onContact = new BehaviorSubject<boolean>(false);
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
  }

  removeCheckoutData(key: string) {
    this.checkoutData.splice(this.checkoutData.indexOf(key));
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

  setOnContact(value) {
    this.onContact.next(value);
  }

  getOnContact() {
    return this.onContact.asObservable();
  }
}
