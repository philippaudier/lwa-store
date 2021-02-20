import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {

  @Input() products: Product[];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onClickAddProduct() {
    this.router.navigate(['/products/create-products']);
  }

}
