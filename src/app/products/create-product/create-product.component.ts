import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  descriptionFormGroup: FormGroup;
  stockFormGroup: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private addproductService: AddProductService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.nameFormGroup = this.formBuilder.group({
      name: ['', [Validators.required]]
    });
    this.typeFormGroup = this.formBuilder.group({
      type: ['', [Validators.required]]
    });
    this.priceFormGroup = this.formBuilder.group({
      price: ['', [Validators.required]]
    });
    this.descriptionFormGroup = this.formBuilder.group({
      description: ['', [Validators.required]]
    });
    this.stockFormGroup = this.formBuilder.group({
      stock: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    const name = this.nameFormGroup.get('name').value;
    const type = this.typeFormGroup.get('type').value;
    const price = this.priceFormGroup.get('price').value;
    const description = this.descriptionFormGroup.get('description').value;
    const stock = this.stockFormGroup.get('stock').value;

    this.addproductService.addNewProduct(name, type, price, description, stock).then(
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
