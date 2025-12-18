import { Component, effect, inject } from '@angular/core';
import { BackButton } from "../../components/back-button/back-button";
import { ListCartItems } from "./list-cart-items/list-cart-items";
import { TeaseWishlist } from "./tease-wishlist/tease-wishlist";
import { SummarizeOrder } from "../../components/summarize-order/summarize-order";
import { MatButton } from "@angular/material/button";
import { EcommerceStore } from '../../ecommerce-store';
import { SeoManager } from '../../services/seo-manager';

@Component({
  selector: 'app-view-cart',
  imports: [BackButton, ListCartItems, TeaseWishlist, SummarizeOrder, MatButton],
  template: `
    <div class="mx-auto max-w-[1280px] pt-6 pb-40 px-4 md:pb-6">
      <app-back-button class="mb-6" navigateTo="/products/all">買い物を続ける</app-back-button>
      <h1 class="text-3xl font-extrabold mb-4">ショッピングカート</h1>

      <app-tease-wishlist class="mb-6 block" />

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2">
          <app-list-cart-items />
        </div>
        <div>
          <app-summarize-order>
            <ng-container actionButtons>
              <button matButton="filled" class="w-full mt-6 py-3" (click)="store.proceedToCheckout()">
                支払い手続きに進む
              </button>
            </ng-container>
          </app-summarize-order>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export default class ViewCart {
  store = inject(EcommerceStore);
  seoManager = inject(SeoManager);

  updateCartSeoTags = effect(() => {
    this.seoManager.updateSeoTags({
      title: 'カート',
      description: 'カート一覧を表示しています。'
    });
  });
}
