// FICHIER DE TEST FICTIF : données et code inventés, ne pas utiliser en production.
import { Analytics } from "@vercel/analytics/react";
import { ConsentGate } from "@/components/consent-gate";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        {children}
        {/* Mesure d'audience chargée uniquement après consentement. */}
        <ConsentGate>
          <Analytics />
        </ConsentGate>
      </body>
    </html>
  );
}
