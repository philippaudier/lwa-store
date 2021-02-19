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

  model = new Contact('Philippe', 'mail@mail.com', 'Good job', 'You\'re online store app is really great');

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
  }

  onSubmit(data) {
    /* his.submitted = true; */
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

  newContact() {
    this.model = new Contact('', '', '', '');
  }
}


