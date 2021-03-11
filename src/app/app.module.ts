import { Injectable, NgModule } from '@angular/core';
import { BrowserModule, HammerModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import * as Hammer from 'hammerjs';
import 'hammer-timejs';
import { ClickOutsideModule } from 'ng-click-outside';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { NgxStripeModule } from 'ngx-stripe';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';

// Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';

import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './header/menu/menu.component';
import { ContactComponent } from './contact/contact.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { ListProductsComponent } from './products/list-products/list-products.component';
import { ContactService } from './services/contact.service';
import { CreateProductComponent } from './products/create-product/create-product.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { FooterComponent } from './footer/footer.component';
import { MobileMenuComponent } from './header/mobile-menu/mobile-menu.component';
import { DesktopMenuComponent } from './header/desktop-menu/desktop-menu.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { PaypalPaymentComponent } from './checkout/paypal-payment/paypal-payment.component';


const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'home/checkout-success', component: HomeComponent },
  { path: 'home/checkout-failed', component: HomeComponent },
  { path: 'products', component: HomeComponent },
  { path: 'products/create-product', component: CreateProductComponent },
  { path: 'products/:idProduct', component: ProductsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
  overrides = {
    swipe: { direction: Hammer.DIRECTION_ALL },
  } as any;
}
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    ContactComponent,
    ShoppingCartComponent,
    ProductsComponent,
    HomeComponent,
    ListProductsComponent,
    CreateProductComponent,
    CheckoutComponent,
    FooterComponent,
    MobileMenuComponent,
    DesktopMenuComponent,
    PaypalPaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes,
      {scrollPositionRestoration: 'enabled'}),
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatBadgeModule,
    MatStepperModule,
    HammerModule,
    MatDividerModule,
    ClickOutsideModule,
    MatProgressBarModule,
    MatCheckboxModule,
    LoadingBarRouterModule,
    MatExpansionModule,
    NgxStripeModule.forRoot('pk_test_51IS4wfE8pJVXH6kh5cbqbSztOH0YI1p7Lm9OjHfxhqDYVamDfmkJtAJBVsF2pLOJng86XncfbUqXmLP11NT1mRbQ005osdJyA6'),
    MatSelectCountryModule.forRoot('en'),
    NgxPayPalModule
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig,
    },
    ContactService,
    ShoppingCartComponent,
    HeaderComponent,
  ],
  bootstrap: [AppComponent],
  exports: [RouterModule],
})
export class AppModule { }
