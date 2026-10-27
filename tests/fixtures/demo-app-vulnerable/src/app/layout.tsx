// FICHIER DE TEST FICTIF : données et code inventés, ne pas utiliser en production.
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        {children}
        {/* Mesure d'audience chargée sans attendre le consentement. */}
        <Analytics />
      </body>
    </html>
  );
}
