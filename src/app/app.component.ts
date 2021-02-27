import { Component, HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { setTokenSourceMapRange } from 'typescript';
import { Product } from './models/product.model';
import { CartManagerService } from './services/cart-manager.service';
import { CartUpdateService } from './services/cart-update.service';
import { LocalStorageManagerService } from './services/local-storage-manager.service';
import { ProductManagerService } from './services/product-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
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
    private productManager: ProductManagerService,
    private cartManagerService: CartManagerService,
    private localStorageManager: LocalStorageManagerService,
    private router: Router,
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

  ngOnInit() {
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
    this.cartUpdate.getCount().subscribe((value) => {
    this.count = value;
    });
    this.cartUpdate.getOnContact().subscribe((value) => {
      this.onContactPage = value;
    });
    setTimeout(() => {
      this.count = this.localStorageManager.get('count');
    });
    console.log('is navigating ? = ' + this.isNavigating);
    console.log('is shopping ? = ' + this.isShopping);
    console.log('on checkout ? = ' + this.onCheckout);
    console.log('on contactPage ? = ' + this.onContactPage);
    console.log('count ? = ' + this.count);
  }
}
