"use client";

import { useContext, useState } from "react";
import { CartContext } from "../cartProvider";
import styles from "./index.module.css";
import utils from "../utils.module.css";

interface CartItem {
  name: string;
  price: number;
  qty: number;
  subTotal: number;
  thumbnail: string;
}

interface CartPopupProps {
  items: CartItem[];
}

interface CartListProps {
  items: CartItem[];
}

interface CartItemProps {
  item: CartItem;
  id: number;
}

export default function Cart() {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [isCartOpened, setIsCartOpened] = useState<boolean>(false);

  const toggleIsCartOpened = () => {
    setIsCartOpened(prev => !prev);
  };

  const CartPopup: React.FC<CartPopupProps> = ({ items }) => {
    return (
      <div className={`${styles.cartPopup} ${utils.flex}`}>
        <h4 className={utils.textNeutral700}>Cart</h4>
        <div className={`${styles.cartPopupBottom} ${utils.flex}`}>
          {items.length ? (
            <>
              <CartList items={items} />
              <button
                className={`${styles.btnCheckout} ${utils.fw700} ${utils.textNeutral100}`}
              >
                Checkout
              </button>
            </>
          ) : (
            <CartEmpty />
          )}
        </div>
      </div>
    );
  };

  const CartEmpty: React.FC = () => {
    return (
      <div className={`${styles.cartEmpty} ${utils.grid} ${utils.fw700}`}>
        Your cart is empty.
      </div>
    );
  };

  const CartList: React.FC<CartListProps> = ({ items }) => {
    return (
      <ul className={`${styles.cartItems} ${utils.flex}`}>
        {items.map((item, index) => (
          <CartItem key={index} id={index} item={item} />
        ))}
      </ul>
    );
  };

  const CartItem: React.FC<CartItemProps> = ({ item, id }) => {
    return (
      <li className={`${styles.cartItem} ${utils.flex}`}>
        <img src={item.thumbnail} alt="cart item icon" />

        <div className={`${styles.cartItemDesc} ${utils.flex}`}>
          <span>{item.name}</span>
          <span>
            <span>{"$" + item.price.toFixed(2)}</span>
            <span>{" x " + item.qty + " "}</span>
            <span className={`${utils.fw700} ${utils.textNeutral700}`}>
              {"$" + item.subTotal.toFixed(2)}
            </span>
          </span>
        </div>

        <button
          className={styles.cartItemDelete}
          onClick={() => {
            onRemove(id);
          }}
        >
          <img src="images/icon-delete.svg" alt="cart item delete" />
        </button>
      </li>
    );
  };

  const onRemove = (id: number) => {
    const newCartItems = cartItems.filter((_, index) => index !== id);
    setCartItems(newCartItems);
  };

  return (
    <>
      <button className={styles.cart} onClick={toggleIsCartOpened}>
        <img src="images/icon-cart.svg" alt="icon cart" aria-label="Cart" />
        {cartItems.length ? (
          <div className={styles.cartItemCount}>{cartItems.length}</div>
        ) : null}
      </button>
      {isCartOpened ? <CartPopup items={cartItems} /> : null}
    </>
  );
}
