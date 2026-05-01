import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../interface/product';
import { Category } from '../../interface/category';
import { ProductCard } from '../../directives/product-card';

type StockFilter = 'all' | 'in-stock' | 'low-stock' | 'sold-out';

const INITIAL_PRODUCTS: Product[] = [
    { id: 1, quantity: 0, name: 'Iphone 17', price: 700, description: 'This is the description for Iphone 17.', category: 'Mobile', imageUrl: '/images/iphone17.png' },
    { id: 2, quantity: 10, name: 'Samsung Galaxy S25', price: 650, description: 'This is the description for Samsung Galaxy S25.', category: 'Mobile', imageUrl: '/images/ultra25.png' },
    { id: 3, quantity: 5, name: 'MacBook Pro', price: 1200, description: 'This is the description for MacBook Pro.', category: 'Laptop', imageUrl: '/images/macbook.png' },
    { id: 4, quantity: 0, name: 'Dell XPS 13', price: 1000, description: 'This is the description for Dell XPS 13.', category: 'Laptop', imageUrl: '/images/dellxps13.png' },
    { id: 5, quantity: 6, name: 'Google Pixel 7', price: 600, description: 'This is the description for Google Pixel 7.', category: 'Mobile', imageUrl: '/images/googlepixel7.png' },
    { id: 6, quantity: 5, name: 'HP Spectre x360', price: 1100, description: 'This is the description for HP Spectre x360.', category: 'Laptop', imageUrl: '/images/hpsspectra.png' },
    { id: 7, quantity: 2, name: 'OnePlus 10 Pro', price: 550, description: 'This is the description for OnePlus 10 Pro.', category: 'Mobile', imageUrl: '/images/oneplus.png' },
    { id: 8, quantity: 1, name: 'Lenovo ThinkPad X1 Carbon', price: 1300, description: 'This is the description for Lenovo ThinkPad X1 Carbon.', category: 'Laptop', imageUrl: '/images/lenovothinkpad.png' },
];

@Component({
    selector: 'app-products',
    imports: [CurrencyPipe, FormsModule, ProductCard],
    templateUrl: './products.html',
    styleUrl: './products.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Products {
    protected readonly products = signal<Product[]>(INITIAL_PRODUCTS);
    protected readonly totalPrice = signal(0);

    protected readonly categories = computed<Category[]>(() => {
        const names = Array.from(new Set(this.products().map((product) => product.category)));
        return names.map((name, index) => ({ id: index + 1, name }));
    });

    protected selectedCategory = signal<string>('');
    protected stockFilter = signal<StockFilter>('all');

    protected readonly filteredProducts = computed(() => {
        const category = this.selectedCategory();
        const stock = this.stockFilter();

        return this.products().filter((product) => {
            const categoryMatches = !category || product.category === category;

            let stockMatches = true;
            if (stock === 'sold-out') stockMatches = this.isSoldOut(product);
            if (stock === 'in-stock') stockMatches = !this.isSoldOut(product);
            if (stock === 'low-stock') stockMatches = this.isLowStock(product);

            return categoryMatches && stockMatches;
        });
    });

    protected onCategoryChange(category: string): void {
        this.selectedCategory.set(category);
    }

    protected onStockFilterChange(filter: string): void {
        this.stockFilter.set(filter as StockFilter);
    }

    protected isSoldOut(product: Product): boolean {
        return product.quantity <= 0;
    }

    protected isLowStock(product: Product): boolean {
        return product.quantity <= 3;
    }

    protected getBadgeText(product: Product): string {
        if (this.isSoldOut(product)) return 'Sold Out';
        if (this.isLowStock(product)) return 'Low Stock';
        return 'In Stock';
    }

    protected addToCart(product: Product): void {
        if (this.isSoldOut(product)) return;

        this.totalPrice.update((current) => current + product.price);
        this.products.update((current) =>
            current.map((item) =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item,
            ),
        );
    }
}
