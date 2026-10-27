// FICHIER DE TEST FICTIF : données et code inventés, ne pas utiliser en production.
import { createServerClient } from "@/lib/supabase-server";
import { getSessionUser } from "@/lib/auth";

// Export des données du compte connecté (format JSON structuré).
export async function GET(req: Request) {
  const user = await getSessionUser(req);
  if (!user) return new Response("Unauthorized", { status: 401 });
  const db = createServerClient(req);
  const profile = await db.from("profiles").select("*").eq("id", user.id);
  const orders = await db.from("orders").select("*").eq("user_id", user.id);
  return Response.json({ profile: profile.data, orders: orders.data });
}
