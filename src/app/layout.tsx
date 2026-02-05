import type { Metadata } from "next";
import "./globals.css";
import { modernAntiqua } from "@/lib/fonts";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/components/auth/auth-provider";
import { ThemeProvider } from "@/providers/theme-provider";

export const metadata: Metadata = {
  title: {
    default: "Données médicales structurées",
    template: "%s | Medical Parser",
  },
  description:
    "Du texte médical brut au JSON structuré. Analyse et extraction automatique des informations clés des rapports médicaux non structurés : patient, diagnostic, dates, prescriptions et observations.",
  applicationName: "Medical Parser",
  keywords: [
    "medical PDF",
    "medical data extraction",
    "healthcare AI",
    "medical report parser",
    "JSON médical",
    "analyse rapports médicaux",
  ],
  authors: [{ name: "Medical Parser" }],
  creator: "Medical Parser",
  metadataBase: new URL("https://your-domain.com"), // change plus tard
  openGraph: {
    title: "Données médicales structurées",
    description:
      "Transformez des rapports médicaux non structurés en données JSON exploitables grâce à l’IA.",
    type: "website",
    locale: "fr_FR",
    siteName: "Medical Parser",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${modernAntiqua.className} antialiased`} suppressHydrationWarning>
        <AuthProvider>
         <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </AuthProvider>
        <Toaster richColors closeButton />
      </body>
    </html>
  );
}
