import QueryProvider from "@/providers/QueryProvider";

import { Toaster } from "react-hot-toast";

import Header from "@/components/modules/Header";
import Footer from "@/components/modules/Footer";

import "./globals.css";
import "@/styles/fonts.css";

export const metadata = {
  metadataBase: new URL("https://your-domain.com"),
  title: {
    default: "Torino",
    template: "%s | Torino",
  },
  description: "تورینو | برگزار کننده بهترین تور های داخلی و خارجی",
  keywords: ["Torino", "تور", "رزرو تور", "خرید تور", "سفر", "گردشگری"],
  applicationName: "Torino",
  authors: [{ name: "Torino Team" }],
  creator: "Torino",
  publisher: "Torino",
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: "https://your-domain.com",
    siteName: "Torino",
    title: "Torino",
    description: "رزرو و خرید تورهای گردشگری با Torino",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <QueryProvider>
          <Header />
          {children}
          <Footer />
          <Toaster position="top-left" reverseOrder={false} />
        </QueryProvider>
      </body>
    </html>
  );
}
