import { Component, computed, inject, input } from '@angular/core';
import type { CartItem } from '../../methods/cart';
import { QtySelector } from "../../components/qty-selector/qty-selector";
import { EcommerceStore } from '../../ecommerce-store';
import { MatIcon } from "@angular/material/icon";
import { MatIconButton } from "@angular/material/button";

@Component({
  selector: 'app-show-cart-item',
  imports: [QtySelector, MatIcon, MatIconButton],
  template: `
    <div class="flex flex-col gap-[10px] md:flex-row md:justify-between">
      <div class="flex items-center gap-4 md:min-w-[300px]">
        <img
          [src]="item().product.imageUrl"
          class="w-24 h-24 rounded-lg object-cover"
          [style.view-transition-name]="'product-image-' + item().product.id"
        />
        <div>
          <div class="text-gray-900 text-lg font-semibold">{{ item().product.name }}</div>
          <div class="text-gray-900 text-lg">{{ item().product.price.toLocaleString() }}円</div>
        </div>
      </div>

      <app-qty-selector [quantity]="item().quantity" (qtyUpdated)="store.setItemQuantity({ productId: item().product.id, quantity: $event })" />

      <div class="flex items-center justify-between md:flex-col md:items-end">
        <div class="md:text-right font-semibold text-lg">
          {{ total() }}円
        </div>
        <div class="flex -me-3">
          <button matIconButton (click)="store.moveToWishlist(item().product)">
            <mat-icon>favorite_border</mat-icon>
          </button>
          <button matIconButton class="danger" (click)="store.removeFormCart(item().product)">
            <mat-icon>delete</mat-icon>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class ShowCartItem {
  item = input.required<CartItem>();
  store = inject(EcommerceStore);

  total = computed(() => (this.item().product.price * this.item().quantity).toLocaleString())
}
