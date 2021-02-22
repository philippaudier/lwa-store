import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  public productCount = 0;

  incrementProductCount() {
    this.productCount++;
  }

  decrementProductCount() {
    this.productCount--;
  }

  getProductCount() {
    return this.productCount;
  }


  constructor() { }
}
