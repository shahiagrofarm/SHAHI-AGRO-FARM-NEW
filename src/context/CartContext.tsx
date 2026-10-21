/**
 * Shahi Agro Farm — Cart Context & State Management
 * Persists cart to localStorage and recalculates totals against central catalog prices.
 */

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { CartItem, ValidatedCartItem, CartTotals, calculateCartTotals, validateQuantity } from '../utils/cart-rules.ts';
import { getProductById } from '../data/products.ts';

interface CartContextType {
  cart: CartItem[];
  validatedItems: ValidatedCartItem[];
  totals: CartTotals;
  addToCart: (productId: string, quantity?: number) => { success: boolean; message: string };
  buyNow: (productId: string, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => { success: boolean; message: string };
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  lastAddedProduct: string | null;
  resetLastAdded: () => void;
}

const CART_STORAGE_KEY = 'shahi_agro_cart_v3';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter(it => it && typeof it.productId === 'string' && typeof it.quantity === 'number');
        }
      }
    } catch {
      // Storage unavailable or corrupt
    }
    return [];
  });

  const [lastAddedProduct, setLastAddedProduct] = useState<string | null>(null);

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Storage quota or disabled
    }
  }, [cart]);

  const { validatedItems, totals } = useMemo(() => {
    return calculateCartTotals(cart);
  }, [cart]);

  const resolveCanonicalId = (id: string): string => {
    const prod = getProductById(id);
    return prod ? prod.id : id;
  };

  const addToCart = (rawProductId: string, requestedQuantity?: number) => {
    const productId = resolveCanonicalId(rawProductId);
    const product = getProductById(productId);
    const existing = cart.find(it => it.productId === productId);
    let targetQty = requestedQuantity;

    if (targetQty === undefined) {
      if (productId === 'grass-silage' || productId === 'shahi-grass-silage') {
        targetQty = existing ? existing.quantity + 10 : 20;
      } else {
        targetQty = existing ? existing.quantity + 1 : 1;
      }
    }

    const validation = validateQuantity(productId, targetQty);
    if (!validation.valid) {
      targetQty = validation.normalizedQty;
    }

    setCart(prev => {
      const idx = prev.findIndex(it => it.productId === productId);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = { productId, quantity: targetQty };
        return updated;
      }
      return [...prev, { productId, quantity: targetQty }];
    });

    setLastAddedProduct(productId);
    setTimeout(() => setLastAddedProduct(null), 3000);

    return {
      success: true,
      message: validation.error || `Added to your cart.`
    };
  };

  const buyNow = (rawProductId: string, requestedQuantity?: number) => {
    addToCart(rawProductId, requestedQuantity);
  };

  const updateQuantity = (rawProductId: string, quantity: number) => {
    const productId = resolveCanonicalId(rawProductId);
    const validation = validateQuantity(productId, quantity);

    if (quantity <= 0) {
      removeFromCart(productId);
      return { success: true, message: 'Item removed from cart.' };
    }

    setCart(prev => {
      return prev.map(item => {
        if (item.productId === productId) {
          return { productId, quantity: validation.normalizedQty };
        }
        return item;
      });
    });

    return {
      success: validation.valid,
      message: validation.valid ? 'Quantity updated.' : (validation.error || 'Quantity adjusted to allowed limit.')
    };
  };

  const removeFromCart = (rawProductId: string) => {
    const productId = resolveCanonicalId(rawProductId);
    setCart(prev => prev.filter(it => it.productId !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const resetLastAdded = () => setLastAddedProduct(null);

  return (
    <CartContext.Provider
      value={{
        cart,
        validatedItems,
        totals,
        addToCart,
        buyNow,
        updateQuantity,
        removeFromCart,
        clearCart,
        lastAddedProduct,
        resetLastAdded
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}
