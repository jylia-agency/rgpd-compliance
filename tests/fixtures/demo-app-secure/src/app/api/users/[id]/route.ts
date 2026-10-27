// FICHIER DE TEST FICTIF : données et code inventés, ne pas utiliser en production.
import { createServerClient } from "@/lib/supabase-server";
import { getSessionUser } from "@/lib/auth";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const user = await getSessionUser(req);
  if (!user || user.id !== params.id) return new Response("Forbidden", { status: 403 });
  const { data } = await createServerClient(req)
    .from("profiles")
    .select("id, display_name")
    .eq("id", params.id)
    .single();
  return Response.json(data);
}
