"use client";

import { useState } from "react";
import classNames from "classnames";
import ButtonType from "@/_components/ui/buttons/button-type";
import { useCart } from "@/_contexts/cart-context";

interface StrainCartComponentProps {
  strainId: string;
  strainName: string;
  strainPrice: number;
  strainImage?: string;
  inStock: boolean;
  cssClasses?: string;
}

const StrainCartComponent = ({
  strainId,
  strainName,
  strainPrice,
  strainImage,
  inStock,
  cssClasses,
}: StrainCartComponentProps) => {
  const [quantity, setQuantity] = useState<number | string>(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const { addToCart } = useCart();

  const increaseQuantity = () =>
    setQuantity((prev) => {
      const num = typeof prev === "string" ? 1 : prev;
      return num < 99 ? num + 1 : 99;
    });
  const decreaseQuantity = () =>
    setQuantity((prev) => {
      const num = typeof prev === "string" ? 1 : prev;
      return num > 1 ? num - 1 : 1;
    });

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setQuantity("" as any);
      return;
    }
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 1 && numValue <= 99) {
      setQuantity(numValue);
    } else if (numValue > 99) {
      setQuantity(99);
    }
  };

  const handleQuantityBlur = () => {
    if (quantity === "" || (typeof quantity === "number" && quantity < 1)) {
      setQuantity(1);
    }
  };

  const handleAddToCart = () => {
    const qty = typeof quantity === "string" ? 1 : quantity;
    addToCart(
      {
        id: strainId,
        name: strainName,
        price: strainPrice,
        image: strainImage,
      },
      qty
    );
    
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
    setQuantity(1);
  };

  return (
    <div
      className={classNames(
        "flex items-center gap-5 justify-between w-full",
        cssClasses
      )}
    >
      <div className="grid items-center w-[46px] tablet:grid-cols-2 tablet:w-auto">
        <button
          onClick={increaseQuantity}
          disabled={
            !inStock || (typeof quantity === "number" && quantity >= 99)
          }
          className={classNames(
            "bg-yellow w-full h-6 rounded-t-md flex items-center justify-center tablet:w-[22px] tablet:rounded-t-none tablet:rounded-tr-md",
            {
              "cursor-not-allowed opacity-50":
                !inStock || (typeof quantity === "number" && quantity >= 99),
              "tablet:hover:cursor-pointer tablet:hover:opacity-90 ease-in-out duration-300":
                inStock &&
                (typeof quantity !== "number" ||
                  (typeof quantity === "number" && quantity < 99)),
            }
          )}
        >
          <svg width="10" height="5" viewBox="0 0 10 5" fill="none">
            <path d="M5 0L0 5H10L5 0Z" fill="#353535" />
          </svg>
        </button>

        <div className="border-2 border-white w-full h-[39px] flex items-center justify-center tablet:order-first tablet:row-span-2 tablet:h-[48px] tablet:rounded-l-md tablet:w-[46px]">
          {inStock ? (
            <input
              type="number"
              min="1"
              max="99"
              value={quantity}
              onChange={handleQuantityChange}
              onBlur={handleQuantityBlur}
              className="bg-transparent text-white text-[20px] text-center w-full focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          ) : (
            <span className="text-white text-[20px]">0</span>
          )}
        </div>

        <button
          onClick={decreaseQuantity}
          disabled={
            !inStock || (typeof quantity === "number" && quantity === 1)
          }
          className={classNames(
            "bg-yellow w-full h-6 rounded-b-md flex items-center justify-center border-t border-white tablet:w-[22px] tablet:rounded-b-none tablet:rounded-br-md",
            {
              "opacity-50 cursor-not-allowed":
                !inStock || (typeof quantity === "number" && quantity === 1),
              "tablet:hover:cursor-pointer tablet:hover:opacity-90 ease-in-out duration-300":
                inStock &&
                (typeof quantity !== "number" ||
                  (typeof quantity === "number" && quantity !== 1)),
            }
          )}
        >
          <svg width="10" height="5" viewBox="0 0 10 5" fill="none">
            <path d="M5 5L10 0H0L5 5Z" fill="#353535" />
          </svg>
        </button>
      </div>
      <ButtonType
        type="button"
        cssClasses={classNames({
          "cursor-not-allowed opacity-50": !inStock,
        })}
        disabled={!inStock}
        onClick={handleAddToCart}
      >
        {showSuccess ? "Added!" : "Add To Cart"}
      </ButtonType>
    </div>
  );
};

export default StrainCartComponent;
