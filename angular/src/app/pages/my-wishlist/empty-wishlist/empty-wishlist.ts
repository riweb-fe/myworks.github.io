import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from "@angular/material/icon";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-empty-wishlist',
  imports: [MatButton, MatIcon, RouterLink],
  template: `
    <div class="flex flex-col items-center justify-center py-16 text-center">
      <div class="w-20 h-20 mb-8 rounded-full bg-gray-100 flex items-center justify-center">
        <mat-icon class="text-gray-400 transform scale-150">favorite_border</mat-icon>
      </div>

      <h2 class="text-2xl font-bold text-gray-900 mb-3">お気に入りのリストが空です</h2>
      <p class="text-gray-600 mb-8">後でお気に入りに保存する</p>

      <button matButton="filled" routerLink="/products/all" class="min-w-[200px] py-3">
        買い物を始める
      </button>
    </div>
  `,
  styles: ``,
})
export class EmptyWishlist {

}
