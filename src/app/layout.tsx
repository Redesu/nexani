import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { AuthProvider } from "@/context/AuthContext";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "NexAni",
  description: "Next.js Anime App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="vsc-initialized">
        <AuthProvider>
          <Header />
          {children}
          <GoogleAnalytics gaId="G-V2HJWNE2ZG" />
        </AuthProvider>
      </body>
    </html>
  );
}
