import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { ProductCard } from "../../components/product-card/product-card";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { EcommerceStore } from '../../ecommerce-store';
import { ToggleWishlistButton } from "../../components/toggle-wishlist-button/toggle-wishlist-button";

@Component({
  selector: 'app-products-grid',
  imports: [ProductCard, MatSidenavModule, MatListModule, RouterLink, TitleCasePipe, ToggleWishlistButton],
  template: `
    <div class="pb-34 md:pb-6">
      <mat-sidenav-container class="bg-gray-100 min-h-screen">
        <mat-sidenav
          [mode]="isMobile() ? 'over' : 'side'"
          [opened]="store.toggleSidenavState()"
          (closedStart)="store.setSidenavOpen(false)"
        >
          <div class="p-6 md:fixed md:min-w-[248px]">
            <h2 class="text-lg text-gray-900">Categories</h2>

            <mat-nav-list>
              @for (cat of categories(); track cat) {
                <mat-list-item
                  [activated]="cat === category()"
                  class="my-2"
                  [routerLink]="['/products', cat]"
                  (click)="toggleMobile()"
                >
                  <span matListItemTitle class="font-medium" [class]="cat === category() ? '!text-white' : null">
                    {{cat | titlecase}}
                  </span>
                </mat-list-item>
              }
            </mat-nav-list>
          </div>
        </mat-sidenav>
        <mat-sidenav-content class="p-6">
          <h1 class="text-2xl font-bold text-gray-900 mb-1">{{category() | titlecase}}</h1>
          <p class="text-sm -indent-1 text-gray-600 mb-6">（該当商品：{{store.filteredProducts().length}}点）</p>
          <div class="responsive-grid">
            @for (product of store.filteredProducts(); track product.id) {
              <app-product-card [product]="product">
                <app-toggle-wishlist-button
                  class="!absolute z-10 top-3 right-3 !bg-white shadow-md rounded-md transition-all duration-200 hover:scale-110 hover:shadow-lg"
                  [product]="product"
                  [style.view-transition-name]="'wishlist-button-' + product.id"
                />
              </app-product-card>
            }
          </div>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: ``,
})
export default class ProductsGrid {
  category = input<string>('all');
  store = inject(EcommerceStore);
  private breakpointObserver = inject(BreakpointObserver);

  // レスポンシブ判定：モバイルサイズかどうかをSignalとして保持
  isMobile = toSignal(
    this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.TabletPortrait]).pipe(
      map(result => result.matches)
    ),
    { initialValue: false }
  );

  // モバイル時は初期状態でサイドナビを閉じるなどの制御
  constructor() {
    effect(() => {
      if (this.isMobile()) {
        this.store.setSidenavOpen(false);
      } else {
        this.store.setSidenavOpen(true);
      }
    });
  };

  toggleMobile() {
    if (this.isMobile()) {
      this.store.setSidenavOpen(false);
    }
  };

  categories = signal<string[]>(['all', 'iphone11', 'iphone12', 'iphone13', 'iphone14', 'iphonese'])

  // 今回のケースは category という input（シグナル） の変更を監視し、ストアを更新するという「リアクティブな処理」。
  // このロジックは、constructor のような一度きりの実行場所ではなく、
  // Angularの effect を使用して定義するのが適切と判断。
  updateStoreCategory = effect(() => {
    this.store.setCategory(this.category());
  });
  // constructorで実行すると、category() は初期値の 'all' を持つが、
  // ルート変更などで値が変わったときにストアは更新されない。
  // Angular v16以降、inject() 関数や input() 関数が導入されたことにより、
  // 依存性の注入やプロパティの初期化はコンストラクター外で行うことが推奨。
  // constructor() {
  //   this.store.setCategory(this.category);
  // }

  productsQueryParams = computed(() => ({
    category: this.category() ?? 'all',
  }));

  updateProductsQueryParams = effect(() => {
    // this.store.setParams(this.productsQueryParams);
    this.store.setProductsListSeoTags(this.category());
  });
}
