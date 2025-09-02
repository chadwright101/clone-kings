"use client";

import { useCart } from "@/_contexts/cart-context";
import CartItemComponent from "@/_components/cart-page/cart-item-component";
import CartSummary from "@/_components/cart-page/cart-summary";
import Link from "next/link";
import ButtonType from "@/_components/ui/buttons/button-type";

export default function CartPage() {
  const { items, getTotalItems } = useCart();
  const totalItems = getTotalItems();

  if (totalItems === 0) {
    return (
      <div className="max-w-[1280px] mx-auto px-5 desktop:px-10 py-15">
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-5">
          <h1 className="text-heading text-white">Your Cart is Empty</h1>
          <p className="text-paragraph text-white/80">
            Browse our strains and add some items to your cart
          </p>
          <Link href="/strains">
            <ButtonType type="button">
              Browse Strains
            </ButtonType>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1280px] mx-auto px-5 desktop:px-10 py-15">
      <div className="space-y-10">
        <div className="border-b-4 border-yellow pb-5">
          <h1 className="text-heading text-white">Your Cart</h1>
          <p className="text-paragraph text-white/80 mt-2">
            {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="desktop:grid desktop:grid-cols-[1fr_400px] desktop:gap-10 desktop:items-start">
          <div className="space-y-5 mb-10 desktop:mb-0">
            {items.map((item) => (
              <CartItemComponent key={item.id} item={item} />
            ))}
          </div>
          
          <CartSummary />
        </div>
      </div>
    </div>
  );
}