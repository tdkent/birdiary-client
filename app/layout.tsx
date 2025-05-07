import type { Metadata } from "next";
import "./globals.css";
import { quicksand } from "../lib/fonts";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import AuthProvider from "@/context/AuthContext";
import ApiProvider from "@/context/ApiContext";
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
            <ApiProvider>
              <div className="min-h-[calc(100vh-80px)]">
                <Header />
                <main className="mx-auto max-w-[1024px] px-5 py-10">
                  {children}
                </main>
                <Toaster />
              </div>
              <Footer />
            </ApiProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
