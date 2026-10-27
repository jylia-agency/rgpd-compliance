// FICHIER DE TEST FICTIF : données et code inventés, ne pas utiliser en production.
export function logRequest(meta: { userId: string; route: string }) {
  // Identifiants techniques uniquement : aucun e-mail ni contenu de message.
  console.log("request", meta.route, meta.userId);
}
