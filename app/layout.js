"use client";
import { Inter } from "next/font/google";
import "./global.css";
import Link from "next/link";
import store from "./Redux/app/store";
import { Provider } from "react-redux";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative">
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
