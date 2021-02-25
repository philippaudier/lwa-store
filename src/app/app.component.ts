import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import firebase from 'firebase';
import { CartUpdateService } from './services/cart-update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lwa-store';


  isShopping = true;
  onCheckout = false;

  constructor(
    private cartUpdate: CartUpdateService,
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
    this.cartUpdate.getIsShopping().subscribe((value) => {
      this.isShopping = value;
    });
    this.cartUpdate.getCheckoutState().subscribe((value) => {
      this.onCheckout = value;
    });
  }
}

