import React from 'react';
import { EpistemicStatus } from '../data/canonicalCorpus';

export const NurStarLogo: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
    {/* 8-pointed Andalusian Khatam star */}
    <path
      d="M16 2L19.6 8.4L26.9 5.1L23.6 12.4L30 16L23.6 19.6L26.9 26.9L19.6 23.6L16 30L12.4 23.6L5.1 26.9L8.4 19.6L2 16L8.4 12.4L5.1 5.1L12.4 8.4L16 2Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <circle cx="16" cy="16" r="3.2" fill="currentColor" opacity="0.85" />
  </svg>
);

export const SacredPatternWatermark: React.FC<{ darkMode: boolean }> = ({ darkMode }) => (
  <svg
    className={`pointer-events-none absolute right-0 top-0 h-44 w-44 select-none ${
      darkMode ? 'text-[#D8B56D]/[0.05]' : 'text-[#0F3D3E]/[0.04]'
    }`}
    viewBox="0 0 120 120"
    fill="none"
    aria-hidden="true"
  >
    <g transform="translate(80, 20)">
      <path
        d="M0 -55 L14 -22 L48 -38 L22 -14 L55 0 L22 14 L48 38 L14 22 L0 55 L-14 22 L-48 38 L-22 14 L-55 0 L-22 -14 L-48 -38 L-14 -22 Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="0" cy="0" r="24" stroke="currentColor" strokeWidth="0.9" />
      <circle cx="0" cy="0" r="10" stroke="currentColor" strokeWidth="0.9" />
    </g>
  </svg>
);

export const EpistemicBadge: React.FC<{
  status: EpistemicStatus;
  label: string;
  darkMode: boolean;
}> = ({ status, label, darkMode }) => {
  const styles: Record<EpistemicStatus, string> = {
    SAKINA: darkMode
      ? 'bg-[#D8B56D]/15 text-[#EAD096] border-[#D8B56D]/30'
      : 'bg-[#FBF5E8] text-[#856221] border-[#E8D4A6]',
    IJMA: darkMode
      ? 'bg-emerald-950/70 text-emerald-300 border-emerald-700/50'
      : 'bg-emerald-50 text-emerald-900 border-emerald-200',
    JUMHUR: darkMode
      ? 'bg-sky-950/70 text-sky-300 border-sky-700/50'
      : 'bg-sky-50 text-sky-900 border-sky-200',
    IKHTILAF: darkMode
      ? 'bg-amber-950/70 text-amber-300 border-amber-700/50'
      : 'bg-amber-50 text-amber-900 border-amber-200',
    REDLINE_SAVANT: darkMode
      ? 'bg-rose-950/80 text-rose-200 border-rose-700/60'
      : 'bg-rose-50 text-rose-900 border-rose-200',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold tracking-tight ${styles[status]}`}
    >
      {label}
    </span>
  );
};
