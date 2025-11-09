import { Banner1 } from "@/components/banner1";
import { ThemeProvider } from "../../components/providers";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ThemeProvider>
        <div className="w-full h-screen flex flex-col items-center">
          <Banner1 title={"Version 2.0 is now available!"} description={"Read the full release notes"} linkText={"here"} linkUrl={""} />
          <div className="flex-1 w-full max-w-360">
            {children}
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}
