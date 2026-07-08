import QueryProvider from "@/providers/QueryProvider";

import { Toaster } from "react-hot-toast";

import Header from "@/components/modules/Header";
import Footer from "@/components/modules/Footer";

import "./globals.css";
import "@/styles/fonts.css";

export const metadata = {
  title: "Torino",
  description: "تورینو | برگزار کننده بهترین تور های داخلی و خارجی",
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
