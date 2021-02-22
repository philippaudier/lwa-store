import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartUpdateService {
  private productCount: BehaviorSubject<number>;
  constructor() {
    this.productCount = new BehaviorSubject<number>(0);
  }

  setCount(count: number) {
    this.productCount.next(count);
  }

  getCount(): Observable<number> {
    return this.productCount.asObservable();
  }
}
