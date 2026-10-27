// FICHIER DE TEST FICTIF : données et code inventés, ne pas utiliser en production.
const MINIMUM_AGE = 15; // seuil national du consentement numérique (France)

export default function SignupPage() {
  return (
    <form method="post" action="/api/signup">
      <input name="email" type="email" placeholder="jeanne@example.com" required />
      <input name="password" type="password" required />
      <input name="birth_year" type="number" required data-min-age={MINIMUM_AGE} />
      <label>
        {/* Case non cochée par défaut. */}
        <input name="newsletter" type="checkbox" /> Recevoir la lettre d'information
      </label>
      <button type="submit">Créer mon compte</button>
    </form>
  );
}
