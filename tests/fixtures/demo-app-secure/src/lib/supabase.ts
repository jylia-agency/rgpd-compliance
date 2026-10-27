// FICHIER DE TEST FICTIF : données et code inventés, ne pas utiliser en production.
import { createClient } from "@supabase/supabase-js";

// Client navigateur : clé publique uniquement.
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
