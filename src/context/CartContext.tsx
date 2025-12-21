import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, MenuItem, Restaurant, ItemCustomization } from '../types';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (menuItem: MenuItem, restaurant: Restaurant, customization?: ItemCustomization) => void;
  removeFromCart: (cartItemIndex: number) => void;
  updateQuantity: (cartItemIndex: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (menuItem: MenuItem, restaurant: Restaurant, customization?: ItemCustomization) => {
    // Always add as new item to support different customizations
    const newItem: CartItem = {
      menuItem,
      quantity: 1,
      restaurant,
      customization,
    };
    setCartItems((prev) => [...prev, newItem]);
  };

  const removeFromCart = (cartItemIndex: number) => {
    setCartItems((prev) => prev.filter((_, index) => index !== cartItemIndex));
  };

  const updateQuantity = (cartItemIndex: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(cartItemIndex);
      return;
    }
    setCartItems((prev) =>
      prev.map((item, index) =>
        index === cartItemIndex ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const calculateItemPrice = (item: CartItem) => {
    let price = item.menuItem.price;
    
    // Add size price
    if (item.customization?.size && item.menuItem.sizes) {
      const size = item.menuItem.sizes.find((s) => s.name === item.customization?.size);
      if (size) price += size.price;
    }
    
    // Add addon prices
    if (item.customization?.addons && item.menuItem.addons) {
      item.customization.addons.forEach((addonName) => {
        const addon = item.menuItem.addons!.find((a) => a.name === addonName);
        if (addon) price += addon.price;
      });
    }
    
    return price;
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + calculateItemPrice(item) * item.quantity,
      0
    );
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};