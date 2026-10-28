import React, { useEffect, useRef, useState } from 'react';
import { X, Download, Share2, Sparkles, Check } from 'lucide-react';
import { CanonicalSource } from '../data/canonicalCorpus';

interface LightCardStudioModalProps {
  source: CanonicalSource | null;
  darkMode: boolean;
  onClose: () => void;
}

type CardThemeId = 'emerald' | 'sand' | 'layl';

const CARD_THEMES: Record<
  CardThemeId,
  {
    label: string;
    bgTop: string;
    bgBottom: string;
    border: string;
    accent: string;
    arabic: string;
    text: string;
    muted: string;
  }
> = {
  emerald: {
    label: 'Émeraude Andalou',
    bgTop: '#0F3D3E',
    bgBottom: '#082425',
    border: 'rgba(216, 181, 109, 0.35)',
    accent: '#D8B56D',
    arabic: '#FAF7F2',
    text: '#EEF2F0',
    muted: 'rgba(238, 242, 240, 0.72)',
  },
  sand: {
    label: 'Sable d’Aube',
    bgTop: '#FAF7F2',
    bgBottom: '#EFE8DA',
    border: 'rgba(15, 61, 62, 0.22)',
    accent: '#0F3D3E',
    arabic: '#0F3D3E',
    text: '#1C2522',
    muted: '#5A655F',
  },
  layl: {
    label: 'Nuit Layl',
    bgTop: '#132124',
    bgBottom: '#080F10',
    border: 'rgba(216, 181, 109, 0.3)',
    accent: '#E3C27D',
    arabic: '#F7F2E8',
    text: '#E6ECEA',
    muted: 'rgba(230, 236, 234, 0.68)',
  },
};

