import { compileInjectable } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartManagerService } from '../services/cart-manager.service';
import { CartUpdateService } from '../services/cart-update.service';
import { UpdateTitleService } from '../services/update-title.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public count: number;
  public pageTitle: string;
  onCheckout = false;
  isShopping = true;

  constructor(
    private cartUpdate: CartUpdateService,
    private router: Router,
    private updateTitle: UpdateTitleService,
  ) { }

  ngOnInit(): void {
    this.cartUpdate.getCheckoutState().subscribe((value) => {
      this.onCheckout = value;
      console.log(value);
    });
    this.cartUpdate.getCount().subscribe((value) => {
      this.count = value;
      console.log(value);
    });

    this.updateTitle.getTitle().subscribe((value) => {
      this.pageTitle = value;
    });
    this.cartUpdate.getIsShopping().subscribe((value) => {
      this.isShopping = value;
    });
  }
}
