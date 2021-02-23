import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Contact } from '../models/contact.model';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  model = new Contact('', '', '', '');

  nameFormGroup: FormGroup;
  emailFormGroup: FormGroup;
  subjectFormGroup: FormGroup;
  messageFormGroup: FormGroup;
  errorMessage: string;

  submitted = false;
  FormData: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private contact: ContactService
  ) {}

  ngOnInit(): void {
      this.FormData = this.formBuilder.group({
        Name: new FormControl('', [Validators.required]),
        Email: new FormControl('', [Validators.compose([Validators.required, Validators.email])]),
        Subject: new FormControl('', [Validators.required]),
        Message: new FormControl('', [Validators.required])
        });
      this.initForm();
  }

  initForm() {
    this.nameFormGroup = this.formBuilder.group({
      name: ['', [Validators.required]]
    });
    this.emailFormGroup = this.formBuilder.group({
      email: ['', [Validators.required]]
    });
    this.subjectFormGroup = this.formBuilder.group({
      subject: ['', [Validators.required]]
    });
    this.messageFormGroup = this.formBuilder.group({
      message: ['', [Validators.required]]
    });
  }

  onSubmit(data) {
    /* his.submitted = true; */
    const name = this.nameFormGroup.get('name').value;
    const email = this.emailFormGroup.get('email').value;
    const subject = this.subjectFormGroup.get('subject').value;
    const message = this.messageFormGroup.get('message').value;
    /* const data = '{Name: "' + name + '", Email: "' + email + '", Subject: "' + subject + '", Message: "' + message + '"}'; */

    console.log(data);
    this.contact.senMessage(data)
    .subscribe(response => {
    location.href = 'https://mailthis.to/confirm';
    console.log(response);
    }, error => {
    console.warn(error.responseText);
    console.log({ error });
    });
  }
  /* onSubmit() {
    const name = this.nameFormGroup.get('name').value;
    const email = this.emailFormGroup.get('email').value;
    const subject = this.subjectFormGroup.get('subject').value;
    const message = this.messageFormGroup.get('message').value;

    this.addproductService.addNewProduct(name, type, price).then(
      (newProductId) => {
        this.router.navigate(['/products', newProductId]);
        console.log('product created');
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  } */
}


