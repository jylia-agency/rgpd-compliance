// FICHIER DE TEST FICTIF : données et code inventés, ne pas utiliser en production.
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// La clé à privilèges élevés est embarquée dans le code client.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
);

export function AdminPanel() {
  const [users, setUsers] = useState<{ id: string }[]>([]);

  useEffect(() => {
    void supabase
      .from("users")
      .select("*")
      .then(({ data }) => setUsers(data ?? []));
  }, []);

  return <ul>{users.map((user) => <li key={user.id}>{user.id}</li>)}</ul>;
}
