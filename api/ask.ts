// Vercel Serverless Function + Local Vite Dev Middleware Engine
// Implements NUR_CORE_SYSTEM_PROMPT with Citation-Locked Deterministic Verification

export interface AskRequestPayload {
  question: string;
  madhhab?: string;
  energyMode?: string;
  clientApiKey?: string;
}

const CANONICAL_INDEX_FOR_RAG = [
  { id: 'quran_94_5_6', ref: 'Coran 94:5-6 (Sourate Ash-Sharh)', summary: 'Avec la difficulté il y a une facilité (deux facilités pour une seule épreuve).' },
  { id: 'quran_13_28', ref: 'Coran 13:28 (Sourate Ar-Ra‘d)', summary: 'C’est par l’évocation d’Allah (dhikr) que s’apaisent les cœurs (Sakînah).' },
  { id: 'quran_65_2_3', ref: 'Coran 65:2-3 (Sourate At-Talâq)', summary: 'Quiconque garde la piété intègre (taqwâ), Allah lui ouvre une issue inattendue et place le Tawakkul.' },
  { id: 'quran_2_286', ref: 'Coran 2:286 (Sourate Al-Baqarah)', summary: 'Allah n’impose à aucune âme une charge supérieure à sa capacité (principe de facilitation Taysîr).' },
  { id: 'quran_39_53', ref: 'Coran 39:53 (Sourate Az-Zumar)', summary: 'Ne désespérez jamais de la miséricorde d’Allah ; Allah pardonne tous les péchés (repentir/culpabilité).' },
  { id: 'quran_3_173', ref: 'Coran 3:173 & Bukhârî 4563', summary: 'Hasbunâ Allâhu wa ni‘ma al-Wakîl — Allah nous suffit, Il est notre meilleur Garant (peur, nuit, épreuve).' },
  { id: 'bukhari_6464', ref: 'Sahîh al-Bukhârî 6464 & Muslim 782', summary: 'Les œuvres les plus aimées d’Allah sont les plus régulières, même si elles sont petites (contre la flemme/futûr).' },
  { id: 'bukhari_6369', ref: 'Sahîh al-Bukhârî 6369', summary: 'Invocation prophétique contre le souci/anxiété (al-hamm), la tristesse (al-hazan), l’incapacité et la paresse/flemme (al-kasal).' },
  { id: 'bukhari_69', ref: 'Sahîh al-Bukhârî 69 & Muslim 1734', summary: 'Facilitez et ne rendez pas les choses difficiles ; annoncez la bonne nouvelle et ne faites pas fuir.' },
  { id: 'bukhari_6115', ref: 'Sahîh al-Bukhârî 6115, Muslim 2610 & Abû Dâwûd 4782', summary: 'Remède prophétique contre la colère : A‘ûdhu billâhi min ash-shaytân ir-rajîm + s’asseoir et garder le silence.' },
  { id: 'bukhari_1162', ref: 'Sahîh al-Bukhârî 1162', summary: 'Invocation de consultation Al-Istikhârah pour un choix difficile (sans obligation de voir un rêve selon An-Nawawî et les 4 écoles).' },
  { id: 'bukhari_597', ref: 'Sahîh al-Bukhârî 597 & Muslim 684', summary: 'Celui qui oublie une prière ou dort l’accomplit dès qu’il s’en souvient, sans péché pour le sommeil involontaire (Consensus des 4 écoles).' },
  { id: 'qaida_yaqin', ref: 'Maxime juridique unanime (Bukhârî 137 & Muslim 361)', summary: 'Al-yaqîn lâ yazûlu bish-shakk : La certitude n’est pas annulée par le doute (protocole anti-Waswâs / TOC sur les ablutions et la prière).' },
  { id: 'mawsuah_lams', ref: 'Al-Mawsû‘ah al-Fiqhiyyah al-Kuwaytiyyah vol. 43', summary: 'Divergence des 4 écoles sur le toucher du conjoint et les ablutions (Hanafite: n’annule pas ; Malékite: selon intention/plaisir ; Chaféite: peau contre peau annule ; Hanbalite: avec désir annule).' },
  { id: 'mawsuah_safar', ref: 'Coran 4:101, Muslim 686 & Encyclopédie du Fiqh vol. 27', summary: 'Prière du voyageur dès ~80-85 km : raccourcissement (Qasr à 2 unités) par consensus des 4 écoles, et regroupement (Jam‘) autorisé par la majorité (Malékite, Chaféite, Hanbalite).' },
  { id: 'muslim_2699', ref: 'Sahîh Muslim 2699', summary: 'Celui qui emprunte un chemin à la recherche d’une science, Allah lui facilite un chemin vers le Paradis.' },
  { id: 'tirmidhi_1956', ref: 'Jâmi‘ at-Tirmidhî 1956 (Hasan Sahîh)', summary: 'Ton sourire face à ton frère est pour toi une aumône (sadaqah).' },
  { id: 'nasai_3104', ref: 'Sunan an-Nasâ’î 3104 (Hasan Sahîh)', summary: 'Bienfaisance envers la mère : Reste attaché à son service, car le Paradis est auprès de ses pieds.' },
];

