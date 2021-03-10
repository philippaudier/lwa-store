import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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

  cart = {
    amount: 15,
  };

  constructor(
    private cartUpdateService: CartUpdateService
  ) {
      this.cartUpdateService.getTotalCost().subscribe((value) => {
        this.total = value;
      });
   }

  ngOnInit(): void {
    console.log('amount ' + this.total);
    paypal.Buttons({
      // Set up the transaction
      createOrder:(data, actions) => {
        const amount = this.total;
        console.log(amount);
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
      }
    }).render('#paypal-button-container'); // Display payment options on your web page
  }

}
