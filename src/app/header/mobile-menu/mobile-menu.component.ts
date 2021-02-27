import { Component, HostListener, OnInit } from '@angular/core';
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

  onClickedOutside(e: Event) {
    const element: string = (e.target as Element).id;
    console.log(element.toString());
    if (element === 'arrow' || element === 'arrow-button') {
    } else {
      this.displayMenu = false;
    }
    console.log('clicked outside' + e);

  }
  ngOnInit(): void {
    this.cartUpdate.getCheckoutState().subscribe((value) => {
      this.onCheckout = value;
    });
  }

  displayMenuTrue() {
    this.displayMenu = true;
  }

  hideMenu() {
    this.displayMenu = false;
  }
}
