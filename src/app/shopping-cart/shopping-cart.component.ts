import { Component, Input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { CartManagerService } from '../services/cart-manager.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartUpdateService } from '../services/cart-update.service';
import { Router } from '@angular/router';
import { UpdateTitleService } from '../services/update-title.service';
import { LocalStorageManagerService } from '../services/local-storage-manager.service';
import { HeaderComponent } from '../header/header.component';



@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  displayedColumns: string[] = ['name', 'quantity', 'price', 'delete'];
  dataSource: any[];
  dataSourceLength: number;

  quantityFormGroup: FormGroup;

  productBasePrice: number;
  totalCheckoutCost: number;
  isEnabled = false;

  productTotalQuantity = 0;

  @Input() quantity: number;

  constructor(
    private cartManagerService: CartManagerService,
    private formBuilder: FormBuilder,
    private cartUpdate: CartUpdateService,
    private router: Router,
    private updateTitle: UpdateTitleService,
    private localStorageManager: LocalStorageManagerService,
    private header: HeaderComponent
  ) {}

  ngOnInit(): void {
    this.updateTitle.setTitle('CART');
    this.dataSource = [];
    this.initCart();
    this.getCart();
    this.quantityFormGroup = this.formBuilder.group({
      quantity: [this.quantity, [Validators.required]]
    });
    this.quantityFormGroup.get('quantity').setValue('1');
    // get cart length
    this.cartUpdate.setCount(this.dataSource?.length);
    //
    setTimeout(() => {
      this.setIsShopping();
      this.enableCheckoutButton();
    });
    console.log(this.isEnabled);
  }

  initCart() {
    Object.keys(localStorage).forEach(data => {
      const product = this.cartManagerService.get(data);
      console.log(product);
      if (product.idProduct) {
        this.dataSource.push(product);
        this.dataSource.sort((a, b) => {
          if(a.idProduct > b.idProduct) {
            return 1;
          } else if (a.idProduct < b.idProduct) {
            return -1;
          } else {
            return 0;
          }
        });
        console.log('idProduct = ' + product.idProduct);
      }
    });
  }

  getCart() {
    if (this.dataSource?.length > 0) {
      this.isEnabled = true;
      console.log(this.dataSource.length);
      this.cartUpdate.setCount(this.dataSource.length);
      return this.dataSource?.length;
    } else {
      this.isEnabled = false;
    }
  }

  convertToNumber(value: string) {
    const numeric = Number(value);
    return numeric;
  }

  costTimesQuantity(value: string, quantity: number) {
    const newValue = this.convertToNumber(value) * quantity;
    return newValue;
  }

  getTotalCost() {
    return this.dataSource.reduce((acc, value) => acc + this.convertToNumber(value.price), 0);
  }

  removeProductFromCart(key: string) {
    if (this.cartManagerService.get(key)) {
      this.cartManagerService.remove(key);
      this.cartUpdate.removeCheckoutData(key);
      // also decrement cart counter value
      this.localStorageManager.decrement('count');
      this.ngOnInit();
    } else {
      console.log('this product doesnt exist');
      this.ngOnInit();
    }
  }

  getProductBasePrice(key: string) {
    const product = this.cartManagerService.get(key);
    this.productBasePrice = this.convertToNumber(product.price);
    /* console.log(this.quantity); */
    /* console.log('quantity value = ' + this.quantityFormGroup.get('quantity').value); */
    return this.productBasePrice;
  }

  checkout() {
    console.log(this.dataSource);
    this.totalCheckoutCost = this.getTotalCost();
    this.cartUpdate.setCheckoutData(this.dataSource);
    this.cartUpdate.setTotalCost(this.totalCheckoutCost);
    console.log(this.cartUpdate.getCheckoutData());
  }

  setIsShopping() {
    this.cartUpdate.setIsShopping();
  }

  enableCheckoutButton() {
    if (this.router.url === 'shopping-cart') {
      setTimeout(() => {
        this.isEnabled = true;
      });
    }
  }

  clearCart() {
    this.localStorageManager.clear();
    this.ngOnInit();
  }



  ngOnDestroy() {
    setTimeout(() => {
      this.setIsShopping();
      this.isEnabled = false;
      console.log(this.isEnabled);
    });
  }

  updateProductQuantity(idProduct, value) {
    this.dataSource.forEach(product => {
      if (product.idProduct === idProduct) {
        product.quantity = value;
      }
      console.log(product.quantity);
    });
    this.setNumberProducts();
  }

  setNumberProducts() {
    this.productTotalQuantity = 0;
    this.dataSource.forEach(product => {
      this.productTotalQuantity += this.convertToNumber(product.quantity);
      console.log(product.quantity);
    });
    this.cartUpdate.setCartProductQuantity(this.productTotalQuantity);
    console.log('total product !!!!! = ' + this.productTotalQuantity);
  }
}

