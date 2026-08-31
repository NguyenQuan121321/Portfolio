import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Database, 
  ShieldCheck, 
  GitBranch, 
  Cpu
} from '@phosphor-icons/react';

export const Skills: React.FC = () => {
  const { t } = useLanguage();

  const skillCategories = [
    {
      title: t('skills.cat_backend'),
      icon: <Cpu size={20} className="text-accent-cyan" />,
      skills: [
        { name: 'Go (Gin, GORM)', project: 'FinnApiGo', detail: 'Clean Architecture, framework-agnostic domain logic' },
        { name: 'Node.js & TypeScript', project: 'VovinamApiNode', detail: 'Type-safe service layer, Express/Fastify REST' },
        { name: 'REST API & OpenAPI 3.1', project: 'Both', detail: 'Swagger UI docs, contract drift automated checks' },
        { name: 'Clean Architecture & DTOs', project: 'Both', detail: 'Strict boundary isolation enforced via depguard' }
      ]
    },
    {
      title: t('skills.cat_db'),
      icon: <Database size={20} className="text-purple-400" />,
      skills: [
        { name: 'MySQL 8', project: 'FinnApiGo', detail: 'Relational data models, indexing, transactions' },
        { name: 'PostgreSQL 16', project: 'VovinamApiNode', detail: 'Schema migrations, UUID primary keys, RBAC stores' },
        { name: 'Redis 7', project: 'FinnApiGo', detail: 'Distributed sessions, sliding rate limits, refresh token blacklist' },
        { name: 'SQL Migrations', project: 'Both', detail: 'Automated migration pipelines in Docker' }
      ]
    },
    {
      title: t('skills.cat_security'),
      icon: <ShieldCheck size={20} className="text-emerald-400" />,
      skills: [
        { name: 'JWT Rotation & Blacklist', project: 'FinnApiGo', detail: 'Single-use refresh token rotation with reuse detection' },
        { name: 'WebAuthn / FIDO2 Passkeys', project: 'FinnApiGo', detail: 'Passwordless passkeys with sign-count clone detection' },
        { name: 'TOTP 2FA (RFC 6238)', project: 'Both', detail: 'Dynamic QR provisioning, AES-256-GCM recovery codes' },
        { name: 'Defensive Crypto & HIBP', project: 'Both', detail: 'Constant-time auth, BCrypt 72B cap, Argon2id, HIBP checks' }
      ]
    },
    {
      title: t('skills.cat_devops'),
      icon: <GitBranch size={20} className="text-amber-400" />,
      skills: [
        { name: 'CI/CD (GitHub Actions)', project: 'FinnApiGo', detail: '7-stage pipeline: lint, test, security scans, coverage' },
        { name: 'Docker & Docker Compose', project: 'Both', detail: 'Multi-stage builds, isolated local database services' },
        { name: 'Automated & Fuzz Testing', project: 'FinnApiGo', detail: '258 unit tests, 3 fuzzing targets, integration tests' },
        { name: 'Observability & Metrics', project: 'FinnApiGo', detail: 'Prometheus metrics exporter, slog structured JSON logs' }
      ]
    },
  ];

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-border-subtle/80 bg-surface-950">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100">
            {t('skills.title')}
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl">
            {t('skills.subtitle')}
          </p>
        </div>

        {/* 4-Column Skill Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((cat, i) => (
            <div 
              key={i} 
              className="bg-surface-900 border border-border-subtle hover:border-border-highlight rounded-xl p-6 space-y-5 transition-all"
            >
              <div className="flex items-center gap-2.5 border-b border-border-subtle pb-3">
                {cat.icon}
                <h3 className="font-bold text-base text-zinc-100 font-mono">
                  {cat.title}
                </h3>
              </div>

              <div className="space-y-3.5">
                {cat.skills.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="p-3 rounded-lg bg-surface-950/70 border border-border-subtle/80 space-y-1 hover:border-border-highlight transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold text-zinc-200">
                        {item.name}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-900 border border-border-subtle text-accent-cyan">
                        {item.project}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-normal font-sans">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
