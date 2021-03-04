import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartUpdateService } from '../services/cart-update.service';
import { ContactService } from '../services/contact.service';
import { UpdateTitleService } from '../services/update-title.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {

  FormData: FormGroup;
  nameFormGroup: FormGroup;
  emailFormGroup: FormGroup;
  subjectFormGroup: FormGroup;
  messageFormGroup: FormGroup;
  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private contact: ContactService,
    private router: Router,
    private updateTitle: UpdateTitleService,
    private cartUpdate: CartUpdateService
  ) {}

  ngOnInit(): void {
    this.FormData = this.formBuilder.group({
      Name: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.compose([Validators.required, Validators.email])]),
      Subject: new FormControl('', [Validators.required]),
      Message: new FormControl('', [Validators.required])
      });
    this.updateTitle.setTitle('CONTACT');
    setTimeout(() => {
      this.cartUpdate.setOnContact(true);
    });
    this.initForm();
  }

  initForm(): void {
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

  onSubmit(data: any): void {
    
    this.contact.senMessage(data)
    .subscribe(response => {
    this.router.navigate(['/home']);
    location.href = 'https://mailthis.to/confirm';
    console.log(response);
    }, error => {
    console.warn(error.responseText);
    console.log({ error });
    });
  }

  ngOnDestroy(): void {
    setTimeout(() => {
      this.cartUpdate.setOnContact(false);
    });
  }
}


