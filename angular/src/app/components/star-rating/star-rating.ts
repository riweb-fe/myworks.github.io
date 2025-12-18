import { Component, computed, input } from '@angular/core';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-star-rating',
  imports: [MatIcon],
  template: `
    <div class="flex items-center">
      <div class="flex items-center mr-2">
        @for (star of starArray(); track $index) {
          <mat-icon
          class="!text-lg"
          [inline]="true"
          [class]="star ? '!text-yellow-400' : '!text-gray-300'"
          >star</mat-icon>
        }
      </div>

      <span class="text-sm text-gray-500">
        <ng-content></ng-content>
      </span>
    </div>
  `,
  styles: ``,
})
export class StarRating {
  rating = input.required<number>();

  starArray = computed(() => {
    const fullStars = Math.floor(this.rating());
    // _（アンダースコア）は引数（要素の値）を使わないことを示す慣習的な記号
    return Array(5).fill(false).map((_, index) => index < fullStars);
  })
}
