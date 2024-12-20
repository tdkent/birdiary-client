import type { Metadata } from "next";
import "./globals.css";
import { quicksand } from "../lib/fonts";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme/theme-provider";
import AuthProvider from "@/context/providers/AuthProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Birdiary",
  description: "A logging and diary application for bird watchers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${quicksand.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <div className="min-h-[calc(100vh-80px)]">
              <Header />
              <main className="px-4 py-16 max-w-[1024px] mx-auto">
                {children}
              </main>
              <Toaster />
            </div>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
