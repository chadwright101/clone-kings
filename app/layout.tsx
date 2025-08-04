import type { Metadata } from "next";
import { Spectral } from "next/font/google";
import "@/_styles/globals.css";
import Header from "@/_components/navigation/header/header";
import Footer from "@/_components/navigation/footer/footer";

const spectralSerif = Spectral({
  variable: "--font-spectral",
  subsets: ["latin"],
  weight: ["200", "400", "600"],
});

export const metadata: Metadata = {
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spectralSerif.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
