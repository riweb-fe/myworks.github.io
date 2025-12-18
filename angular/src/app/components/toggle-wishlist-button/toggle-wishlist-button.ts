import { Component, computed, inject, input } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import type { Product } from '../../methods/product';
import { EcommerceStore } from '../../ecommerce-store';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-toggle-wishlist-button',
  imports: [MatIconButton, MatIcon],
  template: `
    <button
      matIconButton
      [class]="isInWishlist() ? '!text-red-500' : '!text-gray-400'"
      (click)="toggleWishlist(product())"
    >
      <mat-icon>{{ isInWishlist() ? 'favorite': 'favorite_border' }}</mat-icon>
    </button>
  `,
  styles: ``,
})
export class ToggleWishlistButton {
  product = input.required<Product>();

  store = inject(EcommerceStore);

  // productのシグナルの値に応じて再算出
  isInWishlist = computed(() => this.store.wishlistItems().find(p => p.id === this.product().id))

  toggleWishlist(product: Product) {
    if (this.isInWishlist()) {
      // Remove
      this.store.removeFromWishlist(product);
    } else {
      this.store.addToWishlist(product);
    }
  }
}
