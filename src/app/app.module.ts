import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


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



import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './header/menu/menu.component';
import { ContactComponent } from './contact/contact.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { ListProductsComponent } from './products/list-products/list-products.component';
import { ContactService } from './services/contact.service';
import { CreateProductComponent } from './products/create-product/create-product.component';
import { from } from 'rxjs';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'products', component: HomeComponent },
  { path: 'products/create-product', component: CreateProductComponent },
  { path: 'products/:idProduct', component: ProductsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];

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
    CreateProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule
  ],
  providers: [
    ContactService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
