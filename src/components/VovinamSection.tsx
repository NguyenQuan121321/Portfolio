import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  GraduationCap, 
  UsersThree, 
  QrCode, 
  CalendarCheck, 
  ShieldCheck, 
  CheckCircle,
  Clock,
  ArrowRight
} from '@phosphor-icons/react';

export const VovinamSection: React.FC = () => {
  const { t } = useLanguage();
  const [activeMilestone, setActiveMilestone] = useState<number>(3); // Default to M3

  const scopes = [
    { text: t('project.vovinam.scope_1'), icon: <UsersThree size={18} className="text-accent-cyan" /> },
    { text: t('project.vovinam.scope_2'), icon: <QrCode size={18} className="text-emerald-400" /> },
    { text: t('project.vovinam.scope_3'), icon: <GraduationCap size={18} className="text-amber-400" /> },
    { text: t('project.vovinam.scope_4'), icon: <CalendarCheck size={18} className="text-purple-400" /> },
  ];

  const milestones = [
    { id: 1, title: t('project.vovinam.m1'), detail: t('project.vovinam.m1_detail'), status: 'completed' },
    { id: 2, title: t('project.vovinam.m2'), detail: t('project.vovinam.m2_detail'), status: 'completed' },
    { id: 3, title: t('project.vovinam.m3'), detail: t('project.vovinam.m3_detail'), status: 'in-progress' },
    { id: 4, title: t('project.vovinam.m4'), detail: t('project.vovinam.m4_detail'), status: 'planned' },
    { id: 5, title: t('project.vovinam.m5'), detail: t('project.vovinam.m5_detail'), status: 'planned' },
    { id: 6, title: t('project.vovinam.m6'), detail: t('project.vovinam.m6_detail'), status: 'planned' },
  ];

  return (
    <section id="thesis" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-border-subtle/80 bg-surface-950">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-950/40 border border-amber-500/30 text-xs font-mono text-amber-300">
            <GraduationCap size={16} weight="bold" />
            <span>{t('project.vovinam.badge')}</span>
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100">
              {t('project.vovinam.title')}
            </h2>
            <p className="text-amber-400 font-mono text-sm mt-1">
              {t('project.vovinam.tagline')}
            </p>
          </div>

          <p className="text-zinc-300 max-w-3xl leading-relaxed text-sm sm:text-base">
            {t('project.vovinam.description')}
          </p>
        </div>

        {/* System Capabilities & RBAC Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Capabilities */}
          <div className="bg-surface-900 border border-border-subtle rounded-xl p-6 sm:p-7 space-y-4">
            <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
              <ShieldCheck size={18} className="text-accent-cyan" />
              <span>{t('project.vovinam.scope_title')}</span>
            </h3>
            <div className="space-y-3">
              {scopes.map((s, i) => (
                <div 
                  key={i} 
                  className="flex items-start gap-3 p-3 rounded-lg bg-surface-950/70 border border-border-subtle/80 text-xs sm:text-sm text-zinc-300"
                >
                  <div className="shrink-0 mt-0.5">{s.icon}</div>
                  <span className="leading-relaxed">{s.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Planned Tech Stack & Security Heritage */}
          <div className="bg-surface-900 border border-border-subtle rounded-xl p-6 sm:p-7 space-y-5">
            <div>
              <h3 className="text-base font-bold text-zinc-100 mb-3">
                Planned Technology Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  'TypeScript', 'Node.js 22 LTS', 'PostgreSQL 16', 'Prisma / Drizzle ORM', 
                  'Docker Compose', 'Argon2id', 'OpenAPI 3.1', 'VietQR Webhook', 'Jest / Supertest'
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded bg-surface-950 border border-border-subtle font-mono text-xs text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-lg bg-surface-950 border border-border-subtle/80 space-y-2 text-xs font-mono">
              <div className="text-accent-cyan font-bold flex items-center gap-1.5">
                <ShieldCheck size={16} />
                <span>Security Heritage from FinnApiGo</span>
              </div>
              <ul className="space-y-1.5 text-zinc-400">
                <li>• Argon2id password hashing parameters calibrated against GPU cracking</li>
                <li>• HMAC-SHA256 signature verification for VietQR banking webhooks</li>
                <li>• Deny-by-default RBAC with object-level authorization locks</li>
                <li>• Idempotent payment reconciliation ledger preventing double credits</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Interactive Delivery Roadmap */}
        <div className="bg-surface-900 border border-border-subtle rounded-xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border-subtle pb-4">
            <div>
              <h3 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
                <Clock size={20} className="text-amber-400" />
                <span>{t('project.vovinam.roadmap_title')}</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Structured phased delivery plan leading to thesis defense and live club deployment.
              </p>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-mono text-zinc-400">
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-accent-mint inline-block"></span> Done</span>
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-accent-cyan inline-block animate-pulse"></span> Active</span>
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-zinc-600 inline-block"></span> Planned</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {milestones.map((m) => {
              const isCurrent = activeMilestone === m.id;
              const isDone = m.status === 'completed';
              const isInProg = m.status === 'in-progress';

              return (
                <button
                  key={m.id}
                  onClick={() => setActiveMilestone(m.id)}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    isCurrent 
                      ? 'bg-surface-850 border-amber-400 shadow-[0_0_15px_-4px_rgba(245,158,11,0.25)]' 
                      : 'bg-surface-950/70 border-border-subtle hover:border-border-highlight'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-zinc-400">
                      MILESTONE {m.id}
                    </span>
                    {isDone && <CheckCircle size={16} className="text-accent-mint" weight="fill" />}
                    {isInProg && <span className="h-2 w-2 rounded-full bg-accent-cyan animate-pulse"></span>}
                    {!isDone && !isInProg && <span className="h-2 w-2 rounded-full bg-zinc-700"></span>}
                  </div>
                  <div className={`text-sm font-semibold mb-1 ${isCurrent ? 'text-amber-300' : 'text-zinc-200'}`}>
                    {m.title}
                  </div>
                  <div className="text-xs text-zinc-400 font-mono line-clamp-2">
                    {m.detail}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Milestone Highlight */}
          {(() => {
            const currentM = milestones.find(m => m.id === activeMilestone) || milestones[0];
            if (!currentM) return null;
            return (
              <div className="p-4 rounded-lg bg-surface-950 border border-border-subtle/80 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 text-zinc-300">
                  <ArrowRight size={16} className="text-amber-400 shrink-0" />
                  <span className="font-semibold text-zinc-100">{currentM.title}:</span>
                  <span className="text-zinc-400">{currentM.detail}</span>
                </div>
                <span className="hidden sm:inline-block text-[11px] px-2 py-0.5 rounded bg-surface-900 border border-border-subtle text-amber-300">
                  {currentM.status.toUpperCase()}
                </span>
              </div>
            );
          })()}
        </div>

      </div>
    </section>
  );
};
