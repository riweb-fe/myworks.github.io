import { Component, inject, signal } from '@angular/core';
import { MatIconButton, MatButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef, MatDialog } from "@angular/material/dialog";
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import type { SignInParams } from '../../methods/user';
import { EcommerceStore } from '../../ecommerce-store';
import { SignUpDialog } from '../sign-up-dialog/sign-up-dialog';

@Component({
  selector: 'app-sign-in-dialog',
  imports: [MatIconButton, MatIcon, MatDialogClose, MatFormField, MatSuffix, MatInput, MatPrefix, MatButton,ReactiveFormsModule],
  template: `
    <div class="p-8 max-w-[400px] flex flex-col">
      <div class="flex justify-between mb-3">
        <div>
          <h2 class="text-xl font-medium mb-1">Sign In</h2>
          <p class="text-sm text-gray-500">サインインして買い物を続ける</p>
        </div>
        <button class="-mt-2 -mr-2" tabindex="-1" matIconButton mat-dialog-close>
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <form [formGroup]="signInForm" (ngSubmit)="signIn()">
        <mat-form-field class="w-full mb-4">
          <input type="email" matInput formControlName="email" placeholder="メールアドレスを入力してください">
          <mat-icon matPrefix>email</mat-icon>
        </mat-form-field>

        <mat-form-field class="w-full mb-5">
          <input matInput formControlName="password" [type]="passwordVisible() ? 'text' : 'password'" placeholder="パスワードを入力してください">
          <mat-icon matPrefix>lock</mat-icon>
          <button matSuffix matIconButton type="button" class="mr-2" (click)="passwordVisible.set(!passwordVisible())">
            <mat-icon [fontIcon]="passwordVisible() ? 'visibility_off' : 'visibility'"></mat-icon>
          </button>
        </mat-form-field>

        <button type="submit" matButton="filled" class="w-full">Sign In</button>
      </form>

      <p class="text-sm text-gray-500 mt-2 tect-center">
        アカウントを作成する：
        <a class="text-blue-600 cursor-pointer" (click)="openSignUpDialog()">Sign Up</a>
      </p>
    </div>
  `,
  styles: ``,
})
export class SignInDialog {
  // nonNullable: true（nullを許容しない）
  fb = inject(NonNullableFormBuilder);
  store = inject(EcommerceStore);

  // ecommerce-store.tsより、proceedToCheckoutからdata（checkout）の情報を取得
  data = inject<{ checkout: boolean }>(MAT_DIALOG_DATA);

  dialogRef = inject(MatDialogRef); // id（mat-mdc-dialog-XXX）が付与される
  matDialog = inject(MatDialog);

  passwordVisible = signal(false);

  // フォーム（FormGroup）の、markAllAsTouchedによるtouchedのblurイベントを確認したい場合、emailなどの例文を削除
  signInForm = this.fb.group({
    email: ['saitama@test.com', Validators.required],
    password: ['saitama123', Validators.required],
  });

  signIn() {
    // validプロパティ：FormGroupのフォームがバリデーションエラー無し（true）一つでもエラー（false：if内の処理）
    // invalidプロパティ：validプロパティの逆
    if (!this.signInForm.valid) {
      // markAllAsTouched：フォーム（FormGroup）送信時
      // 必須フォームが未入力（untouched）でバリデーションエラーを強制的に表示
      this.signInForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.signInForm.value;
    this.store.signIn({ email, password, checkout: this.data?.checkout, dialogId: this.dialogRef.id } as SignInParams);
  };

  openSignUpDialog() {
    this.dialogRef.close();
    this.matDialog.open(SignUpDialog, {
      disableClose: true,
      data: {
        checkout: this.data?.checkout,
      },
    });
  };
}
