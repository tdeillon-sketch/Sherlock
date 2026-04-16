/* ═══════════════════════════════════════════
   SHERLOCK — Serveur Express
   Sert les fichiers statiques + proxy Claude API

   Démarrage : npm start
   Prérequis  : ANTHROPIC_API_KEY dans le fichier .env
═══════════════════════════════════════════ */

require('dotenv').config();
const express   = require('express');
const Anthropic  = require('@anthropic-ai/sdk');

const app    = express();
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

/* ── Middleware ── */
app.use(express.json());
app.use(express.static(__dirname)); /* sert index.html, style.css, app.js, data.js */

/* ── Prompt système : contexte du livre ── */
const SYSTEM = `Tu es l'assistant IA de l'application Sherlock, compagnon numérique du livre
"On a tous besoin de quelqu'un d'autre" de Thomas Deillon.

Ce livre traite de parentalité consciente à travers le prisme de l'Enneagramme (les 9 profils
de personnalité). Il aide les parents à mieux se connaître, à comprendre leur enfant et à
adapter leur accompagnement au profil de chacun.

Ton rôle :
- Répondre aux questions de parents avec bienveillance, précision et chaleur humaine
- T'appuyer sur les thèmes du livre : les 9 types Enneagramme, la relation parent-enfant,
  les moments de crise, les besoins émotionnels des enfants selon leur profil
- Proposer des pistes concrètes et actionnables
- Rester humble : tu n'es pas thérapeute, tu es un compagnon de réflexion

Langue : toujours répondre en français.
Format : réponses claires, structurées en 2-4 paragraphes. Pas de bullet points sauf si pertinent.`;

/* ── Endpoint IA ── */
app.post('/api/ask', async (req, res) => {
    const { question } = req.body;

    if (!question || typeof question !== 'string' || !question.trim()) {
        return res.status(400).json({ error: 'Question manquante.' });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
        return res.status(500).json({
            error: 'Clé API manquante. Créez un fichier .env avec ANTHROPIC_API_KEY=votre_clé'
        });
    }

    try {
        const message = await client.messages.create({
            model:      'claude-opus-4-5',
            max_tokens: 1024,
            system:     SYSTEM,
            messages:   [{ role: 'user', content: question.trim() }]
        });

        const answer = message.content[0]?.text || '';
        res.json({ answer });

    } catch (err) {
        console.error('[Claude API Error]', err.message);
        res.status(500).json({ error: 'Erreur lors de la communication avec Claude.' });
    }
});

/* ── Démarrage ── */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`\n🔍 Sherlock server → http://localhost:${PORT}`);
    console.log(`   API key : ${process.env.ANTHROPIC_API_KEY ? '✅ configurée' : '❌ MANQUANTE (créez .env)'}\n`);
});
