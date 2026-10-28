import React, { useEffect, useState } from 'react';
import { X, ShieldCheck, BookOpen, Copy, Check, Flag, Image as ImageIcon, Sparkles } from 'lucide-react';
import { CanonicalSource } from '../data/canonicalCorpus';

interface SourceProvenanceDrawerProps {
  source: CanonicalSource | null;
  darkMode: boolean;
  onClose: () => void;
  onOpenCardStudio?: (source: CanonicalSource) => void;
}

export const SourceProvenanceDrawer: React.FC<SourceProvenanceDrawerProps> = ({
  source,
  darkMode,
  onClose,
  onOpenCardStudio,
}) => {
  const [copied, setCopied] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [reportNote, setReportNote] = useState('');
  const [reciteCount, setReciteCount] = useState(0);

  useEffect(() => {
    setReciteCount(0);
    setShowReportForm(false);
  }, [source]);

  if (!source) return null;

  const handleCopy = () => {
    const text = `${source.arabicText}\n(${source.phonetic})\n\n${source.frenchTranslation}\n— ${source.title} (${source.reference})`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReportSubmitted(true);
    setTimeout(() => {
      setShowReportForm(false);
    }, 1800);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/55 backdrop-blur-[2px] p-0 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-[460px] max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border p-5 sm:p-6 shadow-2xl animate-fade-up ${
          darkMode
            ? 'bg-[#121E20] border-[#24383B] text-[#F3EFE8]'
            : 'bg-[#FAF7F2] border-[#E5DEC9] text-[#1B2421]'
        }`}
      >
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-current opacity-20 sm:hidden" />

        <div className="flex items-start justify-between gap-3">
          <div>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${
                darkMode
                  ? 'bg-[#D8B56D]/15 text-[#D8B56D]'
                  : 'bg-[#0F3D3E]/10 text-[#0F3D3E]'
              }`}
            >
              <BookOpen className="h-3 w-3" />
              Carte d’Identité de la Source • {source.type}
            </span>
            <h3 className="font-editorial mt-2 text-2xl font-semibold leading-tight">
              {source.title}
            </h3>
            <p className={`mt-0.5 text-xs ${darkMode ? 'text-[#9EB0AC]' : 'text-[#5C6660]'}`}>
              {source.reference}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Fermer"
            className={`rounded-full p-2 transition ${
              darkMode
                ? 'hover:bg-white/10 text-[#9EB0AC]'
                : 'hover:bg-black/5 text-[#5C6660]'
            }`}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div
          className={`mt-4 flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-xs font-medium ${
            darkMode
              ? 'bg-emerald-950/50 border-emerald-800/60 text-emerald-300'
              : 'bg-emerald-50/90 border-emerald-200 text-emerald-900'
          }`}
        >
          <ShieldCheck className="h-4 w-4 shrink-0" />
          <span>{source.gradeBadge}</span>
        </div>

        {/* Sacred Arabic + Phonetic + Certified Translation */}
        <div
          className={`mt-4 rounded-2xl border p-4 sm:p-5 ${
            darkMode
              ? 'bg-[#0B1314] border-[#213538]'
              : 'bg-white border-[#EAE2D3]'
          }`}
        >
          <p
            dir="rtl"
            lang="ar"
            className={`font-arabic text-right text-2xl sm:text-[26px] ${
              darkMode ? 'text-[#F6F1E7]' : 'text-[#0F3D3E]'
            }`}
          >
            {source.arabicText}
          </p>

          {source.phonetic && (
            <div
              className={`mt-3 rounded-xl px-3 py-2 text-xs ${
                darkMode ? 'bg-[#132225] text-[#EAD096]' : 'bg-[#FAF7F2] text-[#7A5B1E]'
              }`}
            >
              <span className="block text-[10px] font-bold uppercase tracking-wider opacity-70">
                Phonétique simplifiée :
              </span>
              {source.phonetic}
            </div>
          )}

          <div
            className={`my-3.5 h-px w-full ${
              darkMode ? 'bg-[#1F3134]' : 'bg-[#EFE9DC]'
            }`}
          />
          <p className="text-sm leading-relaxed italic">{source.frenchTranslation}</p>

          {source.dhikrTargetCount && (
            <button
              onClick={() => setReciteCount((c) => c + 1)}
              className={`mt-3.5 flex w-full items-center justify-center gap-1.5 rounded-xl border py-2 text-xs font-bold transition ${
                reciteCount >= source.dhikrTargetCount
                  ? 'border-emerald-600 bg-emerald-600 text-white'
                  : darkMode
                    ? 'border-[#2B4347] bg-[#152427] text-[#EAD096]'
                    : 'border-[#DED4BF] bg-[#FAF7F2] text-[#0F3D3E]'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>
                Compteur de récitation : {reciteCount} / {source.dhikrTargetCount}
              </span>
            </button>
          )}
        </div>

        {/* Scholarly Pedigree & Zero-Hallucination Proof */}
        <div className="mt-4 space-y-2.5 text-xs leading-relaxed">
          <div
            className={`rounded-xl p-3.5 ${
              darkMode ? 'bg-[#172629] text-[#C8D4D1]' : 'bg-[#F2EDE2] text-[#37423D]'
            }`}
          >
            <strong className="block font-semibold mb-1">
              Autorité académique & Commentaire :
            </strong>
            {source.scholarInfo}
          </div>

          <div
            className={`rounded-xl border px-3.5 py-2.5 ${
              darkMode
                ? 'border-[#253A3D] bg-[#0F191B] text-[#95A8A4]'
                : 'border-[#E5DEC9] bg-white/70 text-[#5C6660]'
            }`}
          >
            <strong className="font-semibold">Protocole Anti-Hallucination Nur : </strong>
            {source.methodologyNote}
          </div>
        </div>

        {/* Actions: Copy, PNG Studio, Audit Report */}
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <button
            onClick={handleCopy}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition ${
              darkMode
                ? 'bg-[#D8B56D] text-[#0B1314] hover:bg-[#E2C27E]'
                : 'bg-[#0F3D3E] text-white hover:bg-[#165254]'
            }`}
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? 'Copié' : 'Copier texte'}
          </button>

          {onOpenCardStudio && (
            <button
              onClick={() => {
                onClose();
                onOpenCardStudio(source);
              }}
              className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-semibold transition ${
                darkMode
                  ? 'border-[#D8B56D]/50 text-[#EAD096] hover:bg-white/5'
                  : 'border-[#0F3D3E]/30 text-[#0F3D3E] hover:bg-black/5'
              }`}
            >
              <ImageIcon className="h-3.5 w-3.5" />
              Carte PNG WhatsApp
            </button>
          )}

          <button
            onClick={() => {
              setShowReportForm(!showReportForm);
              setReportSubmitted(false);
            }}
            className={`ml-auto inline-flex items-center gap-1 rounded-xl px-2.5 py-2 text-xs font-medium transition ${
              darkMode
                ? 'text-[#9EB0AC] hover:bg-white/5'
                : 'text-[#5C6660] hover:bg-black/5'
            }`}
          >
            <Flag className="h-3.5 w-3.5" />
            Signaler
          </button>
        </div>

        {showReportForm && (
          <form
            onSubmit={handleReportSubmit}
            className={`mt-3 rounded-xl border p-3 text-xs animate-fade-up ${
              darkMode ? 'border-[#263C3F] bg-[#0B1314]' : 'border-[#E5DEC9] bg-white'
            }`}
          >
            {reportSubmitted ? (
              <p className="font-medium text-emerald-500">
                ✓ BarakAllâhu fîk. Signalement transmis à notre comité de relecture.
              </p>
            ) : (
              <>
                <label className="block font-semibold mb-1.5">
                  Boucle d’audit humain (diplômés en sciences islamiques) :
                </label>
                <input
                  type="text"
                  required
                  value={reportNote}
                  onChange={(e) => setReportNote(e.target.value)}
                  placeholder="Ex. Précision sur une traduction, voyelle ou école..."
                  className={`w-full rounded-lg border px-3 py-2 text-xs outline-none ${
                    darkMode
                      ? 'border-[#263C3F] bg-[#142224] text-white'
                      : 'border-[#DDD4C2] bg-[#FAF7F2] text-[#1B2421]'
                  }`}
                />
                <button
                  type="submit"
                  className="mt-2 rounded-lg bg-emerald-700 px-3 py-1.5 text-white font-semibold hover:bg-emerald-600"
                >
                  Envoyer pour vérification
                </button>
              </>
            )}
          </form>
        )}
      </div>
    </div>
  );
};
