import { RenderMode, ServerRoute } from '@angular/ssr';
import { CategoryApi } from './services/category-api';
import { inject } from '@angular/core';

// getPrerenderParams：https://angular.jp/guide/ssr#parameterized-routes
export const serverRoutes: ServerRoute[] = [
  {
    path: 'products/:category',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      const catService = inject(CategoryApi);
      const names = catService.getCategories();
      return names.map(name => ({ category: name, serchTerm: '' }));
    }
  },
  {
    path: 'wishlist',
    renderMode: RenderMode.Client,
  },
  {
    path: 'cart',
    renderMode: RenderMode.Client,
  },
  {
    path: 'checkout',
    renderMode: RenderMode.Client,
  },
  {
    path: 'order-success',
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
