import {Container, Theme} from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type {Metadata} from "next";
import {SessionProvider} from "next-auth/react";
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "./NavBar";
import QueryProvider from "./QueryClientProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Theme accentColor="iris" appearance="light">
          <QueryProvider>
            {/* <Theme accentColor="iris" appearance="dark"> */}
            <SessionProvider>
              <Container>
                {/* Container will center the app layout */}
                <NavBar />
                <main className="p-5">{children}</main>
              </Container>
              {/* <ThemePanel /> */}
            </SessionProvider>
          </QueryProvider>
        </Theme>
      </body>
    </html>
  );
}
