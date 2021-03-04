import { Component, OnInit } from '@angular/core';
import { CartUpdateService } from 'src/app/services/cart-update.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss'],
  animations: [
    trigger('fade', [
      state('in', style({opacity: 1})),
      transition(':enter', [
        style({opacity: 0}),
        animate(600 )
      ]),
      transition(':leave',
        animate(600, style({opacity: 0})))
    ])
  ]
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

  onClickedOutside(e: Event): void {
    const element: string = (e.target as Element).id;
    console.log(element.toString());
    if (element === 'arrow' || element === 'arrow-button') {
    } else {
      this.displayMenu = false;
    }
    // console.log('clicked outside' + e);
  }

  displayMenuTrue(): void {
    this.displayMenu = true;
  }

  hideMenu(): void {
    this.displayMenu = false;
  }
}
