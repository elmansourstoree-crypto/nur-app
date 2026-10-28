import React, { useState } from 'react';
import { ArrowRight, Sparkles, Compass, HeartHandshake, Zap, Sun, BookOpen, Info } from 'lucide-react';
import { EnergyMode, MADHHAB_OPTIONS, MadhhabId } from '../data/canonicalCorpus';
import { NurStarLogo, SacredPatternWatermark } from './NurOrnament';

export interface UserProfile {
  focusGoal: string;
  madhhab: MadhhabId;
  defaultEnergy: EnergyMode;
  serenityPauseMode: boolean;
  isNurPlus: boolean;
  scholarshipGranted: boolean;
}

interface OnboardingFlowProps {
  initialProfile: UserProfile;
  darkMode: boolean;
  onComplete: (profile: UserProfile) => void;
}

const FOCUS_GOALS = [
  {
    id: 'anxiety',
    title: 'Apaiser mon cœur & mon anxiété',
    subtitle: 'Trouver la Sakînah face au stress, au travail ou aux doutes.',
    icon: HeartHandshake,
  },
  {
    id: 'consistency',
    title: 'Garder un lien quotidien « sans flemme »',
    subtitle: '2 minutes vraies par jour, sans pression ni culpabilité.',
    icon: Sparkles,
  },
  {
    id: 'sources',
    title: 'Comprendre ma religion avec certitude',
    subtitle: 'Coran, hadiths authentifiés et avis d’écoles clairement sourcés.',
    icon: Compass,
  },
];

