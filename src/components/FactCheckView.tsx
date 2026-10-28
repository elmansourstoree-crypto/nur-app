import React, { useState } from 'react';
import { Search, ShieldCheck, Share2, Check, Sparkles, Image as ImageIcon } from 'lucide-react';
import {
  CANONICAL_SOURCES,
  CanonicalSource,
  FACT_CHECK_ITEMS,
  FactCheckItem,
} from '../data/canonicalCorpus';

interface FactCheckViewProps {
  darkMode: boolean;
  showPhonetic: boolean;
  onOpenSource: (source: CanonicalSource) => void;
  onOpenCardStudio: (source: CanonicalSource) => void;
}

export const FactCheckView: React.FC<FactCheckViewProps> = ({
  darkMode,
  showPhonetic,
  onOpenSource,
  onOpenCardStudio,
}) => {
  const [selectedId, setSelectedId] = useState<string>(FACT_CHECK_ITEMS[0].id);
  const [searchInput, setSearchInput] = useState('');
  const [copiedShare, setCopiedShare] = useState(false);

  const activeItem: FactCheckItem =
    FACT_CHECK_ITEMS.find((i) => i.id === selectedId) || FACT_CHECK_ITEMS[0];
  const authenticSource = CANONICAL_SOURCES[activeItem.authenticAlternativeSourceId];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchInput.toLowerCase();
    if (!q.trim()) return;
    const match = FACT_CHECK_ITEMS.find(
      (item) =>
        item.viralClaim.toLowerCase().includes(q) ||
        item.shortLabel.toLowerCase().includes(q) ||
        (q.includes('chine') && item.id === 'fc_china') ||
        (q.includes('mere') && item.id === 'fc_mothers') ||
        (q.includes('mère') && item.id === 'fc_mothers') ||
        (q.includes('sourir') && item.id === 'fc_smile') ||
        (q.includes('asr') && item.id === 'fc_asr_sleep') ||
        (q.includes('dormir') && item.id === 'fc_asr_sleep')
    );
    if (match) {
      setSelectedId(match.id);
    }
  };

  const handleCopyShareCard = () => {
    navigator.clipboard.writeText(activeItem.shareableCardText);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2200);
  };

  const badgeColors = {
    AUTHENTIC: darkMode
      ? 'bg-emerald-950/70 text-emerald-300 border-emerald-700/60'
      : 'bg-emerald-50 text-emerald-900 border-emerald-200',
    NUANCED: darkMode
      ? 'bg-amber-950/70 text-amber-300 border-amber-700/60'
      : 'bg-amber-50 text-amber-900 border-amber-200',
    UNAUTHENTIC: darkMode
      ? 'bg-rose-950/75 text-rose-200 border-rose-700/60'
      : 'bg-rose-50 text-rose-900 border-rose-200',
  };

  return (
    <div className="space-y-4 pb-6 animate-fade-up">
      <div
        className={`rounded-3xl border p-5 ${
          darkMode ? 'border-[#223639] bg-[#121E20]' : 'border-[#E6DEC9] bg-white'
        }`}
      >
        <span
          className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider ${
            darkMode ? 'text-[#D8B56D]' : 'text-[#0F3D3E]'
          }`}
        >
          <Sparkles className="h-3.5 w-3.5" />
          Vérificateur d’authenticité (Takhrîj bienveillant)
        </span>
        <h2 className="font-editorial mt-1.5 text-2xl font-semibold leading-tight">
          Un hadith reçu sur WhatsApp ou TikTok ? Vérifie avant de partager.
        </h2>
        <p className={`mt-1 text-xs leading-relaxed ${darkMode ? 'text-[#9EB0AC]' : 'text-[#5C6660]'}`}>
          Sans moquerie ni polémique : Nur vérifie la chaîne de transmission auprès des maîtres du hadith et te propose l’alternative 100 % authentique.
        </p>

        <form onSubmit={handleSearch} className="mt-3.5 flex gap-2">
          <div
            className={`flex flex-1 items-center gap-2 rounded-xl border px-3 py-2 ${
              darkMode
                ? 'border-[#273E42] bg-[#0B1314]'
                : 'border-[#DDD3BF] bg-[#FAF7F2]'
            }`}
          >
            <Search className="h-4 w-4 opacity-50" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Colle une citation (ex. science en Chine, sourire, mères...)"
              className="w-full bg-transparent text-xs outline-none"
            />
          </div>
          <button
            type="submit"
            className={`rounded-xl px-3.5 py-2 text-xs font-bold transition ${
              darkMode
                ? 'bg-[#D8B56D] text-[#0B1314]'
                : 'bg-[#0F3D3E] text-white'
            }`}
          >
            Vérifier
          </button>
        </form>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {FACT_CHECK_ITEMS.map((item) => {
            const active = item.id === activeItem.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`rounded-full border px-3 py-1 text-[11px] font-semibold transition ${
                  active
                    ? darkMode
                      ? 'border-[#D8B56D] bg-[#D8B56D] text-[#0B1314]'
                      : 'border-[#0F3D3E] bg-[#0F3D3E] text-white'
                    : darkMode
                      ? 'border-[#253B3E] bg-[#0E181A] text-[#B8C6C3] hover:border-[#39595E]'
                      : 'border-[#E5DEC9] bg-[#FAF7F2] text-[#45514B] hover:bg-[#EFE9DC]'
                }`}
              >
                {item.shortLabel}
              </button>
            );
          })}
        </div>
      </div>

      {/* Verdict Card */}
      <div
        key={activeItem.id}
        className={`rounded-3xl border p-5 sm:p-6 shadow-sm space-y-4 animate-fade-up ${
          darkMode ? 'border-[#223639] bg-[#121E20]' : 'border-[#E6DEC9] bg-white'
        }`}
      >
        <div>
          <span className="block text-[11px] uppercase tracking-wider opacity-60">
            Citation analysée :
          </span>
          <p className="font-editorial mt-0.5 text-xl font-semibold italic">
            « {activeItem.viralClaim} »
          </p>
        </div>

        <span
          className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold ${
            badgeColors[activeItem.status]
          }`}
        >
          {activeItem.statusBadge}
        </span>

        <div
          className={`rounded-2xl p-3.5 text-xs leading-relaxed ${
            darkMode ? 'bg-[#17282B] text-[#DCE4E1]' : 'bg-[#F3EFE6] text-[#28332E]'
          }`}
        >
          <strong className="block font-bold mb-1">Verdict des spécialistes du Hadith :</strong>
          {activeItem.muhaddithVerdict}
        </div>

        <p className="text-xs sm:text-sm leading-relaxed">
          {activeItem.gentleExplanation}
        </p>

        {authenticSource && (
          <div
            className={`rounded-2xl border p-4 ${
              darkMode
                ? 'border-emerald-800/50 bg-[#0B1314]'
                : 'border-emerald-200 bg-emerald-50/40'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="h-4 w-4" />
                {activeItem.status === 'AUTHENTIC'
                  ? 'Texte original certifié :'
                  : 'Alternative 100 % authentique à partager :'}
              </span>
              <button
                onClick={() => onOpenSource(authenticSource)}
                className="text-[11px] font-semibold underline decoration-dotted"
              >
                Détails source →
              </button>
            </div>

            <p
              dir="rtl"
              lang="ar"
              className="font-arabic text-right text-xl sm:text-2xl"
            >
              {authenticSource.arabicText}
            </p>
            {showPhonetic && authenticSource.phonetic && (
              <p className="mt-1.5 text-xs font-medium text-[#C5A059]">
                {authenticSource.phonetic}
              </p>
            )}
            <p className="mt-2 text-xs sm:text-sm italic leading-relaxed">
              {authenticSource.frenchTranslation}
            </p>
            <p className="mt-1.5 text-[11px] opacity-70">{authenticSource.reference}</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {authenticSource && (
            <button
              onClick={() => onOpenCardStudio(authenticSource)}
              className={`flex items-center justify-center gap-1.5 rounded-2xl border py-3 px-4 text-xs font-bold transition ${
                darkMode
                  ? 'border-[#D8B56D]/50 text-[#EAD096] hover:bg-white/5'
                  : 'border-[#0F3D3E]/30 text-[#0F3D3E] hover:bg-[#FAF7F2]'
              }`}
            >
              <ImageIcon className="h-4 w-4" />
              <span>Créer Carte Image PNG</span>
            </button>
          )}

          <button
            onClick={handleCopyShareCard}
            className={`flex items-center justify-center gap-1.5 rounded-2xl py-3 px-4 text-xs font-bold transition shadow-sm ${
              darkMode
                ? 'bg-[#D8B56D] text-[#0B1314] hover:bg-[#E4C580]'
                : 'bg-[#0F3D3E] text-white hover:bg-[#175557]'
            }`}
          >
            {copiedShare ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
            <span>{copiedShare ? 'Copié pour WhatsApp !' : 'Copier texte WhatsApp'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
