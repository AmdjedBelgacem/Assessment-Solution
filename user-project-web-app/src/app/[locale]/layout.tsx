import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Waves } from "../components/svg-components/Waves";
import ThemeToggle from "../components/ThemeToggle";
import LanguageToggle from "../components/LanguageToggle";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: String };
}): Promise<Metadata> {
  return {
    title: {
      template: "%s | User Management app",
      default: "User Management app",
    },
    description: "This is a user management app with Crud operations to manage users.",
    verification: {
      google: "",
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        follow: true,
        index: true,
      },
    },
    alternates: {
      canonical: "/",
      languages: {
        en: [
          {
            url: "/",
          },
          {
            url: "/en",
          },
        ],
        tr: "/tr",
        fr: "/fr",
      },
    },
    keywords: [
      "User Management app",
      "User Management Web app",
      "User Management",
      "User Management Crud",
      "Crud User Management app",
      "Amdjed Belgacem User Management app",
      "Amdjed Belgacem User Management Web app",
      "Amdjed Belgacem",
      "Software Developer",
      "Web Developer",
      "Full Stack Developer",
      "Frontend Developer",
      "Backend Developer",
    ],
    openGraph: {
      type: "website",
      url: locale === "en" ? "/" : "/tr",
      title: "Amdjed Belgacem User Management app",
      description: "This is User management app made by Amdjed Belgacem",
    },
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}) {
  return (
    <html lang={params.locale}>
      <body className={`${inter.className} bg-gray-200 dark:bg-gray-800`}>
        <ChakraProvider>
          <Waves />
          <div className="flex justify-between">
            <ThemeToggle />
            <LanguageToggle />
          </div>
          <div className="flex min-h-screen flex-col items-center justify-center py-24 px-1">
            {children}
          </div>
        </ChakraProvider>
      </body>
    </html>
  );
}
/* metadataBase: new URL(""), */