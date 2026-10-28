import React, { useEffect, useState } from 'react';
import {
  Zap,
  Sun,
  BookOpen,
  Bookmark,
  ShieldCheck,
  CheckCircle2,
  Play,
  Pause,
  MessageCircleHeart,
  Sparkles,
  PenLine,
  Flower2,
  Image as ImageIcon,
  Compass,
  Languages,
} from 'lucide-react';
import {
  CANONICAL_SOURCES,
  CanonicalSource,
  DAILY_LESSONS,
  EnergyMode,
  GUIDED_TRACKS,
} from '../data/canonicalCorpus';

interface TodayViewProps {
  darkMode: boolean;
  energyMode: EnergyMode;
  onChangeEnergyMode: (mode: EnergyMode) => void;
  serenityPauseMode: boolean;
  showPhonetic: boolean;
  onTogglePhonetic: () => void;
  completedNiyyahIds: string[];
  onToggleNiyyah: (lessonId: string) => void;
  bookmarkedIds: string[];
  onToggleBookmark: (id: string, title: string, category: 'Lumière du jour' | 'Réponse sourcée', preview: string) => void;
  onSaveReflection: (lessonTitle: string, prompt: string, text: string) => void;
  onOpenSource: (source: CanonicalSource) => void;
  onOpenCardStudio: (source: CanonicalSource) => void;
  onAskFollowup: (scenarioId: string) => void;
}

