import { Component, computed, inject } from '@angular/core';
import { ViewPanel } from "../../directives/view-panel";
import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-summarize-order',
  imports: [ViewPanel],
  template: `
    <div appViewPanel>
      <h2 class="text-2xl font-bold mb-4">注文概要</h2>

      <div class="space-y-2 pb-4">
        <ng-content select="[checkoutItems]" />
      </div>

      <div class="space-y-3 text-lg pt-3 border-t">
        <div class="flex justify-between">
          <span>小計</span>
          <span>{{ subtotal().toLocaleString() }}円</span>
        </div>
        <div class="flex justify-between">
          <span>税額</span>
          <span>{{ tax().toLocaleString() }}円</span>
        </div>
        <div class="flex justify-between border-t pt-3 font-bold text-lg">
          <span>合計</span>
          <span>{{ total().toLocaleString() }}円（税込み）</span>
        </div>
      </div>

      <ng-content select="[actionButtons]" />
    </div>
  `,
  styles: ``,
})
export class SummarizeOrder {
  store = inject(EcommerceStore);

  subtotal = computed(() =>
    Math.round(
      this.store.cartItems().reduce((acc, item) => acc + item.product.price * item.quantity, 0)
    )
  );

  tax = computed(() =>
    Math.round(
      0.08 * this.subtotal()
    )
  );

  total = computed(() => this.subtotal() + this.tax());
}
