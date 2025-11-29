import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ESP32 Neon Control",
  description: "Premium IoT Dashboard for ESP32",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
