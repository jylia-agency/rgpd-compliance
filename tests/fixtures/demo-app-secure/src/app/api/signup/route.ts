// FICHIER DE TEST FICTIF : données et code inventés, ne pas utiliser en production.
import { createServerClient } from "@/lib/supabase-server";

const MINIMUM_AGE = 15; // seuil national du consentement numérique (France)

export async function POST(req: Request) {
  const form = await req.formData();
  const email = String(form.get("email") ?? "");
  const password = String(form.get("password") ?? "");
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

  // Compte créé via Supabase Auth : e-mail et mot de passe ne sont jamais
  // stockés dans une table applicative.
  const { data, error: authError } = await supabase.auth.signUp({ email, password });
  if (authError || !data.user) return Response.json({ error: "Erreur" }, { status: 500 });

  // Profil : uniquement l'identifiant, l'année de naissance et le choix newsletter.
  const { error } = await supabase.from("profiles").insert({
    id: data.user.id,
    birth_year: birthYear,
    newsletter_opt_in: newsletter,
  });
  if (error) return Response.json({ error: "Erreur" }, { status: 500 });
  return Response.json({ status: "created" }, { status: 201 });
}