export const TodayView: React.FC<TodayViewProps> = ({
  darkMode,
  energyMode,
  onChangeEnergyMode,
  serenityPauseMode,
  showPhonetic,
  onTogglePhonetic,
  completedNiyyahIds,
  onToggleNiyyah,
  bookmarkedIds,
  onToggleBookmark,
  onSaveReflection,
  onOpenSource,
  onOpenCardStudio,
  onAskFollowup,
}) => {
  const [sectionMode, setSectionMode] = useState<'daily' | 'tracks'>('daily');
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(0);
  const [selectedTrackId, setSelectedTrackId] = useState(GUIDED_TRACKS[0].id);
  const [completedTrackStepKeys, setCompletedTrackStepKeys] = useState<string[]>(() => {
    const saved = localStorage.getItem('nur_track_steps');
    return saved ? JSON.parse(saved) : ['track_serenity:1'];
  });

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [reflectionText, setReflectionText] = useState('');
  const [reflectionSavedToast, setReflectionSavedToast] = useState(false);

  const lesson = DAILY_LESSONS[selectedLessonIndex];
  const primarySource = CANONICAL_SOURCES[lesson.primarySourceId];
  const secondarySource = CANONICAL_SOURCES[lesson.secondarySourceId];
  const isNiyyahDone = completedNiyyahIds.includes(lesson.id);
  const isBookmarked = bookmarkedIds.includes(lesson.id);

  useEffect(() => {
    localStorage.setItem('nur_track_steps', JSON.stringify(completedTrackStepKeys));
  }, [completedTrackStepKeys]);

  useEffect(() => {
    setIsPlayingAudio(false);
    setAudioProgress(0);
  }, [selectedLessonIndex]);

  useEffect(() => {
    if (!isPlayingAudio) return;
    const interval = setInterval(() => {
      setAudioProgress((prev) => {
        if (prev >= 100) {
          setIsPlayingAudio(false);
          return 0;
        }
        return prev + 2.5;
      });
    }, 350);
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  const handleReflectionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reflectionText.trim()) return;
    onSaveReflection(lesson.title, lesson.modes.depth_5m.reflectionPrompt, reflectionText.trim());
    setReflectionText('');
    setReflectionSavedToast(true);
    setTimeout(() => setReflectionSavedToast(false), 2600);
  };

  const toggleTrackStep = (key: string) => {
    setCompletedTrackStepKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const activeTrack = GUIDED_TRACKS.find((t) => t.id === selectedTrackId) || GUIDED_TRACKS[0];

  return (
    <div className="space-y-4 pb-6 animate-fade-up">
      {/* Gentle Serenity Mode Banner */}
      {serenityPauseMode && (
        <div
          className={`flex items-start gap-3 rounded-2xl border px-4 py-3 text-xs leading-relaxed ${
            darkMode
              ? 'border-[#D8B56D]/30 bg-[#182729] text-[#EAE2D3]'
              : 'border-[#E6D6B5] bg-[#FCF7EC] text-[#5B4721]'
          }`}
        >
          <Flower2 className="mt-0.5 h-4 w-4 shrink-0 text-[#C5A059]" />
          <div>
            <strong className="font-semibold">Mode Pause Sérénité actif :</strong> Ton accompagnement est adapté vers le Dhikr du cœur et l’écoute apaisante, sans aucun rappel rituel inadapté.
          </div>
        </div>
      )}

      {/* Top Mode Toggle: Lumière du jour vs Mini-Parcours Guidés */}
      <div className="flex items-center justify-between gap-2">
        <div
          className={`inline-flex rounded-full border p-1 ${
            darkMode ? 'border-[#213538] bg-[#111C1E]' : 'border-[#E5DEC9] bg-[#EFE9DC]'
          }`}
        >
          <button
            onClick={() => setSectionMode('daily')}
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
              sectionMode === 'daily'
                ? darkMode
                  ? 'bg-[#D8B56D] text-[#0B1314]'
                  : 'bg-[#0F3D3E] text-white'
                : 'opacity-75 hover:opacity-100'
            }`}
          >
            <Sun className="h-3.5 w-3.5" />
            Lumière du jour
          </button>
          <button
            onClick={() => setSectionMode('tracks')}
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
              sectionMode === 'tracks'
                ? darkMode
                  ? 'bg-[#D8B56D] text-[#0B1314]'
                  : 'bg-[#0F3D3E] text-white'
                : 'opacity-75 hover:opacity-100'
            }`}
          >
            <Compass className="h-3.5 w-3.5" />
            Parcours guidés
          </button>
        </div>

        {/* Global Phonetic Quick Pill */}
        <button
          onClick={onTogglePhonetic}
          className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1.5 text-[11px] font-semibold transition ${
            showPhonetic
              ? darkMode
                ? 'border-[#D8B56D]/50 bg-[#17282B] text-[#EAD096]'
                : 'border-[#0F3D3E]/30 bg-white text-[#0F3D3E]'
              : darkMode
                ? 'border-[#213538] text-[#859995]'
                : 'border-[#E5DEC9] text-[#6A756F]'
          }`}
        >
          <Languages className="h-3.5 w-3.5" />
          <span>Phonétique {showPhonetic ? 'ON' : 'OFF'}</span>
        </button>
      </div>

      {/* =========================================================
          MODE B: GUIDED MICRO-TRACKS (5 JOURS SANS PRESSION)
         ========================================================= */}
      {sectionMode === 'tracks' ? (
        <div className="space-y-4 animate-fade-up">
          <div className="grid grid-cols-1 gap-2.5">
            {GUIDED_TRACKS.map((tr) => {
              const active = tr.id === activeTrack.id;
              return (
                <button
                  key={tr.id}
                  onClick={() => setSelectedTrackId(tr.id)}
                  className={`rounded-2xl border p-4 text-left transition ${
                    active
                      ? darkMode
                        ? 'border-[#D8B56D] bg-[#152528]'
                        : 'border-[#0F3D3E] bg-white ring-1 ring-[#0F3D3E]/15'
                      : darkMode
                        ? 'border-[#203336] bg-[#111C1E]'
                        : 'border-[#E6DEC9] bg-white/65'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-editorial text-xl font-semibold">{tr.title}</span>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                        darkMode
                          ? 'bg-[#D8B56D]/20 text-[#EAD096]'
                          : 'bg-[#E8F1EE] text-[#0F3D3E]'
                      }`}
                    >
                      {tr.durationBadge}
                    </span>
                  </div>
                  <p className={`mt-1 text-xs ${darkMode ? 'text-[#9EB0AC]' : 'text-[#5C6660]'}`}>
                    {tr.subtitle}
                  </p>
                </button>
              );
            })}
          </div>

          <div
            className={`rounded-3xl border p-5 space-y-3 ${
              darkMode ? 'border-[#223639] bg-[#121E20]' : 'border-[#E6DEC9] bg-white'
            }`}
          >
            <h3 className="text-xs font-bold uppercase tracking-wider opacity-75">
              Étapes de ton parcours (à ton rythme, zéro date limite) :
            </h3>

            {activeTrack.steps.map((st) => {
              const stepKey = `${activeTrack.id}:${st.day}`;
              const isDone = completedTrackStepKeys.includes(stepKey);
              const src = CANONICAL_SOURCES[st.sourceId];

              return (
                <div
                  key={stepKey}
                  className={`rounded-2xl border p-4 space-y-2.5 transition ${
                    isDone
                      ? darkMode
                        ? 'border-emerald-800/60 bg-emerald-950/20'
                        : 'border-emerald-200 bg-emerald-50/50'
                      : darkMode
                        ? 'border-[#23383B] bg-[#0C1517]'
                        : 'border-[#EAE2D2] bg-[#FAF7F2]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#C5A059]">
                        Étape {st.day} • 2 min
                      </span>
                      <h4 className="font-bold text-sm mt-0.5">{st.title}</h4>
                    </div>
                    <button
                      onClick={() => toggleTrackStep(stepKey)}
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold transition ${
                        isDone
                          ? 'bg-emerald-600 text-white'
                          : darkMode
                            ? 'bg-white/10 text-[#C8D4D1]'
                            : 'bg-[#E6DEC9] text-[#37433D]'
                      }`}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      {isDone ? 'Lu' : 'Valider'}
                    </button>
                  </div>

                  <p className="text-xs leading-relaxed opacity-90">{st.summary}</p>

                  {src && (
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <button
                        onClick={() => onOpenSource(src)}
                        className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-[11px] font-semibold ${
                          darkMode
                            ? 'border-[#2A4246] bg-[#132225] text-[#EAD096]'
                            : 'border-[#DED4BF] bg-white text-[#0F3D3E]'
                        }`}
                      >
                        <ShieldCheck className="h-3 w-3" />
                        Lire la source ({src.title})
                      </button>
                      <button
                        onClick={() => onOpenCardStudio(src)}
                        className="inline-flex items-center gap-1 text-[11px] font-medium underline decoration-dotted opacity-80"
                      >
                        <ImageIcon className="h-3 w-3" />
                        Carte PNG
                      </button>
                    </div>
                  )}

                  <p className="text-[11px] italic opacity-80">
                    🌱 Petit pas : {st.microAction}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* =========================================================
            MODE A: DAILY MICRO-LEARNING + ENERGY SLIDER
           ========================================================= */
        <>
          {/* Day & 30s Catch-up Strip */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
            {DAILY_LESSONS.map((item, idx) => {
              const active = idx === selectedLessonIndex;
              const done = completedNiyyahIds.includes(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedLessonIndex(idx)}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                    active
                      ? darkMode
                        ? 'border-[#D8B56D] bg-[#D8B56D] text-[#0B1314]'
                        : 'border-[#0F3D3E] bg-[#0F3D3E] text-[#FAF7F2]'
                      : darkMode
                        ? 'border-[#213538] bg-[#121E20] text-[#9EB0AC] hover:border-[#314E52]'
                        : 'border-[#E6DEC9] bg-white text-[#5C6660] hover:bg-[#F3EEE3]'
                  }`}
                >
                  {done && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />}
                  <span>{item.dayLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Real-time Energy Slider */}
          <div
            className={`rounded-2xl border p-1.5 ${
              darkMode ? 'border-[#203336] bg-[#111C1E]' : 'border-[#E6DEC9] bg-[#F2ECE0]'
            }`}
          >
            <div className="grid grid-cols-3 gap-1">
              {[
                { id: 'spark_30s' as EnergyMode, label: '30 sec', sub: 'Étincelle', icon: Zap },
                { id: 'light_2m' as EnergyMode, label: '2 min', sub: 'Lumière', icon: Sun },
                { id: 'depth_5m' as EnergyMode, label: '5 min', sub: 'Profondeur', icon: BookOpen },
              ].map((tab) => {
                const Icon = tab.icon;
                const active = energyMode === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => onChangeEnergyMode(tab.id)}
                    className={`flex flex-col items-center justify-center rounded-xl py-2 px-2 text-center transition-all ${
                      active
                        ? darkMode
                          ? 'bg-[#1B2E31] text-[#F3EFE8] shadow-sm ring-1 ring-[#D8B56D]/40'
                          : 'bg-white text-[#0F3D3E] shadow-sm'
                        : darkMode
                          ? 'text-[#899E9A] hover:text-[#D5DFDC]'
                          : 'text-[#66716B] hover:text-[#1B2421]'
                    }`}
                  >
                    <div className="flex items-center gap-1 text-xs font-bold">
                      <Icon className="h-3.5 w-3.5" />
                      <span>{tab.label}</span>
                    </div>
                    <span className="text-[10px] opacity-80">{tab.sub}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Sacred Card */}
          <article
            className={`relative overflow-hidden rounded-3xl border p-5 sm:p-6 shadow-sm transition-colors ${
              darkMode
                ? 'border-[#223639] bg-gradient-to-b from-[#152427] to-[#101B1D]'
                : 'border-[#E7DFCE] bg-white'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold ${
                  darkMode
                    ? 'bg-[#D8B56D]/15 text-[#E5C687]'
                    : 'bg-[#E8F1EE] text-[#0F3D3E]'
                }`}
              >
                <Sparkles className="h-3 w-3" />
                {lesson.themeTag}
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onOpenCardStudio(primarySource)}
                  className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium transition ${
                    darkMode
                      ? 'border-[#263C40] text-[#EAD096] hover:bg-white/5'
                      : 'border-[#E6DEC9] text-[#0F3D3E] hover:bg-[#FAF7F2]'
                  }`}
                >
                  <ImageIcon className="h-3.5 w-3.5" />
                  <span>Carte PNG</span>
                </button>

                <button
                  onClick={() =>
                    onToggleBookmark(
                      lesson.id,
                      lesson.title,
                      'Lumière du jour',
                      primarySource.frenchTranslation
                    )
                  }
                  aria-label="Sauvegarder dans Mon Jardin"
                  className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium transition ${
                    isBookmarked
                      ? darkMode
                        ? 'border-[#D8B56D] bg-[#D8B56D]/20 text-[#D8B56D]'
                        : 'border-[#0F3D3E] bg-[#0F3D3E] text-white'
                      : darkMode
                        ? 'border-[#263C40] text-[#9EB0AC] hover:bg-white/5'
                        : 'border-[#E6DEC9] text-[#5C6660] hover:bg-[#FAF7F2]'
                  }`}
                >
                  <Bookmark className="h-3.5 w-3.5" fill={isBookmarked ? 'currentColor' : 'none'} />
                  <span>{isBookmarked ? 'Sauvegardé' : 'Favori'}</span>
                </button>
              </div>
            </div>

            <h2 className="font-editorial mt-3.5 text-2xl sm:text-[28px] font-semibold leading-tight">
              {lesson.title}
            </h2>

            {/* Canonical Sacred Box */}
            <div
              className={`mt-4 rounded-2xl border p-4 sm:p-5 ${
                darkMode
                  ? 'border-[#24393D] bg-[#0B1314]/90'
                  : 'border-[#ECE4D4] bg-[#FAF7F2]'
              }`}
            >
              <p
                dir="rtl"
                lang="ar"
                className={`font-arabic text-right text-2xl sm:text-[26px] ${
                  darkMode ? 'text-[#F7F2E8]' : 'text-[#0F3D3E]'
                }`}
              >
                {primarySource.arabicText}
              </p>

              {showPhonetic && primarySource.phonetic && (
                <p
                  className={`mt-2 rounded-xl px-3 py-1.5 text-xs font-medium ${
                    darkMode
                      ? 'bg-[#142326] text-[#EAD096]'
                      : 'bg-[#F1ECE0] text-[#6E521C]'
                  }`}
                >
                  {primarySource.phonetic}
                </p>
              )}

              <p
                className={`mt-3 text-sm leading-relaxed italic ${
                  darkMode ? 'text-[#DCE3E0]' : 'text-[#2D3833]'
                }`}
              >
                {primarySource.frenchTranslation}
              </p>

              <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-current/10">
                <button
                  onClick={() => onOpenSource(primarySource)}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold underline decoration-dotted underline-offset-4 transition ${
                    darkMode
                      ? 'text-[#D8B56D] hover:text-[#ECCF8E]'
                      : 'text-[#0F3D3E] hover:text-[#1A5D5E]'
                  }`}
                >
                  <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
                  <span>{primarySource.title} • Vérifier</span>
                </button>

                <button
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold transition ${
                    isPlayingAudio
                      ? darkMode
                        ? 'bg-[#D8B56D] text-[#0B1314]'
                        : 'bg-[#0F3D3E] text-white'
                      : darkMode
                        ? 'bg-white/10 text-[#DCE3E0] hover:bg-white/15'
                        : 'bg-[#EAE3D3] text-[#28342F] hover:bg-[#DFD6C2]'
                  }`}
                >
                  {isPlayingAudio ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                  <span>{isPlayingAudio ? 'Méditation audio...' : `Écouter (${lesson.audioDurationLabel})`}</span>
                </button>
              </div>

              {isPlayingAudio && (
                <div className="mt-3">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-current/10">
                    <div
                      className={`h-full transition-all duration-300 ${
                        darkMode ? 'bg-[#D8B56D]' : 'bg-[#0F3D3E]'
                      }`}
                      style={{ width: `${audioProgress}%` }}
                    />
                  </div>
                  <p className="mt-1 text-[11px] opacity-70">
                    Lecture contemplative guidée • Voix apaisée sans musique intrusive
                  </p>
                </div>
              )}
            </div>

            {/* DYNAMIC ENERGY BODY */}
            <div className="mt-5 space-y-4 text-sm leading-relaxed animate-fade-up" key={energyMode}>
              {energyMode === 'spark_30s' && (
                <div
                  className={`rounded-2xl p-4 ${
                    darkMode ? 'bg-[#17282B] text-[#E6ECEA]' : 'bg-[#F3EFE6] text-[#222D28]'
                  }`}
                >
                  <span className="block text-[11px] font-bold uppercase tracking-wider opacity-70 mb-1">
                    ⚡ L’essentiel au cœur (30 secondes)
                  </span>
                  <p className="text-[15px] font-medium leading-relaxed">
                    {lesson.modes.spark_30s.heartAnchor}
                  </p>
                </div>
              )}

              {energyMode === 'light_2m' && (
                <div className="space-y-3.5">
                  <p className="font-medium">{lesson.modes.light_2m.hook}</p>
                  <p className={darkMode ? 'text-[#C6D3D0]' : 'text-[#3F4B45]'}>
                    {lesson.modes.light_2m.contextAndMeaning}
                  </p>
                  <div
                    className={`rounded-2xl border-l-4 px-4 py-3 ${
                      darkMode
                        ? 'border-[#D8B56D] bg-[#162629] text-[#E8ECEA]'
                        : 'border-[#0F3D3E] bg-[#F2F7F5] text-[#1B2A27]'
                    }`}
                  >
                    <strong className="block text-xs uppercase tracking-wider opacity-75 mb-0.5">
                      Dans ta journée d’aujourd’hui
                    </strong>
                    {lesson.modes.light_2m.dailyBridge}
                  </div>
                </div>
              )}

              {energyMode === 'depth_5m' && (
                <div className="space-y-4">
                  <p className={darkMode ? 'text-[#C6D3D0]' : 'text-[#3F4B45]'}>
                    {lesson.modes.light_2m.contextAndMeaning}
                  </p>

                  <div
                    className={`rounded-2xl border p-4 ${
                      darkMode
                        ? 'border-[#D8B56D]/30 bg-[#182628]'
                        : 'border-[#E6D7B8] bg-[#FCF8EE]'
                    }`}
                  >
                    <span
                      className={`block text-xs font-bold uppercase tracking-wider mb-1 ${
                        darkMode ? 'text-[#D8B56D]' : 'text-[#8C6826]'
                      }`}
                    >
                      🔍 Pépite de langue coranique & prophétique
                    </span>
                    <p className="text-xs sm:text-sm leading-relaxed">
                      {lesson.modes.depth_5m.linguisticGem}
                    </p>
                  </div>

                  <div
                    className={`rounded-2xl p-4 ${
                      darkMode ? 'bg-[#152427]' : 'bg-[#F4EFE5]'
                    }`}
                  >
                    <span className="block text-xs font-bold uppercase tracking-wider opacity-75 mb-1">
                      📚 Regard des Commentateurs & Savants
                    </span>
                    <p className="text-xs sm:text-sm leading-relaxed">
                      {lesson.modes.depth_5m.scholarlyWisdom}
                    </p>
                    {secondarySource && (
                      <button
                        onClick={() => onOpenSource(secondarySource)}
                        className={`mt-3 inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition ${
                          darkMode
                            ? 'border-[#294246] bg-[#0E181A] text-[#D8B56D] hover:border-[#D8B56D]'
                            : 'border-[#DDD3BE] bg-white text-[#0F3D3E] hover:border-[#0F3D3E]'
                        }`}
                      >
                        <ShieldCheck className="h-3.5 w-3.5" />
                        Source complémentaire : {secondarySource.title}
                      </button>
                    )}
                  </div>

                  <form
                    onSubmit={handleReflectionSubmit}
                    className={`rounded-2xl border p-4 ${
                      darkMode ? 'border-[#23383B] bg-[#0D1618]' : 'border-[#E5DEC9] bg-[#FAF7F2]'
                    }`}
                  >
                    <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider mb-1.5">
                      <PenLine className="h-3.5 w-3.5" />
                      Note personnelle (Muhâsabah)
                    </label>
                    <p className={`text-xs italic mb-2.5 ${darkMode ? 'text-[#9EB0AC]' : 'text-[#5C6660]'}`}>
                      {lesson.modes.depth_5m.reflectionPrompt}
                    </p>
                    <textarea
                      rows={2}
                      value={reflectionText}
                      onChange={(e) => setReflectionText(e.target.value)}
                      placeholder="Écris une pensée pour toi-même (sauvegardée dans Mon Jardin)..."
                      className={`w-full rounded-xl border p-2.5 text-xs outline-none transition ${
                        darkMode
                          ? 'border-[#24393C] bg-[#132023] text-white focus:border-[#D8B56D]'
                          : 'border-[#DDD4C2] bg-white text-[#1B2421] focus:border-[#0F3D3E]'
                      }`}
                    />
                    <div className="mt-2 flex items-center justify-between">
                      {reflectionSavedToast ? (
                        <span className="text-xs font-semibold text-emerald-500">
                          ✓ Réflexion ajoutée à Mon Jardin
                        </span>
                      ) : (
                        <span className="text-[11px] opacity-60">100 % privé sur ton appareil</span>
                      )}
                      <button
                        type="submit"
                        className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
                          darkMode
                            ? 'bg-[#D8B56D] text-[#0B1314] hover:bg-[#E4C582]'
                            : 'bg-[#0F3D3E] text-white hover:bg-[#175456]'
                        }`}
                      >
                        Enregistrer ma note
                      </button>
                    </div>
                  </form>

                  <button
                    onClick={() => onAskFollowup(lesson.modes.depth_5m.suggestedFollowupQuestionId)}
                    className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-xs font-semibold transition ${
                      darkMode
                        ? 'border-[#2A4246] bg-[#142225] text-[#E6ECEA] hover:border-[#D8B56D]'
                        : 'border-[#DCE5E1] bg-[#EDF5F2] text-[#0F3D3E] hover:bg-[#E2EFEA]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <MessageCircleHeart className="h-4 w-4 shrink-0" />
                      <span>Approfondir : « {lesson.modes.depth_5m.suggestedFollowupLabel} »</span>
                    </span>
                    <span>→</span>
                  </button>
                </div>
              )}
            </div>

            {/* Interactive 10-Second Micro-Niyyah Action */}
            <div
              className={`mt-5 rounded-2xl border p-4 transition-all ${
                isNiyyahDone
                  ? darkMode
                    ? 'border-emerald-700/60 bg-emerald-950/35'
                    : 'border-emerald-300 bg-emerald-50/75'
                  : darkMode
                    ? 'border-[#273E42] bg-[#132123]'
                    : 'border-[#E6DEC9] bg-[#FAF7F2]'
              }`}
            >
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider opacity-75">
                  🌱 Ton Petit Pas « Sans Flemme » (10 sec)
                </span>
                <p className="mt-1 text-xs sm:text-sm leading-relaxed">
                  {energyMode === 'spark_30s'
                    ? lesson.modes.spark_30s.microNiyyah
                    : lesson.modes.light_2m.microNiyyah}
                </p>
              </div>

              <button
                onClick={() => onToggleNiyyah(lesson.id)}
                className={`mt-3 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 px-4 text-xs font-bold transition ${
                  isNiyyahDone
                    ? 'bg-emerald-600 text-white'
                    : darkMode
                      ? 'bg-[#D8B56D] text-[#0B1314] hover:bg-[#E4C580]'
                      : 'bg-[#0F3D3E] text-white hover:bg-[#165355]'
                }`}
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>
                  {isNiyyahDone
                    ? 'Intention posée • Perle de lumière ravivée'
                    : 'J’ai posé cette intention (10 sec)'}
                </span>
              </button>
            </div>
          </article>
        </>
      )}
    </div>
  );
};
