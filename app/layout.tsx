import type { Metadata } from "next";
import { Spectral } from "next/font/google";
import "@/_styles/globals.css";

const spectralSerif = Spectral({
  variable: "--font-spectral",
  subsets: ["latin"],
  weight: ["200", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hensleyinteriors.co.za/"),
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
        {children}
      </body>
    </html>
  );
}
