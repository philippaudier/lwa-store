import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product.model';
import { CartManagerService } from '../services/cart-manager.service';
import { CartUpdateService } from '../services/cart-update.service';
import { LocalStorageManagerService } from '../services/local-storage-manager.service';
import { ProductManagerService } from '../services/product-manager.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  isShopping = true;
  onCheckout = false;
  cartProductQuantity = 0;
  onContactPage = false;
  isNavigating = false;

  products: Product[];
  count = 0;



  constructor(
    private cartUpdate: CartUpdateService,
    private localStorageManager: LocalStorageManagerService,
  ) { }

  ngOnInit(): void {
    this.isNavigating = true;
    this.cartUpdate.getIsShopping().subscribe((value) => {
      this.isShopping = value;
    });
    this.cartUpdate.getCheckoutState().subscribe((value) => {
      this.onCheckout = value;
    });
    this.cartUpdate.getCartProductQuantity().subscribe((value) => {
      this.cartProductQuantity = value;
    });
    this.cartUpdate.getCount().subscribe((value) => {
      this.count = value;
    });
    this.cartUpdate.getOnContact().subscribe((value) => {
      this.onContactPage = value;
    });
    this.count = this.localStorageManager.get('count');
  }
}
