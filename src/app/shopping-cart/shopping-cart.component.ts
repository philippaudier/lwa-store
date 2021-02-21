import { Component, OnInit } from '@angular/core';
import { ProductManagerService } from '../services/product-manager.service';
import { CartManagerService } from '../services/cart-manager.service';
import { Product } from '../models/product.model';
import { from } from 'rxjs';
import { ProductsComponent } from '../products/products.component';
import { element } from 'protractor';
import { FormBuilder, FormGroup, NumberValueAccessor, Validators } from '@angular/forms';



@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  displayedColumns: string[] = ['name', 'type', 'price'];
  dataSource: any[];

  quantityFormGroup: FormGroup;

  constructor(
    private cartManagerService: CartManagerService,
    private formBuilder: FormBuilder
  ) { }



  ngOnInit(): void {
    this.quantityFormGroup = this.formBuilder.group({
      quantity: ['', [Validators.required]]
    });

    this.dataSource = [];
    Object.keys(localStorage).forEach(data => {
      const product = this.cartManagerService.get(data);
      if (product.idProduct) {
        this.dataSource.push(product);
      }
    });
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
}
