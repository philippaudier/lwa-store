import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductManagerService } from '../services/product-manager.service';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdateTitleService } from '../services/update-title.service';
import { NewCartManagerService } from '../services/new-cart-manager.service';

interface Size {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  sizes: Size[] = [
    {value: 'SMALL', viewValue: 'SMALL'},
    {value: 'MEDIUM', viewValue: 'MEDIUM'},
    {value: 'LARGE', viewValue: 'LARGE'},
    {value: 'XL', viewValue: 'XL'}
  ];

  product: Product;
  productSubscription: Subscription;
  nonExistentProduct = false;
  public dataSource: any[];
  isLookingProduct = false;

  addToCartFormGroup: FormGroup;

  constructor(private productManagerService: ProductManagerService,
              private route: ActivatedRoute,
              private router: Router,
              private title: Title,
              private formBuilder: FormBuilder,
              private updateTitle: UpdateTitleService,

              // REFACTORING
              private newCartManagerService: NewCartManagerService
              ) { }


  ngOnInit(): void {
    //
    this.setProductQuantity();
    this.product = new Product('', '', 0, '', 0);
    //
    this.updateTitle.getLookProduct().subscribe((value) => {
      this.isLookingProduct = value;
    });

    this.updateTitle.setLookProductTrue();
    this.addToCartFormGroup = this.formBuilder.group({
      size: ['', Validators.required]
    });

    this.updateTitle.setTitle('PRODUCTS');

    this.title.setTitle('PRODUCTS');
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




  addToCart(): void {

    this.product = new Product('', '', 0, '', 0);
    this.productManagerService.getProduct(this.route.snapshot.params.idProduct).then(
      () => {
        this.productSubscription = this.productManagerService.currentProduct.subscribe(
          (product) => {
            if (product) {
              this.product = product;
              // also increment cart counter value
              this.newCartManagerService.updateCartProduct(product);
              console.log('NEWCART = ' + JSON.stringify(this.newCartManagerService.getCartList()));
              this.newCartManagerService.addProduct(JSON.stringify(product.idProduct), product);
              this.router.navigate(['/shopping-cart']);
            } else {
              this.nonExistentProduct = true;
            }
          }
        );
    });
    setTimeout(() => {
      this.setProductQuantity();
    });
  }

  // ADMIN
  onClickRemoveProduct(): void {
    this.productManagerService.removeProductFromStore(this.route.snapshot.params.idProduct);
    setTimeout(() => {
      this.router.navigate(['/products']);
    }, 500);
    console.log('you are trying to remove a product !');
  }

  onSwipeRight(): void {
    this.router.navigate(['/products']);
  }

  // TO OBSERVE CART PRODUCT QUANTITY AND SET THE TOTAL
  setProductQuantity(): void {
    let total = 0;
    Object.keys(localStorage).forEach(idProduct => {
      const product = this.newCartManagerService.getProductByKey(idProduct);
      if (product.idProduct) {
        const localStorageProduct = this.newCartManagerService.getProductByKey(idProduct);
        const quantity = this.convertToNumber(localStorageProduct.quantity);
        total += quantity;
      }
    });
    this.newCartManagerService.setTotalProduct(total);
    console.log('total product is = ' + total);
  }

  convertToNumber(value: string): number {
    const numeric = Number(value);
    return numeric;
  }

  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
    setTimeout(() => {
      this.updateTitle.setLookProductFalse();
    });
    this.setProductQuantity();
  }

}
