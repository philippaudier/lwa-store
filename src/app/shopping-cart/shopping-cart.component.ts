import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartUpdateService } from '../services/cart-update.service';
import { Router } from '@angular/router';
import { UpdateTitleService } from '../services/update-title.service';
import { NewCartManagerService } from '../services/new-cart-manager.service';
import { isRegularExpressionLiteral } from 'typescript';



@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['name', 'quantity', 'price', 'delete'];
  cart: any[];
  quantityFormGroup: FormGroup;
  productBasePrice: number;
  isEnabled = false;
  totalProductQuantity: number;
  isAlreadyInCart: boolean;

  totalCost: number;

  @Input() quantity: number;

  constructor(
    private formBuilder: FormBuilder,
    private cartUpdate: CartUpdateService,
    private router: Router,
    private newCartManagerService: NewCartManagerService,
    private updateTitle: UpdateTitleService,
    private newCartManager: NewCartManagerService
  ) {}

  ngOnInit(): void {
    this.cart = [];
    this.initCart();
    console.log('CART LENGTH = ' + this.cart?.length);
    console.log('CART = ' + this.cart);
    console.log('cart = ' + JSON.stringify(this.cart));
    this.newCartManagerService.getTotalProduct().subscribe((value) => {
      this.totalProductQuantity = value;
    });
    this.calculTotal();
    /* this.newCartManagerService.getTotalCost().subscribe((value) => {
      this.totalCost = value;
    }); */

    /* this.newCartManager.getTotalProducts();
    this.updateTitle.setTitle('CART');
    */
    this.quantityFormGroup = this.formBuilder.group({
      quantity: [this.quantity, [Validators.required]]
    });

    this.quantityFormGroup.valueChanges.subscribe(value => {
      this.totalProductQuantity += value.quantity;
    });
    setTimeout(() => {
      this.setIsShopping();
    });
    this.enableCheckoutButton();
  }

  initCart(): void {
    // CLEAN LOCAL STORAGE
    this.cleanLocalStorage();
    //
    /* this.newCartManagerService.getCartList().forEach(product => {
      this.cart.push(product);
    }); */
    Object.keys(localStorage).forEach(key => {
      const product = this.newCartManagerService.getProductByKey(key);
      this.cart.push(product);
    });
    // SORT CART BY ID_PRODUCT
    this.cart.sort((a, b) => {
      if (a.idProduct > b.idProduct) {
        return 1;
      } else if (a.idProduct < b.idProduct) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  // REMOVE OBJECTS THAT ARE NOT PRODUCTS FORM THE LOCAL STORAGE
  cleanLocalStorage(): void {
    Object.keys(localStorage).forEach(item => {
      const product = this.newCartManagerService.getProductByKey(item);
      if (!product.idProduct) {
        this.newCartManager.remove(item);
      }
    });
  }

  calculTotal(): void {
    let total = 0;
    this.cart.forEach(product => {
      total += product.price * product.quantity;
    });
    this.totalCost = total;
  }

  updateQuantity(key: string, value): void {
    this.newCartManagerService.setProductQuantityByKey(key, value);
  }

  setTotalProducts(): void {
    const total = this.cart.reduce((acc, value) => acc + this.convertToNumber(value.quantity), 0);
    this.newCartManagerService.setTotalProducts(total);
  }

  /*
  costTimesQuantity(value: string, quantity: number) {
    const newValue = this.convertToNumber(value) * quantity;
    return newValue;
  }

  */
  /* getTotalCost(): number {
    const total = this.cart.reduce((acc, value) => acc + this.convertToNumber(value.price), 0);
    this.newCartManagerService.setTotalCost(total);
    return total;
  } */

  removeProductFromCart(key: string): void {
    console.log(this.cart.length);
    const index: number = this.cart.indexOf(key);
    if (this.newCartManagerService.getProductByKey(key)) {
      this.newCartManagerService.removeProductByKey(key);
      // REMOVE FROM CART
      this.cart.splice(index, 1);
      console.log(this.cart);
      if (this.cart.length === 0) {
        this.router.navigate(['/home']);
      }
      /* this.cartUpdate.removeCheckoutData(key); */
      // also decrement cart counter value
      this.ngOnInit();
    } else {
      this.ngOnInit();
    }
  }

  getProductBasePrice(key: string): number {
    const product = this.newCartManagerService.getProductByKey(key);
    this.productBasePrice = this.convertToNumber(product.price);
    return this.productBasePrice;
  }
  
/*   checkout() {
    this.totalCheckoutCost = this.getTotalCost();
    this.cartUpdate.setCheckoutData(this.dataSource);
    this.cartUpdate.setTotalCost(this.totalCheckoutCost);
  } */
  
  setIsShopping(): void {
    this.cartUpdate.setIsShopping();
  }

  enableCheckoutButton(): void {
    if (this.router.url === 'shopping-cart') {
      this.isEnabled = true;
    }
  }

  clearCart(): void {
    this.newCartManagerService.clearCart();
    /* this.ngOnInit(); */
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

/*   setCartProductPrice(product, value): void {
    this.cart.forEach(item => {
      if (item.idProduct === product.idProduct) {
        item.price = Math.round(value * 100) / 100;
        console.log('cart = ' + JSON.stringify(this.cart));
      }
    });
  } */

  convertToNumber(value: string): number {
    const numeric = Math.round(Number(value) * 100) / 100;
    return numeric;
  }

  ngOnDestroy(): void {
    setTimeout(() => {
      this.setIsShopping();
      this.isEnabled = false;
    });

    this.setProductQuantity();
  }
}

