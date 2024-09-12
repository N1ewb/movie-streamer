import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./(components)/Header/Header";
import Footer from "./(components)/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crispy Roll",
  description: "Your new option for a movie and tv sites.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
