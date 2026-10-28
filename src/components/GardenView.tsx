import React, { useState } from 'react';
import {
  Bookmark,
  PenLine,
  Trash2,
  HeartHandshake,
  Building2,
  Flower2,
  RotateCcw,
  CheckCircle2,
  Shield,
  Plus,
} from 'lucide-react';
import { MADHHAB_OPTIONS, MadhhabId } from '../data/canonicalCorpus';
import { UserProfile } from './OnboardingFlow';

export interface SavedBookmark {
  id: string;
  title: string;
  category: 'Lumière du jour' | 'Réponse sourcée';
  preview: string;
  savedAt: string;
}

export interface ReflectionEntry {
  id: string;
  lessonTitle: string;
  prompt: string;
  text: string;
  createdAt: string;
}

interface GardenViewProps {
  darkMode: boolean;
  profile: UserProfile;
  onUpdateProfile: (next: UserProfile) => void;
  bookmarks: SavedBookmark[];
  onRemoveBookmark: (id: string) => void;
  reflections: ReflectionEntry[];
  onAddQuickReflection: (text: string) => void;
  onRemoveReflection: (id: string) => void;
  onReplayOnboarding: () => void;
  initialSubTab?: 'saved' | 'settings' | 'waqf';
}

export const GardenView: React.FC<GardenViewProps> = ({
  darkMode,
  profile,
  onUpdateProfile,
  bookmarks,
  onRemoveBookmark,
  reflections,
  onAddQuickReflection,
  onRemoveReflection,
  onReplayOnboarding,
  initialSubTab = 'saved',
}) => {
  const [subTab, setSubTab] = useState<'saved' | 'settings' | 'waqf'>(initialSubTab);
  const [newNote, setNewNote] = useState('');
  const [showMosqueDemo, setShowMosqueDemo] = useState(false);

  const handleQuickNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    onAddQuickReflection(newNote.trim());
    setNewNote('');
  };

  return (
    <div className="space-y-4 pb-6 animate-fade-up">
      {/* Sub-navigation inside Mon Jardin */}
      <div
        className={`grid grid-cols-3 gap-1 rounded-2xl border p-1.5 ${
          darkMode ? 'border-[#213538] bg-[#111C1E]' : 'border-[#E6DEC9] bg-[#F2ECE0]'
        }`}
      >
        {[
          { id: 'saved' as const, label: 'Favoris & Notes' },
          { id: 'waqf' as const, label: 'Nur Solidaire' },
          { id: 'settings' as const, label: 'Préférences' },
        ].map((t) => {
          const active = subTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setSubTab(t.id)}
              className={`rounded-xl py-2 px-2 text-xs font-bold transition ${
                active
                  ? darkMode
                    ? 'bg-[#1B2E31] text-[#F3EFE8] ring-1 ring-[#D8B56D]/40'
                    : 'bg-white text-[#0F3D3E] shadow-xs'
                  : darkMode
                    ? 'text-[#8EA29E]'
                    : 'text-[#636E68]'
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* SUBTAB 1: SAVED BOOKMARKS & PERSONAL MUHASABAH JOURNAL */}
      {subTab === 'saved' && (
        <div className="space-y-4 animate-fade-up">
          {/* Personal Muhasabah Journal */}
          <div
            className={`rounded-3xl border p-5 ${
              darkMode ? 'border-[#223639] bg-[#121E20]' : 'border-[#E6DEC9] bg-white'
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider opacity-80">
              <PenLine className="h-3.5 w-3.5 text-[#C5A059]" />
              Carnet personnel (Muhâsabah)
            </div>
            <p className={`mt-1 text-xs ${darkMode ? 'text-[#9EB0AC]' : 'text-[#5C6660]'}`}>
              Tes réflexions spirituelles personnelles, stockées localement en toute confidentialité.
            </p>

            <form onSubmit={handleQuickNote} className="mt-3 flex gap-2">
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Noter une gratitude, une du‘â ou un déclic..."
                className={`flex-1 rounded-xl border px-3 py-2 text-xs outline-none ${
                  darkMode
                    ? 'border-[#273E42] bg-[#0B1314] text-white'
                    : 'border-[#DDD3BF] bg-[#FAF7F2] text-[#1B2421]'
                }`}
              />
              <button
                type="submit"
                className={`inline-flex items-center gap-1 rounded-xl px-3 py-2 text-xs font-bold ${
                  darkMode
                    ? 'bg-[#D8B56D] text-[#0B1314]'
                    : 'bg-[#0F3D3E] text-white'
                }`}
              >
                <Plus className="h-3.5 w-3.5" /> Ajouter
              </button>
            </form>

            <div className="mt-4 space-y-2.5">
              {reflections.length === 0 ? (
                <p className="text-xs italic opacity-60">
                  Aucune réflexion enregistrée pour l’instant.
                </p>
              ) : (
                reflections.map((r) => (
                  <div
                    key={r.id}
                    className={`rounded-2xl border p-3.5 text-xs ${
                      darkMode
                        ? 'border-[#23383B] bg-[#0C1517]'
                        : 'border-[#EAE2D2] bg-[#FAF7F2]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="font-bold text-[11px] opacity-75">
                          {r.lessonTitle} • {r.createdAt}
                        </span>
                        <p className="mt-1 text-xs sm:text-sm leading-relaxed">{r.text}</p>
                      </div>
                      <button
                        onClick={() => onRemoveReflection(r.id)}
                        aria-label="Supprimer la note"
                        className="opacity-50 hover:opacity-100 p-1"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Saved Bookmarks */}
          <div
            className={`rounded-3xl border p-5 ${
              darkMode ? 'border-[#223639] bg-[#121E20]' : 'border-[#E6DEC9] bg-white'
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider opacity-80">
              <Bookmark className="h-3.5 w-3.5 text-[#C5A059]" />
              Sources & Réponses sauvegardées ({bookmarks.length})
            </div>

            <div className="mt-3 space-y-2.5">
              {bookmarks.length === 0 ? (
                <p className="text-xs italic opacity-60">
                  Clique sur « Favori » sur une Lumière du jour ou une réponse du Chat pour la retrouver ici.
                </p>
              ) : (
                bookmarks.map((b) => (
                  <div
                    key={b.id}
                    className={`rounded-2xl border p-3.5 text-xs ${
                      darkMode
                        ? 'border-[#23383B] bg-[#0C1517]'
                        : 'border-[#EAE2D2] bg-[#FAF7F2]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span
                          className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${
                            darkMode
                              ? 'bg-[#D8B56D]/15 text-[#D8B56D]'
                              : 'bg-[#0F3D3E]/10 text-[#0F3D3E]'
                          }`}
                        >
                          {b.category}
                        </span>
                        <h4 className="mt-1 font-bold text-sm">{b.title}</h4>
                        <p className="mt-1 opacity-80 line-clamp-2 leading-relaxed">
                          {b.preview}
                        </p>
                      </div>
                      <button
                        onClick={() => onRemoveBookmark(b.id)}
                        aria-label="Retirer des favoris"
                        className="opacity-50 hover:opacity-100 p-1"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: ETHICAL WAQF MONETIZATION & MOSQUE B2B2C */}
      {subTab === 'waqf' && (
        <div className="space-y-4 animate-fade-up">
          {/* Ethical Promise Card */}
          <div
            className={`rounded-3xl border p-5 sm:p-6 ${
              darkMode
                ? 'border-[#D8B56D]/40 bg-gradient-to-b from-[#17282B] to-[#111D1F]'
                : 'border-[#E0D2B4] bg-gradient-to-b from-[#FCF8EE] to-white'
            }`}
          >
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold ${
                darkMode
                  ? 'bg-[#D8B56D]/20 text-[#EAD096]'
                  : 'bg-[#0F3D3E] text-[#FAF7F2]'
              }`}
            >
              <HeartHandshake className="h-3.5 w-3.5" />
              Modèle Éthique « Nur Solidaire » (Esprit Waqf)
            </span>

            <h3 className="font-editorial mt-3 text-2xl sm:text-[26px] font-semibold leading-tight">
              La Parole d’Allah est gratuite. Tu finances l’infrastructure vérifiée et l’entraide.
            </h3>

            <ul className="mt-3.5 space-y-2 text-xs leading-relaxed">
              <li className="flex items-start gap-2">
                <Shield className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                <span>
                  <strong>Zéro publicité, zéro revente de données :</strong> tes questions spirituelles et ta localisation ne sont jamais monétisées.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                <span>
                  <strong>1 Abonnement Nur Plus (5,99 €/mois) = 1 Bourse Solidaire offerte :</strong> chaque abonné finance l’audit par des diplômés en sciences islamiques ET offre un accès intégral à un étudiant ou un proche en difficulté.
                </span>
              </li>
            </ul>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                onClick={() =>
                  onUpdateProfile({
                    ...profile,
                    isNurPlus: !profile.isNurPlus,
                    scholarshipGranted: false,
                  })
                }
                className={`rounded-2xl py-3 px-4 text-xs font-bold transition shadow-sm ${
                  profile.isNurPlus && !profile.scholarshipGranted
                    ? 'bg-emerald-600 text-white'
                    : darkMode
                      ? 'bg-[#D8B56D] text-[#0B1314] hover:bg-[#E4C580]'
                      : 'bg-[#0F3D3E] text-white hover:bg-[#165355]'
                }`}
              >
                {profile.isNurPlus && !profile.scholarshipGranted
                  ? '✓ Contributeur Nur Plus Actif'
                  : 'Soutenir Nur Plus (5,99 €/m)'}
              </button>

              <button
                onClick={() =>
                  onUpdateProfile({
                    ...profile,
                    isNurPlus: true,
                    scholarshipGranted: true,
                  })
                }
                className={`rounded-2xl border py-3 px-4 text-xs font-bold transition ${
                  profile.scholarshipGranted
                    ? 'border-emerald-600 bg-emerald-600/15 text-emerald-500'
                    : darkMode
                      ? 'border-[#2D474B] text-[#DCE4E1] hover:bg-white/5'
                      : 'border-[#D5CBB7] bg-white text-[#2B3732] hover:bg-[#FAF7F2]'
                }`}
              >
                {profile.scholarshipGranted
                  ? '✓ Bourse Solidaire Activée'
                  : 'Demander une Bourse Gratuite (1 clic)'}
              </button>
            </div>

            {profile.scholarshipGranted && (
              <p className="mt-3 text-xs text-emerald-500 font-medium">
                Bienvenue en accès complet offert par la communauté Nur, sans aucun justificatif demandé. Puisse cela t’apporter paix et lumière.
              </p>
            )}
          </div>

          {/* B2B2C Mosque Partnership Card */}
          <div
            className={`rounded-3xl border p-5 ${
              darkMode ? 'border-[#223639] bg-[#121E20]' : 'border-[#E6DEC9] bg-white'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C5A059]">
                  <Building2 className="h-4 w-4" />
                  B2B2C • Offre « Nur Mosquées & Instituts »
                </span>
                <h4 className="font-editorial mt-1 text-xl font-semibold">
                  Soulager l’Imam local tout en gardant le lien humain
                </h4>
                <p className={`mt-1 text-xs leading-relaxed ${darkMode ? 'text-[#9EB0AC]' : 'text-[#5C6660]'}`}>
                  Accès groupe configuré sur l’école de la mosquée : Nur répond aux questions de base sourcées 24h/24 et route proprement les cas sensibles (🔴 Ligne Rouge) vers la permanence de l’imam.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowMosqueDemo(!showMosqueDemo)}
              className={`mt-3 rounded-xl border px-3.5 py-2 text-xs font-semibold transition ${
                darkMode
                  ? 'border-[#2A4246] bg-[#0B1314] text-[#D8B56D]'
                  : 'border-[#DDD3BE] bg-[#FAF7F2] text-[#0F3D3E]'
              }`}
            >
              {showMosqueDemo ? 'Masquer l’aperçu Mosquée' : 'Voir l’aperçu Mosquée Partenaire →'}
            </button>

            {showMosqueDemo && (
              <div
                className={`mt-3 rounded-2xl border p-3.5 text-xs space-y-1.5 animate-fade-up ${
                  darkMode ? 'border-[#273E42] bg-[#0B1314]' : 'border-[#EAE2D2] bg-[#FAF7F2]'
                }`}
              >
                <p className="font-bold">🕌 Exemple : Grande Mosquée Partenaire (Repère Malékite)</p>
                <p className="opacity-85">• 420 fidèles connectés • ~180 questions simples résolues/semaine avec sources</p>
                <p className="opacity-85">• 4 dossiers familiaux sensibles (Ligne Rouge) transmis avec fiche préparatoire à la permanence du vendredi.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUBTAB 3: BENEVOLENT SETTINGS */}
      {subTab === 'settings' && (
        <div
          className={`rounded-3xl border p-5 space-y-5 animate-fade-up ${
            darkMode ? 'border-[#223639] bg-[#121E20]' : 'border-[#E6DEC9] bg-white'
          }`}
        >
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2">
              École juridique de référence (Madhhab)
            </label>
            <div className="space-y-2">
              {MADHHAB_OPTIONS.map((m) => {
                const active = profile.madhhab === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => onUpdateProfile({ ...profile, madhhab: m.id as MadhhabId })}
                    className={`w-full rounded-xl border px-3.5 py-2.5 text-left text-xs transition ${
                      active
                        ? darkMode
                          ? 'border-[#D8B56D] bg-[#17282B] font-bold'
                          : 'border-[#0F3D3E] bg-[#F2F7F5] font-bold text-[#0F3D3E]'
                        : darkMode
                          ? 'border-[#213538] bg-[#0C1517]'
                          : 'border-[#EAE2D2] bg-[#FAF7F2]'
                    }`}
                  >
                    <div>{m.label}</div>
                    <div className="mt-0.5 text-[11px] font-normal opacity-75">{m.description}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feminine Cycle / Indisposition Serenity Switch */}
          <div
            className={`rounded-2xl border p-4 ${
              darkMode ? 'border-[#253B3E] bg-[#0C1517]' : 'border-[#EAE2D2] bg-[#FAF7F2]'
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <Flower2 className="mt-0.5 h-4 w-4 shrink-0 text-[#C5A059]" />
                <div>
                  <h4 className="text-xs font-bold">
                    Mode Pause Sérénité (Cycle / Indisposition)
                  </h4>
                  <p className="mt-0.5 text-[11px] opacity-80 leading-relaxed">
                    Adapte les rappels vers l’invocation (Dhikr) et le micro-learning du cœur, sans notifications inadaptées ni interruption de ton Halo de Constance.
                  </p>
                </div>
              </div>

              <button
                onClick={() =>
                  onUpdateProfile({
                    ...profile,
                    serenityPauseMode: !profile.serenityPauseMode,
                  })
                }
                role="switch"
                aria-checked={profile.serenityPauseMode}
                className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                  profile.serenityPauseMode
                    ? darkMode
                      ? 'bg-[#D8B56D]'
                      : 'bg-[#0F3D3E]'
                    : darkMode
                      ? 'bg-white/15'
                      : 'bg-black/15'
                }`}
              >
                <span
                  className={`block h-5 w-5 rounded-full bg-white shadow transition-transform ${
                    profile.serenityPauseMode ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          </div>

          <button
            onClick={onReplayOnboarding}
            className={`flex w-full items-center justify-center gap-2 rounded-xl border py-2.5 text-xs font-semibold transition ${
              darkMode
                ? 'border-[#263C3F] text-[#9EB0AC] hover:bg-white/5'
                : 'border-[#DDD3BF] text-[#4E5A54] hover:bg-[#FAF7F2]'
            }`}
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Rejouer l’onboarding de personnalisation (3 étapes)
          </button>
        </div>
      )}
    </div>
  );
};
