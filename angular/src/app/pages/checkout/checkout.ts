import { Component, effect, inject } from '@angular/core';
import { BackButton } from "../../components/back-button/back-button";
import { ShippingForm } from "./shipping-form/shipping-form";
import { PaymentForm } from "./payment-form/payment-form";
import { SummarizeOrder } from "../../components/summarize-order/summarize-order";
import { EcommerceStore } from '../../ecommerce-store';
import { MatButton } from "@angular/material/button";
import { SeoManager } from '../../services/seo-manager';

@Component({
  selector: 'app-checkout',
  imports: [BackButton, ShippingForm, PaymentForm, SummarizeOrder, MatButton],
  template: `
    <div class="mx-auto max-w-[1280px] pt-6 pb-40 px-4 md:pb-6">
      <app-back-button class="mb-4" navigateTo="/cart">カートへ戻る</app-back-button>

      <h1 class="text-3xl font-extrabold mb-4">注文確認画面</h1>

      <div class="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div class="lg:col-span-3 flex flex-col gap-6">
          <app-shipping-form />
          <app-payment-form />
        </div>
        <div class="lg:col-span-2">
          <app-summarize-order>
            <ng-container checkoutItems>
              @for (item of store.cartItems(); track item.product.id) {
                <div class="text-sm flex justify-between">
                  <span>{{ item.product.name }} x {{ item.quantity }}</span>
                  <span>{{ (item.product.price * item.quantity).toLocaleString() }}円</span>
                </div>
              }
            </ng-container>

            <ng-container actionButtons>
              <button
                matButton="filled"
                class="w-full mt-6 py-3"
                [disabled]="store.loading()"
                (click)="store.placeOrder()"
              >
                {{ store.loading() ? '注文内容を送信中...' : '注文する' }}
              </button>
            </ng-container>
          </app-summarize-order>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export default class Checkout {
  store = inject(EcommerceStore);
  seoManager = inject(SeoManager);

  updateCheckoutSeoTags = effect(() => {
    this.seoManager.updateSeoTags({
      title: '注文確認画面',
      description: '注文に必要な配送先情報・お支払方法のフォームの入力や注文概要の確認ができます。'
    });
  });
}
