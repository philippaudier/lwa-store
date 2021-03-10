import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';
import { CartUpdateService } from 'src/app/services/cart-update.service';
import { Country } from '@angular-material-extensions/select-country';

const options = {
  name: 'name',
  address_line1: 'line1',
  address_line2: 'line2',
  address_city: 'city',
  address_state: 'state',
  address_zip: 'zip',
  address_country: 'country',
};

@Component({
  selector: 'app-stripe-payment',
  templateUrl: './stripe-payment.component.html',
  styleUrls: ['./stripe-payment.component.scss']
})
export class StripePaymentComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  @Input() contactInformationFormGroup: FormGroup;
  @Input() shippingFormGroup: FormGroup;
  @Input() amount: number;
  @Input() selectedCountry: any;



  /* cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  }; */

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  constructor(
    private fb: FormBuilder,
    private stripeService: StripeService,
    private cartUpdateService: CartUpdateService) {}

  ngOnInit(): void {
  }

  createToken(): void {
    options.name = this.contactInformationFormGroup.get('firstName').value + this.contactInformationFormGroup.get('lastName').value;
    options.address_city = this.shippingFormGroup.get('city').value;
    options.address_country = this.selectedCountry.alpha2Code;
    options.address_line1 = this.shippingFormGroup.get('address').value;
    options.address_state = this.shippingFormGroup.get('state').value;
    options.address_zip = this.shippingFormGroup.get('zip').value;

    console.log(options.address_country);
    console.log(this.amount);

    this.stripeService
      .createToken(this.card.element, options)
      .subscribe((result) => {
        if (result.token) {
          // Use the token
          this.stripeService.redirectToCheckout( {
            sessionId: result.token.id
          });
          console.log(result.token);
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }

  checkout() {

  }

}
