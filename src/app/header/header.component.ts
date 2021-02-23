import { compileInjectable } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartManagerService } from '../services/cart-manager.service';
import { CartUpdateService } from '../services/cart-update.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public count: number;

  constructor(
    private cartUpdate: CartUpdateService,
  ) { }

  ngOnInit(): void {

    this.cartUpdate.getCount().subscribe((value) => {
      this.count = value;
    });

  }
}
