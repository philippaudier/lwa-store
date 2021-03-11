import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  cartContent: any[] = [];
  subTotalCost: number;
  isLinear = false;

  // contact information
  contactInformationFormGroup: FormGroup;
  firstNameFormGroup: FormGroup;
  lastNameFormGroup: FormGroup;
  emailFormGroup: FormGroup;
  phoneFormGroup: FormGroup;
  // shipping information
  shippingFormGroup: FormGroup;
  addressFormGroup: FormGroup;
  aptNumFormGroup: FormGroup;
  cityFormGroup: FormGroup;
  stateFormGroup: FormGroup;
  zipFormGroup: FormGroup;
  countryFormGroup: FormGroup;

  country: Country;
  // payment
  paymentFormGroup: FormGroup;
  errorMessage: string;

  constructor(
    private checkoutManagerService: CheckoutManagerService,
    private newCartManagerService: NewCartManagerService,
    private cartUpdate: CartUpdateService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.cartUpdate.getTotalCost().subscribe((value) => {
      this.subTotalCost = value;
    });
    this.contactInformationFormGroup = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.compose([Validators.required, Validators.email])]),
      phone: new FormControl('', [Validators.required])
    });
    this.shippingFormGroup = this.formBuilder.group({
      address: new FormControl('', [Validators.required]),
      aptNum: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      zip: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required])
    });
    this.paymentFormGroup = this.formBuilder.group({
      payment: ['', Validators.required]
    });
    this.initCheckoutCart();
/*     setTimeout(() => {
      this.subTotalCost = this.cartUpdate.getTotalCost();
    }); */
    /* this.calculSubTotal(); */
    // Update onCheckout boolean
    setTimeout(() => {
      this.cartUpdate.setCheckoutState(true);
    });
    /* this.cartContent = this.cartUpdate.getCheckoutData(); */
    console.log('CHECKOUT DATA === ' + this.cartContent);
    this.calculSubTotal();
    this.cartUpdate.setTotalCost(this.subTotalCost);
    console.log(this.subTotalCost);
  }

  initCheckoutCart(): void {
    // CLEAN LOCAL STORAGE
    this.cleanLocalStorage();
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

  calculSubTotal(): void {
    let subTotal = 0;
    this.cartContent.forEach(product => {
      subTotal += product.price * product.quantity;
      console.log('subtotal' + subTotal);
    });
    this.subTotalCost = Math.round(subTotal * 100) / 100;
  }

  onCountrySelected($event: Country): void {
    console.log($event);
    this.country = $event;
  }

  convertToNumber(value: string): number {
    const numeric = Math.round(Number(value) * 100) / 100;
    return numeric;
  }

  cleanLocalStorage(): void {
    Object.keys(localStorage).forEach(item => {
      const product = this.newCartManagerService.getProductByKey(item);
      if (!product.idProduct) {
        this.newCartManagerService.remove(item);
      }
    });
  }

  ngOnDestroy(): void {
    setTimeout(() => {
      this.cartUpdate.setCheckoutState(false);
    });
  }

}
