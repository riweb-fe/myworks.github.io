import { Component, inject, signal } from '@angular/core';
import { ViewPanel } from "../../../directives/view-panel";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from "@angular/material/select";
import { MatInput } from "@angular/material/input";
import { MatButton } from "@angular/material/button";
import { EcommerceStore } from '../../../ecommerce-store';
import type { OptionItem } from '../../../methods/option-item';
import { AddReviewParams } from '../../../methods/user-review';

@Component({
  selector: 'app-write-review',
  imports: [ViewPanel, MatFormField, MatLabel, MatSelectModule, MatInput, ReactiveFormsModule, MatButton],
  template: `
    <div appViewPanel>
      <h2 class="text-xl font-semibold mb-6">レビューを書く</h2>
      <form [formGroup]="reviewForm" (ngSubmit)="saveReview()">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <mat-form-field>
            <mat-label>レビュータイトル</mat-label>
            <input type="text" formControlName="title" placeholder="レビューを要約する" matInput />
          </mat-form-field>
          <mat-form-field>
            <mat-select formControlName="rating">
              @for(option of ratingOptions(); track option.value) {
                <mat-option [value]="option.value">{{ option.label }}</mat-option>
              }
            </mat-select>
          </mat-form-field>
          <mat-form-field class="col-span-2">
            <mat-label>レビュー</mat-label>
            <textarea
              placeholder="この製品について、あなたの意見をお聞かせください。"
              formControlName="comment"
              matInput
              rows="4"
            >
            </textarea>
          </mat-form-field>
          <div class="flex gap-4">
            <button matButton="filled" type="submit" [disabled]="store.loading()">
              {{ store.loading() ? '送信中...' : 'レビューを送信する' }}
            </button>
            <button matButton="outlined" type="botton" (click)="store.hiddenWriteReview()">キャンセル</button>
          </div>
        </div>
      </form>
    </div>
  `,
  styles: ``,
})
export class WriteReview {
  fb = inject(NonNullableFormBuilder);
  store = inject(EcommerceStore);

  ratingOptions = signal<OptionItem[]>([
    { label: '5★ - 素晴らしい', value: 5 },
    { label: '4★ - 良い', value: 4 },
    { label: '3★ - 普通', value: 3 },
    { label: '2★ - まあまあ', value: 2 },
    { label: '1★ - ひどい', value: 1 },
  ]);

  reviewForm = this.fb.group({
    title: ['', Validators.required],
    comment: ['', Validators.required],
    rating: [5, Validators.required],
  });

  saveReview() {
    if (!this.reviewForm.valid) {
      this.reviewForm.markAllAsTouched();
      return;
    }

    const { title, comment, rating } = this.reviewForm.value;
    this.store.addReview({ title, comment, rating } as AddReviewParams);
  }
}
