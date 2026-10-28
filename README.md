# Nur (نُور) — Application Web Mobile-First (PWA) + Moteur Théologique IA Vercel

Compagnon spirituel quotidien « sans flemme » et assistant islamique sourcé (Coran, Hadiths authentifiés, comparaison des 4 écoles sunnites avec verrouillage anti-hallucination *Citation-Locked*).

## Déployer sur Vercel en 3 minutes aujourd'hui

### Méthode A — Via Vercel CLI (la plus rapide, même sans créer de repo GitHub)
1. Décompresse l'archive `nur-vercel-ready.zip` sur ton ordinateur et ouvre un terminal dans le dossier :
   ```bash
   npx vercel
   ```
2. Connecte-toi à ton compte Vercel gratuit dans le navigateur qui s'ouvre et valide les choix par défaut (`Enter` à chaque question).
3. Ajoute ta clé API IA (une seule suffit — ex. clé **Gemini gratuite** créée en 20s sur [aistudio.google.com/apikey](https://aistudio.google.com/apikey)) :
   ```bash
   npx vercel env add GEMINI_API_KEY
   npx vercel --prod
   ```
4. Ton lien public `https://nur-...vercel.app` est en ligne et installable sur iPhone/Android !

### Méthode B — Via GitHub + Interface Web Vercel (sans ligne de commande)
1. Crée un dépôt privé sur [github.com/new](https://github.com/new) et glisse-y le contenu de ce dossier.
2. Va sur [vercel.com/new](https://vercel.com/new), importe ton dépôt GitHub.
3. Dans **Environment Variables**, ajoute **une seule** de ces variables :
   - `GEMINI_API_KEY` *(100 % gratuit sur Google AI Studio)*, ou
   - `OPENAI_API_KEY`, ou
   - `ANTHROPIC_API_KEY`, ou
   - `GROQ_API_KEY` *(gratuit sur console.groq.com)*.
4. Clique sur **Deploy** : c'est en ligne !
