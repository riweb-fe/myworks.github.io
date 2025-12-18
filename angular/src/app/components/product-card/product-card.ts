import { Component, inject, input } from '@angular/core';
import type { Product } from '../../methods/product';
import { MatButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { EcommerceStore } from '../../ecommerce-store';
import { RouterLink } from "@angular/router";
import { StarRating } from "../star-rating/star-rating";

@Component({
  selector: 'app-product-card',
  imports: [MatButton, MatIcon, RouterLink, StarRating],
  template: `
    <div class="relative bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-xl">
      <img
        [src]="product().imageUrl"
        alt=""
        class="w-full h-[300px] object-cover rounded-t-xl cursor-pointer"
        [routerLink]="['/product', product().id]"
        [style.view-transition-name]="'product-image-' + product().id"
      />

      <ng-content />

      <div class="p-5 flex flex-col flex-1 cursor-pointer" [routerLink]="['/product', product().id]">
        <h3 class="text-lg font-semibold text-gray-900 mb-2 leading-tight">
          {{product().name}}
        </h3>
        <p class="text-sm text-gray-600 mb-4 flex-1 leading-relaxed">
          {{product().description}}
        </p>

        <app-star-rating class="mb-3" [rating]="product().rating">
          ({{ product().reviewCount }})
        </app-star-rating>

        <div class="text-sm font-medium mb-1">
        {{product().inStock ? '在庫あり' : '在庫なし'}}
        </div>
        <div class="flex items-center justify-between mt-auto gap-2">
          <span class="text-2xl font-bold text-gray-900 leading-none">
            {{product().price.toLocaleString()}}<span class="text-sm pl-1">円</span>
          </span>
          <button
            matButton="filled"
            class="!overflow-hidden flex items-center gap-2 !min-w-[136px]"
            (click)="$event.stopPropagation(); store.addToCart(product())"
          >
            <mat-icon>shopping_cart</mat-icon>
            カートに追加
          </button>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class ProductCard {
  product = input.required<Product>();

  store = inject(EcommerceStore);
}