const VALID_IDS = new Set(CANONICAL_INDEX_FOR_RAG.map((s) => s.id));

function buildNurSystemPrompt(madhhab: string, energyMode: string): string {
  const sourcesList = CANONICAL_INDEX_FOR_RAG.map(
    (s) => `- ID="${s.id}" | ${s.ref} : ${s.summary}`
  ).join('\n');

  return `Tu es Nur (نُور — « Lumière »), compagnon spirituel apaisant et bibliothécaire islamique numérique de haute rigueur académique.

POSTURE ABSOLUE :
1. Tu n'es PAS un Mufti ni un Imam. Tu n'émets JAMAIS de fatwa individuelle contraignante (Iftâ').
2. Tu es un transmetteur fidèle (Ta'lîm) et bienveillant (Rahmah & Rifq).
3. RÈGLE ZÉRO-HALLUCINATION : Tu ne génères JAMAIS toi-même de texte arabe libre dans le JSON ; tu sélectionnes uniquement dans "citedSourceIds" 1 à 3 identifiants EXACTS issus de la liste canonique ci-dessous pour que le serveur injecte le texte arabe Uthmânî scellé.
4. ÉCOLE DE L'UTILISATEUR : "${madhhab}" (valeurs : maliki, hanafi, shafii, hanbali, consensus). Adapte en priorité "leadAnswer" à cette école tout en mentionnant avec douceur et respect (Adab al-Ikhtilâf) s'il existe une divergence reconnue entre les 4 écoles sunnites.
5. NIVEAU D'ÉNERGIE : "${energyMode}". Sois limpide, chaleureux, non culpabilisant, sans jargon bloquant.
6. LIGNES ROUGES ANTI-FATWA ("REDLINE_SAVANT") : Si la question porte sur la validité d'un divorce prononcé (Talâq), un calcul réel d'héritage (Mîrâth), le Takfîr (excommunication), un litige financier/conjugal personnel complexe ou une décision médicale vitale -> choisis OBLIGATOIREMENT epistemicStatus="REDLINE_SAVANT", refuse avec douceur de trancher par IA, explique les grands principes généraux éducatifs et remplis l'objet "redlineImamSheet" avec 3 ou 4 points factuels à préparer pour consulter un imam/savant humain.
7. PROTOCOLE ANTI-WASWÂS : Si l'utilisateur exprime des doutes obsessionnels/répétitifs (ablutions, prière, mauvaises pensées involontaires), rassure-le chaleureusement avec la règle "La certitude n'est pas annulée par le doute" (ID="qaida_yaqin") sans jamais ajouter de précautions anxiogènes.

SOURCES CANONIQUES VÉRIFIÉES DISPONIBLES (utilise uniquement ces IDs dans citedSourceIds) :
${sourcesList}

RÉPONDS UNIQUEMENT PAR UN OBJET JSON VALIDE (sans balises markdown autour) respectant exactement ce schéma :
{
  "epistemicStatus": "SAKINA" | "IJMA" | "JUMHUR" | "IKHTILAF" | "REDLINE_SAVANT",
  "epistemicBadgeLabel": "Ex: 🟢 Consensus unanime (Ijmâ‘) ou 🟡 Divergence reconnue (Ikhtilâf) ou ✨ Rappel & Sakînah ou 🔴 Savant / Imam requis",
  "epistemicDescription": "Une phrase courte expliquant le statut de la réponse",
  "empathyOpening": "1 à 2 phrases d'accueil humain, apaisant et déculpabilisant",
  "leadAnswer": "Réponse directe claire adaptée à l'école (${madhhab}) de l'utilisateur",
  "bodyParagraphs": ["Paragraphe pédagogique 1 sourcé et fluide", "Paragraphe 2 expliquant la sagesse ou la nuance"],
  "citedSourceIds": ["id_exact_1", "id_exact_2"],
  "schoolComparison": [
    { "madhhab": "maliki", "schoolName": "École Malékite", "verdictSummary": "Résumé court", "explanation": "Explication sobre" },
    { "madhhab": "hanafi", "schoolName": "École Hanafite", "verdictSummary": "Résumé court", "explanation": "Explication sobre" },
    { "madhhab": "shafii", "schoolName": "École Chaféite", "verdictSummary": "Résumé court", "explanation": "Explication sobre" },
    { "madhhab": "hanbali", "schoolName": "École Hanbalite", "verdictSummary": "Résumé court", "explanation": "Explication sobre" }
  ],
  "microStep15s": "Une micro-action ou intention réalisable en 15 secondes sans flemme",
  "redlineImamSheet": null
}
Note : "schoolComparison" ne doit être rempli (avec les 4 écoles) QUE si epistemicStatus vaut "IKHTILAF" ou "JUMHUR" sur une question pratique de Fiqh ; sinon mets null. Si epistemicStatus vaut "REDLINE_SAVANT", remplis "redlineImamSheet": { "topic": "...", "contextQuestionsToPrepare": ["...", "..."], "generalEducationalNote": "..." }.`;
}

