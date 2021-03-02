import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { CartUpdateService } from 'src/app/services/cart-update.service';
import { LocalStorageManagerService } from 'src/app/services/local-storage-manager.service';
import { NewCartManagerService } from 'src/app/services/new-cart-manager.service';
import { UpdateTitleService } from 'src/app/services/update-title.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  onHomePage = true;
  pageTitle: string;
  public count: number;

  countHeader: number;

  productTitle: string;
  onCheckout = false;
  isShopping = true;
  isDisplayed = false;

  products: Product[];

  constructor(
    private updateTitle: UpdateTitleService,
    private cartUpdate: CartUpdateService,
    private localStorageManager: LocalStorageManagerService,

    private newCartManager: NewCartManagerService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.updateTitle.getOnHomePage().subscribe((value) => {
        this.onHomePage = value;
      });
    });
    setTimeout(() => {
      this.updateTitle.getTitle().subscribe((value) => {
        this.pageTitle = value;
      });
    });
    this.updateTitle.getLookProduct().subscribe((value) => {
      this.isDisplayed = value;
    });
    this.cartUpdate.getCheckoutState().subscribe((value) => {
      this.onCheckout = value;
    });
    this.updateTitle.getProductName().subscribe((value) => {
      this.productTitle = value;
    });
    this.cartUpdate.getIsShopping().subscribe((value) => {
      this.isShopping = value;
    });
    /* this.localStorageManager.get('count').subscribe((value) => {
      this.count = value;
      console.log('countHeader' + this.countHeader);
    }); */
    this.count = this.localStorageManager.get('count');
    this.newCartManager.getTotalProducts().subscribe((value) => {
      this.countHeader = value;
      console.log(this.countHeader);
    });
  }
}
