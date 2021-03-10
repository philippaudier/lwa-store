import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StripeShippingComponent } from './stripe-shipping.component';

describe('StripeShippingComponent', () => {
  let component: StripeShippingComponent;
  let fixture: ComponentFixture<StripeShippingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StripeShippingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StripeShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
