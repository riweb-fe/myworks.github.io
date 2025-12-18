import { Component } from '@angular/core';
import { ViewPanel } from "../../../directives/view-panel";
import { MatIcon } from "@angular/material/icon";
import { MatInput, MatFormField } from "@angular/material/input";

@Component({
  selector: 'app-shipping-form',
  imports: [ViewPanel, MatIcon, MatInput, MatFormField],
  template: `
    <div appViewPanel>
      <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
        <mat-icon>local_shipping</mat-icon>
        配送先情報
      </h2>
      <form class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <mat-form-field>
          <input matInput type="text" placeholder="姓">
        </mat-form-field>
        <mat-form-field>
          <input matInput type="text" placeholder="名">
        </mat-form-field>
        <mat-form-field class="col-span-2">
          <input matInput type="text" placeholder="郵便番号">
        </mat-form-field>
        <mat-form-field class="col-span-2">
          <textarea matInput type="text" rows="1" placeholder="住所"></textarea>
        </mat-form-field>
        <mat-form-field class="col-span-2">
          <input matInput type="text" placeholder="住所（番・号）">
        </mat-form-field>
      </form>
    </div>
  `,
  styles: ``,
})
export class ShippingForm {

}
