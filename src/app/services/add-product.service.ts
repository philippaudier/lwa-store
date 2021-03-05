import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class AddProductService {

  constructor() { }

  addNewProduct(name, type, price, description, stock, size): Promise<number> {
    return new Promise<number>(
        (resolve, reject) => {
            const newProduct: Product = new Product(name, type, price, description, stock, size);
            this.getNextId().then( // Get next Id to assign it to the new group
                (nextProductId) => {
                    newProduct.idProduct = nextProductId;
                    newProduct.quantity = 1;
                    // Create new product
                    firebase.database().ref('/products/nextProductId').set(nextProductId + 1);
                    firebase.database().ref('/products/' + newProduct.idProduct).set(newProduct).then(
                        () => {
                            resolve(newProduct.idProduct);
                        }
                    );

                }, (error) => {
                    reject(error);
                }
            );
        }
    );
}

/**
 * Return next available group id
 */
    getNextId(): Promise<number> {
        return new Promise<number>(
            (resolve, reject) => {
                firebase.database().ref('/products/nextProductId')
                    .once('value')
                    .then(
                    (data) => {
                        resolve(data.val());
                    }, (error) => {
                        reject(error);
                    }
                );
            }
        );
    }
}
