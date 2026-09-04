import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GoDucky | The open source AI coding agent",
  description:
    "Free models included or connect any model from any provider, including Claude, GPT, Gemini and more.",
  icons: {
    icon: "/logo.jpeg",
  },
  openGraph: {
    title: "GoDucky | The open source AI coding agent",
    description:
      "Free models included or connect any model from any provider, including Claude, GPT, Gemini and more.",
    url: "https://goducky.dev",
    siteName: "GoDucky",
    images: [
      {
        url: "/logo.jpeg",
        width: 800,
        height: 600,
        alt: "GoDucky",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GoDucky | The open source AI coding agent",
    description:
      "Free models included or connect any model from any provider, including Claude, GPT, Gemini and more.",
    images: ["/logo.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
