// FICHIER DE TEST FICTIF : données et code inventés, ne pas utiliser en production.
import { supabase } from "@/lib/supabase";

// Aucune authentification ni vérification de propriété : l'identifiant de l'URL suffit.
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const { data } = await supabase.from("users").select("*").eq("id", params.id).single();
  return Response.json(data);
}