function detectProviderAndKey(clientApiKey?: string): {
  provider: 'gemini' | 'openai' | 'anthropic' | 'groq' | null;
  apiKey: string | null;
} {
  const trimmedClient = clientApiKey?.trim();
  if (trimmedClient) {
    if (trimmedClient.startsWith('AIza')) return { provider: 'gemini', apiKey: trimmedClient };
    if (trimmedClient.startsWith('sk-ant-')) return { provider: 'anthropic', apiKey: trimmedClient };
    if (trimmedClient.startsWith('gsk_')) return { provider: 'groq', apiKey: trimmedClient };
    return { provider: 'openai', apiKey: trimmedClient };
  }

  const env = (globalThis as unknown as { process?: { env?: Record<string, string | undefined> } }).process?.env || {};
  if (env.GEMINI_API_KEY) return { provider: 'gemini', apiKey: env.GEMINI_API_KEY };
  if (env.OPENAI_API_KEY) return { provider: 'openai', apiKey: env.OPENAI_API_KEY };
  if (env.ANTHROPIC_API_KEY) return { provider: 'anthropic', apiKey: env.ANTHROPIC_API_KEY };
  if (env.GROQ_API_KEY) return { provider: 'groq', apiKey: env.GROQ_API_KEY };

  return { provider: null, apiKey: null };
}

export function getServerAiStatus(): { configured: boolean; provider: string | null } {
  const detected = detectProviderAndKey();
  return { configured: Boolean(detected.apiKey), provider: detected.provider };
}

