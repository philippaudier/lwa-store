import { Component, OnInit } from '@angular/core';
import { CartUpdateService } from 'src/app/services/cart-update.service';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss']
})
export class MobileMenuComponent implements OnInit {

  onCheckout = false;
  displayMenu = false;
  

  constructor(
    private cartUpdate: CartUpdateService
  ) { }

  ngOnInit(): void {
    this.cartUpdate.getCheckoutState().subscribe((value) => {
      this.onCheckout = value;
    });
  }

  onDisplayMenu() {
    if (this.displayMenu) {
      this.displayMenu = false;
    } else {
      this.displayMenu = true;
    }
  }

  hideMenu() {
    this.displayMenu = false;
  }
}
