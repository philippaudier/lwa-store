import { Component, Input, OnInit } from '@angular/core';
import { SharedServiceService } from '../services/shared-service.service';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  count: number;

  constructor(
    private sharedService: SharedServiceService,
  ) { }

  ngOnInit(): void {
    this.count = this.sharedService.productCount;
    console.log(this.count);

  }
}
