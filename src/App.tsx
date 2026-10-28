import React, { useEffect, useState } from 'react';
import {
  Sun,
  Moon,
  Sparkles,
  MessageCircleHeart,
  ShieldCheck,
  BookMarked,
  X,
  HeartPulse,
  Smartphone,
} from 'lucide-react';
import {
  CanonicalSource,
  EnergyMode,
} from './data/canonicalCorpus';
import { NurStarLogo, SacredPatternWatermark } from './components/NurOrnament';
import { OnboardingFlow, UserProfile } from './components/OnboardingFlow';
import { TodayView } from './components/TodayView';
import { AskView } from './components/AskView';
import { FactCheckView } from './components/FactCheckView';
import { GardenView, ReflectionEntry, SavedBookmark } from './components/GardenView';
import { SourceProvenanceDrawer } from './components/SourceProvenanceDrawer';
import { SosSakinahModal } from './components/SosSakinahModal';
import { LightCardStudioModal } from './components/LightCardStudioModal';

type MainTab = 'today' | 'ask' | 'verify' | 'garden';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const DEFAULT_PROFILE: UserProfile = {
  focusGoal: 'anxiety',
  madhhab: 'maliki',
  defaultEnergy: 'light_2m',
  serenityPauseMode: false,
  isNurPlus: false,
  scholarshipGranted: false,
};

const INITIAL_REFLECTIONS: ReflectionEntry[] = [
  {
    id: 'ref_init_1',
    lessonTitle: 'Une seule épreuve, deux issues lumineuses',
    prompt: 'Quelle facilité cachée avais-tu découverte dans une épreuve passée ?',
    text: 'Me rappeler que ma valeur auprès d’Allah dépend de ma sincérité du jour, pas de la perfection.',
    createdAt: 'Hier',
  },
];

const INITIAL_BOOKMARKS: SavedBookmark[] = [
  {
    id: 'lesson_consistency',
    title: 'Pourquoi 2 minutes sincères valent mieux que 2 heures abandonnées',
    category: 'Lumière du jour',
    preview: '« Les œuvres les plus aimées d’Allah sont les plus régulières, même si elles sont peu nombreuses. » (Bukhârî 6464)',
    savedAt: 'Hier',
  },
];

