import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Admin · Segura",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ca">
      <body className="bg-bone text-ink antialiased font-body min-h-screen">
        {children}
      </body>
    </html>
  );
}
