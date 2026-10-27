"use client";
// FICHIER DE TEST FICTIF : données et code inventés, ne pas utiliser en production.
import { useState, type ReactNode } from "react";

const KEY = "consent_audience_measurement";

export function ConsentGate({ children }: { children: ReactNode }) {
  const [choice, setChoice] = useState<string | null>(
    typeof window === "undefined" ? null : window.localStorage.getItem(KEY)
  );

  const decide = (value: "accepted" | "refused") => {
    window.localStorage.setItem(KEY, value);
    setChoice(value);
  };

  if (choice === "accepted") return <>{children}</>;
  if (choice === "refused") return null;

  return (
    <div role="dialog" aria-label="Mesure d'audience">
      <p>Autorisez-vous la mesure d'audience ?</p>
      {/* Refuser est aussi simple qu'accepter : même niveau, même nombre de clics. */}
      <button onClick={() => decide("refused")}>Refuser</button>
      <button onClick={() => decide("accepted")}>Accepter</button>
    </div>
  );
}
