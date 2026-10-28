import React, { useEffect, useState } from 'react';
import {
  Send,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Bookmark,
  Scale,
  AlertTriangle,
  Copy,
  Check,
  PhoneCall,
  Sparkles,
  FileText,
  KeyRound,
  Loader2,
  Image as ImageIcon,
  X,
} from 'lucide-react';
import {
  CANONICAL_SOURCES,
  CanonicalSource,
  CHAT_SCENARIOS,
  ChatScenario,
  EnergyMode,
  LiveAiDynamicAnswer,
  MADHHAB_OPTIONS,
  MadhhabId,
  routeUserQuestion,
} from '../data/canonicalCorpus';
import { EpistemicBadge } from './NurOrnament';

interface AskViewProps {
  darkMode: boolean;
  madhhab: MadhhabId;
  energyMode: EnergyMode;
  showPhonetic: boolean;
  onChangeMadhhab: (m: MadhhabId) => void;
  isNurPlus: boolean;
  freeQuestionsLeft: number;
  onConsumeQuestion: () => void;
  selectedScenarioId: string;
  onSelectScenarioId: (id: string) => void;
  bookmarkedIds: string[];
  onToggleBookmark: (id: string, title: string, category: 'Lumière du jour' | 'Réponse sourcée', preview: string) => void;
  onOpenSource: (source: CanonicalSource) => void;
  onOpenCardStudio: (source: CanonicalSource) => void;
  onOpenUpgradeOrScholarship: () => void;
}

