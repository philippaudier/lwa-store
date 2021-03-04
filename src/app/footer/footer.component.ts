import { Component, OnInit } from '@angular/core';
import { CartUpdateService } from '../services/cart-update.service';
import { NewCartManagerService } from '../services/new-cart-manager.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  isShopping = true;
  onCheckout = false;
  onContactPage = false;
  count = 0;

  constructor(
    private cartUpdateService: CartUpdateService,
    private newCartManagerService: NewCartManagerService
  ) {}

  ngOnInit(): void {
    this.cartUpdateService.getIsShopping().subscribe((value) => {
      this.isShopping = value;
    });
    this.cartUpdateService.getCheckoutState().subscribe((value) => {
      this.onCheckout = value;
    });
    this.newCartManagerService.getTotalProducts().subscribe((value) => {
      this.count = value;
    });
    this.cartUpdateService.getOnContact().subscribe((value) => {
      this.onContactPage = value;
    });

    console.log('isShopping? = ' + this.isShopping);
    console.log('onCheckout? = ' + this.onCheckout);
    console.log('onContactPage? = ' + this.onContactPage);
    console.log('count? = ' + this.count);
  }
}
