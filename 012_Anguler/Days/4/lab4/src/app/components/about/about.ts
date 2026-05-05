import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="mx-auto max-w-6xl px-4 py-12">
            <div class="rounded-xl border border-slate-200 bg-white p-8 shadow">
                <h1 class="mb-4 text-3xl font-bold text-slate-900">About Us</h1>
                
                <section class="mb-8">
                    <h2 class="mb-3 text-2xl font-semibold text-slate-800">Our Mission</h2>
                    <p class="mb-4 text-slate-600 leading-relaxed">
                        We are committed to providing the best online shopping experience with premium products,
                        competitive prices, and exceptional customer service.
                    </p>
                </section>

                <section class="mb-8">
                    <h2 class="mb-3 text-2xl font-semibold text-slate-800">Why Choose Us?</h2>
                    <ul class="space-y-2 text-slate-600">
                        <li>✓ Wide selection of latest electronics and gadgets</li>
                        <li>✓ Best prices and regular discounts</li>
                        <li>✓ Fast and reliable shipping</li>
                        <li>✓ 24/7 customer support</li>
                        <li>✓ Easy returns and exchanges</li>
                    </ul>
                </section>

                <section>
                    <h2 class="mb-3 text-2xl font-semibold text-slate-800">Our Story</h2>
                    <p class="text-slate-600 leading-relaxed">
                        Founded in 2024, MyStore has grown to become a trusted destination for technology enthusiasts
                        and casual buyers alike. We believe in quality, transparency, and customer satisfaction above all.
                    </p>
                </section>
            </div>
        </div>
    `,
})
export class About { }
