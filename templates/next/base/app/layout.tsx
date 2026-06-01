import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme/theme-provider";

export const metadata: Metadata = {
  title: "__APP_DISPLAY_NAME__",
  description: "__APP_DISPLAY_NAME__ website.",
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <a href="#main-content" className="focus-ring sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-theme focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:font-black focus:text-primary focus:shadow-xl">
          Skip to content
        </a>
        <div id="main-content" tabIndex={-1}>
          <ThemeProvider>{children}</ThemeProvider>
        </div>
      </body>
    </html>
  );
}
