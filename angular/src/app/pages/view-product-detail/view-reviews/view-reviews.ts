import { Component, computed, inject, input } from '@angular/core';
import { ViewPanel } from "../../../directives/view-panel";
import { RatingSummary } from "../rating-summary/rating-summary";
import type { Product } from '../../../methods/product';
import { ViewReviewItem } from "../view-review-item/view-review-item";
import { MatButton } from "@angular/material/button";
import { WriteReview } from "../write-review/write-review";
import { EcommerceStore } from '../../../ecommerce-store';

@Component({
  selector: 'app-view-reviews',
  imports: [ViewPanel, RatingSummary, ViewReviewItem, MatButton, WriteReview],
  template: `
    <div appViewPanel>
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">カスタマーレビュー</h2>
        @if(store.user()) {
          <button matButton="filled" (click)="store.showWriteReview()">レビューを書く</button>
        }
      </div>

      @if(store.writeReview()) {
        <app-write-review class="mb-6" />
      }

      <app-rating-summary [product]="product()" />
      <div class="flex flex-col gap-6">
        @for (review of sortedReviews(); track review.id) {
          <app-view-review-item [review]="review" />
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class ViewReviews {
  product = input.required<Product>();
  store = inject(EcommerceStore);

  sortedReviews = computed(() => {
    // reviewsが存在しない場合は空配列 [] を使う
    const reviews = this.product().reviews ?? [];

    // NgRxやImmerを使用している場合
    // 元の配列（State）は「凍結（Frozen）」されていることが多く、直接 .sort() を呼ぶとエラーになることがある。
    // そのため、[...reviews] でコピーを作ってからソートする手法をとることでうまく機能する。
    return [...reviews].sort((a, b) => b.reviewDate.getTime() - a.reviewDate.getTime());
  })
}
