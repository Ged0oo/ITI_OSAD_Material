import { Component, signal } from '@angular/core';


import { Footer } from './components/footer/footer';
import { Navbar } from './components/navbar/navbar';
import { Products } from './components/products/products';


@Component({
    selector: 'app-root',
    imports: [Navbar, Products, Footer],
    templateUrl: './app.html',
    styleUrl: './app.css'
})

export class App {
    protected readonly title = signal('lab2');
}
