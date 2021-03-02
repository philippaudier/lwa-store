import { Component, Input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { CartManagerService } from '../services/cart-manager.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartUpdateService } from '../services/cart-update.service';
import { Router } from '@angular/router';
import { UpdateTitleService } from '../services/update-title.service';
import { LocalStorageManagerService } from '../services/local-storage-manager.service';
import { HeaderComponent } from '../header/header.component';
import { NewCartManagerService } from '../services/new-cart-manager.service';



@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  displayedColumns: string[] = ['name', 'quantity', 'price', 'delete'];
  cart: any[];
  quantityFormGroup: FormGroup;
  productBasePrice: number;
  isEnabled = false;
  totalProductQuantity: number;
  quantities: number[];
  totalCost = 0;
   /*
  dataSourceLength: number;

  */

  
  /*
  totalCheckoutCost: number;*/
  
  /*
  productTotalQuantity = 0;
  */
  @Input() quantity: number;

  constructor(
    /* private cartManagerService: CartManagerService,
  */private formBuilder: FormBuilder,
    private cartUpdate: CartUpdateService,
    private router: Router,
    private newCartManagerService: NewCartManagerService/*
    private updateTitle: UpdateTitleService,
    private localStorageManager: LocalStorageManagerService,
    private header: HeaderComponent,
    private newCartManager: NewCartManagerService */
  ) {}

  ngOnInit(): void {
    this.quantities = [];
    this.cart = [];
    this.initCart();
    console.log('CART = ' + this.cart);

    this.newCartManagerService.getTotalProduct().subscribe((value) => {
      this.totalProductQuantity = value;
      console.log('VALUE =====> ' + value);
    });

    /* this.newCartManager.getTotalProducts();




    this.updateTitle.setTitle('CART');
    this.dataSource = [];
    this.initCart();
    this.getCart(); */
    this.quantityFormGroup = this.formBuilder.group({
      quantity: [this.quantity, [Validators.required]]
    });

    this.quantityFormGroup.valueChanges.subscribe(value => {
      this.totalProductQuantity += value.quantity;
    });
    // get cart length
   /*  this.cartUpdate.setCount(this.dataSource?.length); */
    //
    setTimeout(() => {
      this.setIsShopping();
    });
    this.enableCheckoutButton();
  }

  initCart() {
    Object.keys(localStorage).forEach(idProduct => {
      const product = this.newCartManagerService.getProductByKey(idProduct);
      if (product.idProduct) {

        this.cart.push(product);
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
    });
  }

  updateQuantity(key, value) {
    this.newCartManagerService.setProductQuantityByKey(key, value);
  }
  
  setTotalProducts() {
    const total = this.cart.reduce((acc, value) => acc + this.convertToNumber(value.quantity), 0);
    this.newCartManagerService.setTotalProducts(total);
  }

  /* getProductQuantity(key) {
    const total = this.cartManagerService.getProductQuantityByKey(key);
    return total;
  }



  setProductQuantity(key, value) {
    this.cartManagerService.setProductQuantityByKey(key, value);
    console.log('new quantity = ' + this.cartManagerService.getProductQuantityByKey(key));
  }

  

  getCart() {
    if (this.dataSource?.length > 0) {
      this.isEnabled = true;
      this.cartUpdate.setCount(this.dataSource.length);
      return this.dataSource?.length;
    } else {
      this.isEnabled = false;
    }
  }

  */
  /*
  costTimesQuantity(value: string, quantity: number) {
    const newValue = this.convertToNumber(value) * quantity;
    return newValue;
  }

  */
  getTotalCost() {

    return this.cart.reduce((acc, value) => acc + this.convertToNumber(value.price), 0);
    
  }

  removeProductFromCart(key: string) {
    console.log(this.cart.length);
    
    const index: number = this.cart.indexOf(key);
    if (this.newCartManagerService.getProductByKey(key)) {
      this.newCartManagerService.remove(key);
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

  
  getProductBasePrice(key: string) {
    const product = this.newCartManagerService.getProductByKey(key);
    this.productBasePrice = this.convertToNumber(product.price);
    /* console.log(this.quantity); */
    /* console.log('quantity value = ' + this.quantityFormGroup.get('quantity').value); */
    return this.productBasePrice;
  }
  /*
  /* checkout() {
    this.totalCheckoutCost = this.getTotalCost();
    this.cartUpdate.setCheckoutData(this.dataSource);
    this.cartUpdate.setTotalCost(this.totalCheckoutCost);
  }
  */
  setIsShopping() {
    this.cartUpdate.setIsShopping();
  }

  enableCheckoutButton() {
    if (this.router.url === 'shopping-cart') {
      this.isEnabled = true;
    }
  }
  
  clearCart() {
    this.newCartManagerService.clearCart();
    /* this.ngOnInit(); */
  }
  


  ngOnDestroy() {
    setTimeout(() => {
      this.setIsShopping();
      this.isEnabled = false;
    });

    this.setProductQuantity();
  }

// TO OBSERVE CART PRODUCT QUANTITY AND SET THE TOTAL
setProductQuantity() {
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

convertToNumber(value: string) {
  const numeric = Number(value);
  return numeric;
}
/*
  updateProductQuantity(idProduct, value) {
    this.dataSource.forEach(product => {
      if (product.idProduct === idProduct) {
        product.quantity = value;
      }
    });
    this.setNumberProducts();
  }

  setNumberProducts() {
    this.productTotalQuantity = 0;
    this.dataSource.forEach(product => {
      this.productTotalQuantity += this.convertToNumber(product.quantity);
    });
    this.cartUpdate.setCartProductQuantity(this.productTotalQuantity);
  }
 */
/*   setDefaultQuantity(idProduct, value) {
    this.cartManagerService.setProductQuantityByKey(idProduct, value);
  } */
}

