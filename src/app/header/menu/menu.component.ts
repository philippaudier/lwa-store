import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { CartUpdateService } from 'src/app/services/cart-update.service';
import { NewCartManagerService } from 'src/app/services/new-cart-manager.service';
import { UpdateTitleService } from 'src/app/services/update-title.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  onHomePage = true;
  onCheckout = false;
  isShopping = true;
  isDisplayed = false;

  pageTitle: string;
  productTitle: string;
  productAmount: number;
  products: Product[];

  constructor(
    private updateTitle: UpdateTitleService,
    private cartUpdate: CartUpdateService,
    private newCartManager: NewCartManagerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // UPDATE TITLE
    this.updateTitle.getTitle().subscribe((value) => {
      this.pageTitle = value;
    });
    this.updateTitle.getProductName().subscribe((value) => {
      this.productTitle = value;
    });
    this.updateTitle.getLookProduct().subscribe((value) => {
      this.isDisplayed = value;
    });
    // UPDATE BOOLEAN
    this.cartUpdate.getCheckoutState().subscribe((value) => {
      this.onCheckout = value;
    });
    this.cartUpdate.getIsShopping().subscribe((value) => {
      this.isShopping = value;
    });
    // UPDATE CART
    this.newCartManager.getTotalProducts().subscribe((value) => {
      this.productAmount = value;
    });
  }

  checkRoute(): boolean {
    if (this.router.url === '/home') {
      this.onHomePage = true;
    } else {
      this.onHomePage = false;
    }
    return this.onHomePage;
  }
}
