import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatIconButton } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogRef } from "@angular/material/dialog";
import { MatFormField, MatPrefix } from '@angular/material/form-field';
import { MatIcon } from "@angular/material/icon";
import { MatInput } from '@angular/material/input';
import { EcommerceStore } from '../../ecommerce-store';
import type { SignUpParams } from '../../methods/user';
import { SignInDialog } from '../sign-in-dialog/sign-in-dialog';

@Component({
  selector: 'app-sign-up-dialog',
  imports: [MatIconButton, MatIcon, MatDialogClose, MatFormField, MatInput, MatPrefix, MatButton,ReactiveFormsModule],
  template: `
    <div class="p-8 min-w-[400px] flex flex-col">
      <div class="flex justify-between">
        <div>
          <h2 class="text-xl font-medium mb-1">Sign Up</h2>
          <p class="text-sm text-gray-500">アカウント登録後ショッピングを始める</p>
        </div>
        <button tabindex="-1" matIconButton class="-mt-2 -mr-2" mat-dialog-close>
          <mat-icon>close</mat-icon>
        </button>
      </div>
      <form [formGroup]="signUpForm" class="mt-6 flex flex-col" (ngSubmit)="signUp()">
        <mat-form-field class="mb-4">
          <input formControlName="name" matInput type="text" placeholder="名前">
          <mat-icon matPrefix>person</mat-icon>
        </mat-form-field>
        <mat-form-field class="mb-4">
          <input formControlName="email" matInput type="email" placeholder="メールアドレス">
          <mat-icon matPrefix>email</mat-icon>
        </mat-form-field>
        <mat-form-field class="mb-4">
          <input formControlName="password" matInput type="password" placeholder="パスワード">
          <mat-icon matPrefix>lock</mat-icon>
        </mat-form-field>
        <mat-form-field class="mb-6">
          <input formControlName="confirmPassword" matInput type="password" placeholder="パスワード（確認用）">
          <mat-icon matPrefix>lock</mat-icon>
        </mat-form-field>
        <button type="submit" matButton="filled" class="w-full">
          アカウント作成
          <!-- {{ store.loading() ? 'アカウント作成中' : 'アカウント作成完了' }} -->
        </button>
      </form>
      <p class="text-sm text-gray-500 mt-2 text-center">
        アカウントをすでに作成していますか？
        <a class="text-blue-600 cursor-pointer" (click)="openSignInDialog()">Sign In</a>
      </p>
    </div>
  `,
  styles: ``,
})
export class SignUpDialog {
  fb = inject(NonNullableFormBuilder);
  store = inject(EcommerceStore);
  data = inject<{ checkout: boolean }>(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef);
  matDialog = inject(MatDialog);

  signUpForm = this.fb.group({
    name: ['sayama T', Validators.required],
    email: ['sayama@test.com', Validators.required],
    password: ['sayama123', Validators.required],
    confirmPassword: ['sayama123', Validators.required],
  });

  signUp() {
    if (!this.signUpForm.valid) {
      this.signUpForm.markAllAsTouched();
      return;
    }

    const { name, email, password } = this.signUpForm.value;

    this.store.signUp({ name, email, password, dialogId: this.dialogRef.id, checkout: this.data?.checkout } as SignUpParams);
  }

  openSignInDialog() {
    this.dialogRef.close();
    this.matDialog.open(SignInDialog, {
      disableClose: true,
      data: {
        checkout: this.data?.checkout,
      },
    });
  };
}
