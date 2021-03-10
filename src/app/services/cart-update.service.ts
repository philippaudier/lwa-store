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
  public total: BehaviorSubject<number>;
  public onContact: BehaviorSubject<boolean>;

  // cart counter for "cart bar" at the bottom
  private cartCounter: BehaviorSubject<number>;

  private trouve = false;
  constructor(
    private router: Router,
  ) {
    this.productCount = new BehaviorSubject<number>(0);
    this.checkoutData = [];
    this.total = new BehaviorSubject<number>(0);
    this.isShopping = new BehaviorSubject<boolean>(true);
    this.onCheckout = new BehaviorSubject<boolean>(false);
    this.cartProductQuantity = new BehaviorSubject<number>(0);
    this.cartCounter = new BehaviorSubject<number>(0);
    this.onContact = new BehaviorSubject<boolean>(false);
  }

  setCount(count: number): void {
    this.productCount.next(count);
  }

  getCount(): Observable<number> {
    return this.productCount.asObservable();
  }

   setCheckoutData(dataSource: any): void {

    dataSource.forEach((product: any) => {
      if (!this.checkoutData.find(p => p.idProduct === product.idProduct)) {
        this.checkoutData.push(product);
      }
    });
  }

  removeCheckoutData(key: string): void {
    this.checkoutData.splice(this.checkoutData.indexOf(key));
  }

  setTotalCost(total: number): void {
    this.total.next(total);
  }

  getTotalCost() {
    return this.total.asObservable();
  }

  getCheckoutData() {
    return this.checkoutData;
  }

  setIsShopping(): void {
    if (this.router.url !== '/shopping-cart') {
      this.isShopping.next(true);
    } else {
      this.isShopping.next(false);
    }
  }

  getIsShopping(): Observable<boolean> {
    return this.isShopping.asObservable();
  }

  setCheckoutState(value): void {
    this.onCheckout.next(value);
  }

  getCheckoutState(): Observable<boolean> {
    return this.onCheckout.asObservable();
  }

  setCartProductQuantity(value): void {
    this.cartProductQuantity.next(value);
  }

  getCartProductQuantity(): Observable<number> {
    return this.cartProductQuantity.asObservable();
  }

  updateCartCounter(value): void {
    this.cartCounter.next(value);
  }

  setOnContact(value): void {
    this.onContact.next(value);
  }

  getOnContact(): Observable<boolean> {
    return this.onContact.asObservable();
  }
}
