import { Component, effect, inject } from '@angular/core';
import { BackButton } from "../../components/back-button/back-button";
import { EcommerceStore } from '../../ecommerce-store';
import { ProductCard } from "../../components/product-card/product-card";
import { MatIconButton, MatButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { EmptyWishlist } from "./empty-wishlist/empty-wishlist";
import { SeoManager } from '../../services/seo-manager';

@Component({
  selector: 'app-my-wishlist',
  imports: [BackButton, ProductCard, MatIconButton, MatIcon, MatButton, EmptyWishlist],
  template: `
    <div class="mx-auto max-w-[1280px] pt-6 pb-40 px-4 md:pb-6">
      <app-back-button class="mb-6" navigateTo="/products/all">買い物を続ける</app-back-button>

      @if(store.wishlistCount() > 0) {
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl font-bold">MyWishlist</h1>
          <span class="text-gray-500 text-xl">合計：{{ store.wishlistCount() }} 点</span>
        </div>

        <div class="responsive-grid">
          @for(product of store.wishlistItems(); track product.id) {
            <app-product-card [product]="product">
              <button
                matIconButton
                class="!absolute z-10 top-3 right-3 !bg-white shadow-md transition-all duration-200 hover:scale-110 hover:shadow-lg"
                (click)="store.removeFromWishlist(product)"
              >
                <mat-icon>delete</mat-icon>
              </button>
            </app-product-card>
          }
        </div>

        <div class="mt-8 flex justify-center">
          <button matButton="outlined" class="danger" (click)="store.clearWishlist()">
            ウィッシュリストをクリア
          </button>
        </div>
      } @else {
        <app-empty-wishlist />
      }
    </div>
  `,
  styles: ``,
})
export default class MyWishlist {
  store = inject(EcommerceStore);
  seoManager = inject(SeoManager);

  updateWishlistSeoTags = effect(() => {
    this.seoManager.updateSeoTags({
      title: 'ウィッシュリスト',
      description: 'ウィッシュリスト一覧を表示しています。'
    });
  });
}
