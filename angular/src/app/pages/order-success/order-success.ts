import { Component, effect, inject } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { RouterLink } from "@angular/router";
import { MatIcon } from "@angular/material/icon";
import { SeoManager } from '../../services/seo-manager';

@Component({
  selector: 'app-order-success',
  imports: [MatButton, RouterLink, MatIcon],
  template: `
    <div class="flex justify-center items-center h-[calc(100vh-64px)] py-6 px-4">
      <div class="flex flex-col items-center justify-center text-center bg-white rounded-xl shadow p-8 gap-6 max-w-[400px]">
        <mat-icon class="!text-green-500 !h-[56px] !w-[56px] !text-[56px]">check_circle</mat-icon>
        <h2 class="font-semibold text-green-600 text-2xl font-bold">注文が完了しました！</h2>
        <p class="text-base">
          ご購入いただき、ありがとうございます！<br>ご注文を確認いたしましたので、この後すぐに発送される予定です。
        </p>
        <p class="text-green-600">
          あなたが注文した製品の簡易的な詳細やトラッキング情報（配達予定日時など）は、登録したメールアドレスへも送信されます。
        </p>
        <button matButton="filled" color="primary" class="w-full max-w-xs mt-2" routerLink="/">ショッピングを続ける</button>
      </div>
    </div>
  `,
  styles: ``,
})
export default class OrderSuccess {
  seoManager = inject(SeoManager);

  updateOrderSuccessSeoTags = effect(() => {
    this.seoManager.updateSeoTags({
      title: '注文完了',
      description: '注文完了の確認ができます。'
    });
  });
}
