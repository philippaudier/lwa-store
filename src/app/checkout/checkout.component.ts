import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartUpdateService } from '../services/cart-update.service';
import { CheckoutManagerService } from '../services/checkout-manager.service';
import { NewCartManagerService } from '../services/new-cart-manager.service';
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
export class CheckoutComponent implements OnInit, OnDestroy {

  panelOpenState = false;
  step = 0;

  

  countries: Country[] = [
    {value: 'FRANCE', viewValue: 'FRANCE'},
    {value: 'UNITED STATE', viewValue: 'UNITED STATE'},
    {value: 'RUSSIA', viewValue: 'RUSSIA'},
    {value: 'BRAZIL', viewValue: 'BRAZIL'},
    {value: 'JAPAN', viewValue: 'JAPAN'}
  ];

  cartContent: any[] = [];
  totalCost: number;

  isLinear = false;

  contactInformationFormGroup: FormGroup;
  shippingFormGroup: FormGroup;
  paymentFormGroup: FormGroup;
  errorMessage: string;

  constructor(
    private checkoutManagerService: CheckoutManagerService,
    private newCartManagerService: NewCartManagerService,
    private cartUpdate: CartUpdateService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initCheckoutCart();
    setTimeout(() => {
      this.calculTotal();
    });
    console.log('cartContent = ' + this.cartContent);
    // Update onCheckout boolean
    setTimeout(() => {
      this.cartUpdate.setCheckoutState(true);
    });
    /* this.cartContent = this.cartUpdate.getCheckoutData(); */
    console.log('CHECKOUT DATA === ' + this.cartContent);
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

  setStep(index: number): void {
    this.step = index;
  }

  nextStep(): void {
    this.step++;
  }

  prevStep(): void {
    this.step--;
  }

  initCheckoutCart(): void {
    // CLEAN LOCAL STORAGE
    
    Object.keys(localStorage).forEach(key => {
      const product = this.newCartManagerService.getProductByKey(key);
      this.cartContent.push(product);
    });
    // SORT CART BY ID_PRODUCT
    this.cartContent.sort((a, b) => {
      if (a.idProduct > b.idProduct) {
        return 1;
      } else if (a.idProduct < b.idProduct) {
        return -1;
      } else {
        return 0;
      }
    });
    console.log(this.cartContent.length);
  }

  calculTotal(): void {
    let total = 0;
    this.cartContent.forEach(product => {
      total += product.price * product.quantity;
    });
    this.totalCost = total;
  }

  ngOnDestroy(): void {
    setTimeout(() => {
      this.cartUpdate.setCheckoutState(false);
    });
  }

}
