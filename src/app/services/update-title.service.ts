import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateTitleService {

  pageTitle: BehaviorSubject<string>;
  productName: BehaviorSubject<string>;
  lookProduct: BehaviorSubject<boolean>;
  onHomePage: BehaviorSubject<boolean>;

  constructor(
    private router: Router,
  ) {
      this.pageTitle = new BehaviorSubject<string>('');
      this.productName = new BehaviorSubject<string>('');
      this.lookProduct = new BehaviorSubject<boolean>(false);
      this.onHomePage = new BehaviorSubject<boolean>(false);
    }

    setTitle(value): void {
      this.pageTitle.next(value);
    }

    getTitle(): Observable<string> {
      return this.pageTitle.asObservable();
    }

    setProductName(value): void {
      this.productName.next(value);
    }

    getProductName(): Observable<string> {
      return this.productName.asObservable();
    }

    setLookProductTrue(): void {
      this.lookProduct.next(true);
    }
    setLookProductFalse(): void {
      this.lookProduct.next(false);
    }
    getLookProduct(): Observable<boolean> {
      return this.lookProduct.asObservable();
    }


    // HOMEPAGE BOOLEAN
    setOnHomePage(value): void {
      this.onHomePage.next(value);
    }
    getOnHomePage(): Observable<boolean> {
      return this.onHomePage.asObservable();
    }


}
