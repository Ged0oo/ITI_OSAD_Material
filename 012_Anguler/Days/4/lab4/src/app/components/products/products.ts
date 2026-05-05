import { ChangeDetectionStrategy, Component, computed, signal, AfterViewInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../interface/product';
import { Category } from '../../interface/category';
import { ProductCard } from '../../directives/product-card';
import { ProductsService } from '../../services/products.service';

import { RouterLink } from "@angular/router";

type StockFilter = 'all' | 'in-stock' | 'low-stock' | 'sold-out';

@Component({
    selector: 'app-products',
    imports: [CurrencyPipe, FormsModule, ProductCard, RouterLink],
    templateUrl: './products.html',
    styleUrl: './products.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Products implements AfterViewInit {
    products = signal<Product[]>([]);
    constructor(private _productsService: ProductsService) { }

    ngAfterViewInit(): void {
        this.products.set(this._productsService.getAllProducts());
    }

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
