// FICHIER DE TEST FICTIF : données et code inventés, ne pas utiliser en production.
export default function SignupPage() {
  return (
    <form method="post" action="/api/signup">
      <input name="email" type="email" placeholder="jeanne@example.com" required />
      <input name="password" type="password" required />
      <label>
        {/* Case pré-cochée pour la lettre d'information. */}
        <input name="newsletter" type="checkbox" defaultChecked /> Recevoir la lettre d'information
      </label>
      <button type="submit">Créer mon compte</button>
    </form>
  );
}
