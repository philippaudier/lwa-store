import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CartUpdateService } from 'src/app/services/cart-update.service';

declare var paypal;

@Component({
  selector: 'app-paypal-payment',
  templateUrl: './paypal-payment.component.html',
  styleUrls: ['./paypal-payment.component.scss']
})
export class PaypalPaymentComponent implements OnInit {
  @ViewChild('paypal', { static: true}) paypalElement: ElementRef;
  @Input() total: number;

  constructor(
    private cartUpdateService: CartUpdateService,
    private router: Router
  ) {
      this.cartUpdateService.getTotalCost().subscribe((value) => {
        this.total = value;
      });
   }

  ngOnInit(): void {
    console.log('amount ' + this.total);
    paypal.Buttons({
      style: {
        shape: 'rect',
        color: 'black',
        layout: 'vertical',
        label: 'pay',
      },
      // Set up the transaction
      createOrder:(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description: 'product',
              amount: {
                currency_code: 'EUR',
                value: this.total
              }
            }
          ]
        });
    },
      onApprove(data, actions) {
        return actions.order.capture().then((details) => {
          alert('Transaction completed by ' + details.payer.name.given_name);
        });
      },


    onCancel(data) {
    // Show a cancel page, or return to cart
    alert('Transaction cancelled');
    },

    onShippingChange(data, actions) {
      if (data.shipping_adress.country_code !== 'FR') {
        return actions.reject();
      }
      return actions.resolve();
    }
    }).render('#paypal-button-container'); // Display payment options on your web page
  }

}
