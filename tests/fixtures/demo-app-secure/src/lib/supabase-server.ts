// FICHIER DE TEST FICTIF : données et code inventés, ne pas utiliser en production.
import { createClient } from "@supabase/supabase-js";

// ATTENTION : ce module ne doit jamais être importé côté client.
// La clé service_role est lue uniquement côté serveur (variable sans préfixe NEXT_PUBLIC_).
export function createServerClient(req: Request) {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { global: { headers: { "x-request-id": req.headers.get("x-request-id") ?? "" } } }
  );
}
