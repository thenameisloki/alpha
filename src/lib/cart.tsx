import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Product } from '@/data/types';

export interface CartItem {
  product: Product;
  days: number;
  deliveryMethod: string;
}

interface CartWishlistContextValue {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (product: Product, days?: number, deliveryMethod?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartDays: (productId: string, days: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartDepositTotal: number;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  cartCount: number;
}

const CartWishlistContext = createContext<CartWishlistContextValue | null>(null);

const CART_KEY = 'lendora-cart';
const WISHLIST_KEY = 'lendora-wishlist';

export function CartWishlistProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_KEY);
      const savedWishlist = localStorage.getItem(WISHLIST_KEY);
      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product: Product, days = 3, deliveryMethod = 'Pickup') => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, days, deliveryMethod } : item
        );
      }
      return [...prev, { product, days, deliveryMethod }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartDays = (productId: string, days: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, days: Math.max(1, days) } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.pricePerDay * item.days,
    0
  );
  const cartDepositTotal = cart.reduce(
    (sum, item) => sum + item.product.securityDeposit,
    0
  );
  const cartCount = cart.length;

  return (
    <CartWishlistContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateCartDays,
        clearCart,
        cartTotal,
        cartDepositTotal,
        toggleWishlist,
        isInWishlist,
        cartCount,
      }}
    >
      {children}
    </CartWishlistContext.Provider>
  );
}

export function useCartWishlist() {
  const ctx = useContext(CartWishlistContext);
  if (!ctx) throw new Error('useCartWishlist must be used within CartWishlistProvider');
  return ctx;
}
