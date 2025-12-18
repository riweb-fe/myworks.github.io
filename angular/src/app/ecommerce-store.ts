import { computed, inject } from "@angular/core";
import type { Product } from "./methods/product";
import type { CartItem } from "./methods/cart";
import { patchState, signalStore, withState, withComputed, signalMethod, withMethods } from "@ngrx/signals";
import { produce } from 'immer';
import { Toaster } from "./services/toaster";
import { MatDialog } from "@angular/material/dialog";
import { SignInDialog } from "./components/sign-in-dialog/sign-in-dialog";
import type { SignInParams, SignUpParams, User } from "./methods/user";
import { Router } from "@angular/router";
import type { Order } from "./methods/order";
import { withStorageSync } from '@angular-architects/ngrx-toolkit';
import { AddReviewParams, UserReview } from "./methods/user-review";
import { SeoManager } from "./services/seo-manager";

export type EcommerceState = {
  category: string;
  products: Product[];
  wishlistItems: Product[];
  cartItems: CartItem[];
  user: User | undefined;
  loading: boolean;
  selectedProductId: string | undefined;
  writeReview: boolean;
  toggleSidenavState: boolean;
}

export const EcommerceStore = signalStore(
  {
    providedIn: 'root'
  },
  // 初期状態
  withState({
    category: 'all',
    products: [
      {
        id: '1',
        name: 'iPhone11',
        description: '白いiPhone11 (アイフォン11)',
        price: 100000,
        imageUrl: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        rating: 5,
        reviewCount: 19,
        inStock: true,
        category: 'iphone11',
        reviews: [
          {
            id: '1-1',
            productId: '1',
            userName: 'hayama jonney',
            userImageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
            rating: 5,
            title: 'Amazing device!',
            comment: 'The Iphone is incredible. Smart and very easy to use.',
            reviewDate: new Date('2023-02-16'),
          },
          {
            id: '1-2',
            productId: '1',
            userName: 'suzuki shoko',
            userImageUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
            rating: 4,
            title: 'Very satisfied',
            comment: 'Great performance and design. Battery life could be better, but overall I am happy.',
            reviewDate: new Date('2023-03-05'),
          },
        ]
      },
      {
        id: '2',
        name: 'iPhone12',
        description: 'ブルーのiPhone12 (アイフォン12)',
        price: 110000,
        imageUrl: 'https://images.unsplash.com/photo-1604054923518-e491a9a6afbb?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        rating: 2,
        reviewCount: 42,
        inStock: true,
        category: 'iphone12',
        reviews: [
          {
            id: '2-1',
            productId: '1',
            userName: 'tanaka hanako',
            userImageUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
            rating: 5,
            title: 'Best phone I have ever used',
            comment: 'Fast, reliable, and the camera quality is outstanding. Highly recommended!',
            reviewDate: new Date('2023-04-12'),
          },
        ]
      },
      {
        id: '3',
        name: 'iPhone12 Pro',
        description: 'ゴールドのiPhone12 Pro (アイフォン12 プロ)',
        price: 130000,
        imageUrl: 'https://images.unsplash.com/photo-1604160687791-1d36b8b0f8bb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        rating: 3,
        reviewCount: 58,
        inStock: false,
        category: 'iphone12',
        reviews: [],
      },
      {
        id: '4',
        name: 'iPhone13',
        description: 'ピンクのiPhone13 (アイフォン13)',
        price: 125000,
        imageUrl: 'https://plus.unsplash.com/premium_photo-1705346738009-52ed3390513a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        rating: 4,
        reviewCount: 33,
        inStock: true,
        category: 'iphone13',
        reviews: [],
      },
      {
        id: '5',
        name: 'iPhone13 Pro',
        description: 'グラファイトのiPhone13 Pro (アイフォン13 プロ)',
        price: 150000,
        imageUrl: 'https://images.unsplash.com/photo-1636777489428-8a3da9f821c7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        rating: 5,
        reviewCount: 76,
        inStock: true,
        category: 'iphone13',
        reviews: [],
      },
      {
        id: '6',
        name: 'iPhone14',
        description: 'ミッドナイト iPhone14 (アイフォン14)',
        price: 135000,
        imageUrl: 'https://images.unsplash.com/photo-1672617195423-5458a5210e01?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        rating: 3,
        reviewCount: 21,
        inStock: false,
        category: 'iphone14',
        reviews: [],
      },
      {
        id: '7',
        name: 'iPhone14 Pro',
        description: 'スペースブラック iPhone14 Pro (アイフォン14 プロ)',
        price: 175000,
        imageUrl: 'https://images.unsplash.com/photo-1670156256975-b3dbdd416082?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        rating: 4,
        reviewCount: 102,
        inStock: true,
        category: 'iphone14',
        reviews: [],
      },
      {
        id: '8',
        name: 'iPhoneSE (第3世代)',
        description: '白いiPhoneSE 第3世代 (アイフォンSE3)',
        price: 65000,
        imageUrl: 'https://images.unsplash.com/photo-1598033235726-1ed8b7535194?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        rating: 1,
        reviewCount: 44,
        inStock: true,
        category: 'iphonese',
        reviews: [],
      },
    ],
    wishlistItems: [],
    cartItems: [],
    user: undefined,
    loading: false,
    selectedProductId: undefined,
    writeReview: false,
    toggleSidenavState: true,
  } as EcommerceState),
  withComputed(({ category, products, wishlistItems, cartItems, selectedProductId }) => ({
    // app-products-grid : category = input<string>('all');
    filteredProducts: computed(() => {
      if (category() === 'all') return products();
      return products().filter(p => p.category === category().toLowerCase());
    }),
    wishlistCount: computed(() => wishlistItems().length),
    // app-qty-selector : quantity = input(0);
    cartCount: computed(() => cartItems().reduce((acc, item) => acc + item.quantity, 0)),
    selectedProduct: computed(() => products().find(p => p.id === selectedProductId())),
  })),
  withMethods((store, toaster = inject(Toaster), matDialog = inject(MatDialog), router = inject(Router), seoManager = inject(SeoManager)) => ({
    // setParams: rxMethod<FilterParams>(
    //   pipe(
    //     tap((params) => {
    //       const { category, searchTerm } = params;
    //       patchState(store, { category, searchTerm });
    //     }),
    //   ),
    // ),
    setProductsListSeoTags: signalMethod<string | undefined>((category) => {
      const categoryName = category ? category.charAt(0).toUpperCase() + category.slice(1) : 'All products';
      const description = category ? `Browse our collection of ${category} products` : 'Browse our collection of products';
      seoManager.updateSeoTags({
        title: categoryName,
        description,
      });
    }),

    setProductSeoTags: signalMethod<Product | undefined>((product) => {
      if (!product) return;
      seoManager.updateSeoTags({
        title: product.name,
        description: product.description,
        image: product.imageUrl,
        type: 'product',
      });
    }),

    setCategory: signalMethod<string>((category: string) => {
      patchState(store, { category });
    }),

    setProductId: signalMethod<string>((productId: string) => {
      patchState(store, { selectedProductId: productId });
    }),

    addToWishlist: (product: Product) => {
      // use Immer
      const updatedWishListItems = produce(store.wishlistItems(), draft => {
        if (!draft.find(p => p.id === product.id)) {
          draft.push(product);
        }
      })

      patchState(store, { wishlistItems: updatedWishListItems });
      toaster.success('製品をお気に入りへ追加しました');
    },

    removeFromWishlist: (product: Product) => {
      patchState(store, {
        wishlistItems: store.wishlistItems().filter(p => p.id !== product.id),
      });
      toaster.success('製品をお気に入りから削除しました');
    },

    clearWishlist: () => {
      patchState(store, { wishlistItems: [] });
    },

    addToCart: (product: Product, quantity = 1) => {
      // cartItems()に対象のproductの有無確認 → 有ならcartItems()配列に追加した順番に合致するindex番号を取得
      const existingItemIndex = store.cartItems().findIndex(item => item.product.id === product.id);

      // Immerを使用して更新
      const updatedCartItems = produce(store.cartItems(), (draft) => {
        if (existingItemIndex !== -1) {
          draft[existingItemIndex].quantity += quantity;
          return;
        }
        draft.push({
          // 追加した product のオブジェクトに、第２引数の quantity を追加
          product, quantity
        })
      });

      patchState(store, { cartItems: updatedCartItems });
      toaster.success(existingItemIndex < 0 ? '製品をカートに追加しました' : '製品をさらに１点追加しました');
    },

    setItemQuantity(params: { productId: string, quantity: number }) {
      const index = store.cartItems().findIndex(c => c.product.id === params.productId);
      const updated = produce(store.cartItems(), draft => {
        draft[index].quantity = params.quantity;
      });

      patchState(store, { cartItems: updated });
    },

    addAllWishlistToCart: () => {
      const updatedCartItems = produce(store.cartItems(), draft => {
        store.wishlistItems().forEach(p => {
          if (!draft.find(c => c.product.id === p.id)) {
            draft.push({ product: p, quantity: 1 });
          }
        });
      });

      patchState(store, { cartItems: updatedCartItems, wishlistItems: [] });
    },

    moveToWishlist: (product: Product) => {
      const updatedCartItems = store.cartItems().filter(p => p.product.id !== product.id);
      const updatedWishListItems = produce(store.wishlistItems(), draft => {
        if (!draft.find(p => p.id === product.id)) {
          draft.push(product)
        }
      })

      patchState(store, { cartItems: updatedCartItems, wishlistItems: updatedWishListItems });
    },

    removeFormCart: (product: Product) => {
      patchState(store, {
        cartItems: store.cartItems().filter((c) => c.product.id !== product.id),
      });
    },

    proceedToCheckout: () => {
      if (!store.user()) {
        // SignInDialogのTemplateを、表示したいページの上に重ねて描画
        // SignInDialogはMAT_DIALOG_DATAトークンを使用することでdataを取得
        matDialog.open(SignInDialog, {
          disableClose: true,
          data: {
            checkout: true,
          }
        });
        return;
      }

      router.navigate(['/checkout']);
    },

    placeOrder: async () => {
      patchState(store, { loading: true });

      const user = store.user();

      if (!user) {
        toaster.error('注文の前にログインが必要になります');
        patchState(store, { loading: false });
        return;
      }

      const order: Order = {
        id: crypto.randomUUID(),
        userId: user.id || '',
        total: Math.round(store.cartItems().reduce((acc, item) => acc + item.quantity * item.product.price, 0)),
        items: store.cartItems(),
        paymentStatus: 'success',
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));

      patchState(store, { loading: false, cartItems: [] });
      router.navigate(['/order-success']);
    },

    signIn: ({ email, password, checkout, dialogId }: SignInParams) => {
      patchState(store, {
        user: {
          id: '1',
          email,
          name: 'Kawagoe Taro',
          imageUrl: 'https://plus.unsplash.com/premium_photo-1742445188769-86d419595529?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
      });

      // getDialogById：https://material.angular.dev/components/dialog/api
      matDialog.getDialogById(dialogId)?.close();

      if (checkout) {
        router.navigate(['/checkout']);
      }
    },

    signUp: ({ email, password, name, checkout, dialogId }: SignUpParams) => {
      patchState(store, {
        user: {
          id: '1',
          email,
          name: 'Kawagoe Taro',
          imageUrl: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
      });

      matDialog.getDialogById(dialogId)?.close();

      if (checkout) {
        router.navigate(['/checkout']);
      }
    },

    signOut: () => {
      patchState(store, { user: undefined });
    },

    showWriteReview: () => {
      patchState(store, { writeReview: true });
    },

    hiddenWriteReview: () => {
      patchState(store, { writeReview: false });
    },

    addReview: async ({title, comment, rating}: AddReviewParams) => {
      patchState(store, { loading: true });
      const product = store.products().find(p => p.id === store.selectedProductId());
      if (!product) {
        toaster.error('製品がありません');
        patchState(store, { loading: false });
        return;
      }

      const review: UserReview = {
        id: crypto.randomUUID(),
        title,
        comment,
        rating,
        productId: product.id,
        userName: store.user()?.name || '',
        userImageUrl: store.user()?.imageUrl || '',
        reviewDate: new Date(),
      };

      const updatedProducts = produce(store.products(), draft => {
        const index = draft.findIndex(p => p.id === product.id);
        const reviews = draft[index].reviews ?? [];
        reviews.push(review);
        draft[index].rating =
          Math.round(
            (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length) * 10,
          ) / 10;
        draft[index].reviewCount = reviews.length;
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));
      patchState(store, { loading: false, products: updatedProducts, writeReview: false });
    },

    toggleSidenav: () => {
      patchState(store, { toggleSidenavState: !store.toggleSidenavState() });
    },

    setSidenavOpen(isOpen: boolean) {
      patchState(store, { toggleSidenavState: isOpen });
    }
  })),

  // buildを行う場合、コメントアウト
  // https://ngrx-toolkit.angulararchitects.io/docs/with-storage-sync
  // withStorageSync({ key: 'test-store', select: ({wishlistItems, cartItems, user }) => ({wishlistItems, cartItems, user}) }),
)
