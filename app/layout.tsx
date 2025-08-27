import type { Metadata } from "next";
import "./globals.css";
import { quicksand } from "../lib/fonts";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import AuthProvider from "@/context/AuthContext";
import ApiProvider from "@/context/ApiContext";
import LogoProvider from "@/context/LogoContext";
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
              <LogoProvider>
                <div className="min-h-[calc(100vh-80px)]">
                  <Header />
                  <main className="mx-auto max-w-[1024px] py-10 pl-4 pr-6 md:pl-8 md:pr-12">
                    {children}
                  </main>
                  <Toaster />
                </div>
                <Footer />
              </LogoProvider>
            </ApiProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
