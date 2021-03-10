import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StripeContactComponent } from './stripe-contact.component';

describe('StripeContactComponent', () => {
  let component: StripeContactComponent;
  let fixture: ComponentFixture<StripeContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StripeContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StripeContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
