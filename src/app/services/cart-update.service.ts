import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartUpdateService {
  private productCount: BehaviorSubject<number>;
  public isShopping: BehaviorSubject<boolean>;
  public checkoutData: any[];
  public total: number;
  constructor(
    private router: Router,
  ) {
    this.productCount = new BehaviorSubject<number>(0);
    this.checkoutData = [];
    this.total = 0;
    this.isShopping = new BehaviorSubject<boolean>(true);
  }

  setCount(count: number) {
    this.productCount.next(count);
  }

  getCount(): Observable<number> {
    return this.productCount.asObservable();
  }

  setCheckoutData(dataSource: any) {
    this.checkoutData = [];
    dataSource.forEach((product: any) => {
      this.checkoutData.push(product);
    });
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

}
