import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, ProductSize } from '@/types/product';

export interface CartItem {
  product: Product;
  size: ProductSize;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;

  // Actions
  addItem: (product: Product, size: ProductSize, quantity?: number) => void;
  removeItem: (productId: string, sizeVolume: string) => void;
  updateQuantity: (productId: string, sizeVolume: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  // Computed
  getTotalItems: () => number;
  getTotalPrice: () => number;
  total: () => number; // Alias for getTotalPrice
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, size, quantity = 1) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.product.id === product.id && item.size.volume === size.volume
          );

          if (existingItemIndex > -1) {
            // Update quantity if item already exists
            const newItems = [...state.items];
            newItems[existingItemIndex].quantity += quantity;
            return { items: newItems, isOpen: true };
          }

          // Add new item
          return {
            items: [...state.items, { product, size, quantity }],
            isOpen: true,
          };
        });
      },

      removeItem: (productId, sizeVolume) => {
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.product.id === productId && item.size.volume === sizeVolume)
          ),
        }));
      },

      updateQuantity: (productId, sizeVolume, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, sizeVolume);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId && item.size.volume === sizeVolume
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [], isOpen: false });
      },

      openCart: () => {
        set({ isOpen: true });
      },

      closeCart: () => {
        set({ isOpen: false });
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.size.price * item.quantity, 0);
      },

      total: () => {
        return get().getTotalPrice();
      },
    }),
    {
      name: 'oz-cart-storage',
      partialize: (state) => ({ items: state.items }), // Only persist items, not isOpen
    }
  )
);
