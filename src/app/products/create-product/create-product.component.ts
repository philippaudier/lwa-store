import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AddProductService } from 'src/app/services/add-product.service';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  addProductForm: FormGroup;
  errorMessage: string;

  userSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
              private addproductService: AddProductService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.addProductForm = this.formBuilder.group({
      name: ['', [Validators.required]]
    });
    this.addProductForm = this.formBuilder.group({
      type: ['', [Validators.required]]
    });
    this.addProductForm = this.formBuilder.group({
      price: ['', [Validators.required]]
    });
  }

  onSubmit() {
    const name = this.addProductForm.get('name').value;
    const type = this.addProductForm.get('type').value;
    const price = this.addProductForm.get('price').value;

    this.addproductService.addNewProduct(name, type, price).then(
      (id) => {
        this.router.navigate(['/products', id]);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
}
