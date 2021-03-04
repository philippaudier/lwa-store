import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { Router } from '@angular/router';
import { ProductManagerService } from 'src/app/services/product-manager.service';
import { UpdateTitleService } from 'src/app/services/update-title.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {

  products: Product[];

  constructor(
    private productManagerService: ProductManagerService,
    private router: Router,
    private updateTitle: UpdateTitleService) { }

  ngOnInit(): void {
    this.updateTitle.setTitle('PRODUCTS');

    this.productManagerService.getAllProducts().then(
      (data) => {
        this.products = data;
      }
    );
  }

  onClickAddProduct(): void {
    this.router.navigate(['/products/create-products']);
  }

  setProductName(value): void {
    this.updateTitle.setProductName(value);
  }
}
