// FICHIER DE TEST FICTIF : données et code inventés, ne pas utiliser en production.
import { createClient } from "@supabase/supabase-js";

// Lit le jeton de session dans un cookie HttpOnly, le vérifie via Supabase Auth.
export async function getSessionUser(req: Request) {
  const cookies = req.headers.get("cookie") ?? "";
  const token = cookies
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith("session_token="))
    ?.slice("session_token=".length);
  if (!token) return null;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) return null;
  return data.user;
}
// Le cookie est posé côté serveur avec : Set-Cookie: session_token=...; HttpOnly; Secure; SameSite=Lax; Path=/
