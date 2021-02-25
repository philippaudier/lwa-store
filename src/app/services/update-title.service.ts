import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateTitleService {

  private pageTitle: BehaviorSubject<string>;
  private productName: BehaviorSubject<string>;
  private lookProduct: BehaviorSubject<boolean>;

  constructor(
    private router: Router,
  ) {
      this.pageTitle = new BehaviorSubject<string>('');
      this.productName = new BehaviorSubject<string>('');
      this.lookProduct = new BehaviorSubject<boolean>(false);
    }

    setTitle(value) {
      this.pageTitle.next(value);
    }

    getTitle() {
      return this.pageTitle.asObservable();
    }

    setProductName(value) {
      this.productName.next(value);
      console.log('SERVICE product name = ' + value);
      console.log('YOOOOOOOOOOOO' + this.productName.value);
    }

    getProductName() {
      return this.productName.asObservable();
    }

    setLookProductTrue() {
      this.lookProduct.next(true);
    }
    setLookProductFalse() {
      this.lookProduct.next(false);
    }
    getLookProduct() {
      return this.lookProduct.asObservable();
    }


}