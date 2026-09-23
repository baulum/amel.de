import "./globals.css";
import { Toaster } from "sonner";
import SmoothScroll from "@/components/SmoothScroll";
import { SITE_URL, COMPANY } from "@/lib/site";

const DESCRIPTION =
  "Umzugsunternehmen in München seit über 20 Jahren: Privat- & Firmenumzüge, Entrümpelung und Möbelmontage. Festpreis nach kostenloser Besichtigung.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Amels Umzüge München – Umzug, Entrümpelung & Montage",
    template: "%s – Amels Umzüge München",
  },
  description: DESCRIPTION,
  robots: { index: true, follow: true, "max-image-preview": "large" },
  icons: { icon: { url: "/favicon.svg", type: "image/svg+xml" } },
  manifest: "/site.webmanifest",
  verification: { google: "CjqnuDSNVMZayP7mpjLWS39c-P_Uepjj6xsmlfL6ZYM" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: COMPANY.name,
    title: "Amels Umzüge München – Umzug, Entrümpelung & Montage",
    description:
      "Umzugsunternehmen in München seit über 20 Jahren. Festpreis nach kostenloser Besichtigung. Jetzt unverbindlich anfragen: 089 / 87579385.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Das Umzugsteam von Amel's Team GmbH im beladenen Umzugswagen",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport = { themeColor: "#111111" };

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <head>
        <link
          rel="preload"
          href="/fonts/cabinet-grotesk-800.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
      </head>
      <body>
        <div className="grain">
          <SmoothScroll>{children}</SmoothScroll>
        </div>
        <Toaster position="bottom-center" theme="light" />
      </body>
    </html>
  );
}
