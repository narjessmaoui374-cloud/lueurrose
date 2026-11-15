import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { ProductDetailComponent } from './components/product-detail/product-detail';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { ContactComponent } from './components/contact/contact';
import { ConfirmationComponent } from './components/confirmation/confirmation';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'occasion/:occasion', component: HomeComponent },
  { path: 'category/:category', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'confirmation', component: ConfirmationComponent },
  { path: '**', redirectTo: '' }
];