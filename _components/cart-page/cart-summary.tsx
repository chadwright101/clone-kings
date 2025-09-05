"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/_contexts/cart-context";
import ButtonType from "@/_components/ui/buttons/button-type";
import classNames from "classnames";
import { sendOrderEmail } from "@/_actions/send-order-email-action";

interface CartSummaryProps {}

export default function CartSummary({}: CartSummaryProps) {
  const { getTotalPrice, getTotalItems, items, clearCart, setShowEmailSubmitted } = useCart();
  const [submissionStartTime, setSubmissionStartTime] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  useEffect(() => {
    const startSubmissionTimer = () => {
      setSubmissionStartTime(new Date().getTime());
    };
    startSubmissionTimer();
  }, []);

  return (
    <div className="bg-black/50 border border-yellow rounded-md p-5 desktop:p-8 sticky top-28">
      <form
        action={async (formData) => {
          try {
            setError(null);
            formData.append("cartData", JSON.stringify(items));
            formData.append("totalPrice", totalPrice.toString());
            const result = await sendOrderEmail(formData);

            if (result.success) {
              setShowEmailSubmitted(true);
              clearCart();
            } else {
              setError(
                result.error || "Failed to submit order. Please try again."
              );
            }
          } catch (err) {
            setError("An unexpected error occurred. Please try again.");
            console.error("Order submission error:", err);
          }
        }}
        className="space-y-5"
      >
        <input type="hidden" name="_honey" className="hidden" />
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
              htmlFor="given-name"
              className="block text-paragraph text-white/80 mb-2"
            >
              First name: *
            </label>
            <input
              type="text"
              id="given-name"
              name="given-name"
              autoComplete="given-name"
              required
              className="w-full bg-black/50 border border-white/25 rounded-md px-4 py-3 text-white focus:outline-none focus:border-yellow transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="family-name"
              className="block text-paragraph text-white/80 mb-2"
            >
              Last name: *
            </label>
            <input
              type="text"
              id="family-name"
              name="family-name"
              autoComplete="family-name"
              required
              className="w-full bg-black/50 border border-white/25 rounded-md px-4 py-3 text-white focus:outline-none focus:border-yellow transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-paragraph text-white/80 mb-2"
            >
              Email: *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              required
              className="w-full bg-black/50 border border-white/25 rounded-md px-4 py-3 text-white focus:outline-none focus:border-yellow transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="tel"
              className="block text-paragraph text-white/80 mb-2"
            >
              Phone: *
            </label>
            <input
              type="tel"
              id="tel"
              name="tel"
              autoComplete="tel"
              required
              className="w-full bg-black/50 border border-white/25 rounded-md px-4 py-3 text-white focus:outline-none focus:border-yellow transition-colors"
            />
          </div>
          <div>
            <label
              htmlFor="address-line1"
              className="block text-paragraph text-white/80 mb-1"
            >
              Street address line 1: *
            </label>
            <input
              type="text"
              id="address-line1"
              name="address-line1"
              autoComplete="address-line1"
              className="w-full bg-black/50 border border-white/25 rounded-md px-4 py-3 text-white focus:outline-none focus:border-yellow transition-colors"
              required
            />
          </div>
          <div>
            <label
              htmlFor="address-line2"
              className="block text-paragraph text-white/80 mb-1"
            >
              Apartment, suite, unit, etc. (optional):
            </label>
            <input
              type="text"
              id="address-line2"
              name="address-line2"
              autoComplete="address-line2"
              className="w-full bg-black/50 border border-white/25 rounded-md px-4 py-3 text-white focus:outline-none focus:border-yellow transition-colors"
            />
          </div>
          <div>
            <label
              htmlFor="address-level2"
              className="block text-paragraph text-white/80 mb-1"
            >
              Town/City: *
            </label>
            <input
              type="text"
              id="address-level2"
              name="address-level2"
              autoComplete="address-level2"
              className="w-full bg-black/50 border border-white/25 rounded-md px-4 py-3 text-white focus:outline-none focus:border-yellow transition-colors"
              required
            />
          </div>
          <div>
            <label
              htmlFor="address-level1"
              className="block text-paragraph text-white/80 mb-1"
            >
              Province: *
            </label>
            <div className="relative">
              <select
                id="address-level1"
                name="address-level1"
                autoComplete="address-level1"
                className="w-full bg-black/50 border border-white/25 rounded-md px-4 py-3 text-white focus:outline-none focus:border-yellow transition-colors appearance-none"
                required
              >
                <option value="">Select Province</option>
                <option value="Eastern Cape">Eastern Cape</option>
                <option value="Free State">Free State</option>
                <option value="Gauteng">Gauteng</option>
                <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                <option value="Limpopo">Limpopo</option>
                <option value="Mpumalanga">Mpumalanga</option>
                <option value="Northern Cape">Northern Cape</option>
                <option value="North West">North West</option>
                <option value="Western Cape">Western Cape</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-white/60"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div>
            <label
              htmlFor="postal-code"
              className="block text-paragraph text-white/80 mb-1"
            >
              Postcode: *
            </label>
            <input
              type="text"
              id="postal-code"
              name="postal-code"
              autoComplete="postal-code"
              className="w-full bg-black/50 border border-white/25 rounded-md px-4 py-3 text-white focus:outline-none focus:border-yellow transition-colors"
              required
            />
          </div>

          <div>
            <label
              htmlFor="notes"
              className="block text-paragraph text-white/80 mb-2"
            >
              Order Notes (Optional):
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              className="w-full bg-black/50 border border-white/25 rounded-md px-4 py-3 text-white focus:outline-none focus:border-yellow transition-colors resize-none"
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-md p-3">
            <p className="text-[14px] text-red-400">{error}</p>
          </div>
        )}

        <div className="grid gap-2">
          <h4>Payment</h4>
          <p className="text-[14px]">
            <span className="font-bold text-[14px]">
              Payment is via EFT only.
            </span>{" "}
            Please use the order number that will be emailed to you as the
            payment reference. Once stock availability has been confirmed, our
            team will contact you to finalise your order.
          </p>
        </div>

        <div className="grid gap-2">
          <h4>Delivery</h4>
          <p className="text-[14px]">
            <span className="font-bold text-[14px]">
              Delivery will take a minimum of 14 days
            </span>{" "}
            once your payment has cleared in our account.
          </p>
        </div>

        <ButtonType
          type="submit"
          cssClasses="w-full"
          disabled={totalItems < 4}
          title={
            totalItems < 4
              ? "You must have a minimum of 4 clones in your cart to submit an order"
              : "Submit Order"
          }
        >
          Submit Order
        </ButtonType>
      </form>
      <p className="text-[14px] text-white/60 mt-4">
        By placing your order, you agree that we’ll use your details only to
        process your purchase — and we’ll never share them without your consent.
      </p>
    </div>
  );
}
