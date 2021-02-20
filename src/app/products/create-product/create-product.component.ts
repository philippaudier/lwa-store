import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AddProductService } from 'src/app/services/add-product.service';

interface Type {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  types: Type[] = [
    {value: 'T-SHIRT', viewValue: 'T-SHIRT'},
    {value: 'PULL', viewValue: 'PULL'}
  ];

  nameFormGroup: FormGroup;
  typeFormGroup: FormGroup;
  priceFormGroup: FormGroup;
  errorMessage: string;

  userSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
              private addproductService: AddProductService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.nameFormGroup = this.formBuilder.group({
      name: ['', [Validators.required]]
    });
    this.typeFormGroup = this.formBuilder.group({
      type: ['', [Validators.required]]
    });
    this.priceFormGroup = this.formBuilder.group({
      price: ['', [Validators.required]]
    });
  }

  onSubmit() {
    const name = this.nameFormGroup.get('name').value;
    const type = this.typeFormGroup.get('type').value;
    const price = this.priceFormGroup.get('price').value;

    this.addproductService.addNewProduct(name, type, price).then(
      (newProductId) => {
        this.router.navigate(['/products', newProductId]);
        console.log('product created');
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
}
