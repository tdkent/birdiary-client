import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import ApiProvider from "@/context/ApiContext";
import AuthProvider from "@/context/AuthContext";
import LogoProvider from "@/context/LogoContext";
import type { Metadata } from "next";
import { quicksand } from "../lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Birdiary",
  description: "Quickly log your bird sightings and build your birding diary.",
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
                <div className="min-h-[calc(100vh-116px)]">
                  <Header />
                  <main className="mx-auto max-w-[1024px] py-10 pl-4 pr-6 md:pl-8 md:pr-12 lg:pr-48">
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
