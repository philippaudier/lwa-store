import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductManagerService } from '../services/product-manager.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  product: Product;
  productSubscription: Subscription;
  nonExistentProduct = false;

  constructor(private productManagerService: ProductManagerService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.product = new Product('', '', null, null);
    this.productManagerService.getProduct(this.route.snapshot.params.idProduct).then(

      () => {
        this.productSubscription = this.productManagerService.currentProduct.subscribe(
          (product) => {
            if (product) {
              this.product = product;
            } else {
              this.nonExistentProduct = true;
            }
          }
        );
      }
    );
  }


  ngOnDestroy() {
    this.productSubscription.unsubscribe();
  }
}
