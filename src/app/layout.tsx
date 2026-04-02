import type { Metadata, Viewport } from "next";
import "./globals.css";
import { NavBar } from "@/components/NavBar";
import { Providers } from "@/components/Providers";
import { InstallPrompt } from "@/components/InstallPrompt";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#1c2b4a",
};

export const metadata: Metadata = {
  title: "Stampy — Travel Deeper",
  description:
    "A social platform for travelers, not tourists. Share your journeys, discover hidden gems, and earn your place in the Compass Club.",
  appleWebApp: {
    capable: true,
    title: "Stampy",
    statusBarStyle: "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="apple-touch-icon" href="/icon.svg" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <Providers>
          <NavBar />
          <main className="flex-1">{children}</main>
          <InstallPrompt />
        </Providers>
        <script
          dangerouslySetInnerHTML={{
            __html: `if("serviceWorker"in navigator){window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js")})}`,
          }}
        />
      </body>
    </html>
  );
}
