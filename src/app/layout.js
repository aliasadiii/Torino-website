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
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
