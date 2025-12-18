import { Component, computed, effect, inject, input } from '@angular/core';
import { EcommerceStore } from '../../ecommerce-store';
import { BackButton } from "../../components/back-button/back-button";
import { ProductInfo } from "./product-info/product-info";
import { ViewReviews } from "./view-reviews/view-reviews";

@Component({
  selector: 'app-view-product-detail',
  imports: [BackButton, ProductInfo, ViewReviews],
  template: `
    <div class="mx-auto max-w-[1280px] pt-6 pb-40 px-4 md:pb-6">
      <app-back-button class="mb-6" [navigateTo]="backRoute()">ショッピングを続ける</app-back-button>
      @if (store.selectedProduct(); as product) {
        <div class="flex flex-col gap-8 mb-8 md:flex-row">
          <img
            [src]="product.imageUrl"
            alt=""
            class="w-[500px] h-[550px] object-cover rounded-lg"
            [style.view-transition-name]="'product-image-' + product.id"
          />
          <div class="flex-1">
            <app-product-info [product]="product" />
          </div>
        </div>
        <app-view-reviews [product]="product" />
      }
    </div>
  `,
  styles: ``,
})
export default class ViewProductDetail {
  productId = input.required<string>();
  store = inject(EcommerceStore);

  // updateStoreProductId：https://jsprimer.net/basic/class/#two-instance-method-definition
  updateStoreProductId = effect(() => {
    this.store.setProductId(this.productId());
  });

  updateProductSeoTags = effect(() => {
    this.store.setProductSeoTags(this.store.selectedProduct());
  });

  backRoute = computed(() => `/products/${this.store.category()}`);
}
