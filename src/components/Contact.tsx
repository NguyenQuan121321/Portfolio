import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  EnvelopeSimple, 
  GithubLogo, 
  Copy, 
  Check, 
  PaperPlaneRight
} from '@phosphor-icons/react';

export const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const email = "nguyenhoanganhquan13@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-border-subtle/80 bg-surface-950">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-950/40 border border-emerald-500/30 text-xs font-mono text-emerald-300">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-mint opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-mint"></span>
          </span>
          <span>{t('contact.subtitle')}</span>
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-100 max-w-2xl mx-auto leading-tight">
          {t('contact.title')}
        </h2>

        {/* Email Copy Card & Direct Actions */}
        <div className="p-6 sm:p-8 rounded-xl bg-surface-900 border border-border-subtle max-w-xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-lg bg-surface-950 border border-border-subtle font-mono text-xs sm:text-sm text-zinc-200">
            <div className="flex items-center gap-2">
              <EnvelopeSimple size={18} className="text-accent-cyan" />
              <span>{email}</span>
            </div>
            <button
              onClick={handleCopy}
              className="w-full sm:w-auto px-3 py-1.5 rounded bg-surface-850 hover:bg-surface-800 border border-border-subtle text-xs text-zinc-300 flex items-center justify-center gap-1.5 transition-colors"
            >
              {copied ? <Check size={14} className="text-accent-mint" /> : <Copy size={14} />}
              <span>{copied ? t('contact.email_copied') : t('contact.email_btn')}</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`mailto:${email}`}
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-accent-cyan text-surface-950 font-bold text-xs sm:text-sm hover:bg-cyan-300 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_-5px_rgba(0,229,255,0.3)]"
            >
              <PaperPlaneRight size={16} weight="bold" />
              <span>Send Direct Email</span>
            </a>

            <a
              href="https://github.com/NguyenQuan121321"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-surface-950 hover:bg-surface-850 border border-border-subtle hover:border-border-highlight text-zinc-200 font-mono text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
            >
              <GithubLogo size={18} weight="bold" />
              <span>{t('contact.github_btn')}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