function wrapCanvasText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let current = '';

  for (const w of words) {
    const test = current ? `${current} ${w}` : w;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = w;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export const LightCardStudioModal: React.FC<LightCardStudioModalProps> = ({
  source,
  darkMode,
  onClose,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [themeId, setThemeId] = useState<CardThemeId>('emerald');
  const [includePhonetic, setIncludePhonetic] = useState<boolean>(true);
  const [sharedFeedback, setSharedFeedback] = useState<boolean>(false);

  useEffect(() => {
    if (!source || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = 1080;
    const H = 1350;
    canvas.width = W;
    canvas.height = H;

    const theme = CARD_THEMES[themeId];

    // Background Gradient
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, theme.bgTop);
    grad.addColorStop(1, theme.bgBottom);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Subtle Radial Glow
    const radial = ctx.createRadialGradient(W / 2, 340, 40, W / 2, 340, 520);
    radial.addColorStop(0, 'rgba(216, 181, 109, 0.14)');
    radial.addColorStop(1, 'rgba(216, 181, 109, 0)');
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, W, H);

    // Outer Architectural Frame
    ctx.strokeStyle = theme.border;
    ctx.lineWidth = 3;
    ctx.strokeRect(64, 64, W - 128, H - 128);

    // Top 8-Pointed Star Ornament
    ctx.save();
    ctx.translate(W / 2, 165);
    ctx.strokeStyle = theme.accent;
    ctx.lineWidth = 3.2;
    for (let r = 0; r < 2; r++) {
      ctx.save();
      ctx.rotate((r * Math.PI) / 4);
      ctx.strokeRect(-26, -26, 52, 52);
      ctx.restore();
    }
    ctx.fillStyle = theme.accent;
    ctx.beginPath();
    ctx.arc(0, 0, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Top Badge
    ctx.fillStyle = theme.accent;
    ctx.textAlign = 'center';
    ctx.font = '600 26px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`SOURCE VÉRIFIÉE • ${source.type.toUpperCase()}`, W / 2, 248);

    // Arabic Sacred Text (RTL)
    ctx.save();
    ctx.direction = 'rtl';
    ctx.fillStyle = theme.arabic;
    ctx.font = '700 58px "Amiri", Georgia, serif';
    const arabicLines = wrapCanvasText(ctx, source.arabicText, W - 240);
    let currentY = 385;
    for (const line of arabicLines) {
      ctx.fillText(line, W / 2, currentY);
      currentY += 96;
    }
    ctx.restore();

    // Divider line
    currentY += 12;
    ctx.strokeStyle = theme.border;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 140, currentY);
    ctx.lineTo(W / 2 + 140, currentY);
    ctx.stroke();
    currentY += 68;

    // Optional Phonetic
    if (includePhonetic && source.phonetic) {
      ctx.fillStyle = theme.accent;
      ctx.font = '500 30px "Plus Jakarta Sans", sans-serif';
      const phonLines = wrapCanvasText(ctx, source.phonetic, W - 240);
      for (const line of phonLines) {
        ctx.fillText(line, W / 2, currentY);
        currentY += 44;
      }
      currentY += 28;
    }

    // French Translation
    ctx.fillStyle = theme.text;
    ctx.font = 'italic 500 38px "Cormorant Garamond", Georgia, serif';
    const frLines = wrapCanvasText(ctx, source.frenchTranslation, W - 220);
    for (const line of frLines) {
      ctx.fillText(line, W / 2, currentY);
      currentY += 54;
    }

    // Bottom Reference & Authenticity Seal
    ctx.fillStyle = theme.muted;
    ctx.font = '600 25px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(source.title, W / 2, H - 205);

    ctx.font = '400 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(source.reference, W / 2, H - 168);

    ctx.fillStyle = theme.accent;
    ctx.font = '700 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Nur (نُور)  •  Compagnon Spirituel Sourcé', W / 2, H - 112);
  }, [source, themeId, includePhonetic]);

  if (!source) return null;

  const handleDownloadPng = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `Nur-${source.id}.png`;
    a.click();
  };

  const handleNativeShare = async () => {
    if (!canvasRef.current) return;
    canvasRef.current.toBlob(async (blob) => {
      if (!blob) return;
      const file = new File([blob], `Nur-${source.id}.png`, { type: 'image/png' });
      const nav = navigator as Navigator & {
        canShare?: (data: { files?: File[] }) => boolean;
      };
      if (nav.share && nav.canShare && nav.canShare({ files: [file] })) {
        try {
          await nav.share({
            title: `Nur — ${source.title}`,
            text: `${source.frenchTranslation} (${source.reference})`,
            files: [file],
          });
          return;
        } catch {
          // User cancelled share sheet
        }
      }
      // Fallback on desktop: download PNG + copy caption
      handleDownloadPng();
      navigator.clipboard.writeText(
        `${source.arabicText}\n${source.frenchTranslation}\n— ${source.reference} • Vérifié sur Nur`
      );
      setSharedFeedback(true);
      setTimeout(() => setSharedFeedback(false), 2400);
    }, 'image/png');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/65 backdrop-blur-xs p-0 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-[460px] max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border p-5 shadow-2xl animate-fade-up ${
          darkMode
            ? 'border-[#274044] bg-[#101B1D] text-[#F3EFE8]'
            : 'border-[#E5DEC9] bg-[#FAF7F2] text-[#1B2421]'
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#C5A059]">
              <Sparkles className="h-3.5 w-3.5" />
              Studio « Carte de Lumière » (WhatsApp & Story)
            </span>
            <h3 className="font-editorial text-2xl font-semibold">
              Partager une source authentifiée
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Fermer le studio"
            className="rounded-full p-2 opacity-70 hover:opacity-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Live Canvas Preview */}
        <div className="mt-3 flex justify-center">
          <canvas
            ref={canvasRef}
            className="w-full max-w-[290px] rounded-2xl shadow-lg border border-black/10"
          />
        </div>

        {/* Theme & Phonetic Controls */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <div className="flex gap-1.5">
            {(Object.keys(CARD_THEMES) as CardThemeId[]).map((id) => (
              <button
                key={id}
                onClick={() => setThemeId(id)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                  themeId === id
                    ? darkMode
                      ? 'border-[#D8B56D] bg-[#D8B56D] text-[#0B1314]'
                      : 'border-[#0F3D3E] bg-[#0F3D3E] text-white'
                    : darkMode
                      ? 'border-[#263D41] bg-[#152427] text-[#B8C6C3]'
                      : 'border-[#DFD6C2] bg-white text-[#48544E]'
                }`}
              >
                {CARD_THEMES[id].label}
              </button>
            ))}
          </div>

          <label className="inline-flex items-center gap-1.5 text-xs font-medium cursor-pointer">
            <input
              type="checkbox"
              checked={includePhonetic}
              onChange={(e) => setIncludePhonetic(e.target.checked)}
              className="accent-[#0F3D3E]"
            />
            <span>Inclure phonétique</span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <button
            onClick={handleDownloadPng}
            className={`flex items-center justify-center gap-1.5 rounded-2xl border py-3 px-3 text-xs font-bold transition ${
              darkMode
                ? 'border-[#2D474B] bg-[#162629] text-white hover:bg-[#1E3236]'
                : 'border-[#D5CBB7] bg-white text-[#1B2421] hover:bg-[#F2ECE0]'
            }`}
          >
            <Download className="h-4 w-4" />
            <span>Image PNG HD</span>
          </button>

          <button
            onClick={handleNativeShare}
            className={`flex items-center justify-center gap-1.5 rounded-2xl py-3 px-3 text-xs font-bold transition shadow-sm ${
              darkMode
                ? 'bg-[#D8B56D] text-[#0B1314] hover:bg-[#E4C580]'
                : 'bg-[#0F3D3E] text-white hover:bg-[#165355]'
            }`}
          >
            {sharedFeedback ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
            <span>{sharedFeedback ? 'Image + texte prêts !' : 'Partager (WhatsApp)'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
