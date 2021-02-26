import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductManagerService } from '../services/product-manager.service';
import { CartManagerService } from '../services/cart-manager.service';
import { HeaderComponent } from '../header/header.component';
import { CartUpdateService } from '../services/cart-update.service';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdateTitleService } from '../services/update-title.service';

interface Size {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  sizes: Size[] = [
    {value: 'SMALL', viewValue: 'SMALL'},
    {value: 'MEDIUM', viewValue: 'MEDIUM'},
    {value: 'LARGE', viewValue: 'LARGE'},
    {value: 'XL', viewValue: 'XL'}
  ];

  product: Product;
  productSubscription: Subscription;
  nonExistentProduct = false;
  dataSource: any[];
  isLookingProduct = false;

  addToCartFormGroup: FormGroup;

  constructor(private productManagerService: ProductManagerService,
              private route: ActivatedRoute,
              private router: Router,
              private cartManagerService: CartManagerService,
              private header: HeaderComponent,
              private cartUpdate: CartUpdateService,
              private shoppingCart: ShoppingCartComponent,
              private title: Title,
              private formBuilder: FormBuilder,
              private updateTitle: UpdateTitleService,
              ) { }


  ngOnInit(): void {

    this.updateTitle.getLookProduct().subscribe((value) => {
      this.isLookingProduct = value;
    });

    this.updateTitle.setLookProductTrue();
    this.addToCartFormGroup = this.formBuilder.group({
      size: ['', Validators.required]
    });

    this.updateTitle.setTitle('PRODUCT');

    this.title.setTitle('PRODUCTS');
    this.product = new Product('', '', null, null);
    this.dataSource = [];
    this.productManagerService.getProduct(this.route.snapshot.params.idProduct).then(
      () => {
        this.productSubscription = this.productManagerService.currentProduct.subscribe(
          (product) => {
            if (product) {
              this.product = product;
              this.updateTitle.setProductName(this.product.name);
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
    setTimeout(() => {
      this.updateTitle.setLookProductFalse();
    });
  }

  addToCart() {

    this.product = new Product('', '', null, null);
    this.productManagerService.getProduct(this.route.snapshot.params.idProduct).then(
      () => {
        this.productSubscription = this.productManagerService.currentProduct.subscribe(
          (product) => {
            if (product) {

              this.product = product;
              //
              this.cartManagerService.set(JSON.stringify(product.idProduct), product);
              this.router.navigate(['/shopping-cart']);
              // fin
            } else {
              this.nonExistentProduct = true;
            }
          }
        );
    });
  }

  // ADMIN
  onClickRemoveProduct() {
    this.productManagerService.removeProductFromStore(this.route.snapshot.params.idProduct);
    setTimeout(() => {
      this.router.navigate(['/products']);
    }, 500);
    console.log('you are trying to remove a product !');
  }

  onSwipeRight() {
    this.router.navigate(['/products']);
  }

}
