import { Banner1 } from "@/components/banner1";
import { ThemeProvider } from "../components/providers";
import "./globals.css";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
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
