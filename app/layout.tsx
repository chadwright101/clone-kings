"use client";

import { Spectral } from "next/font/google";
import "@/_styles/globals.css";
import Header from "@/_components/navigation/header/header";
import Footer from "@/_components/navigation/footer/footer";
import { CartProvider } from "@/_contexts/cart-context";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const spectralSerif = Spectral({
  variable: "--font-spectral",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

/* export const metadata: Metadata = {
  metadataBase: new URL("https://www.clonekings.co.za/"),
  title: "Clone Kings",
  description: "",
  keywords: "",
  openGraph: {
    description: "",
    type: "website",
    locale: "en_ZA",
    siteName: "Clone Kings",
    images: [
      {
        url: "/open-graph-image.webp",
      },
    ],
  },
}; */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spectralSerif.variable} antialiased`}>
        <GoogleReCaptchaProvider
          reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
        >
          <CartProvider>
            <Header />
            {children}
            <Footer />
          </CartProvider>
        </GoogleReCaptchaProvider>
      </body>
    </html>
  );
}
