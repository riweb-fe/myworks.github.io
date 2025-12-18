import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderActions } from '../header-actions/header-actions';
import { EcommerceStore } from '../../ecommerce-store';
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, HeaderActions, MatIconButton, MatIcon],
  template: `
    <mat-toolbar class="sticky top-0 z-10 w-full elevated py-2">
      <div class="max-w-[1280px] mx-auto w-full flex items-center justify-between">
        <div class="flex items-center gap-2">
          <button matIconButton (click)="store.toggleSidenav()" [hidden]="!this.router.url.includes('products')">
            <mat-icon>menu</mat-icon>
          </button>
          <span>Sample Store</span>
        </div>
        <app-header-actions />
      </div>
    </mat-toolbar>
  `,
  styles: ``,
})
export class Header {
  store = inject(EcommerceStore);
  router = inject(Router);
}
