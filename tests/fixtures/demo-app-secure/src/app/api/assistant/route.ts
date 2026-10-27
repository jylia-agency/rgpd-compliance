// FICHIER DE TEST FICTIF : données et code inventés, ne pas utiliser en production.
import OpenAI from "openai";
import { logRequest } from "@/lib/logger";
import { getSessionUser } from "@/lib/auth";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const user = await getSessionUser(req);
  if (!user) return new Response("Unauthorized", { status: 401 });
  const { message } = await req.json();
  logRequest({ userId: user.id, route: "assistant" });

  // Seul le texte nécessaire est envoyé : ni e-mail ni profil.
  const completion = await client.chat.completions.create({
    model: "demo-model",
    messages: [{ role: "user", content: message }],
  });
  return Response.json(completion.choices[0].message);
}
