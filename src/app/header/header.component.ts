import { compileInjectable } from '@angular/compiler';
import { validateAndRewriteCoreSymbol } from '@angular/compiler-cli/src/ngtsc/imports';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../models/product.model';
import { CartManagerService } from '../services/cart-manager.service';
import { CartUpdateService } from '../services/cart-update.service';
import { LocalStorageManagerService } from '../services/local-storage-manager.service';
import { NewCartManagerService } from '../services/new-cart-manager.service';
import { ProductManagerService } from '../services/product-manager.service';
import { UpdateTitleService } from '../services/update-title.service';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public count: number;
  countHeader: number;
  pageTitle: string;
  onHomePage = true;
  productTitle: string;
  onCheckout = false;
  isShopping = true;
  isDisplayed = false;

  products: Product[];

  constructor(
    private cartUpdate: CartUpdateService,
    private updateTitle: UpdateTitleService,
    private localStorageManager: LocalStorageManagerService,
    private newCartManager: NewCartManagerService
  ) { }

  ngOnInit(): void {
    
    this.updateTitle.getLookProduct().subscribe((value) => {
      this.isDisplayed = value;
    });
    this.cartUpdate.getCheckoutState().subscribe((value) => {
      this.onCheckout = value;
    });
    this.updateTitle.getTitle().subscribe((value) => {
      this.pageTitle = value;
    });
    this.updateTitle.getProductName().subscribe((value) => {
      this.productTitle = value;
    });
    this.cartUpdate.getIsShopping().subscribe((value) => {
      this.isShopping = value;
    });
    this.cartUpdate.getCount().subscribe((value) => {
      this.countHeader = value;
    });
    setTimeout(() => {
      this.updateTitle.getOnHomePage().subscribe((value) => {
        this.onHomePage = value;
      });
    });
    /* this.localStorageManager.get('count').subscribe((value) => {
      this.count = value;
      console.log('countHeader' + this.countHeader);
    }); */
    this.count = this.localStorageManager.get('count');

    this.newCartManager.getTotalProduct().subscribe((value) => {
      this.countHeader = value;
    });

  }
}
