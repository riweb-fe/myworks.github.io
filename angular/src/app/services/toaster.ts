import { inject, Injectable } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';

@Injectable({
  providedIn: 'root',
})
export class Toaster {
  toaster = inject(HotToastService);

  success(messeage: string) {
    this.toaster.success(messeage);
  }

  error(messeage: string) {
    this.toaster.error(messeage);
  }
}
