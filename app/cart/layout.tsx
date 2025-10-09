import { Metadata } from "next";
import { createPageMetadata } from "@/_lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Your Shopping Cart | Clone Kings",
  description: "View your shopping cart and complete your order for premium cannabis clones. Secure checkout with discreet delivery across South Africa.",
  keywords: [
    "shopping cart",
    "cannabis checkout",
    "buy clones online",
    "clone kings cart",
    "order cannabis clones",
    "secure checkout",
    "discreet delivery",
  ],
  canonical: "/cart",
});

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}