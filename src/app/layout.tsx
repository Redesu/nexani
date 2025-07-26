import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header"
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "NextAni",
  description: "Next.js Anime App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="vsc-initialized vsc-domain-localhost">

        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
