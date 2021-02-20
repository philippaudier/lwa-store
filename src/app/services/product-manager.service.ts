import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductManagerService {

  private productSubject = new BehaviorSubject<Product>(null);
  currentProduct = this.productSubject.asObservable();

  constructor() { }

  getProduct(idProduct: number) {
    return new Promise<Product>(
      (resolve, reject) => {
        firebase.database()
          .ref('/products/' + idProduct)
          .once('value')
          .then(
            (product) => {
              resolve(product.val());
              console.log(product.val());
            }
          );
      }
    );
  }

  getAllProducts() {
    return new Promise<Product[]>(
        (resolve, reject) => {
            firebase.database().ref('/products/').once('value').then(
                (data) => {
                    let dataArray = new Array<Product>();
                    let dataVal = data.val();
                    for (let key in dataVal) {
                        dataArray.push(dataVal[key]);
                    }
                    dataArray.splice(-1, 1);
                    resolve(dataArray);
                }
            );
        }
    );
}

}
