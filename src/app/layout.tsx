import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Fraunces, DM_Sans } from "next/font/google";



const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["300", "400", "600", "700", "900"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600"],
});



export const metadata: Metadata = {
  title: "FoodHub",
  description:
    "Order from the best restaurants in Chattogram. Browse menus, place orders, and track delivery in real time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fraunces.variable} ${dmSans.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light" // delete if use dark theme
          enableSystem={false} // delete if use dark theme
          forcedTheme="light"  // delete if use dark theme
          /*
          === uncomment these 3 props if use dark theme === 
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          */
        >
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
