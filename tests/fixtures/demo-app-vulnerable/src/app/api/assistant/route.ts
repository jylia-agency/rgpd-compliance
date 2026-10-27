// FICHIER DE TEST FICTIF : données et code inventés, ne pas utiliser en production.
import OpenAI from "openai";
import { logRequest } from "@/lib/logger";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const { user, message } = await req.json();
  logRequest({ email: user.email, message });

  // L'objet utilisateur complet est injecté dans le prompt.
  const completion = await client.chat.completions.create({
    model: "demo-model",
    messages: [
      { role: "system", content: `Profil client : ${JSON.stringify(user)}` },
      { role: "user", content: message },
    ],
  });
  return Response.json(completion.choices[0].message);
}
