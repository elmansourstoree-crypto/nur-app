import React, { useEffect, useState } from 'react';
import { X, HeartPulse, Sparkles, CheckCircle2, RotateCcw, ShieldCheck } from 'lucide-react';
import {
  CANONICAL_SOURCES,
  CanonicalSource,
  SOS_PROTOCOLS,
  SosProtocol,
} from '../data/canonicalCorpus';

interface SosSakinahModalProps {
  isOpen: boolean;
  darkMode: boolean;
  onClose: () => void;
  onOpenSource: (src: CanonicalSource) => void;
}

export const SosSakinahModal: React.FC<SosSakinahModalProps> = ({
  isOpen,
  darkMode,
  onClose,
  onOpenSource,
}) => {
  const [selectedProtocol, setSelectedProtocol] = useState<SosProtocol | null>(null);
  const [breathPhase, setBreathPhase] = useState<'Inspire (4s)' | 'Apaise (3s)' | 'Relâche (6s)'>('Inspire (4s)');
  const [dhikrCount, setDhikrCount] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setSelectedProtocol(null);
      setDhikrCount(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!selectedProtocol) return;
    setDhikrCount(0);
    let mounted = true;

    const runCycle = () => {
      if (!mounted) return;
      setBreathPhase('Inspire (4s)');
      setTimeout(() => {
        if (!mounted) return;
        setBreathPhase('Apaise (3s)');
        setTimeout(() => {
          if (!mounted) return;
          setBreathPhase('Relâche (6s)');
        }, 3000);
      }, 4000);
    };

    runCycle();
    const interval = setInterval(runCycle, 13000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [selectedProtocol]);

  if (!isOpen) return null;

  const source = selectedProtocol ? CANONICAL_SOURCES[selectedProtocol.sourceId] : null;
  const targetCount = source?.dhikrTargetCount || 3;
  const isCompleted = dhikrCount >= targetCount;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/65 backdrop-blur-xs p-0 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-[460px] max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border p-5 sm:p-6 shadow-2xl animate-fade-up ${
          darkMode
            ? 'border-[#274044] bg-[#0E191B] text-[#F3EFE8]'
            : 'border-[#E5DEC9] bg-[#FAF7F2] text-[#1B2421]'
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${
                darkMode
                  ? 'bg-[#D8B56D]/20 text-[#EAD096]'
                  : 'bg-[#0F3D3E] text-[#FAF7F2]'
              }`}
            >
              <HeartPulse className="h-3.5 w-3.5" />
              SOS Sakînah • Apaisement en 60 sec
            </span>
            <h3 className="font-editorial mt-2 text-2xl sm:text-[26px] font-semibold leading-tight">
              {selectedProtocol
                ? `${selectedProtocol.emoji} ${selectedProtocol.label}`
                : 'Que traverse ton cœur à cet instant précis ?'}
            </h3>
          </div>

          <button
            onClick={onClose}
            aria-label="Fermer SOS Sakînah"
            className="rounded-full p-2 opacity-70 hover:opacity-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* STEP 1: Choose immediate emotional state */}
        {!selectedProtocol ? (
          <div className="mt-4 space-y-2.5">
            <p className={`text-xs leading-relaxed ${darkMode ? 'text-[#9EB0AC]' : 'text-[#5C6660]'}`}>
              Choisis ton état du moment : Nur lance immédiatement la respiration et le refuge prophétique authentique adapté.
            </p>
            {SOS_PROTOCOLS.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedProtocol(p)}
                className={`flex w-full items-center gap-3.5 rounded-2xl border p-3.5 text-left transition ${
                  darkMode
                    ? 'border-[#21363A] bg-[#132225] hover:border-[#D8B56D]'
                    : 'border-[#E6DEC9] bg-white hover:border-[#0F3D3E]'
                }`}
              >
                <span className="text-2xl">{p.emoji}</span>
                <div>
                  <div className="text-sm font-bold">{p.label}</div>
                  <div className={`text-xs ${darkMode ? 'text-[#9EB0AC]' : 'text-[#5C6660]'}`}>
                    {p.subtitle}
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          /* STEP 2: Immersive 60-second Guided Relief */
          <div className="mt-4 space-y-4 animate-fade-up">
            {/* Animated Breathing Circle */}
            <div
              className={`flex flex-col items-center justify-center rounded-2xl border py-5 px-4 text-center ${
                darkMode
                  ? 'border-[#22393D] bg-[#0A1214]'
                  : 'border-[#E6DEC9] bg-white'
              }`}
            >
              <div
                className={`flex h-20 w-20 items-center justify-center rounded-full border-2 transition-all duration-1000 ${
                  breathPhase === 'Inspire (4s)'
                    ? 'scale-110 border-[#C5A059] bg-[#C5A059]/15'
                    : breathPhase === 'Apaise (3s)'
                      ? 'scale-105 border-emerald-500 bg-emerald-500/15'
                      : 'scale-90 border-[#0F3D3E] bg-[#0F3D3E]/10'
                }`}
              >
                <span className="text-[11px] font-bold">{breathPhase}</span>
              </div>
              <p className="mt-3 text-xs font-medium opacity-80">
                {selectedProtocol.breathingGuide}
              </p>
            </div>

            {/* Warm Reassurance */}
            <p className="text-xs sm:text-sm leading-relaxed font-medium">
              {selectedProtocol.reassuranceText}
            </p>

            {/* Sacred Refuge + Phonetic + Tactile Dhikr Counter */}
            {source && (
              <div
                className={`rounded-2xl border p-4 space-y-3 ${
                  darkMode
                    ? 'border-[#253D41] bg-[#132225]'
                    : 'border-[#E5DEC9] bg-white'
                }`}
              >
                <p
                  dir="rtl"
                  lang="ar"
                  className={`font-arabic text-right text-2xl ${
                    darkMode ? 'text-[#F8F3E8]' : 'text-[#0F3D3E]'
                  }`}
                >
                  {source.arabicText}
                </p>

                <div
                  className={`rounded-xl px-3 py-2 text-xs ${
                    darkMode ? 'bg-[#0B1314] text-[#EAD096]' : 'bg-[#FAF7F2] text-[#6E521C]'
                  }`}
                >
                  <span className="font-bold uppercase text-[10px] tracking-wider block opacity-75">
                    Prononciation phonétique :
                  </span>
                  {source.phonetic}
                </div>

                <p className="text-xs italic leading-relaxed opacity-90">
                  {source.frenchTranslation}
                </p>

                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => onOpenSource(source)}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold underline decoration-dotted"
                  >
                    <ShieldCheck className="h-3.5 w-3.5" />
                    {source.reference}
                  </button>
                </div>

                {/* Tactile Counter Button */}
                <button
                  onClick={() => setDhikrCount((c) => c + 1)}
                  className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 px-4 text-xs font-bold transition shadow-sm ${
                    isCompleted
                      ? 'bg-emerald-600 text-white'
                      : darkMode
                        ? 'bg-[#D8B56D] text-[#0B1314] active:scale-[0.98]'
                        : 'bg-[#0F3D3E] text-white active:scale-[0.98]'
                  }`}
                >
                  {isCompleted ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Apaisement accompli ({dhikrCount}/{targetCount}) • Qu’Allah t’apaise</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      <span>Toucher à chaque récitation ({dhikrCount} / {targetCount})</span>
                    </>
                  )}
                </button>
              </div>
            )}

            <p className="text-xs opacity-80 leading-relaxed">
              <strong>Geste concret :</strong> {selectedProtocol.immediateGesture}
            </p>

            <button
              onClick={() => setSelectedProtocol(null)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold opacity-75 hover:opacity-100"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Choisir un autre état émotionnel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
