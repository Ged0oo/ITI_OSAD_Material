import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interface/product';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-product-details',
    imports: [CommonModule],
    templateUrl: './product-details.html',
    styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {
    product: Product | null = null;

    constructor(private route: ActivatedRoute, private __productsService: ProductsService, private location: Location) { }

    ngOnInit(): void {
        // Use snapshot for one-time read of route params
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.product = this.__productsService.getProductById(+id);
        }
    }

    goBack(): void {
        this.location.back();
    }
}
