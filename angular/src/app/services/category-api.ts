import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})

export class CategoryApi {
  private categories = ['all', 'iphone11', 'iphone12', 'iphone13', 'iphone14', 'iphonese'];

  getCategories() {
    return this.categories;
  }
}
