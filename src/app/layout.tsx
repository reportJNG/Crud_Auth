import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Providers } from "./Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Simple system",
  description: "System Designed To Database",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="relative">
        <Providers>{children}</Providers>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
