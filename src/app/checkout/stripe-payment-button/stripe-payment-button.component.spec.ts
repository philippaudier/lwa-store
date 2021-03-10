import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StripePaymentButtonComponent } from './stripe-payment-button.component';

describe('StripePaymentButtonComponent', () => {
  let component: StripePaymentButtonComponent;
  let fixture: ComponentFixture<StripePaymentButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StripePaymentButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StripePaymentButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
