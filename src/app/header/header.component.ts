import { Component, OnInit } from '@angular/core';
import { CartUpdateService } from '../services/cart-update.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  onCheckout = false;

  constructor(
    private cartUpdateService: CartUpdateService
  ) { }

  ngOnInit(): void { 
    this.cartUpdateService.getCheckoutState().subscribe((value) => {
      this.onCheckout = value;
    });
  }
}
