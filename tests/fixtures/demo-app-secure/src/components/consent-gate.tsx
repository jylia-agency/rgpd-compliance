"use client";
// FICHIER DE TEST FICTIF : données et code inventés, ne pas utiliser en production.
import { useState, type ReactNode } from "react";

const KEY = "consent_audience_measurement";
// Version courante du texte de consentement : un changement de texte invalide les choix précédents.
const CONSENT_VERSION = "2026-10";

type Choice = { value: "accepted" | "refused"; date: string; version: string };

function readChoice(): Choice | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Choice;
    // Choix valide uniquement si la version correspond à la version courante.
    if (parsed.version !== CONSENT_VERSION) return null;
    if (parsed.value !== "accepted" && parsed.value !== "refused") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function ConsentGate({ children }: { children: ReactNode }) {
  const [choice, setChoice] = useState<Choice | null>(readChoice);

  const decide = (value: "accepted" | "refused") => {
    // La preuve du consentement peut aussi être journalisée côté serveur.
    const next: Choice = { value, date: new Date().toISOString(), version: CONSENT_VERSION };
    window.localStorage.setItem(KEY, JSON.stringify(next));
    setChoice(next);
  };

  if (choice?.value === "accepted") return <>{children}</>;
  if (choice?.value === "refused") return null;

  return (
    <div role="dialog" aria-label="Mesure d'audience">
      <p>Autorisez-vous la mesure d'audience ?</p>
      {/* Refuser est aussi simple qu'accepter : même niveau, même nombre de clics. */}
      <button onClick={() => decide("refused")}>Refuser</button>
      <button onClick={() => decide("accepted")}>Accepter</button>
    </div>
  );
}
