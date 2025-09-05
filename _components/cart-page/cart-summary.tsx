"use client";

import { useState, useTransition } from "react";
import { useCart } from "@/_contexts/cart-context";
import ButtonType from "@/_components/ui/buttons/button-type";
import classNames from "classnames";
import { sendOrderEmail } from "@/_actions/send-order-email-action";

export default function CartSummary() {
  const { getTotalPrice, items, clearCart, getTotalItems } = useCart();
  const [isPending, startTransition] = useTransition();
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (formDataElement: FormData) => {
    setError(null);

    const orderData = {
      ...formData,
      items: items,
      totalPrice: totalPrice,
    };

    formDataElement.append("orderData", JSON.stringify(orderData));

    startTransition(async () => {
      const result = await sendOrderEmail(formDataElement);

      if (result.success) {
        setShowSuccess(true);
        clearCart();
        setFormData({
          name: "",
          email: "",
          phone: "",
          notes: "",
        });

        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      } else {
        setError(result.error || "Failed to submit order. Please try again.");
      }
    });
  };

  if (showSuccess) {
    return (
      <div className="bg-black/50 border border-yellow rounded-lg p-8 sticky top-28">
        <div className="text-center space-y-5">
          <div className="flex justify-center">
            <div className="bg-yellow rounded-full p-3">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="#353535"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <h3 className="text-subheading text-white">Order Submitted!</h3>
          <p className="text-paragraph text-white/80">
            Thank you for your order. We'll contact you soon.
          </p>
          <p className="text-[14px] text-white/60">
            Redirecting to home page...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black/50 border border-yellow rounded-lg p-5 desktop:p-8 sticky top-28">
      <form action={handleSubmit} className="space-y-5">
        <h2 className="text-subheading text-white border-b border-yellow/25 pb-3">
          Order Summary
        </h2>

        <div className="space-y-3 pb-5 border-b border-yellow/25">
          <div
            className={classNames(
              "flex justify-between text-paragraph text-white",
              {
                "p-2 -mx-2 bg-red rounded-md": totalItems < 4,
              }
            )}
          >
            <span>Total clones</span>
            <span>{totalItems}</span>
          </div>
          <div className="flex justify-between text-paragraph text-white">
            <span>Subtotal</span>
            <span>R{totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-subheading text-yellow">
            <span>Total</span>
            <span>R{totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-subheading text-white">Your Details</h3>

          <div>
            <label
              htmlFor="name"
              className="block text-paragraph text-white/80 mb-2"
            >
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full bg-black/50 border border-white/25 rounded-md px-4 py-3 text-white focus:outline-none focus:border-yellow transition-colors"
              placeholder="Your name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-paragraph text-white/80 mb-2"
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full bg-black/50 border border-white/25 rounded-md px-4 py-3 text-white focus:outline-none focus:border-yellow transition-colors"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-paragraph text-white/80 mb-2"
            >
              Phone *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full bg-black/50 border border-white/25 rounded-md px-4 py-3 text-white focus:outline-none focus:border-yellow transition-colors"
              placeholder="Your phone number"
            />
          </div>

          <div>
            <label
              htmlFor="notes"
              className="block text-paragraph text-white/80 mb-2"
            >
              Order Notes (Optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              value={formData.notes}
              onChange={handleInputChange}
              className="w-full bg-black/50 border border-white/25 rounded-md px-4 py-3 text-white focus:outline-none focus:border-yellow transition-colors resize-none"
              placeholder="Any special instructions..."
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-md p-3">
            <p className="text-[14px] text-red-400">{error}</p>
          </div>
        )}

        <ButtonType
          type="submit"
          disabled={isPending || totalItems < 4}
          cssClasses={classNames("w-full", {
            "opacity-50 cursor-not-allowed": isPending,
          })}
          title="You must have at least 4 clones in your cart to submit an order"
        >
          {isPending ? "Submitting..." : "Submit Order"}
        </ButtonType>
      </form>
    </div>
  );
}
