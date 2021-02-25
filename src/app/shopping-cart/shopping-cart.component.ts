import { Component, Input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { CartManagerService } from '../services/cart-manager.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { CartUpdateService } from '../services/cart-update.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  displayedColumns: string[] = ['name', 'quantity', 'price', 'delete'];
  public dataSource: any[];
  dataSourceLength: number;

  /* public rowId: any = {}; */

  quantityFormGroup: FormGroup;

  productBasePrice: number;
  totalCheckoutCost: number;
  isEnabled = false;

  @Input() quantity: number;

  constructor(
    private cartManagerService: CartManagerService,
    private formBuilder: FormBuilder,
    private header: HeaderComponent,
    private cartUpdate: CartUpdateService,
    private router: Router
  ) {}

  ngOnInit(): void {
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
    this.setIsShopping();
  }

  initCart() {
    Object.keys(localStorage).forEach(data => {
      const product = this.cartManagerService.get(data);
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

  onSwipeRight() {
    this.router.navigate(['/products']);
  }

  setIsShopping() {
    this.cartUpdate.setIsShopping();
  }

  ngOnDestroy() {
    this.setIsShopping();
  }
}

