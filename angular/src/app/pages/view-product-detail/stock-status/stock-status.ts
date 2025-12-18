import { Component, input } from '@angular/core';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-stock-status',
  imports: [MatIcon],
  template: `
    @if (inStock()) {
      <div class="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-3 bg-white w-full">
        <mat-icon>check_circle</mat-icon>
        <span class="text-xs text-gray-800">在庫あり（すぐに発送可能）</span>
      </div>
    } @else {
      <div class="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-3 bg-white w-full danger">
        <mat-icon class="small">caution</mat-icon>
        <span class="text-xs">
          この製品は現在在庫がありません。ウィッシュリストに追加すると、再入荷時に通知が届きます。
        </span>
      </div>
    }
  `,
  styles: ``,
  host: {
    class: 'block', // コンポーネント下のマージン対策
  }
})
export class StockStatus {
  inStock = input(false);
}
