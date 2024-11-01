import type { Metadata } from "next";
import "./globals.css";
import { open_sans } from "./fonts";
import { ThemeProvider } from "../components/theme/theme-provider";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";

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
      <body className={`${open_sans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-[calc(100vh-80px)]">
            <Header />
            <main>{children}</main>
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
