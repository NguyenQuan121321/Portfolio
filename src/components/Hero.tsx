import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  ArrowDown, 
  GithubLogo, 
  LinkedinLogo,
  FilePdf,
  ShieldCheck, 
  CheckCircle, 
  Gauge, 
  GitBranch, 
  Cpu,
  Terminal,
  Copy,
  Check
} from '@phosphor-icons/react';

export const Hero: React.FC = () => {
  const { t } = useLanguage();
  const [activeEndpoint, setActiveEndpoint] = useState<'health' | 'sudo' | 'metrics'>('health');
  const [copiedCode, setCopiedCode] = useState(false);

  const endpointData = {
    health: {
      method: 'GET',
      path: '/api/v1/health',
      status: '200 OK',
      latency: '14ms',
      json: {
        status: "HEALTHY",
        runtime: "go1.23.0 linux/amd64",
        architecture: "Clean Architecture / Gin",
        crypto_engine: "Argon2id + WebAuthn FIDO2",
        database: "PostgreSQL 16 (Connection Pool OK)",
        cache: "Redis 7 (Lua Script Token Swaps)"
      }
    },
    sudo: {
      method: 'POST',
      path: '/api/v1/auth/sudo',
      status: '200 OK',
      latency: '22ms',
      json: {
        status: "SUDO_MODE_ACTIVE",
        grant_token: "sudo_tok_8f1a2c4e9b",
        ttl_seconds: 300,
        scope: "elevated_security_ops",
        method: "Biometric_Passkey_FIDO2",
        revocation: "Auto_Redis_TTL"
      }
    },
    metrics: {
      method: 'GET',
      path: '/api/v1/metrics',
      status: '200 OK',
      latency: '9ms',
      json: {
        uptime_hours: 720.5,
        p99_latency_ms: 28.4,
        throughput_rps: 1250,
        active_goroutines: 38,
        heap_alloc_mb: 12.4,
        zero_downtime: true
      }
    }
  };

  const curr = endpointData[activeEndpoint];

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(curr.json, null, 2));
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const telemetryItems = [
    { 
      label: t('telemetry.uptime'), 
      val: t('telemetry.uptime_val'), 
      icon: <Gauge size={16} className="text-accent-mint" />,
      sub: "Render Prod" 
    },
    { 
      label: t('telemetry.tests'), 
      val: t('telemetry.tests_val'), 
      icon: <CheckCircle size={16} className="text-accent-cyan" />,
      sub: "Unit & Fuzz" 
    },
    { 
      label: t('telemetry.ci'), 
      val: t('telemetry.ci_val'), 
      icon: <GitBranch size={16} className="text-emerald-400" />,
      sub: "GitHub Actions" 
    },
    { 
      label: t('telemetry.latency'), 
      val: t('telemetry.latency_val'), 
      icon: <Cpu size={16} className="text-amber-400" />,
      sub: "Benchmarked" 
    },
  ];

  return (
    <section className="relative min-h-[92dvh] flex flex-col justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background subtle architectural grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]" 
        style={{ 
          backgroundImage: `radial-gradient(#00E5FF 1px, transparent 1px)`, 
          backgroundSize: '24px 24px' 
        }} 
      />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto w-full space-y-10">
        
        {/* Top Eyebrow / Role Badge */}
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-surface-900 border border-border-subtle text-xs font-mono text-zinc-300">
            <ShieldCheck size={16} className="text-accent-cyan" weight="bold" />
            <span>{t('hero.badge')}</span>
          </div>
          <span className="text-xs font-mono text-zinc-400">Dong Nai, Viet Nam</span>
        </div>

        {/* Main 2-Column Hero Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4">
              {/* Subtle Elegance Greeting & Candidate Identity */}
              <div className="flex items-center gap-2 font-mono text-sm sm:text-base text-zinc-400">
                <span className="text-accent-cyan font-bold">&gt;</span>
                <span>{t('hero.greeting')}</span>
                <span className="font-semibold text-zinc-100">{t('hero.name')}</span>
              </div>

              {/* Main Powerful Engineering Slogan Headline */}
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-100 leading-[1.22] sm:leading-[1.25]">
                <span className="block">{t('hero.headline_prefix')}</span>
                <span className="block mt-1 pb-1 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-accent-cyan to-emerald-400">
                  {t('hero.headline_highlight')}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed font-normal pt-1">
                {t('hero.description')}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-accent-cyan text-white dark:text-surface-950 font-bold text-sm hover:bg-cyan-400 dark:hover:bg-cyan-300 transition-all shadow-[0_0_20px_-5px_rgba(0,229,255,0.4)] active:scale-95"
              >
                <span>{t('hero.cta.projects')}</span>
                <ArrowDown size={16} weight="bold" />
              </a>

              <a
                href="/CV_Nguyen_Hoang_Anh_Quan_Backend_Developer.pdf"
                download="CV_Nguyen_Hoang_Anh_Quan_Backend_Developer.pdf"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-surface-900 hover:bg-surface-850 border border-accent-cyan/40 hover:border-accent-cyan text-zinc-100 font-mono text-sm transition-all shadow-sm active:scale-95 group"
              >
                <FilePdf size={18} className="text-accent-cyan group-hover:scale-110 transition-transform" weight="bold" />
                <span>{t('hero.cta.cv')}</span>
              </a>

              <a
                href="https://github.com/NguyenQuan121321"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-surface-900 hover:bg-surface-850 border border-border-subtle hover:border-border-highlight text-zinc-200 font-mono text-sm transition-all active:scale-95"
              >
                <GithubLogo size={18} weight="bold" />
                <span>{t('hero.cta.github')}</span>
              </a>

              <a
                href="https://www.linkedin.com/in/qu%C3%A2n-nguy%E1%BB%85n-bb2053433/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-surface-900 hover:bg-surface-850 border border-border-subtle hover:border-accent-cyan/60 text-zinc-200 hover:text-accent-cyan font-mono text-sm transition-all active:scale-95"
              >
                <LinkedinLogo size={18} weight="bold" className="text-blue-400" />
                <span>{t('hero.cta.linkedin')}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Live Backend Terminal Simulator (Desktop Only) */}
          <div className="hidden lg:block lg:col-span-5">
            <div className="rounded-2xl bg-surface-900/90 border border-border-highlight/80 shadow-[0_12px_40px_-15px_rgba(0,0,0,0.5)] backdrop-blur-xl overflow-hidden transition-all hover:border-accent-cyan/40 group">
              
              {/* Terminal Window Header */}
              <div className="px-4 py-3 bg-surface-950/90 border-b border-border-subtle flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                  </div>
                  <div className="flex items-center gap-1.5 ml-2 text-[11px] font-mono text-zinc-400">
                    <Terminal size={13} className="text-accent-cyan" />
                    <span>api.finn.dev · Go 1.23</span>
                  </div>
                </div>

                {/* Status indicator */}
                <div className="flex items-center gap-2">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[10.5px] font-mono text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>{curr.status} · {curr.latency}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyJson}
                    className="p-1 rounded hover:bg-surface-850 text-zinc-400 hover:text-zinc-200 transition-colors"
                    title="Copy response JSON"
                  >
                    {copiedCode ? <Check size={13} className="text-accent-mint" /> : <Copy size={13} />}
                  </button>
                </div>
              </div>

              {/* Endpoint Switcher Tabs */}
              <div className="px-3 py-2 bg-surface-950/50 border-b border-border-subtle/60 flex items-center gap-1.5 font-mono text-[11px]">
                <button
                  type="button"
                  onClick={() => setActiveEndpoint('health')}
                  className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${
                    activeEndpoint === 'health'
                      ? 'bg-accent-cyan/15 border border-accent-cyan/30 text-accent-cyan font-semibold'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-surface-850 border border-transparent'
                  }`}
                >
                  <span className="text-[9.5px] text-emerald-400 font-bold">GET</span>
                  <span>/health</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveEndpoint('sudo')}
                  className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${
                    activeEndpoint === 'sudo'
                      ? 'bg-accent-cyan/15 border border-accent-cyan/30 text-accent-cyan font-semibold'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-surface-850 border border-transparent'
                  }`}
                >
                  <span className="text-[9.5px] text-amber-400 font-bold">POST</span>
                  <span>/auth/sudo</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveEndpoint('metrics')}
                  className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${
                    activeEndpoint === 'metrics'
                      ? 'bg-accent-cyan/15 border border-accent-cyan/30 text-accent-cyan font-semibold'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-surface-850 border border-transparent'
                  }`}
                >
                  <span className="text-[9.5px] text-purple-400 font-bold">GET</span>
                  <span>/metrics</span>
                </button>
              </div>

              {/* Terminal Code Body */}
              <div className="p-4 font-mono text-[11.5px] text-zinc-300 bg-[#080a0f] overflow-x-auto leading-relaxed max-h-[220px]">
                <div className="text-zinc-500 mb-1 flex items-center gap-1">
                  <span className="text-accent-cyan">$</span>
                  <span>curl -X {curr.method} https://api.finn.dev{curr.path}</span>
                </div>
                <pre className="text-zinc-200 font-mono text-[11px] leading-relaxed">
                  {JSON.stringify(curr.json, null, 2)}
                </pre>
              </div>

              {/* Terminal Footer */}
              <div className="px-4 py-2 bg-surface-950/80 border-t border-border-subtle/60 flex items-center justify-between text-[10.5px] font-mono text-zinc-500">
                <span className="flex items-center gap-1.5 text-zinc-400">
                  <span className="w-2 h-2 rounded-full bg-accent-mint inline-block"></span>
                  <span>FinnApiGo Live Service</span>
                </span>
                <span>Content-Type: application/json</span>
              </div>

            </div>
          </div>

        </div>

        {/* Telemetry Strip */}
        <div className="pt-6 border-t border-border-subtle/80">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan animate-pulse"></span>
            <span className="text-[11px] font-mono tracking-wider uppercase text-zinc-400 font-semibold">
              {t('telemetry.title')}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {telemetryItems.map((item, idx) => (
              <div 
                key={idx}
                className="bg-surface-900/90 border border-border-subtle rounded-lg p-3.5 sm:p-4 hover:border-border-highlight transition-all"
              >
                <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                  <span>{item.label}</span>
                  {item.icon}
                </div>
                <div className="font-mono text-lg sm:text-xl font-bold text-zinc-100">
                  {item.val}
                </div>
                <div className="text-[11px] font-mono text-zinc-400 mt-0.5">
                  {item.sub}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
