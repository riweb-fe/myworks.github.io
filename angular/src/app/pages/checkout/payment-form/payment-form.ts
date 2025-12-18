import { Component } from '@angular/core';
import { ViewPanel } from "../../../directives/view-panel";
import { MatIcon } from "@angular/material/icon";
import { MatRadioGroup, MatRadioButton } from "@angular/material/radio";

@Component({
  selector: 'app-payment-form',
  imports: [ViewPanel, MatIcon, MatRadioGroup, MatRadioButton],
  template: `
    <div appViewPanel>
      <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
        <mat-icon>payment</mat-icon>
        お支払方法
      </h2>
      <div>
        <mat-radio-group [value]="'stripe'">
          <mat-radio-button value="stripe">
            <span class="flex items-center gap-1 text-xl font-bold text-purple-700">
              <mat-icon>paid</mat-icon>stripe
            </span>
          </mat-radio-button>
        </mat-radio-group>
      </div>
    </div>
  `,
  styles: ``,
})
export class PaymentForm {

}
