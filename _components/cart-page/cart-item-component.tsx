"use client";

import { useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import { CartItem } from "@/_types/cart-types";
import { useCart } from "@/_contexts/cart-context";

interface CartItemComponentProps {
  item: CartItem;
}

export default function CartItemComponent({ item }: CartItemComponentProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const [quantity, setQuantity] = useState<number | string>(item.quantity);

  const increaseQuantity = () => {
    const newQty = Math.min(item.quantity + 1, 99);
    updateQuantity(item.id, newQty);
  };

  const decreaseQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setQuantity("");
      return;
    }
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 1 && numValue <= 99) {
      setQuantity(numValue);
      updateQuantity(item.id, numValue);
    } else if (numValue > 99) {
      setQuantity(99);
      updateQuantity(item.id, 99);
    }
  };

  const handleQuantityBlur = () => {
    if (quantity === "" || (typeof quantity === "number" && quantity < 1)) {
      setQuantity(item.quantity);
    }
  };

  return (
    <div className="bg-black/50 border border-yellow/25 rounded-lg p-5">
      <div className="flex gap-5">
        {item.image && (
          <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-md">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>
        )}
        
        <div className="flex-1 space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-subheading text-white">{item.name}</h3>
              <p className="text-paragraph text-white/80">R{item.price} each</p>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-yellow hover:text-white transition-colors duration-300 p-2 -m-2"
              aria-label="Remove item"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M2 2L14 14M14 2L2 14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="grid items-center w-[46px] tablet:grid-cols-2 tablet:w-auto">
                <button
                  onClick={increaseQuantity}
                  disabled={item.quantity >= 99}
                  className={classNames(
                    "bg-yellow w-full h-6 rounded-t-md flex items-center justify-center tablet:w-[22px] tablet:rounded-t-none tablet:rounded-tr-md",
                    {
                      "cursor-not-allowed opacity-50": item.quantity >= 99,
                      "tablet:hover:cursor-pointer tablet:hover:opacity-90 ease-in-out duration-300":
                        item.quantity < 99,
                    }
                  )}
                >
                  <svg width="10" height="5" viewBox="0 0 10 5" fill="none">
                    <path d="M5 0L0 5H10L5 0Z" fill="#353535" />
                  </svg>
                </button>

                <div className="border-2 border-white w-full h-[39px] flex items-center justify-center tablet:order-first tablet:row-span-2 tablet:h-[48px] tablet:rounded-l-md tablet:w-[46px]">
                  <input
                    type="number"
                    min="1"
                    max="99"
                    value={item.quantity}
                    onChange={handleQuantityChange}
                    onBlur={handleQuantityBlur}
                    className="bg-transparent text-white text-[20px] text-center w-full focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>

                <button
                  onClick={decreaseQuantity}
                  disabled={item.quantity === 1}
                  className={classNames(
                    "bg-yellow w-full h-6 rounded-b-md flex items-center justify-center border-t border-white tablet:w-[22px] tablet:rounded-b-none tablet:rounded-br-md",
                    {
                      "opacity-50 cursor-not-allowed": item.quantity === 1,
                      "tablet:hover:cursor-pointer tablet:hover:opacity-90 ease-in-out duration-300":
                        item.quantity > 1,
                    }
                  )}
                >
                  <svg width="10" height="5" viewBox="0 0 10 5" fill="none">
                    <path d="M5 5L10 0H0L5 5Z" fill="#353535" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="text-right">
              <p className="text-subheading text-yellow">
                R{(item.price * item.quantity).toFixed(2)}
              </p>
              <p className="text-[12px] text-white/60">Subtotal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}