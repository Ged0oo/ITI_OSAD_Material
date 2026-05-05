import { Injectable } from '@angular/core';
import { Product } from '../interface/product';

@Injectable({
    providedIn: 'root',
})
export class ProductsService {
    private readonly INITIAL_PRODUCTS: Product[] = [
        { id: 1, quantity: 0, name: 'Iphone 17', price: 700, description: 'This is the description for Iphone 17.', category: 'Mobile', imageUrl: '/images/iphone17.png' },
        { id: 2, quantity: 10, name: 'Samsung Galaxy S25', price: 650, description: 'This is the description for Samsung Galaxy S25.', category: 'Mobile', imageUrl: '/images/ultra25.png' },
        { id: 3, quantity: 5, name: 'MacBook Pro', price: 1200, description: 'This is the description for MacBook Pro.', category: 'Laptop', imageUrl: '/images/macbook.png' },
        { id: 4, quantity: 0, name: 'Dell XPS 13', price: 1000, description: 'This is the description for Dell XPS 13.', category: 'Laptop', imageUrl: '/images/dellxps13.png' },
        { id: 5, quantity: 6, name: 'Google Pixel 7', price: 600, description: 'This is the description for Google Pixel 7.', category: 'Mobile', imageUrl: '/images/googlepixel7.png' },
        { id: 6, quantity: 5, name: 'HP Spectre x360', price: 1100, description: 'This is the description for HP Spectre x360.', category: 'Laptop', imageUrl: '/images/hpsspectra.png' },
        { id: 7, quantity: 2, name: 'OnePlus 10 Pro', price: 550, description: 'This is the description for OnePlus 10 Pro.', category: 'Mobile', imageUrl: '/images/oneplus.png' },
        { id: 8, quantity: 1, name: 'Lenovo ThinkPad X1 Carbon', price: 1300, description: 'This is the description for Lenovo ThinkPad X1 Carbon.', category: 'Laptop', imageUrl: '/images/lenovothinkpad.png' },
    ];

    getAllProducts(): Product[] {
        return this.INITIAL_PRODUCTS;
    }

    getProductsByCatId(catId: number): Product[] {
        return this.INITIAL_PRODUCTS.filter((product) => product.category === this.getCategoryNameById(catId));
    }

    getProductById(id: number): Product | null {
        return this.INITIAL_PRODUCTS.find((product) => product.id === id) || null;
    }

    private getCategoryNameById(catId: number): string {
        const categories = Array.from(new Set(this.INITIAL_PRODUCTS.map((product) => product.category)));
        return categories[catId - 1] || '';
    }
}
