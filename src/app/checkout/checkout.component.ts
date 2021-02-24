import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartUpdateService } from '../services/cart-update.service';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';

interface Country {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  countries: Country[] = [
    {value: 'FRANCE', viewValue: 'FRANCE'},
    {value: 'UNITED STATE', viewValue: 'UNITED STATE'},
    {value: 'RUSSIA', viewValue: 'RUSSIA'},
    {value: 'BRAZIL', viewValue: 'BRAZIL'},
    {value: 'JAPAN', viewValue: 'JAPAN'}
  ];

  cartContent: any;
  totalCost: number;

  isLinear = false;

  contactInformationFormGroup: FormGroup;
  shippingFormGroup: FormGroup;
  paymentFormGroup: FormGroup;
  errorMessage: string;

  constructor(
    private cartUpdate: CartUpdateService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.cartContent = this.cartUpdate.getCheckoutData();
    this.totalCost = this.cartUpdate.getTotalCost();

    this.contactInformationFormGroup = this.formBuilder.group({
      firstName: ['', Validators.required]
    });
    this.shippingFormGroup = this.formBuilder.group({
      adress: ['', Validators.required]
    });
    this.paymentFormGroup = this.formBuilder.group({
      payment: ['', Validators.required]
    });
  }

}
