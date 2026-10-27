// FICHIER DE TEST FICTIF : données et code inventés, ne pas utiliser en production.
export function logRequest(body: { email: string; message: string }) {
  // Journalise le corps complet de la requête, e-mail inclus.
  console.log("request", JSON.stringify(body));
}
