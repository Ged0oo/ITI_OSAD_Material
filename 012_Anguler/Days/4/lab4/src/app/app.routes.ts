import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Products } from './components/products/products';
import { Categories } from './components/categories/categories';
import { NotFoundPage } from './components/not-found-page/not-found-page';
import { ProductDetails } from "./components/product-details/product-details";
import { About } from "./components/about/about";
import { Contact } from "./components/contact/contact";

export const routes: Routes = [
    { path: 'home', component: Home },
    { path: 'about', component: About },
    { path: 'contact', component: Contact },
    { path: 'products', component: Products },
    { path: 'categories', component: Categories },
    { path: 'product/:id', component: ProductDetails },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: NotFoundPage },
];