import { Banner1 } from "@/components/banner1";
import { ThemeProvider } from "../components/providers";
import Navbar from "@/components/navbar";
import "./globals.css";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="/theme-init.js" />
      </head>
      <body>
        <ThemeProvider>
          <Navbar />
          <div className="w-full h-screen flex flex-col items-center">
            <div className="flex-1 mt-15 w-full max-w-360">
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
