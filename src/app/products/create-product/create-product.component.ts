import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddProductService } from 'src/app/services/add-product.service';

import {ThemePalette} from '@angular/material/core';

interface Type {
  value: string;
  viewValue: string;
}

export interface Size {
  name: string;
  completed: boolean;
  color: ThemePalette;
  /* subtasks?: Size[]; */
}

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  sizes: Size[] = [
      {name: 'SMALL', completed: false, color: 'primary'},
      {name: 'MEDIUM', completed: false, color: 'primary'},
      {name: 'LARGE', completed: false, color: 'primary'},
      {name: 'XL', completed: false, color: 'primary'}
  ];

  allComplete = false;

  types: Type[] = [
    {value: 'T-SHIRT', viewValue: 'T-SHIRT'},
    {value: 'PULL', viewValue: 'PULL'},
    {value: 'SHORT', viewValue: 'SHORT'},
    {value: 'CAP', viewValue: 'CAP'},
  ];

  nameFormGroup: FormGroup;
  typeFormGroup: FormGroup;
  priceFormGroup: FormGroup;
  descriptionFormGroup: FormGroup;
  stockFormGroup: FormGroup;
  sizeFormGroup: FormGroup;
  errorMessage: string;

  addSizeArray: string[] = [];

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
    this.sizeFormGroup = this.formBuilder.group({
      size: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    const name = this.nameFormGroup.get('name').value;
    const type = this.typeFormGroup.get('type').value;
    const price = this.priceFormGroup.get('price').value;
    const description = this.descriptionFormGroup.get('description').value;
    const stock = this.stockFormGroup.get('stock').value;
    const size = this.addSizeArray;

    this.addproductService.addNewProduct(name, type, price, description, stock, size).then(
      (newProductId) => {
        this.router.navigate(['/products', newProductId]);
        console.log('product created');
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
  
  getSizes() {
    this.addSizeArray = this.sizes.filter(x => x.completed === true).map(x => x.name);
  }
}
