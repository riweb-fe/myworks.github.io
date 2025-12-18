import { DOCUMENT, inject, Injectable, REQUEST } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SeoData } from '../methods/seo-data';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SeoManager {
  title = inject(Title);
  meta = inject(Meta);
  router = inject(Router);
  request = inject(REQUEST, { optional: true });
  document = inject(DOCUMENT);

  private readonly siteName = "Sample Store";
  private readonly defaultImage = "https://placehold.jp/d75b5b/ffffff/600x400.png?text=Sample%20Store%E2%98%85";

  updateSeoTags(SeoData: SeoData) {
    this.title.setTitle(`${SeoData.title} | ${this.siteName}`);
    this.meta.updateTag({ name: 'description', content: SeoData.description });

    let origin = '';
    if (this.request) {
      const headers = this.request.headers as Headers | undefined;
      const protocol = (headers?.get('x-forwarded-proto') || this.request.url.split(':')[0] || 'https') + '://';
      const host = headers?.get('x-forwarded-host') || headers?.get('host') || '';
      origin = host ? `${protocol}${host}` : '';
    } else if (typeof window !== 'undefined') {
      // クライアント側の処理
      origin = window.location.origin;
    }
    const fullUrl = `${origin}${this.router.url}`;

    let canonicalLink = this.document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = this.document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      this.document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullUrl);
    const imageUrl = SeoData.image || this.defaultImage;

    this.meta.updateTag({ property: 'og:type', content: SeoData.type || 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: this.siteName });
    this.meta.updateTag({ property: 'og:title', content: SeoData.title });
    this.meta.updateTag({ property: 'og:description', content: SeoData.description });
    this.meta.updateTag({ property: 'og:url', content: fullUrl });
    this.meta.updateTag({ property: 'og:image', content: imageUrl });
    this.meta.updateTag({ property: 'og:image:width', content: '1200' });
    this.meta.updateTag({ property: 'og:image:height', content: '630' });
    this.meta.updateTag({ property: 'og:locale', content: 'ja_JP' });
  };
}
