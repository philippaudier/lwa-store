import { compileInjectable } from '@angular/compiler';
import { validateAndRewriteCoreSymbol } from '@angular/compiler-cli/src/ngtsc/imports';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../models/product.model';
import { CartManagerService } from '../services/cart-manager.service';
import { CartUpdateService } from '../services/cart-update.service';
import { ProductManagerService } from '../services/product-manager.service';
import { UpdateTitleService } from '../services/update-title.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public count: number;
  public pageTitle: string;
  public productTitle: string;
  onCheckout = false;
  isShopping = true;
  public isDisplayed = false;

  products: Product[];

  constructor(
    private cartUpdate: CartUpdateService,
    private updateTitle: UpdateTitleService,
  ) { }

  ngOnInit(): void {
    this.updateTitle.getLookProduct().subscribe((value) => {
      this.isDisplayed = value;
    });
    this.cartUpdate.getCheckoutState().subscribe((value) => {
      this.onCheckout = value;
    });
    this.cartUpdate.getCount().subscribe((value) => {
      this.count = value;
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
  }
}
