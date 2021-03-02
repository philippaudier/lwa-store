import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductManagerService } from '../services/product-manager.service';
import { UpdateTitleService } from '../services/update-title.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product[];
  productSubscription: Subscription;

  nonExistentProduct = false;

  constructor(
    private updateTitle: UpdateTitleService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.updateTitle.setOnHomePage(true);
  }

  ngOnDestroy() {
    this.updateTitle.setOnHomePage(false);
  }
}
