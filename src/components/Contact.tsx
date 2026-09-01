import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  EnvelopeSimple, 
  GithubLogo, 
  Copy, 
  Check, 
  PaperPlaneRight,
  X,
  ArrowSquareOut,
  GoogleLogo,
  WindowsLogo,
  Globe,
  Laptop
} from '@phosphor-icons/react';

export const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const email = "nguyenhoanganhquan13@gmail.com";
  const emailSubject = "[Portfolio Contact] Collaboration / Job Opportunity for [Target Role]";
  const emailBody = `Hi Quan,

My name is [Your Name / HR] from [Company Name].

I came across your portfolio and was really impressed with your projects and technical expertise. We are currently looking for a [Backend Developer / Fullstack Developer / Target Role] to join our team.

I would love to connect and discuss potential opportunities with you further via this email or phone number: [...]

Best regards,
[Your Name]
[Company Name]`;

  // Handle ESC key to close modal
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleCloseModal]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyDraft = () => {
    const fullDraft = `To: ${email}\nSubject: ${emailSubject}\n\n${emailBody}`;
    navigator.clipboard.writeText(fullDraft);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2000);
  };

  // Direct Webmail & Mail Client URLs with Pre-filled Subject and Body
  const encodedEmail = encodeURIComponent(email);
  const encodedSubject = encodeURIComponent(emailSubject);
  const encodedBody = encodeURIComponent(emailBody);

  const mailProviders = [
    {
      id: 'gmail',
      name: t('contact.modal.gmail'),
      desc: t('contact.modal.gmail_desc'),
      url: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodedEmail}&su=${encodedSubject}&body=${encodedBody}`,
      icon: <GoogleLogo size={22} className="text-red-400" weight="bold" />,
      tag: 'Webmail',
      recommended: true,
      accentBorder: 'hover:border-red-500/60',
      accentGlow: 'hover:shadow-[0_0_15px_-3px_rgba(239,68,68,0.3)]'
    },
    {
      id: 'outlook',
      name: t('contact.modal.outlook'),
      desc: t('contact.modal.outlook_desc'),
      url: `https://outlook.live.com/mail/0/deeplink/compose?to=${encodedEmail}&subject=${encodedSubject}&body=${encodedBody}`,
      icon: <WindowsLogo size={22} className="text-blue-400" weight="bold" />,
      tag: 'Webmail',
      recommended: false,
      accentBorder: 'hover:border-blue-500/60',
      accentGlow: 'hover:shadow-[0_0_15px_-3px_rgba(59,130,246,0.3)]'
    },
    {
      id: 'yahoo',
      name: t('contact.modal.yahoo'),
      desc: t('contact.modal.yahoo_desc'),
      url: `https://compose.mail.yahoo.com/?to=${encodedEmail}&subj=${encodedSubject}&body=${encodedBody}`,
      icon: <Globe size={22} className="text-purple-400" weight="bold" />,
      tag: 'Webmail',
      recommended: false,
      accentBorder: 'hover:border-purple-500/60',
      accentGlow: 'hover:shadow-[0_0_15px_-3px_rgba(168,85,247,0.3)]'
    },
    {
      id: 'default',
      name: t('contact.modal.default_app'),
      desc: t('contact.modal.default_app_desc'),
      url: `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`,
      icon: <Laptop size={22} className="text-accent-cyan" weight="bold" />,
      tag: 'System App',
      recommended: false,
      accentBorder: 'hover:border-accent-cyan/60',
      accentGlow: 'hover:shadow-[0_0_15px_-3px_rgba(0,229,255,0.3)]'
    }
  ];

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-border-subtle/80 bg-surface-950">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        
        {/* Title */}
        <div className="space-y-3">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-100 max-w-2xl mx-auto leading-tight">
            {t('contact.title')}
          </h2>

          {/* Availability Subtitle */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-surface-900 border border-border-subtle text-xs font-mono text-zinc-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-mint opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-mint"></span>
            </span>
            <span>{t('contact.subtitle')}</span>
          </div>
        </div>

        {/* Email Copy Card & Direct Actions */}
        <div className="p-6 sm:p-8 rounded-xl bg-surface-900 border border-border-subtle max-w-xl mx-auto space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-lg bg-surface-950 border border-border-subtle font-mono text-xs sm:text-sm text-zinc-200">
            <div className="flex items-center gap-2">
              <EnvelopeSimple size={18} className="text-accent-cyan" />
              <span>{email}</span>
            </div>
            <button
              onClick={handleCopyEmail}
              className="w-full sm:w-auto px-3 py-1.5 rounded bg-surface-850 hover:bg-surface-800 border border-border-subtle text-xs text-zinc-300 flex items-center justify-center gap-1.5 transition-colors"
            >
              {copiedEmail ? <Check size={14} className="text-accent-mint" /> : <Copy size={14} />}
              <span>{copiedEmail ? t('contact.email_copied') : t('contact.email_btn')}</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-accent-cyan text-white dark:text-surface-950 font-bold text-xs sm:text-sm hover:bg-cyan-400 dark:hover:bg-cyan-300 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_-5px_rgba(0,229,255,0.3)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <PaperPlaneRight size={16} weight="bold" />
              <span>{t('contact.send_email_btn')}</span>
            </button>

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

      {/* ========================================================================= */}
      {/* EMAIL CLIENT / WEBMAIL SELECTOR MODAL (Tránh lỗi máy tính chưa cấu hình app mail) */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-md bg-surface-950/85 animate-fadeIn">
          <div 
            className="w-full max-w-2xl bg-surface-900 border border-border-highlight rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-scaleUp"
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-border-subtle bg-surface-950 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-800/40 text-accent-cyan">
                  <PaperPlaneRight size={20} weight="fill" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-zinc-100">
                    {t('contact.modal.title')}
                  </h3>
                  <p className="text-xs text-zinc-400 font-sans mt-0.5">
                    {t('contact.modal.subtitle')}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                className="p-2.5 rounded-xl bg-surface-900 hover:bg-red-950/60 border border-border-subtle hover:border-red-500/50 text-zinc-400 hover:text-red-400 transition-all"
                title={t('contact.modal.close')}
                aria-label="Close"
              >
                <X size={18} weight="bold" />
              </button>
            </div>

            {/* Modal Body: Provider Options & Draft Preview */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-left">
              
              {/* Providers Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {mailProviders.map((prov) => (
                  <a
                    key={prov.id}
                    href={prov.url}
                    target={prov.id === 'default' ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    onClick={() => {
                      if (prov.id === 'default') {
                        // Keep modal or auto-close after 500ms
                        setTimeout(() => setIsModalOpen(false), 500);
                      }
                    }}
                    className={`p-4 rounded-xl bg-surface-950 border border-border-subtle ${prov.accentBorder} ${prov.accentGlow} flex flex-col justify-between space-y-3 transition-all group`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="p-2 rounded-lg bg-surface-900 border border-border-subtle group-hover:border-border-highlight transition-colors">
                        {prov.icon}
                      </div>
                      <div className="flex items-center gap-1.5">
                        {prov.recommended && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-accent-cyan border border-cyan-800/40">
                            {t('contact.modal.recommended')}
                          </span>
                        )}
                        <ArrowSquareOut size={14} className="text-zinc-500 group-hover:text-zinc-300 transition-colors" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="font-bold text-xs sm:text-sm text-zinc-100 group-hover:text-accent-cyan transition-colors">
                        {prov.name}
                      </div>
                      <div className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                        {prov.desc}
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Pre-filled Email Template Preview Box */}
              <div className="p-4 rounded-xl bg-surface-950 border border-border-subtle space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border-subtle pb-2.5">
                  <div className="text-xs font-semibold text-zinc-300 flex items-center gap-2">
                    <span className="text-accent-cyan">&gt;</span>
                    <span>{t('contact.modal.preview_title')}</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyDraft}
                    className="px-2.5 py-1 rounded bg-surface-900 hover:bg-surface-850 border border-border-subtle text-[11px] font-mono text-zinc-300 flex items-center justify-center gap-1.5 transition-colors self-start sm:self-auto"
                  >
                    {copiedDraft ? <Check size={12} className="text-accent-mint" /> : <Copy size={12} />}
                    <span>{copiedDraft ? t('contact.modal.copied_draft') : t('contact.modal.copy_draft')}</span>
                  </button>
                </div>

                <div className="space-y-2 font-mono text-[11px] text-zinc-300 bg-surface-900/60 p-3 rounded-lg border border-border-subtle/60">
                  <div>
                    <span className="text-zinc-500">{t('contact.modal.subject_label')}</span>{' '}
                    <span className="text-accent-cyan font-bold">{emailSubject}</span>
                  </div>
                  <div className="pt-2 border-t border-border-subtle/40 whitespace-pre-line text-zinc-300 leading-relaxed font-sans text-xs">
                    {emailBody}
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-border-subtle bg-surface-950 flex items-center justify-between text-xs text-zinc-400 shrink-0">
              <div className="flex items-center gap-2 font-mono">
                <EnvelopeSimple size={15} className="text-accent-cyan" />
                <span>To: {email}</span>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-4 py-1.5 rounded-lg bg-surface-900 hover:bg-surface-850 border border-border-subtle text-zinc-200 font-sans font-semibold transition-colors"
              >
                {t('contact.modal.close')}
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
