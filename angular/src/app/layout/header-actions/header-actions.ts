import { Component, inject } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatBadge } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { EcommerceStore } from '../../ecommerce-store';
import { MatDivider } from "@angular/material/divider";
import { MatDialog } from '@angular/material/dialog';
import { SignInDialog } from '../../components/sign-in-dialog/sign-in-dialog';
import { SignUpDialog } from '../../components/sign-up-dialog/sign-up-dialog';

@Component({
  selector: 'app-header-actions',
  imports: [MatButton, MatIconButton, MatIcon, RouterLink, MatBadge, MatMenuModule, MatDivider],
  template: `
    <div class="flex items-center gap-2">
      <div class="flex items-center flex-col gap-[16px] fixed bottom-[24px] right-[20px] md:flex-row md:gap-2 md:bottom-auto md:right-auto md:static">
        <button
          matIconButton
          routerLink="/wishlist"
          [matBadge]="store.wishlistCount()"
          [matBadgeHidden]="store.wishlistCount() === 0"
          class="flex items-center justify-cente min-w-[50px] min-h-[50px] !bg-white shadow-xl md:min-w-auto md:min-h-auto md:!bg-transparent md:shadow-none"
        >
          <mat-icon class="!text-4xl !text-[#fb2c36] leading-none flex justify-center !size-[100%] md:!text-[#44474E] md:!text-2xl md:!size-auto">favorite</mat-icon>
        </button>
        <button
          matIconButton
          routerLink="/cart"
          [matBadge]="store.cartCount()"
          [matBadgeHidden]="store.cartCount() === 0"
          class="flex items-center justify-cente min-w-[50px] min-h-[50px] !bg-white shadow-xl md:min-w-auto md:min-h-auto md:!bg-transparent md:shadow-none"
        >
          <mat-icon class="!text-4xl !text-[#2c9afb] leading-none flex justify-center !size-[100%] md:!text-[#44474E] md:!text-2xl md:!size-auto">shopping_cart</mat-icon>
        </button>
      </div>

      @if (store.user(); as user) {
        <button matIconButton [matMenuTriggerFor]="useMenu">
          <img [src]="user.imageUrl" [alt]="user.name" class="w-8 h-8 rounded-full" />
        </button>

        <mat-menu #useMenu="matMenu" xPosition="before">
          <div class="flex flex-col px-3 min-w-[200px]">
            <span class="text-sm font-medium">{{ user.name }}</span>
            <span class="text-xs text-gray-500">{{ user.email }}</span>
          </div>
          <mat-divider></mat-divider>
          <button class="!min-h-[32px]" mat-menu-item (click)="store.signOut()">
            <mat-icon>logout</mat-icon>
            Sign Out
          </button>
        </mat-menu>
      } @else {
        <button matButton (click)="openSignInDialog()">
          Sign In
        </button>
        <button matButton="filled" (click)="openSignUpDialog()">
          Sign Up
        </button>
      }
    </div>
  `,
  styles: ``,
})
export class HeaderActions {
  store = inject(EcommerceStore);
  matDialog = inject(MatDialog);

  // disableClose：Escキーやモーダル外側クリックでモーダルが閉じるのを防ぐかどうか
  openSignInDialog() {
    this.matDialog.open(SignInDialog, {
      disableClose: true,
    });
  };

  openSignUpDialog() {
    this.matDialog.open(SignUpDialog, {
      disableClose: true,
    });
  };
}
