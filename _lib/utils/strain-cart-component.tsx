"use client";

import { useState } from "react";
import classNames from "classnames";
import ButtonType from "@/_components/ui/buttons/button-type";

interface StrainCartComponentProps {
  inStock: boolean;
}

const StrainCartComponent = ({ inStock }: StrainCartComponentProps) => {
  const [quantity, setQuantity] = useState<number | string>(1);

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

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex flex-col items-center w-[46px]">
        <button
          onClick={increaseQuantity}
          disabled={
            !inStock || (typeof quantity === "number" && quantity >= 99)
          }
          className={classNames(
            "bg-yellow w-full h-6 rounded-t-md flex items-center justify-center",
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

        <div className="border-2 border-white w-full h-[39px] flex items-center justify-center">
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
            "bg-yellow w-full h-6 rounded-b-md flex items-center justify-center border-t border-white",
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
      >
        Add To Cart
      </ButtonType>
    </div>
  );
};

export default StrainCartComponent;