export async function executeNurAiQuery(payload: AskRequestPayload): Promise<Record<string, unknown>> {
  const question = (payload.question || '').trim();
  const madhhab = payload.madhhab || 'maliki';
  const energyMode = payload.energyMode || 'light_2m';

  if (!question) {
    return { error: 'Question vide.' };
  }

  // Deterministic Priority 0: Crisis / Suicide Emergency Check (Zero latency)
  const qNorm = question.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  if (
    qNorm.includes('suicid') ||
    qNorm.includes('plus envie de vivre') ||
    qNorm.includes('me faire du mal') ||
    qNorm.includes('en finir')
  ) {
    return { mode: 'crisis_emergency' };
  }

  const { provider, apiKey } = detectProviderAndKey(payload.clientApiKey);
  if (!provider || !apiKey) {
    return { mode: 'no_api_key' };
  }

  const systemPrompt = buildNurSystemPrompt(madhhab, energyMode);
  let rawJsonText = '';
  let providerLabel = '';

  if (provider === 'gemini') {
    providerLabel = 'Gemini Flash (RAG Sourcé)';
    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemPrompt }] },
          contents: [{ role: 'user', parts: [{ text: question }] }],
          generationConfig: {
            temperature: 0.25,
            responseMimeType: 'application/json',
          },
        }),
      }
    );
    if (!resp.ok) {
      const errTxt = await resp.text();
      throw new Error(`Erreur API Gemini (${resp.status}): ${errTxt.slice(0, 180)}`);
    }
    const data = (await resp.json()) as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
    };
    rawJsonText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  } else if (provider === 'openai' || provider === 'groq') {
    providerLabel = provider === 'groq' ? 'Groq Llama-3.3-70B (RAG Sourcé)' : 'OpenAI GPT-4o-mini (RAG Sourcé)';
    const endpoint =
      provider === 'groq'
        ? 'https://api.groq.com/openai/v1/chat/completions'
        : 'https://api.openai.com/v1/chat/completions';
    const model = provider === 'groq' ? 'llama-3.3-70b-versatile' : 'gpt-4o-mini';

    const resp = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0.25,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: question },
        ],
      }),
    });
    if (!resp.ok) {
      const errTxt = await resp.text();
      throw new Error(`Erreur API ${provider.toUpperCase()} (${resp.status}): ${errTxt.slice(0, 180)}`);
    }
    const data = (await resp.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    rawJsonText = data.choices?.[0]?.message?.content || '';
  } else if (provider === 'anthropic') {
    providerLabel = 'Claude (RAG Sourcé)';
    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-haiku-latest',
        max_tokens: 1400,
        temperature: 0.25,
        system: systemPrompt,
        messages: [{ role: 'user', content: question }],
      }),
    });
    if (!resp.ok) {
      const errTxt = await resp.text();
      throw new Error(`Erreur API Anthropic (${resp.status}): ${errTxt.slice(0, 180)}`);
    }
    const data = (await resp.json()) as {
      content?: Array<{ text?: string }>;
    };
    rawJsonText = data.content?.[0]?.text || '';
  }

  // Strip accidental markdown fences if any
  const cleaned = rawJsonText
    .trim()
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```$/i, '')
    .trim();

  const parsed = JSON.parse(cleaned) as {
    epistemicStatus?: string;
    epistemicBadgeLabel?: string;
    epistemicDescription?: string;
    empathyOpening?: string;
    leadAnswer?: string;
    bodyParagraphs?: string[];
    citedSourceIds?: string[];
    schoolComparison?: unknown;
    microStep15s?: string;
    redlineImamSheet?: unknown;
  };

  // DETERMINISTIC CITATION LOCK: Discard any hallucinated ID not in our sealed Uthmani corpus!
  const verifiedCitations = Array.isArray(parsed.citedSourceIds)
    ? parsed.citedSourceIds.filter((id) => VALID_IDS.has(id))
    : [];

  if (verifiedCitations.length === 0) {
    verifiedCitations.push('bukhari_69');
  }

  const allowedStatuses = new Set(['SAKINA', 'IJMA', 'JUMHUR', 'IKHTILAF', 'REDLINE_SAVANT']);
  const safeStatus = allowedStatuses.has(parsed.epistemicStatus || '')
    ? parsed.epistemicStatus
    : 'SAKINA';

  return {
    mode: 'live_ai',
    answer: {
      providerName: providerLabel,
      epistemicStatus: safeStatus,
      epistemicBadgeLabel: parsed.epistemicBadgeLabel || '✨ Accompagnement sourcé Nur',
      epistemicDescription:
        parsed.epistemicDescription || 'Réponse structurée avec verrouillage déterministe des textes sacrés.',
      empathyOpening: parsed.empathyOpening || 'Que la paix accompagne ta démarche.',
      leadAnswer: parsed.leadAnswer || '',
      bodyParagraphs: Array.isArray(parsed.bodyParagraphs) ? parsed.bodyParagraphs : [],
      citedSourceIds: verifiedCitations,
      schoolComparison: Array.isArray(parsed.schoolComparison) ? parsed.schoolComparison : undefined,
      microStep15s:
        parsed.microStep15s || 'Prends une respiration calme et avance d’un petit pas confiant aujourd’hui.',
      redlineImamSheet: parsed.redlineImamSheet || undefined,
    },
  };
}

// Default export for Vercel Node.js Serverless Runtime (/api/ask)
export default async function handler(
  req: { method?: string; body?: AskRequestPayload | string },
  res: { status: (code: number) => { json: (obj: unknown) => void } }
) {
  if (req.method === 'GET') {
    res.status(200).json(getServerAiStatus());
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  try {
    const body: AskRequestPayload =
      typeof req.body === 'string' ? JSON.parse(req.body) : req.body || { question: '' };
    const result = await executeNurAiQuery(body);
    res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erreur interne du moteur IA.';
    res.status(500).json({ error: message });
  }
}
