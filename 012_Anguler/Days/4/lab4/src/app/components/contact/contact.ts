import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="mx-auto max-w-3xl px-4 py-12">
            <div class="rounded-xl border border-slate-200 bg-white p-8 shadow">
                <h1 class="mb-8 text-3xl font-bold text-slate-900">Contact Us</h1>
                
                <div class="grid gap-8 md:grid-cols-2">
                    <!-- Contact Info -->
                    <div>
                        <h2 class="mb-6 text-xl font-semibold text-slate-800">Get in Touch</h2>
                        
                        <div class="space-y-6">
                            <div>
                                <h3 class="font-semibold text-slate-700">Email</h3>
                                <p class="text-slate-600">support@mystore.com</p>
                            </div>
                            
                            <div>
                                <h3 class="font-semibold text-slate-700">Phone</h3>
                                <p class="text-slate-600">+1 (800) 123-4567</p>
                            </div>
                            
                            <div>
                                <h3 class="font-semibold text-slate-700">Address</h3>
                                <p class="text-slate-600">
                                    MyStore HQ<br>
                                    123 Tech Street<br>
                                    San Francisco, CA 94102
                                </p>
                            </div>
                            
                            <div>
                                <h3 class="font-semibold text-slate-700">Business Hours</h3>
                                <p class="text-slate-600">
                                    Monday - Friday: 9 AM - 6 PM<br>
                                    Saturday: 10 AM - 4 PM<br>
                                    Sunday: Closed
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Contact Form -->
                    <div>
                        <h2 class="mb-6 text-xl font-semibold text-slate-800">Send us a Message</h2>
                        
                        <form (ngSubmit)="onSubmit()" #contactForm="ngForm" class="space-y-4">
                            <div>
                                <label for="name" class="block text-sm font-medium text-slate-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    [(ngModel)]="formData.name"
                                    required
                                    class="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
                                    placeholder="Your name"
                                />
                            </div>

                            <div>
                                <label for="email" class="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    [(ngModel)]="formData.email"
                                    required
                                    class="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div>
                                <label for="message" class="block text-sm font-medium text-slate-700 mb-1">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    [(ngModel)]="formData.message"
                                    required
                                    rows="4"
                                    class="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
                                    placeholder="Your message..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                [disabled]="!contactForm.valid"
                                class="w-full rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white transition hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Send Message
                            </button>

                            <div *ngIf="submitMessage" class="rounded-lg bg-green-100 p-3 text-sm text-green-700">
                                {{ submitMessage }}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `,
})
export class Contact {
    formData = {
        name: '',
        email: '',
        message: '',
    };
    submitMessage = '';

    onSubmit(): void {
        if (this.formData.name && this.formData.email && this.formData.message) {
            this.submitMessage = 'Thank you! Your message has been sent successfully.';
            this.formData = { name: '', email: '', message: '' };
            setTimeout(() => (this.submitMessage = ''), 3000);
        }
    }
}