export const AskView: React.FC<AskViewProps> = ({
  darkMode,
  madhhab,
  energyMode,
  showPhonetic,
  onChangeMadhhab,
  isNurPlus,
  freeQuestionsLeft,
  onConsumeQuestion,
  selectedScenarioId,
  onSelectScenarioId,
  bookmarkedIds,
  onToggleBookmark,
  onOpenSource,
  onOpenCardStudio,
  onOpenUpgradeOrScholarship,
}) => {
  const [inputQuery, setInputQuery] = useState('');
  const [customUserBubble, setCustomUserBubble] = useState<string | null>(null);
  const [crisisMode, setCrisisMode] = useState(false);
  const [laAdriFallback, setLaAdriFallback] = useState<{
    query: string;
    explanation: string;
    relatedSourceId: string;
  } | null>(null);
  const [liveAiAnswer, setLiveAiAnswer] = useState<LiveAiDynamicAnswer | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [aiErrorMsg, setAiErrorMsg] = useState<string | null>(null);

  const [serverAiConfigured, setServerAiConfigured] = useState(false);
  const [sessionApiKey, setSessionApiKey] = useState<string>(() => {
    return sessionStorage.getItem('nur_session_api_key') || '';
  });
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [tempKeyInput, setTempKeyInput] = useState(sessionApiKey);

  const [showSchoolsAccordion, setShowSchoolsAccordion] = useState(true);
  const [showImamSheet, setShowImamSheet] = useState(false);
  const [copiedImamSheet, setCopiedImamSheet] = useState(false);

  const activeScenario: ChatScenario =
    CHAT_SCENARIOS.find((s) => s.id === selectedScenarioId) || CHAT_SCENARIOS[0];

  const currentMadhhabObj =
    MADHHAB_OPTIONS.find((m) => m.id === madhhab) || MADHHAB_OPTIONS[0];

  const isLiveAiReady = serverAiConfigured || Boolean(sessionApiKey.trim());

  // Check if Vercel environment already has an API key configured
  useEffect(() => {
    fetch('/api/ask')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && data.configured) {
          setServerAiConfigured(true);
        }
      })
      .catch(() => {
        // Offline or static host without /api
      });
  }, []);

  useEffect(() => {
    setShowImamSheet(false);
    setCrisisMode(false);
    setLaAdriFallback(null);
    setLiveAiAnswer(null);
    setAiErrorMsg(null);
    setCustomUserBubble(null);
  }, [selectedScenarioId]);

  const handleSaveSessionKey = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = tempKeyInput.trim();
    setSessionApiKey(cleaned);
    if (cleaned) {
      sessionStorage.setItem('nur_session_api_key', cleaned);
    } else {
      sessionStorage.removeItem('nur_session_api_key');
    }
    setShowKeyModal(false);
  };

  const handleSubmitFreeText = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputQuery.trim();
    if (!trimmed || isLoadingAi) return;

    if (!isNurPlus && freeQuestionsLeft <= 0) {
      onOpenUpgradeOrScholarship();
      return;
    }

    onConsumeQuestion();
    setCustomUserBubble(trimmed);
    setInputQuery('');
    setAiErrorMsg(null);

    // 1. Try real Serverless Theological RAG Engine (/api/ask) if configured on Vercel or session key set
    if (isLiveAiReady) {
      setIsLoadingAi(true);
      try {
        const resp = await fetch('/api/ask', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question: trimmed,
            madhhab,
            energyMode,
            clientApiKey: sessionApiKey || undefined,
          }),
        });
        const data = await resp.json();

        if (!resp.ok || data.error) {
          throw new Error(data.error || 'Erreur lors de l’appel IA.');
        }

        if (data.mode === 'crisis_emergency') {
          setCrisisMode(true);
          setLiveAiAnswer(null);
          setLaAdriFallback(null);
          setIsLoadingAi(false);
          return;
        }

        if (data.mode === 'live_ai' && data.answer) {
          setCrisisMode(false);
          setLaAdriFallback(null);
          setLiveAiAnswer(data.answer as LiveAiDynamicAnswer);
          setIsLoadingAi(false);
          return;
        }
      } catch (err) {
        setAiErrorMsg(
          err instanceof Error
            ? `${err.message} — Bascule automatique sur le corpus certifié local.`
            : 'Bascule sur le corpus certifié local.'
        );
      } finally {
        setIsLoadingAi(false);
      }
    }

    // 2. Deterministic Local Router Fallback (Zero-Hallucination guaranteed)
    const routed = routeUserQuestion(trimmed);
    setLiveAiAnswer(null);
    if (routed.crisisEmergency) {
      setCrisisMode(true);
      setLaAdriFallback(null);
    } else if (routed.matchedScenario) {
      setCrisisMode(false);
      setLaAdriFallback(null);
      onSelectScenarioId(routed.matchedScenario.id);
      setTimeout(() => setCustomUserBubble(trimmed), 0);
    } else if (routed.humbleLaAdri) {
      setCrisisMode(false);
      setLaAdriFallback(routed.humbleLaAdri);
    }
  };

  // Unified view model (either live AI dynamic answer or active curated scenario)
  const displayEpistemicStatus = liveAiAnswer
    ? liveAiAnswer.epistemicStatus
    : activeScenario.epistemicStatus;
  const displayBadgeLabel = liveAiAnswer
    ? liveAiAnswer.epistemicBadgeLabel
    : activeScenario.epistemicBadgeLabel;
  const displayDescription = liveAiAnswer
    ? `${liveAiAnswer.providerName} • ${liveAiAnswer.epistemicDescription}`
    : activeScenario.epistemicDescription;
  const displayEmpathy = liveAiAnswer
    ? liveAiAnswer.empathyOpening
    : activeScenario.empathyOpening;
  const displayLead = liveAiAnswer
    ? liveAiAnswer.leadAnswer
    : activeScenario.leadByMadhhab[madhhab];
  const displayParagraphs = liveAiAnswer
    ? liveAiAnswer.bodyParagraphs
    : activeScenario.bodyParagraphs;
  const displaySourceIds = liveAiAnswer
    ? liveAiAnswer.citedSourceIds
    : activeScenario.citedSourceIds;
  const displaySchoolComparison = liveAiAnswer
    ? liveAiAnswer.schoolComparison
    : activeScenario.schoolComparison;
  const displayMicroStep = liveAiAnswer
    ? liveAiAnswer.microStep15s
    : activeScenario.microStep15s;
  const displayImamSheet = liveAiAnswer
    ? liveAiAnswer.redlineImamSheet
    : activeScenario.redlineImamSheet;

  const handleCopyImamSheet = () => {
    if (!displayImamSheet) return;
    const formatted = [
      `📋 ${displayImamSheet.topic}`,
      '',
      'Points préparés pour l’entretien avec l’Imam / Savant :',
      ...displayImamSheet.contextQuestionsToPrepare.map((item, i) => `${i + 1}. ${item}`),
      '',
      `Note : ${displayImamSheet.generalEducationalNote}`,
    ].join('\n');
    navigator.clipboard.writeText(formatted);
    setCopiedImamSheet(true);
    setTimeout(() => setCopiedImamSheet(false), 2200);
  };

  const bookmarkKey = liveAiAnswer ? `live_${customUserBubble}` : activeScenario.id;
  const isBookmarked = bookmarkedIds.includes(bookmarkKey);

  return (
    <div className="space-y-4 pb-6 animate-fade-up">
      {/* Top Governance Bar: Madhhab Selector + Live AI Engine Status */}
      <div
        className={`flex flex-wrap items-center justify-between gap-2 rounded-2xl border px-3.5 py-2.5 ${
          darkMode ? 'border-[#213538] bg-[#121E20]' : 'border-[#E6DEC9] bg-white'
        }`}
      >
        <div className="flex items-center gap-1.5">
          <Scale className={`h-4 w-4 ${darkMode ? 'text-[#D8B56D]' : 'text-[#0F3D3E]'}`} />
          <select
            aria-label="École juridique"
            value={madhhab}
            onChange={(e) => onChangeMadhhab(e.target.value as MadhhabId)}
            className={`rounded-lg border px-2 py-1 text-xs font-bold outline-none ${
              darkMode
                ? 'border-[#2B4347] bg-[#0B1314] text-[#EAD096]'
                : 'border-[#DED5C1] bg-[#FAF7F2] text-[#0F3D3E]'
            }`}
          >
            {MADHHAB_OPTIONS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.shortLabel}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              setTempKeyInput(sessionApiKey);
              setShowKeyModal(true);
            }}
            className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-bold transition ${
              isLiveAiReady
                ? 'border-emerald-600/50 bg-emerald-600/15 text-emerald-500'
                : darkMode
                  ? 'border-[#D8B56D]/40 bg-[#D8B56D]/10 text-[#EAD096]'
                  : 'border-[#0F3D3E]/25 bg-[#EEF5F2] text-[#0F3D3E]'
            }`}
          >
            <KeyRound className="h-3 w-3" />
            <span>{isLiveAiReady ? 'IA Live Active' : 'Connecter Clé IA'}</span>
          </button>

          <button
            onClick={onOpenUpgradeOrScholarship}
            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition ${
              isNurPlus
                ? darkMode
                  ? 'bg-[#D8B56D]/20 text-[#D8B56D]'
                  : 'bg-[#0F3D3E]/10 text-[#0F3D3E]'
                : darkMode
                  ? 'bg-white/5 text-[#9EB0AC]'
                  : 'bg-[#F2ECE0] text-[#4F5B55]'
            }`}
          >
            {isNurPlus ? '✦ Illimité' : `${freeQuestionsLeft}/5`}
          </button>
        </div>
      </div>

      {/* Scenario Demonstration Chips */}
      <div>
        <p className={`mb-2 text-[11px] font-semibold uppercase tracking-wider ${darkMode ? 'text-[#8EA29E]' : 'text-[#68736D]'}`}>
          Scénarios vérifiés ou pose n’importe quelle question libre en bas :
        </p>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {CHAT_SCENARIOS.map((sc) => {
            const active =
              !crisisMode && !laAdriFallback && !liveAiAnswer && activeScenario.id === sc.id;
            return (
              <button
                key={sc.id}
                onClick={() => onSelectScenarioId(sc.id)}
                className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                  active
                    ? darkMode
                      ? 'border-[#D8B56D] bg-[#D8B56D] text-[#0B1314]'
                      : 'border-[#0F3D3E] bg-[#0F3D3E] text-white'
                    : darkMode
                      ? 'border-[#23383B] bg-[#121E20] text-[#B8C6C3] hover:border-[#37565B]'
                      : 'border-[#E5DEC9] bg-white text-[#3F4B45] hover:bg-[#F3EEE3]'
                }`}
              >
                {sc.chipLabel}
              </button>
            );
          })}
        </div>
      </div>

      {/* User Question Bubble */}
      <div className="flex justify-end">
        <div
          className={`max-w-[88%] rounded-2xl rounded-tr-sm px-4 py-3 text-xs sm:text-sm leading-relaxed shadow-sm ${
            darkMode
              ? 'bg-[#1C3134] text-[#F3EFE8]'
              : 'bg-[#0F3D3E] text-[#FAF7F2]'
          }`}
        >
          {customUserBubble || activeScenario.userQuestion}
        </div>
      </div>

      {aiErrorMsg && (
        <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-3.5 py-2 text-xs text-amber-600 dark:text-amber-300">
          {aiErrorMsg}
        </div>
      )}

      {isLoadingAi ? (
        <div
          className={`flex items-center gap-3 rounded-3xl border p-6 text-xs font-medium ${
            darkMode ? 'border-[#223639] bg-[#121E20]' : 'border-[#E7DFCE] bg-white'
          }`}
        >
          <Loader2 className="h-5 w-5 animate-spin text-[#C5A059]" />
          <div>
            <p className="font-bold text-sm">Consultation du corpus authentifié Nur…</p>
            <p className="opacity-75 mt-0.5">
              Vérification des références (Coran, Bukhârî/Muslim, {currentMadhhabObj.label}) avec verrouillage anti-hallucination.
            </p>
          </div>
        </div>
      ) : crisisMode ? (
        /* Crisis Emergency Protocol */
        <div
          className={`rounded-3xl border-2 p-5 shadow-md animate-fade-up ${
            darkMode
              ? 'border-rose-700/70 bg-[#1B1417] text-[#F5ECEE]'
              : 'border-rose-300 bg-rose-50/70 text-[#2B161B]'
          }`}
        >
          <div className="flex items-center gap-2 text-rose-500 font-bold text-xs uppercase tracking-wider">
            <PhoneCall className="h-4 w-4" />
            Protocole Prioritaire • Ta vie est infiniment précieuse
          </div>
          <h3 className="font-editorial mt-2 text-2xl font-semibold">
            Tu n’as pas à traverser cette douleur tout seul ce soir.
          </h3>
          <p className="mt-2 text-sm leading-relaxed">
            Aux yeux d’Allah — <em>Ar-Rahmân, Ar-Rahîm</em> — ta vie est sacrée et demander le soutien d’un médecin ou d’un écoutant est un acte aimé et encouragé par notre tradition.
          </p>
          <div
            className={`mt-4 rounded-2xl border p-4 space-y-2 text-xs sm:text-sm ${
              darkMode ? 'border-rose-800/60 bg-black/30' : 'border-rose-200 bg-white'
            }`}
          >
            <p className="font-bold">📞 Aide immédiate, gratuite et confidentielle (24h/24) :</p>
            <p>• <strong>3114</strong> — Numéro national de prévention du suicide (France)</p>
            <p>• <strong>15 / 112</strong> — Urgences médicales (Europe & International)</p>
            <p>• <strong>3919</strong> — Violences Femmes Info</p>
          </div>
        </div>
      ) : laAdriFallback ? (
        /* Imam Malik's La Adri Guardrail + 1-click Live AI Key invitation */
        <div
          className={`rounded-3xl border p-5 shadow-sm space-y-3.5 animate-fade-up ${
            darkMode ? 'border-[#253A3E] bg-[#121E20]' : 'border-[#E6DEC9] bg-white'
          }`}
        >
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${
              darkMode
                ? 'border-[#D8B56D]/40 bg-[#D8B56D]/15 text-[#EAD096]'
                : 'border-[#E5D2A4] bg-[#FCF6E8] text-[#805E1E]'
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            Garde-fou « Lâ adrî » • Prêt pour ta clé API IA
          </span>
          <h3 className="font-editorial text-2xl font-semibold">
            Zéro invention hors des sources vérifiées
          </h3>
          <p className="text-xs sm:text-sm leading-relaxed opacity-90">
            {laAdriFallback.explanation}
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <button
              onClick={() => setShowKeyModal(true)}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold ${
                darkMode
                  ? 'bg-[#D8B56D] text-[#0B1314]'
                  : 'bg-[#0F3D3E] text-white'
              }`}
            >
              <KeyRound className="h-3.5 w-3.5" />
              Connecter une clé API (Gemini gratuit / OpenAI / Claude)
            </button>
            <button
              onClick={() => onOpenSource(CANONICAL_SOURCES[laAdriFallback.relatedSourceId])}
              className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold ${
                darkMode
                  ? 'border-[#2A4246] bg-[#0B1314] text-[#D8B56D]'
                  : 'border-[#DDD3BE] bg-[#FAF7F2] text-[#0F3D3E]'
              }`}
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              Charte Bukhârî 69
            </button>
          </div>
        </div>
      ) : (
        /* Full Canonical Structured Response (Curated OR Live AI RAG) */
        <div
          className={`rounded-3xl border p-5 sm:p-6 shadow-sm space-y-4 animate-fade-up ${
            darkMode ? 'border-[#223639] bg-[#121E20]' : 'border-[#E7DFCE] bg-white'
          }`}
        >
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <EpistemicBadge
                status={displayEpistemicStatus}
                label={displayBadgeLabel}
                darkMode={darkMode}
              />
              <p className={`mt-1.5 text-[11px] ${darkMode ? 'text-[#8FA39E]' : 'text-[#66716B]'}`}>
                {displayDescription}
              </p>
            </div>

            <button
              onClick={() =>
                onToggleBookmark(
                  bookmarkKey,
                  customUserBubble || activeScenario.chipLabel,
                  'Réponse sourcée',
                  displayLead
                )
              }
              aria-label="Sauvegarder cette réponse"
              className={`rounded-full border p-2 transition ${
                isBookmarked
                  ? darkMode
                    ? 'border-[#D8B56D] bg-[#D8B56D]/20 text-[#D8B56D]'
                    : 'border-[#0F3D3E] bg-[#0F3D3E] text-white'
                  : darkMode
                    ? 'border-[#263C40] text-[#9EB0AC] hover:bg-white/5'
                    : 'border-[#E6DEC9] text-[#5C6660] hover:bg-[#FAF7F2]'
              }`}
            >
              <Bookmark className="h-4 w-4" fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>
          </div>

          <p className="text-sm leading-relaxed font-medium">{displayEmpathy}</p>

          <div
            className={`rounded-2xl border-l-4 p-4 transition-all ${
              displayEpistemicStatus === 'REDLINE_SAVANT'
                ? darkMode
                  ? 'border-rose-500 bg-rose-950/30 text-rose-100'
                  : 'border-rose-500 bg-rose-50/70 text-rose-950'
                : darkMode
                  ? 'border-[#D8B56D] bg-[#17282B] text-[#EEF2F0]'
                  : 'border-[#0F3D3E] bg-[#F2F7F5] text-[#172623]'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider opacity-80">
                Repère actif : {currentMadhhabObj.label}
              </span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed font-medium">{displayLead}</p>
          </div>

          <div className={`space-y-2.5 text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-[#C6D3D0]' : 'text-[#3C4842]'}`}>
            {displayParagraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Clickable Canonical Source Cards */}
          <div className="space-y-2.5 pt-1">
            <span className="block text-[11px] font-bold uppercase tracking-wider opacity-70">
              Sources primaires scellées (cliquer pour inspecter) :
            </span>
            {displaySourceIds.map((srcId) => {
              const src = CANONICAL_SOURCES[srcId];
              if (!src) return null;
              return (
                <div
                  key={src.id}
                  className={`rounded-2xl border p-3.5 transition ${
                    darkMode
                      ? 'border-[#253B3E] bg-[#0C1517]'
                      : 'border-[#EAE2D1] bg-[#FAF7F2]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <button
                      onClick={() => onOpenSource(src)}
                      className={`inline-flex items-center gap-1.5 text-xs font-bold underline decoration-dotted ${
                        darkMode ? 'text-[#D8B56D]' : 'text-[#0F3D3E]'
                      }`}
                    >
                      <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
                      {src.title}
                    </button>

                    <button
                      onClick={() => onOpenCardStudio(src)}
                      className="inline-flex items-center gap-1 text-[11px] font-medium opacity-75 hover:opacity-100"
                    >
                      <ImageIcon className="h-3 w-3" />
                      PNG
                    </button>
                  </div>

                  <p
                    dir="rtl"
                    lang="ar"
                    className="font-arabic mt-2 text-right text-lg sm:text-xl opacity-95"
                  >
                    {src.arabicText}
                  </p>
                  {showPhonetic && src.phonetic && (
                    <p className="mt-1 text-[11px] text-[#C5A059] font-medium">{src.phonetic}</p>
                  )}
                  <p className="mt-1 text-xs italic opacity-85">{src.frenchTranslation}</p>
                </div>
              );
            })}
          </div>

          {/* Multi-Madhhab Accordion */}
          {displaySchoolComparison && displaySchoolComparison.length > 0 && (
            <div
              className={`rounded-2xl border overflow-hidden ${
                darkMode ? 'border-[#273E42] bg-[#0E181A]' : 'border-[#E5DEC9] bg-[#F7F3EA]'
              }`}
            >
              <button
                onClick={() => setShowSchoolsAccordion(!showSchoolsAccordion)}
                className="flex w-full items-center justify-between px-4 py-3 text-left text-xs font-bold"
              >
                <span className="flex items-center gap-2">
                  <Scale className="h-4 w-4 text-[#C5A059]" />
                  <span>Comparer les 4 écoles avec respect (Adab al-Ikhtilâf)</span>
                </span>
                {showSchoolsAccordion ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>

              {showSchoolsAccordion && (
                <div className="grid grid-cols-1 gap-2 px-4 pb-4 pt-1">
                  {displaySchoolComparison.map((sc) => {
                    const isUserSchool = sc.madhhab === madhhab;
                    return (
                      <div
                        key={sc.madhhab}
                        className={`rounded-xl border p-3 text-xs ${
                          isUserSchool
                            ? darkMode
                              ? 'border-[#D8B56D] bg-[#17282B]'
                              : 'border-[#0F3D3E] bg-white shadow-xs'
                            : darkMode
                              ? 'border-[#1F3134] bg-[#121E20]/70'
                              : 'border-[#E6DEC9] bg-white/70'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold">
                            {sc.schoolName} {isUserSchool && '• Ton repère'}
                          </span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                              darkMode
                                ? 'bg-white/10 text-[#E5C687]'
                                : 'bg-[#EFE9DC] text-[#0F3D3E]'
                            }`}
                          >
                            {sc.verdictSummary}
                          </span>
                        </div>
                        <p className="mt-1 opacity-85 leading-relaxed">{sc.explanation}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Red-Line Imam Sheet */}
          {displayImamSheet && (
            <div
              className={`rounded-2xl border p-4 ${
                darkMode
                  ? 'border-rose-800/60 bg-rose-950/25'
                  : 'border-rose-200 bg-rose-50/60'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                <div className="flex-1">
                  <h4 className="text-xs font-bold">
                    Passerelle vers un Imam / Savant humain qualifié
                  </h4>
                  <p className="mt-1 text-xs opacity-85 leading-relaxed">
                    Prépare en 1 clic les éléments factuels que l’imam aura besoin d’entendre.
                  </p>
                  <button
                    onClick={() => setShowImamSheet(!showImamSheet)}
                    className={`mt-3 inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                      darkMode
                        ? 'bg-[#D8B56D] text-[#0B1314]'
                        : 'bg-[#0F3D3E] text-white'
                    }`}
                  >
                    <FileText className="h-3.5 w-3.5" />
                    {showImamSheet
                      ? 'Masquer la fiche de préparation'
                      : 'Générer ma fiche pour consulter un Imam'}
                  </button>
                </div>
              </div>

              {showImamSheet && (
                <div
                  className={`mt-3 rounded-xl border p-3.5 text-xs space-y-2 animate-fade-up ${
                    darkMode ? 'border-[#273E42] bg-[#0B1314]' : 'border-[#E6DEC9] bg-white'
                  }`}
                >
                  <p className="font-bold">{displayImamSheet.topic}</p>
                  <ul className="list-disc pl-4 space-y-1 opacity-90">
                    {displayImamSheet.contextQuestionsToPrepare.map((q, idx) => (
                      <li key={idx}>{q}</li>
                    ))}
                  </ul>
                  <button
                    onClick={handleCopyImamSheet}
                    className={`mt-2 inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold ${
                      darkMode
                        ? 'border-[#D8B56D]/50 text-[#D8B56D]'
                        : 'border-[#0F3D3E]/30 text-[#0F3D3E]'
                    }`}
                  >
                    {copiedImamSheet ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    {copiedImamSheet ? 'Fiche copiée' : 'Copier cette fiche confidentielle'}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Micro-Step 15s */}
          <div
            className={`rounded-2xl p-3.5 text-xs leading-relaxed ${
              darkMode ? 'bg-[#17282B] text-[#E6ECEA]' : 'bg-[#F3EFE6] text-[#222D28]'
            }`}
          >
            <strong className="flex items-center gap-1.5 font-bold mb-1">
              <Sparkles className="h-3.5 w-3.5 text-[#C5A059]" />
              Petit pas « Sans Flemme » (15 sec) :
            </strong>
            {displayMicroStep}
          </div>

          <p className="text-[11px] opacity-60 text-center pt-1">
            Nur transmet des références académiques sourcées pour accompagner, sans remplacer la fatwa personnalisée d’un savant.
          </p>
        </div>
      )}

      {/* Free-Text Input Bar */}
      <form
        onSubmit={handleSubmitFreeText}
        className={`sticky bottom-2 flex items-center gap-2 rounded-2xl border p-2 shadow-lg ${
          darkMode ? 'border-[#294246] bg-[#132225]' : 'border-[#DFD6C2] bg-white'
        }`}
      >
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder="Pose n’importe quelle question (anxiété, prière, travail, couple…)"
          className="flex-1 bg-transparent px-2.5 py-2 text-xs sm:text-sm outline-none"
        />
        <button
          type="submit"
          disabled={isLoadingAi}
          aria-label="Envoyer la question"
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition ${
            darkMode
              ? 'bg-[#D8B56D] text-[#0B1314] hover:bg-[#E5C682]'
              : 'bg-[#0F3D3E] text-white hover:bg-[#175557]'
          }`}
        >
          {isLoadingAi ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </button>
      </form>

      {/* Instant API Key Connection Modal (for testing before or alongside Vercel env vars) */}
      {showKeyModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setShowKeyModal(false)}
        >
          <form
            onSubmit={handleSaveSessionKey}
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-[420px] rounded-3xl border p-5 shadow-2xl space-y-3.5 animate-fade-up ${
              darkMode
                ? 'border-[#274044] bg-[#111E20] text-[#F3EFE8]'
                : 'border-[#E5DEC9] bg-[#FAF7F2] text-[#1B2421]'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#C5A059]">
                  ⚡ Moteur Théologique IA Temps Réel
                </span>
                <h3 className="font-editorial text-2xl font-semibold mt-0.5">
                  Tester ta clé API immédiatement
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowKeyModal(false)}
                className="rounded-full p-1 opacity-70 hover:opacity-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {serverAiConfigured ? (
              <div className="rounded-xl border border-emerald-600/40 bg-emerald-600/15 p-3 text-xs text-emerald-500 font-medium">
                ✓ Une clé API serveur est déjà configurée sur ton déploiement Vercel ! Tous tes utilisateurs bénéficient déjà de l’IA en direct sans rien saisir.
              </div>
            ) : (
              <p className="text-xs leading-relaxed opacity-85">
                Sur Vercel, tu mettras ta clé dans les <strong>Environment Variables</strong> (`GEMINI_API_KEY`, `OPENAI_API_KEY`, `ANTHROPIC_API_KEY` ou `GROQ_API_KEY`). Pour tester tout de suite ici, colle n’importe laquelle de ces clés (détection automatique !) :
              </p>
            )}

            <input
              type="password"
              value={tempKeyInput}
              onChange={(e) => setTempKeyInput(e.target.value)}
              placeholder="AIza... (Gemini gratuit) ou sk-... (OpenAI/Claude) ou gsk_..."
              className={`w-full rounded-xl border px-3.5 py-2.5 text-xs outline-none ${
                darkMode
                  ? 'border-[#2B4347] bg-[#0B1314] text-white'
                  : 'border-[#DDD3BF] bg-white text-[#1B2421]'
              }`}
            />

            <p className="text-[11px] opacity-65">
              🔒 Gardée uniquement en mémoire de session (jamais enregistrée sur disque). Astuce : Google AI Studio offre une clé `AIza...` 100 % gratuite en 20 secondes !
            </p>

            <div className="flex justify-end gap-2 pt-1">
              {sessionApiKey && (
                <button
                  type="button"
                  onClick={() => {
                    setTempKeyInput('');
                    setSessionApiKey('');
                    sessionStorage.removeItem('nur_session_api_key');
                    setShowKeyModal(false);
                  }}
                  className="rounded-xl border border-rose-500/40 px-3 py-2 text-xs text-rose-500 font-semibold"
                >
                  Effacer
                </button>
              )}
              <button
                type="submit"
                className={`rounded-xl px-4 py-2 text-xs font-bold ${
                  darkMode
                    ? 'bg-[#D8B56D] text-[#0B1314]'
                    : 'bg-[#0F3D3E] text-white'
                }`}
              >
                Activer l’IA en direct
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