export function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('nur_dark_mode') === 'true';
  });

  const [hasOnboarded, setHasOnboarded] = useState<boolean>(() => {
    return localStorage.getItem('nur_onboarded') === 'true';
  });

  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('nur_profile');
    if (saved) {
      try {
        return { ...DEFAULT_PROFILE, ...JSON.parse(saved) };
      } catch {
        return DEFAULT_PROFILE;
      }
    }
    return DEFAULT_PROFILE;
  });

  const [showPhonetic, setShowPhonetic] = useState<boolean>(() => {
    const saved = localStorage.getItem('nur_show_phonetic');
    return saved === null ? true : saved === 'true';
  });

  const [energyMode, setEnergyMode] = useState<EnergyMode>(profile.defaultEnergy);
  const [activeTab, setActiveTab] = useState<MainTab>('today');
  const [gardenInitialSubTab, setGardenInitialSubTab] = useState<'saved' | 'settings' | 'waqf'>('saved');

  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('q_wudu_touch');
  const [freeQuestionsLeft, setFreeQuestionsLeft] = useState<number>(4);

  const [completedNiyyahIds, setCompletedNiyyahIds] = useState<string[]>([]);
  const [showHaloModal, setShowHaloModal] = useState<boolean>(false);
  const [showSosModal, setShowSosModal] = useState<boolean>(false);
  const [showInstallModal, setShowInstallModal] = useState<boolean>(false);
  const [deferredInstallPrompt, setDeferredInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  const [bookmarks, setBookmarks] = useState<SavedBookmark[]>(() => {
    const saved = localStorage.getItem('nur_bookmarks');
    return saved ? JSON.parse(saved) : INITIAL_BOOKMARKS;
  });

  const [reflections, setReflections] = useState<ReflectionEntry[]>(() => {
    const saved = localStorage.getItem('nur_reflections');
    return saved ? JSON.parse(saved) : INITIAL_REFLECTIONS;
  });

  const [inspectedSource, setInspectedSource] = useState<CanonicalSource | null>(null);
  const [cardStudioSource, setCardStudioSource] = useState<CanonicalSource | null>(null);

  useEffect(() => {
    localStorage.setItem('nur_dark_mode', String(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('nur_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('nur_show_phonetic', String(showPhonetic));
  }, [showPhonetic]);

  useEffect(() => {
    localStorage.setItem('nur_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('nur_reflections', JSON.stringify(reflections));
  }, [reflections]);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredInstallPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleOnboardingComplete = (nextProfile: UserProfile) => {
    setProfile(nextProfile);
    setEnergyMode(nextProfile.defaultEnergy);
    setHasOnboarded(true);
    localStorage.setItem('nur_onboarded', 'true');
  };

  const handleToggleNiyyah = (lessonId: string) => {
    setCompletedNiyyahIds((prev) =>
      prev.includes(lessonId) ? prev.filter((id) => id !== lessonId) : [...prev, lessonId]
    );
  };

  const handleToggleBookmark = (
    id: string,
    title: string,
    category: 'Lumière du jour' | 'Réponse sourcée',
    preview: string
  ) => {
    setBookmarks((prev) => {
      if (prev.some((b) => b.id === id)) {
        return prev.filter((b) => b.id !== id);
      }
      return [
        {
          id,
          title,
          category,
          preview,
          savedAt: 'À l’instant',
        },
        ...prev,
      ];
    });
  };

  const handleSaveReflection = (lessonTitle: string, prompt: string, text: string) => {
    const entry: ReflectionEntry = {
      id: `ref_${Date.now()}`,
      lessonTitle,
      prompt,
      text,
      createdAt: 'Aujourd’hui',
    };
    setReflections((prev) => [entry, ...prev]);
  };

  const handleAddQuickReflection = (text: string) => {
    const entry: ReflectionEntry = {
      id: `ref_${Date.now()}`,
      lessonTitle: 'Pensée libre',
      prompt: '',
      text,
      createdAt: 'Aujourd’hui',
    };
    setReflections((prev) => [entry, ...prev]);
  };

  const handleTriggerPwaInstall = async () => {
    if (deferredInstallPrompt) {
      await deferredInstallPrompt.prompt();
      setDeferredInstallPrompt(null);
    } else {
      setShowInstallModal(true);
    }
  };

  const haloPearlsCount = 4 + completedNiyyahIds.length;

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-300 ${
        darkMode ? 'bg-[#070D0E] text-[#F3EFE8]' : 'bg-[#EDE7DA] text-[#1B2421]'
      }`}
    >
      {/* Mobile-First Centered Sanctuary Container */}
      <div
        className={`relative mx-auto flex min-h-screen w-full max-w-[470px] flex-col shadow-2xl ${
          darkMode
            ? 'bg-[#0B1314] border-x border-[#192A2D]'
            : 'bg-[#FAF7F2] border-x border-[#E2D9C6]'
        }`}
      >
        {!hasOnboarded ? (
          <OnboardingFlow
            initialProfile={profile}
            darkMode={darkMode}
            onComplete={handleOnboardingComplete}
          />
        ) : (
          <>
            <SacredPatternWatermark darkMode={darkMode} />

            {/* Sticky Top App Header */}
            <header
              className={`sticky top-0 z-30 flex items-center justify-between border-b px-3.5 py-3 backdrop-blur-md ${
                darkMode
                  ? 'border-[#1C2E31] bg-[#0B1314]/90'
                  : 'border-[#EAE2D1] bg-[#FAF7F2]/90'
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-xl ${
                    darkMode
                      ? 'bg-[#D8B56D]/15 text-[#D8B56D]'
                      : 'bg-[#0F3D3E] text-[#FAF7F2]'
                  }`}
                >
                  <NurStarLogo className="h-4 w-4" />
                </div>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-editorial text-xl font-bold leading-none">Nur</span>
                    <span className="font-arabic text-xs opacity-75">نُور</span>
                  </div>
                  <button
                    onClick={handleTriggerPwaInstall}
                    className={`inline-flex items-center gap-1 text-[10px] underline decoration-dotted ${
                      darkMode ? 'text-[#9EB0AC]' : 'text-[#5C6660]'
                    }`}
                  >
                    <Smartphone className="h-2.5 w-2.5" />
                    Installer sur mobile
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {/* SOS Sakînah 60s Immediate Emergency Pill */}
                <button
                  onClick={() => setShowSosModal(true)}
                  className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1.5 text-xs font-bold transition shadow-xs ${
                    darkMode
                      ? 'border-rose-500/40 bg-rose-950/50 text-rose-200 hover:bg-rose-900/60'
                      : 'border-rose-200 bg-rose-50 text-rose-900 hover:bg-rose-100'
                  }`}
                >
                  <HeartPulse className="h-3.5 w-3.5 text-rose-500" />
                  <span>SOS 60s</span>
                </button>

                {/* Cumulative Halo of Constancy */}
                <button
                  onClick={() => setShowHaloModal(true)}
                  className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1.5 text-xs font-bold transition ${
                    darkMode
                      ? 'border-[#D8B56D]/40 bg-[#162729] text-[#EAD096]'
                      : 'border-[#E2D3B1] bg-[#FBF5E8] text-[#7E5D1F]'
                  }`}
                >
                  <span className="h-2 w-2 rounded-full bg-[#C5A059] animate-halo" />
                  <span>{haloPearlsCount}</span>
                </button>

                {/* Day / Night Mode Toggle */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  aria-label={darkMode ? 'Passer en mode jour Subh' : 'Passer en mode nuit Layl'}
                  className={`flex h-8 w-8 items-center justify-center rounded-full border transition ${
                    darkMode
                      ? 'border-[#23383B] bg-[#121E20] text-[#D8B56D]'
                      : 'border-[#E5DEC9] bg-white text-[#0F3D3E]'
                  }`}
                >
                  {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </button>
              </div>
            </header>

            {/* Main Scrollable Content Area */}
            <main className="relative z-10 flex-1 px-4 pt-4 pb-24">
              {activeTab === 'today' && (
                <TodayView
                  darkMode={darkMode}
                  energyMode={energyMode}
                  onChangeEnergyMode={setEnergyMode}
                  serenityPauseMode={profile.serenityPauseMode}
                  showPhonetic={showPhonetic}
                  onTogglePhonetic={() => setShowPhonetic((p) => !p)}
                  completedNiyyahIds={completedNiyyahIds}
                  onToggleNiyyah={handleToggleNiyyah}
                  bookmarkedIds={bookmarks.map((b) => b.id)}
                  onToggleBookmark={handleToggleBookmark}
                  onSaveReflection={handleSaveReflection}
                  onOpenSource={(src) => setInspectedSource(src)}
                  onOpenCardStudio={(src) => setCardStudioSource(src)}
                  onAskFollowup={(scenarioId) => {
                    setSelectedScenarioId(scenarioId);
                    setActiveTab('ask');
                  }}
                />
              )}

              {activeTab === 'ask' && (
                <AskView
                  darkMode={darkMode}
                  madhhab={profile.madhhab}
                  energyMode={energyMode}
                  showPhonetic={showPhonetic}
                  onChangeMadhhab={(m) => setProfile({ ...profile, madhhab: m })}
                  isNurPlus={profile.isNurPlus}
                  freeQuestionsLeft={freeQuestionsLeft}
                  onConsumeQuestion={() =>
                    setFreeQuestionsLeft((prev) => Math.max(0, prev - 1))
                  }
                  selectedScenarioId={selectedScenarioId}
                  onSelectScenarioId={setSelectedScenarioId}
                  bookmarkedIds={bookmarks.map((b) => b.id)}
                  onToggleBookmark={handleToggleBookmark}
                  onOpenSource={(src) => setInspectedSource(src)}
                  onOpenCardStudio={(src) => setCardStudioSource(src)}
                  onOpenUpgradeOrScholarship={() => {
                    setGardenInitialSubTab('waqf');
                    setActiveTab('garden');
                  }}
                />
              )}

              {activeTab === 'verify' && (
                <FactCheckView
                  darkMode={darkMode}
                  showPhonetic={showPhonetic}
                  onOpenSource={(src) => setInspectedSource(src)}
                  onOpenCardStudio={(src) => setCardStudioSource(src)}
                />
              )}

              {activeTab === 'garden' && (
                <GardenView
                  key={gardenInitialSubTab}
                  darkMode={darkMode}
                  profile={profile}
                  onUpdateProfile={setProfile}
                  bookmarks={bookmarks}
                  onRemoveBookmark={(id) =>
                    setBookmarks((prev) => prev.filter((b) => b.id !== id))
                  }
                  reflections={reflections}
                  onAddQuickReflection={handleAddQuickReflection}
                  onRemoveReflection={(id) =>
                    setReflections((prev) => prev.filter((r) => r.id !== id))
                  }
                  onReplayOnboarding={() => setHasOnboarded(false)}
                  initialSubTab={gardenInitialSubTab}
                />
              )}
            </main>

            {/* Bottom Mobile Sanctuary Navigation */}
            <nav
              aria-label="Navigation principale Nur"
              className={`fixed bottom-0 left-1/2 z-30 w-full max-w-[470px] -translate-x-1/2 border-t px-2 py-2 backdrop-blur-md ${
                darkMode
                  ? 'border-[#1E3134] bg-[#0C1618]/95'
                  : 'border-[#E6DEC9] bg-white/95'
              }`}
            >
              <div className="grid grid-cols-4 gap-1">
                {[
                  { id: 'today' as MainTab, label: 'Aujourd’hui', icon: Sparkles },
                  { id: 'ask' as MainTab, label: 'Demander', icon: MessageCircleHeart },
                  { id: 'verify' as MainTab, label: 'Vérifier', icon: ShieldCheck },
                  { id: 'garden' as MainTab, label: 'Mon Jardin', icon: BookMarked },
                ].map((nav) => {
                  const Icon = nav.icon;
                  const active = activeTab === nav.id;
                  return (
                    <button
                      key={nav.id}
                      onClick={() => {
                        if (nav.id === 'garden') setGardenInitialSubTab('saved');
                        setActiveTab(nav.id);
                      }}
                      className={`flex flex-col items-center justify-center gap-1 rounded-2xl py-2 transition ${
                        active
                          ? darkMode
                            ? 'bg-[#18292C] text-[#D8B56D] font-bold'
                            : 'bg-[#EEF5F2] text-[#0F3D3E] font-bold'
                          : darkMode
                            ? 'text-[#879B97] hover:text-[#D0DCDA]'
                            : 'text-[#67726C] hover:text-[#1B2421]'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-[11px] leading-none">{nav.label}</span>
                    </button>
                  );
                })}
              </div>
            </nav>
          </>
        )}

        {/* Halo de Constance Modal */}
        {showHaloModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4"
            onClick={() => setShowHaloModal(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-[390px] rounded-3xl border p-5 shadow-2xl animate-fade-up ${
                darkMode
                  ? 'border-[#284044] bg-[#121E20] text-[#F3EFE8]'
                  : 'border-[#E6DEC9] bg-[#FAF7F2] text-[#1B2421]'
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C5A059]">
                  ✦ Halo de Constance • Zéro Culpabilité
                </span>
                <button
                  onClick={() => setShowHaloModal(false)}
                  className="rounded-full p-1 opacity-60 hover:opacity-100"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <h3 className="font-editorial mt-2 text-2xl font-semibold">
                Ici, ta lumière ne retombe jamais à zéro.
              </h3>
              <p className="mt-2 text-xs leading-relaxed opacity-85">
                Chaque instant passé sur Nur allume une perle durable dans ton Halo ({haloPearlsCount} perles allumées), sans jamais punir une absence.
              </p>

              <div className="mt-4 flex items-center justify-center gap-2 py-2">
                {Array.from({ length: Math.min(7, haloPearlsCount) }).map((_, i) => (
                  <div
                    key={i}
                    className="h-4 w-4 rounded-full bg-gradient-to-tr from-[#0F3D3E] to-[#D8B56D] shadow-sm"
                  />
                ))}
              </div>

              <p className="mt-2 text-[11px] italic opacity-75 text-center">
                « Les œuvres les plus aimées d’Allah sont les plus régulières, même si elles sont peu nombreuses. » (Bukhârî 6464)
              </p>
            </div>
          </div>
        )}

        {/* Mobile PWA Install Instructions Modal */}
        {showInstallModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            onClick={() => setShowInstallModal(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-[400px] rounded-3xl border p-5 shadow-2xl space-y-3 animate-fade-up ${
                darkMode
                  ? 'border-[#284044] bg-[#121E20] text-[#F3EFE8]'
                  : 'border-[#E6DEC9] bg-[#FAF7F2] text-[#1B2421]'
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C5A059]">
                  📱 Application Mobile Native (PWA)
                </span>
                <button
                  onClick={() => setShowInstallModal(false)}
                  className="rounded-full p-1 opacity-60 hover:opacity-100"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <h3 className="font-editorial text-2xl font-semibold">
                Installer Nur sur ton écran d’accueil
              </h3>
              <div className="space-y-2 text-xs leading-relaxed opacity-90">
                <p>
                  <strong>Sur iPhone (Safari) :</strong> Appuie sur l’icône <strong>Partager</strong> en bas de l’écran, puis sur <strong>« Sur l’écran d’accueil »</strong>.
                </p>
                <p>
                  <strong>Sur Android (Chrome) :</strong> Appuie sur le menu <strong>⋮</strong> en haut à droite, puis sur <strong>« Installer l’application »</strong>.
                </p>
                <p className="opacity-70 pt-1">
                  Nur s’ouvrira alors en plein écran, sans barre de navigateur, avec son icône dédiée et un cache hors-ligne.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SOS Sakînah 60s Emergency Modal */}
        <SosSakinahModal
          isOpen={showSosModal}
          darkMode={darkMode}
          onClose={() => setShowSosModal(false)}
          onOpenSource={(src) => setInspectedSource(src)}
        />

        {/* Studio Cartes de Lumière PNG */}
        <LightCardStudioModal
          source={cardStudioSource}
          darkMode={darkMode}
          onClose={() => setCardStudioSource(null)}
        />

        {/* Global Source Provenance Drawer */}
        <SourceProvenanceDrawer
          source={inspectedSource}
          darkMode={darkMode}
          onClose={() => setInspectedSource(null)}
          onOpenCardStudio={(src) => setCardStudioSource(src)}
        />
      </div>
    </div>
  );
}

export default App;
