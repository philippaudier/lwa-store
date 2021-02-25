import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateTitleService {

  private pageTitle: BehaviorSubject<string>;

  constructor(
    private router: Router,
  ) {
      this.pageTitle = new BehaviorSubject<string>('');
    }

    setTitle() {
      if (this.router.url === '/home') {
        this.pageTitle.next('insérer le logo');
      } else if (this.router.url === '/products') {
        this.pageTitle.next('PRODUCTS');
      } else if (this.router.url === '/contact') {
        this.pageTitle.next('CONTACT');
      } else if (this.router.url === '/shopping-cart') {
        this.pageTitle.next('CART');
      } else if (this.router.url === '/checkout') {
        this.pageTitle.next('insérer le logo');
      }
    }

    getTitle() {
      console.log('pageTile updateTitle' + this.pageTitle);
      return this.pageTitle.asObservable();
    }






}
