import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// 1. Pastikan AudioProvider di-import
import { AudioProvider } from './contexts/AudioContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Kamu bisa sesuaikan metadata pernikahan di sini
export const metadata: Metadata = {
  title: "Wedding Invitation",
  description: "The Wedding of ...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Sebaiknya ganti lang="en" menjadi lang="id" untuk undangan Indonesia
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 2. Bungkus {children} dengan <AudioProvider> */}
        <AudioProvider>
          {children}
        </AudioProvider>
      </body>
    </html>
  );
}