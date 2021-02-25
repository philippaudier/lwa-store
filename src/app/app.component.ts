import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lwa-store';

  constructor() {

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


  onActivate(event) {
    const scrollToTop = window.setInterval(() => {
        let pos = window.pageYOffset;
        if (pos > 0) {
            window.scrollTo(0, pos - 20); // how far to scroll on each step
        } else {
            window.clearInterval(scrollToTop);
        }
    }, 16);
  }
}

