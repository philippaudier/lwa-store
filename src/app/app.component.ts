import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import { Product } from './models/product.model';
import { CartUpdateService } from './services/cart-update.service';
import { NewCartManagerService } from './services/new-cart-manager.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'lwa-store';
  isShopping = true;
  onCheckout = false;
  cartProductQuantity = 0;
  onContactPage = false;
  isNavigating = false;
  products: Product[];
  count = 0;

  constructor(
    private cartUpdate: CartUpdateService,
    private newCartManagerService: NewCartManagerService
  ) {

  const firebaseConfig = {
    // Your web app's Firebase configuration
      apiKey: 'AIzaSyAnPdYbTxjUriEZX7fFrq_EZ2n0zZHCvF8',
      authDomain: 'lwa-store.firebaseapp.com',
      projectId: 'lwa-store',
      storageBucket: 'lwa-store.appspot.com',
      messagingSenderId: '501029524651',
      appId: '1:501029524651:web:d1a4cf9b730617d7de53ee'
    };
    // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  }

  ngOnInit(): void {
    this.isNavigating = true;
    this.cartUpdate.getIsShopping().subscribe((value) => {
      this.isShopping = value;
    });
    this.cartUpdate.getCheckoutState().subscribe((value) => {
      this.onCheckout = value;
    });
    this.cartUpdate.getCartProductQuantity().subscribe((value) => {
      this.cartProductQuantity = value;
    });
    this.newCartManagerService.getTotalProducts().subscribe((value) => {
    this.count = value;
    });
    this.cartUpdate.getOnContact().subscribe((value) => {
      this.onContactPage = value;
    });

    this.setProductQuantity();

    /* this.count = this.localStorageManager.get('count'); */
    console.log('isShopping? = ' + this.isShopping);
    console.log('onCheckout? = ' + this.onCheckout);
    console.log('onContactPage? = ' + this.onContactPage);
    console.log('count? = ' + this.count);

  }

  // TO OBSERVE CART PRODUCT QUANTITY AND SET THE TOTAL
  setProductQuantity(): void {
    let total = 0;
    Object.keys(localStorage).forEach(idProduct => {
      const product = this.newCartManagerService.getProductByKey(idProduct);
      if (product.idProduct) {
        const localStorageProduct = this.newCartManagerService.getProductByKey(idProduct);
        const quantity = this.convertToNumber(localStorageProduct.quantity);
        total += quantity;
      }
    });
    this.newCartManagerService.setTotalProduct(total);
    console.log('total product is = ' + total);
  }

  convertToNumber(value: string): number {
    const numeric = Number(value);
    return numeric;
  }


}
