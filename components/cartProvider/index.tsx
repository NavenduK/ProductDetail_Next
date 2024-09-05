import React, { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction } from "react";

interface CartItem {
  name: string;
  price: number;
  qty: number;
  subTotal: number;
  thumbnail: string;
}

interface CartContextType {
  cartItems: CartItem[];
  setCartItems: Dispatch<SetStateAction<CartItem[]>>;
}

const defaultContextValue: CartContextType = {
  cartItems: [],
  setCartItems: () => {}, 
};

export const CartContext = createContext<CartContextType>(defaultContextValue);

const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  console.log(cartItems)

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
