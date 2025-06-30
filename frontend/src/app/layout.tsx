"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/utils/authContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Basic Meta Tags */}
        <title>Eventify </title>
        <meta name="description" content="The easiest way to discover, create, and manage events. Join communities, grow your network, and never miss out on what matters most with Eventify!" />
        <meta name="keywords" content="events, event management, event discovery, social events, networking, community, event planning, event creation" />
        <meta name="author" content="Eventify" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://eventify-ochre.vercel.app" />
        <meta property="og:title" content="Eventify - Discover, Create & Manage Events" />
        <meta property="og:description" content="The easiest way to discover, create, and manage events. Join communities, grow your network, and never miss out on what matters most!" />
        <meta property="og:image" content="/favicon.svg" />
        <meta property="og:site_name" content="Eventify" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://eventify-ochre.vercel.app" />
        <meta property="twitter:title" content="Eventify - Discover, Create & Manage Events" />
        <meta property="twitter:description" content="The easiest way to discover, create, and manage events. Join communities, grow your network, and never miss out on what matters most!" />
        <meta property="twitter:image" content="/favicon.svg" />
        
        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#1e40af" />
        <meta name="msapplication-TileColor" content="#1e40af" />
        <meta name="application-name" content="Eventify" />
        <meta name="apple-mobile-web-app-title" content="Eventify" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://eventify.com" />
        
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