const ENERGY_CHOICES: { id: EnergyMode; label: string; badge: string; desc: string; icon: React.FC<{ className?: string }> }[] = [
  {
    id: 'spark_30s',
    label: 'Mode Étincelle',
    badge: '30 sec',
    desc: 'Pour les jours de fatigue totale : 1 verset, 1 phrase au cœur, 1 intention.',
    icon: Zap,
  },
  {
    id: 'light_2m',
    label: 'Mode Lumière (Recommandé)',
    badge: '2 min',
    desc: 'Avec ton café ou dans le métro : le texte, son histoire et le pas concret.',
    icon: Sun,
  },
  {
    id: 'depth_5m',
    label: 'Mode Profondeur',
    badge: '5 min',
    desc: 'Subtilités arabes, commentaires des savants et carnet d’introspection.',
    icon: BookOpen,
  },
];

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({
  initialProfile,
  darkMode,
  onComplete,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [focusGoal, setFocusGoal] = useState(initialProfile.focusGoal || 'anxiety');
  const [madhhab, setMadhhab] = useState<MadhhabId>(initialProfile.madhhab || 'maliki');
  const [defaultEnergy, setDefaultEnergy] = useState<EnergyMode>(initialProfile.defaultEnergy || 'light_2m');
  const [showMadhhabInfo, setShowMadhhabInfo] = useState(false);

  const finish = () => {
    onComplete({
      ...initialProfile,
      focusGoal,
      madhhab,
      defaultEnergy,
    });
  };

  return (
    <div
      className={`relative flex min-h-screen flex-col justify-between overflow-hidden px-5 py-6 sm:px-7 ${
        darkMode ? 'bg-[#0B1314] text-[#F3EFE8]' : 'bg-[#FAF7F2] text-[#1B2421]'
      }`}
    >
      <SacredPatternWatermark darkMode={darkMode} />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-xl ${
              darkMode ? 'bg-[#D8B56D]/15 text-[#D8B56D]' : 'bg-[#0F3D3E] text-[#FAF7F2]'
            }`}
          >
            <NurStarLogo className="h-5 w-5" />
          </div>
          <div>
            <span className="font-editorial text-xl font-bold tracking-tight">Nur</span>
            <span className="ml-1.5 font-arabic text-base opacity-75">نُور</span>
          </div>
        </div>

        <button
          onClick={finish}
          className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
            darkMode
              ? 'text-[#9EB0AC] hover:bg-white/5 hover:text-white'
              : 'text-[#5C6660] hover:bg-black/5 hover:text-[#1B2421]'
          }`}
        >
          Aperçu direct →
        </button>
      </div>

      {/* Progress Pearls */}
      <div className="relative z-10 mt-6 flex items-center gap-2">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              s === step
                ? darkMode
                  ? 'w-9 bg-[#D8B56D]'
                  : 'w-9 bg-[#0F3D3E]'
                : s < step
                  ? darkMode
                    ? 'w-4 bg-[#D8B56D]/50'
                    : 'w-4 bg-[#0F3D3E]/45'
                  : darkMode
                    ? 'w-4 bg-white/10'
                    : 'w-4 bg-black/10'
            }`}
          />
        ))}
        <span className={`ml-auto text-xs ${darkMode ? 'text-[#9EB0AC]' : 'text-[#5C6660]'}`}>
          Étape {step}/3 • 30 sec
        </span>
      </div>

      {/* Main Content */}
      <div className="relative z-10 my-auto py-6 animate-fade-up" key={step}>
        {step === 1 && (
          <div>
            <p
              className={`text-xs font-semibold uppercase tracking-widest ${
                darkMode ? 'text-[#D8B56D]' : 'text-[#9A7836]'
              }`}
            >
              As-salâmu ‘alaykum • Bienvenue
            </p>
            <h1 className="font-editorial mt-2 text-3xl sm:text-[34px] font-semibold leading-[1.15]">
              Qu’est-ce qui ferait le plus de bien à ton cœur aujourd’hui ?
            </h1>
            <p className={`mt-2 text-sm leading-relaxed ${darkMode ? 'text-[#9EB0AC]' : 'text-[#5C6660]'}`}>
              Nur n’est pas là pour te juger, mais pour éclairer ton quotidien avec des sources authentiques.
            </p>

            <div className="mt-6 space-y-3">
              {FOCUS_GOALS.map((g) => {
                const Icon = g.icon;
                const active = focusGoal === g.id;
                return (
                  <button
                    key={g.id}
                    onClick={() => setFocusGoal(g.id)}
                    className={`w-full rounded-2xl border p-4 text-left transition-all ${
                      active
                        ? darkMode
                          ? 'border-[#D8B56D] bg-[#162729] shadow-md'
                          : 'border-[#0F3D3E] bg-white shadow-sm ring-1 ring-[#0F3D3E]/15'
                        : darkMode
                          ? 'border-[#1F3134] bg-[#111C1E]/80 hover:border-[#2E484C]'
                          : 'border-[#E6DEC8] bg-white/60 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div
                        className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                          active
                            ? darkMode
                              ? 'bg-[#D8B56D] text-[#0B1314]'
                              : 'bg-[#0F3D3E] text-white'
                            : darkMode
                              ? 'bg-white/5 text-[#9EB0AC]'
                              : 'bg-[#F0EBE0] text-[#4C5852]'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold">{g.title}</div>
                        <div
                          className={`mt-0.5 text-xs leading-relaxed ${
                            darkMode ? 'text-[#9EB0AC]' : 'text-[#5C6660]'
                          }`}
                        >
                          {g.subtitle}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="flex items-center justify-between">
              <p
                className={`text-xs font-semibold uppercase tracking-widest ${
                  darkMode ? 'text-[#D8B56D]' : 'text-[#9A7836]'
                }`}
              >
                Rigueur & Adab al-Ikhtilâf
              </p>
              <button
                onClick={() => setShowMadhhabInfo(!showMadhhabInfo)}
                className={`inline-flex items-center gap-1 text-xs underline decoration-dotted ${
                  darkMode ? 'text-[#D8B56D]' : 'text-[#0F3D3E]'
                }`}
              >
                <Info className="h-3.5 w-3.5" /> Pourquoi ce choix ?
              </button>
            </div>

            <h1 className="font-editorial mt-2 text-3xl font-semibold leading-[1.15]">
              Quel repère juridique souhaites-tu privilégier ?
            </h1>
            <p className={`mt-1.5 text-xs leading-relaxed ${darkMode ? 'text-[#9EB0AC]' : 'text-[#5C6660]'}`}>
              Nur adapte ses réponses pratiques à ton école tout en signalant avec respect les avis reconnus.
            </p>

            {showMadhhabInfo && (
              <div
                className={`mt-3 rounded-xl border p-3 text-xs leading-relaxed ${
                  darkMode
                    ? 'border-[#284044] bg-[#142326] text-[#C8D4D1]'
                    : 'border-[#E0D6BE] bg-[#F4EFE4] text-[#3B4742]'
                }`}
              >
                Les 4 écoles sunnites (Malékite, Hanafite, Chaféite, Hanbalite) sont toutes légitimes et reconnues. Si tu ne sais pas laquelle choisir, sélectionne <strong>« Avis majoritaire »</strong> !
              </div>
            )}

            <div className="mt-4 space-y-2.5">
              {MADHHAB_OPTIONS.map((m) => {
                const active = madhhab === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setMadhhab(m.id)}
                    className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                      active
                        ? darkMode
                          ? 'border-[#D8B56D] bg-[#162729]'
                          : 'border-[#0F3D3E] bg-white ring-1 ring-[#0F3D3E]/15'
                        : darkMode
                          ? 'border-[#1F3134] bg-[#111C1E]/80 hover:border-[#2E484C]'
                          : 'border-[#E6DEC8] bg-white/60 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">{m.label}</span>
                      <span
                        className={`text-[11px] ${
                          darkMode ? 'text-[#8FA39E]' : 'text-[#6D7771]'
                        }`}
                      >
                        {m.regionHint}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <p
              className={`text-xs font-semibold uppercase tracking-widest ${
                darkMode ? 'text-[#D8B56D]' : 'text-[#9A7836]'
              }`}
            >
              Philosophie « Sans Flemme »
            </p>
            <h1 className="font-editorial mt-2 text-3xl font-semibold leading-[1.15]">
              Dans ta pire journée, combien de temps as-tu vraiment ?
            </h1>
            <p className={`mt-2 text-sm leading-relaxed ${darkMode ? 'text-[#9EB0AC]' : 'text-[#5C6660]'}`}>
              « Les œuvres les plus aimées d’Allah sont les plus régulières, même si elles sont petites » (Bukhârî 6464). Tu pourras changer de vitesse à chaque instant.
            </p>

            <div className="mt-5 space-y-3">
              {ENERGY_CHOICES.map((e) => {
                const Icon = e.icon;
                const active = defaultEnergy === e.id;
                return (
                  <button
                    key={e.id}
                    onClick={() => setDefaultEnergy(e.id)}
                    className={`w-full rounded-2xl border p-4 text-left transition ${
                      active
                        ? darkMode
                          ? 'border-[#D8B56D] bg-[#162729]'
                          : 'border-[#0F3D3E] bg-white ring-1 ring-[#0F3D3E]/15'
                        : darkMode
                          ? 'border-[#1F3134] bg-[#111C1E]/80'
                          : 'border-[#E6DEC8] bg-white/60 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div
                          className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                            active
                              ? darkMode
                                ? 'bg-[#D8B56D] text-[#0B1314]'
                                : 'bg-[#0F3D3E] text-white'
                              : darkMode
                                ? 'bg-white/5 text-[#9EB0AC]'
                                : 'bg-[#F0EBE0] text-[#4C5852]'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold">{e.label}</div>
                          <p
                            className={`mt-0.5 text-xs leading-relaxed ${
                              darkMode ? 'text-[#9EB0AC]' : 'text-[#5C6660]'
                            }`}
                          >
                            {e.desc}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                          active
                            ? darkMode
                              ? 'bg-[#D8B56D]/20 text-[#D8B56D]'
                              : 'bg-[#0F3D3E]/10 text-[#0F3D3E]'
                            : darkMode
                              ? 'bg-white/5 text-[#9EB0AC]'
                              : 'bg-[#EFE9DC] text-[#5C6660]'
                        }`}
                      >
                        {e.badge}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="relative z-10 flex items-center gap-3 pt-2">
        {step > 1 && (
          <button
            onClick={() => setStep((step - 1) as 1 | 2)}
            className={`rounded-2xl border px-4 py-3.5 text-sm font-semibold transition ${
              darkMode
                ? 'border-[#253A3D] text-[#C8D4D1] hover:bg-white/5'
                : 'border-[#DDD3BF] text-[#3E4A44] hover:bg-black/5'
            }`}
          >
            Retour
          </button>
        )}
        <button
          onClick={() => {
            if (step < 3) setStep((step + 1) as 2 | 3);
            else finish();
          }}
          className={`flex flex-1 items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-semibold shadow-lg transition ${
            darkMode
              ? 'bg-[#D8B56D] text-[#0B1314] hover:bg-[#E2C27D]'
              : 'bg-[#0F3D3E] text-[#FAF7F2] hover:bg-[#154F50]'
          }`}
        >
          <span>{step < 3 ? 'Continuer' : 'Ouvrir ma première Lumière'}</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
