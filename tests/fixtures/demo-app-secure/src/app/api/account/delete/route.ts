// FICHIER DE TEST FICTIF : données et code inventés, ne pas utiliser en production.
import { createServerClient } from "@/lib/supabase-server";
import { getSessionUser } from "@/lib/auth";

// Suppression du compte connecté ; la cascade supprime profil et commandes.
export async function POST(req: Request) {
  const user = await getSessionUser(req);
  if (!user) return new Response("Unauthorized", { status: 401 });
  await createServerClient(req).auth.admin.deleteUser(user.id);
  return new Response(null, { status: 204 });
}
