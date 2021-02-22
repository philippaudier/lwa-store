import { compileInjectable } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedServiceService } from '../services/shared-service.service';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  count: number;
  countSubscription: Subscription;

  constructor(
    private sharedService: SharedServiceService,
  ) { }

  ngOnInit(): void {
    /* this.count = this.sharedService.productCount;
    console.log('count = ' + this.count); */
    this.updateCartBadge();
  }

  updateCartBadge() {
    this.count = this.sharedService.getProductCount();
    console.log('cart has been updated !');
    console.log('count = ' + this.count);
  }
}
