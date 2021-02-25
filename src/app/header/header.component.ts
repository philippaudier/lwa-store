import { compileInjectable } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartManagerService } from '../services/cart-manager.service';
import { CartUpdateService } from '../services/cart-update.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public count: number;
  public pageTitle: string;

  constructor(
    private cartUpdate: CartUpdateService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.cartUpdate.getCount().subscribe((value) => {
      this.count = value;
      console.log(value);
    });
    this.setTitle();
    console.log(this.pageTitle);

  }

  setTitle() {
    if (this.router.url === '/contact') {
      this.pageTitle = 'CONTACT';
    } else if (this.router.url === '/products') {
      this.pageTitle = 'PRODUCTS';
    } else if (this.router.url === '/shopping-cart') {
      this.pageTitle = 'CART';
    } else if (this.router.url === '/home') {
      this.pageTitle = 'PRODUCTS';
    }
  }
}
