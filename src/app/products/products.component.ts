import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductManagerService } from '../services/product-manager.service';
import { CartManagerService } from '../services/cart-manager.service';
import { convertToObject } from 'typescript';
import { stringify } from '@angular/compiler/src/util';
import { HeaderComponent } from '../header/header.component';
import { SharedServiceService } from '../services/shared-service.service';

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
              private route: ActivatedRoute,
              private router: Router,
              private cartManagerService: CartManagerService,
              private sharedService: SharedServiceService,
              private header: HeaderComponent,
              ) { }

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

  addToCart() {
    this.product = new Product('', '', null, null);
    this.productManagerService.getProduct(this.route.snapshot.params.idProduct).then(
      () => {
        this.productSubscription = this.productManagerService.currentProduct.subscribe(
          (product) => {
            if (product) {
              this.product = product;
              this.cartManagerService.set(JSON.stringify(product.idProduct), product);

              // badge de merde qui update jamais
              this.sharedService.incrementProductCount();
              this.header.updateCartBadge();
              // fin
              
              this.router.navigate(['/shopping-cart']);
              console.log(product);
            } else {
              this.nonExistentProduct = true;
            }
          }
        );
    });
  }

  // ADMIN
  removeProduct() {
    this.productManagerService.removeProduct(this.route.snapshot.params.idProduct);
    this.header.updateCartBadge();
    setTimeout(() => {
      this.router.navigate(['/products']);
  }, 500);  // 0.5s
    console.log('you are trying to remove a product !');
  }
}
