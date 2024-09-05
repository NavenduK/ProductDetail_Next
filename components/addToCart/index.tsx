"use client";

import { CartContext } from "../cartProvider";
import styles from "./index.module.css";
import utils from "../utils.module.css";
import { useState, useContext } from "react";
// Define the props interface
interface AddToCartProps {
  name: string;
  price: number;
  thumbnail: string;
}

export default function AddToCart({ name, price, thumbnail }: AddToCartProps) {
  const contextValue = useContext(CartContext);
  const [count, setCount] = useState<number>(0);

  const onDecrease = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const onIncrease = () => {
    setCount(count + 1);
  };

  const onAddToCart = () => {
    if (count > 0) {
      contextValue.setCartItems((prev: any[]) => [
        ...prev,
        {
          name: name,
          price: price,
          qty: count,
          subTotal: price * count,
          thumbnail: thumbnail,
        },
      ]);
    } else {
      alert("Please add at least 1 item.");
    }
  };

  return (
    <div className={`${styles.productPurchase} ${utils.flex}`}>
      <div className={`${styles.productCounter} ${utils.flex} ${utils.fw700}`}>
        <button className={`${styles.btnDecrease}`} onClick={onDecrease}>
          <img
            src="images/icon-minus.svg"
            alt="Icon decrease"
            aria-label="Decrease item"
          />
        </button>
        <span className={`${styles.productCount} ${utils.textNeutral700}`}>
          {count}
        </span>
        <button className={`${styles.btnIncrease}`} onClick={onIncrease}>
          <img
            src="images/icon-plus.svg"
            alt="Icon increase"
            aria-label="Increase item"
          />
        </button>
      </div>
      <button
        className={`${styles.btnAddToCart} ${utils.flex} ${utils.fw700}`}
        onClick={onAddToCart}
      >
        <img src="images/icon-cart.svg" alt="Cart Icon" />
        Add to cart
      </button>
    </div>
  );
}
