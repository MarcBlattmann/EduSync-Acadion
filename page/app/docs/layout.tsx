import { ThemeProvider } from "@/components/providers";

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <div className="w-full min-h-screen">
        {children}
      </div>
    </ThemeProvider>
  );
}
