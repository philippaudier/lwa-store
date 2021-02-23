import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartUpdateService {
  private productCount: BehaviorSubject<number>;
  public checkoutData: any[];
  public total: number;
  constructor() {
    this.productCount = new BehaviorSubject<number>(0);
    this.checkoutData = [];
    this.total = 0;
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
}
