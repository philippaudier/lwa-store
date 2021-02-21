import { Component, Input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { ProductManagerService } from '../services/product-manager.service';
import { CartManagerService } from '../services/cart-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  displayedColumns: string[] = ['name', 'type', 'quantity', 'price', 'delete'];
  dataSource: any[];

  public rowId: any = {};

  quantityFormGroup: FormGroup;

  productBasePrice: number;

  @Input() quantity: number;

  constructor(
    private cartManagerService: CartManagerService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  /* ngOnChanges(changes: SimpleChanges) {
      if (changes.quantity != null && changes.quantity.currentValue != null) {
        this.quantity = changes.quantity.currentValue;
        console.log('quantity has update ! ' + this.quantity);
      }
  } */

  ngOnInit(): void {

    this.quantityFormGroup = this.formBuilder.group({
      quantity: [this.quantity, [Validators.required]]
    });
    this.quantityFormGroup.get('quantity').setValue('1');

    this.dataSource = [];
    Object.keys(localStorage).forEach(data => {
      const product = this.cartManagerService.get(data);
      if (product.idProduct) {
        this.dataSource.push(product);
      }
    });
    console.log(this.dataSource);
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

  removeProduct(key: string) {
    if (this.cartManagerService.get(key)) {
      console.log(this.cartManagerService.get(key));
      this.cartManagerService.remove(key);
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
    console.log('quantity value = ' + this.quantityFormGroup.get('quantity').value);
    
    return this.productBasePrice;
  }
}

