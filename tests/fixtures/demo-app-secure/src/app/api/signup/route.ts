// FICHIER DE TEST FICTIF : données et code inventés, ne pas utiliser en production.
import { createServerClient } from "@/lib/supabase-server";

const MINIMUM_AGE = 15; // seuil national du consentement numérique (France)

export async function POST(req: Request) {
  const form = await req.formData();
  const email = String(form.get("email") ?? "");
  const birthYear = Number(form.get("birth_year"));
  const newsletter = form.get("newsletter") === "on";

  // Âge vérifié côté serveur, calculé depuis birth_year.
  const age = new Date().getFullYear() - birthYear;
  if (!Number.isInteger(birthYear) || age < 0) {
    return Response.json({ error: "Année de naissance invalide" }, { status: 400 });
  }
  if (age < MINIMUM_AGE) {
    return Response.json(
      { status: "parental_consent_required", message: "Le consentement d'un titulaire de l'autorité parentale est requis." },
      { status: 202 }
    );
  }

  const supabase = createServerClient(req);
  // Choix newsletter enregistré uniquement si la case est cochée.
  const { error } = await supabase.from("users").insert({
    email,
    birth_year: birthYear,
    ...(newsletter ? { newsletter_opt_in: true } : {}),
  });
  if (error) return Response.json({ error: "Erreur" }, { status: 500 });
  return Response.json({ status: "created" }, { status: 201 });
}
