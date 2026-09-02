import React, { useState, useCallback, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  ArrowDown, 
  GithubLogo, 
  LinkedinLogo,
  FilePdf,
  CheckCircle, 
  Gauge, 
  GitBranch, 
  Cpu,
  Terminal,
  Copy,
  Check,
  Play,
  Spinner,
  Broadcast,
  BookOpen
} from '@phosphor-icons/react';

type EndpointKey = 'readyz' | 'register' | 'login' | 'metrics';

interface EndpointConfig {
  method: 'POST' | 'GET';
  path: string;
  summary: string;
  tag: string;
  tagColor: string;
  payload?: any;
  defaultResponse: any;
  defaultStatus: string;
  defaultLatency: string;
}

const ENDPOINT_CONFIGS: Record<EndpointKey, EndpointConfig> = {
  readyz: {
    method: 'GET',
    path: '/readyz',
    summary: 'Database Cluster & Redis Readiness Probe',
    tag: 'GET',
    tagColor: 'text-emerald-600 dark:text-emerald-400',
    defaultStatus: "200 OK",
    defaultLatency: "14ms",
    defaultResponse: {
      code: 200,
      message: "ok",
      data: {
        db: "up",
        status: "ok"
      }
    }
  },
  register: {
    method: 'POST',
    path: '/api/v1/auth/register',
    summary: 'NIST 800-63B Password Validation & User Creation',
    tag: 'POST',
    tagColor: 'text-cyan-600 dark:text-cyan-400',
    payload: {
      username: "recruiter_test",
      fullName: "Lead Recruiter",
      email: "recruiter_test@finn.dev",
      password: "Fin_LeadEnterprise2026!#9"
    },
    defaultStatus: "201 Created",
    defaultLatency: "42ms",
    defaultResponse: {
      code: 201,
      message: "account created",
      data: {
        profile: {
          id: 15,
          username: "recruiter_test",
          email: "recruiter_test@finn.dev",
          fullName: "Lead Recruiter",
          role: "user",
          isActive: true,
          isEmailVerified: false,
          createdAt: "2026-09-02T10:15:00.000Z"
        }
      }
    }
  },
  login: {
    method: 'POST',
    path: '/api/v1/auth/login',
    summary: 'Argon2id Verification & JWT Token Issuance',
    tag: 'POST',
    tagColor: 'text-amber-600 dark:text-amber-400',
    payload: {
      email: "recruiter_test@finn.dev",
      password: "Fin_LeadEnterprise2026!#9"
    },
    defaultStatus: "200 OK",
    defaultLatency: "38ms",
    defaultResponse: {
      code: 200,
      message: "login successful",
      data: {
        profile: {
          id: 15,
          username: "recruiter_test",
          email: "recruiter_test@finn.dev",
          fullName: "Lead Recruiter",
          role: "user",
          isActive: true,
          isEmailVerified: false,
          createdAt: "2026-09-02T10:15:00.000Z"
        },
        accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjE1LCJyb2xlIjoidXNlciIsImVtYWlsIjoicmVjcnVpdGVyX3Rlc3RAZmlubi5kZXYiLCJ0eXBlIjoiYWNjZXNzIiwiaXNzIjoiZmlubmFwaWdvIiwiZXhwIjoxNzg4MzQ1OTAwfQ.7d8a9b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b",
        refreshToken: "8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b",
        expiresAt: "2026-09-02T10:30:00.000Z"
      }
    }
  },
  metrics: {
    method: 'GET',
    path: '/metrics',
    summary: 'Prometheus Runtime Engine & SRE Telemetry',
    tag: 'GET',
    tagColor: 'text-purple-600 dark:text-purple-400',
    defaultStatus: "200 OK",
    defaultLatency: "11ms",
    defaultResponse: `# HELP finnapigo_audit_buffer_depth Entries currently buffered by async audit writer
# TYPE finnapigo_audit_buffer_depth gauge
finnapigo_audit_buffer_depth 0

# HELP go_goroutines Number of goroutines currently existing
# TYPE go_goroutines gauge
go_goroutines 19

# HELP go_memstats_alloc_bytes Number of bytes allocated and still in use
# TYPE go_memstats_alloc_bytes gauge
go_memstats_alloc_bytes 4892408

# HELP finnapigo_rate_limited_requests_total Total 429 rate limit events
# TYPE finnapigo_rate_limited_requests_total counter
finnapigo_rate_limited_requests_total 0`
  }
};

export const Hero: React.FC = () => {
  const { lang, t } = useLanguage();
  const [activeEndpoint, setActiveEndpoint] = useState<EndpointKey>('readyz');
  const [copiedCode, setCopiedCode] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [liveResponse, setLiveResponse] = useState<any | null>(null);
  const [liveStatus, setLiveStatus] = useState<string | null>(null);
  const [liveLatency, setLiveLatency] = useState<string | null>(null);
  const [isLiveConnected, setIsLiveConnected] = useState(false);

  const currentConfig = ENDPOINT_CONFIGS[activeEndpoint];
  const displayedContent = liveResponse !== null ? liveResponse : currentConfig.defaultResponse;
  const displayedStatus = liveStatus || currentConfig.defaultStatus;
  const displayedLatency = liveLatency || currentConfig.defaultLatency;

  const handleExecuteLive = useCallback(async () => {
    setIsExecuting(true);
    const start = performance.now();

    try {
      const baseUrl = 'https://finnapigo.onrender.com';
      let res: Response;

      if (activeEndpoint === 'readyz') {
        res = await fetch(`${baseUrl}/readyz`);
      } else if (activeEndpoint === 'register') {
        const seed = Math.random().toString(36).substring(2, 6);
        const dynamicPayload = {
          username: `user_${seed}`,
          fullName: `Recruiter Tester ${seed}`,
          email: `recruiter_${seed}@finn.dev`,
          password: `Fin_${Math.random().toString(36).substring(2, 8)}!9Aa`
        };
        res = await fetch(`${baseUrl}/api/v1/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dynamicPayload)
        });
      } else if (activeEndpoint === 'login') {
        const seed = Math.random().toString(36).substring(2, 6);
        const demoEmail = `lead_${seed}@finn.dev`;
        const demoPass = `Fin_${Math.random().toString(36).substring(2, 8)}!9Aa`;
        try {
          await fetch(`${baseUrl}/api/v1/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: `lead_${seed}`,
              fullName: `Lead Recruiter ${seed}`,
              email: demoEmail,
              password: demoPass
            })
          });
        } catch {}

        res = await fetch(`${baseUrl}/api/v1/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: demoEmail, password: demoPass })
        });
      } else {
        // metrics endpoint (plain text)
        res = await fetch(`${baseUrl}/metrics`);
      }

      const elapsed = Math.round(performance.now() - start);
      setLiveStatus(`${res.status} ${res.statusText || 'OK'}`);
      setLiveLatency(`${elapsed}ms`);
      setIsLiveConnected(true);

      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const json = await res.json();
        setLiveResponse(json);
      } else {
        const text = await res.text();
        // Snippet first 500 chars for readability if it's metrics
        setLiveResponse(text.length > 500 ? text.substring(0, 500) + '\n...' : text);
      }
    } catch (err: any) {
      const elapsed = Math.round(performance.now() - start);
      setLiveStatus("Error (Network Offline)");
      setLiveLatency(`${elapsed}ms`);
      setLiveResponse({
        error: "Failed to connect to Render server",
        detail: err?.message || "Network timeout"
      });
    } finally {
      setIsExecuting(false);
    }
  }, [activeEndpoint]);

  const handleCopyCode = useCallback(() => {
    if (typeof navigator !== 'undefined') {
      const textToCopy = typeof displayedContent === 'string' 
        ? displayedContent 
        : JSON.stringify(displayedContent, null, 2);
      navigator.clipboard.writeText(textToCopy);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  }, [displayedContent]);

  const handleTabChange = useCallback((key: EndpointKey) => {
    setActiveEndpoint(key);
    setLiveResponse(null);
    setLiveStatus(null);
    setLiveLatency(null);
  }, []);

  const telemetryItems = useMemo(() => [
    { 
      label: t('telemetry.uptime'), 
      val: t('telemetry.uptime_val'), 
      icon: <Gauge size={16} className="text-accent-cyan" />,
      sub: "Render Edge" 
    },
    { 
      label: t('telemetry.coverage'), 
      val: t('telemetry.coverage_val'), 
      icon: <CheckCircle size={16} className="text-emerald-400" />,
      sub: "Go Unit Tests" 
    },
    { 
      label: t('telemetry.ci_status'), 
      val: t('telemetry.ci_val'), 
      icon: <GitBranch size={16} className="text-cyan-400" />,
      sub: "GitHub Actions" 
    },
    { 
      label: t('telemetry.latency'), 
      val: t('telemetry.latency_val'), 
      icon: <Cpu size={16} className="text-amber-400" />,
      sub: "Benchmarked" 
    },
  ], [t]);

  return (
    <section className="relative min-h-[92dvh] flex flex-col justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Decorative Blur & Grid Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-accent-cyan/10 via-emerald-500/5 to-purple-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="w-full max-w-[1440px] mx-auto flex-1 flex flex-col justify-center space-y-10">
        
        {/* Main Grid: Left Value Prop + Right Live Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Hero Narrative */}
          <div className="space-y-6 lg:col-span-7">
            
            {/* Status / Architecture Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-900 border border-border-subtle text-xs font-mono text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-zinc-400">{t('hero.role')}</span>
              <span className="text-zinc-600">|</span>
              <span className="text-accent-cyan font-semibold">{t('hero.specialty')}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-100 leading-[1.15]">
                {t('hero.headline_prefix')}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan via-emerald-400 to-cyan-300">
                  {t('hero.headline_highlight')}
                </span>{' '}
                {t('hero.headline_suffix')}
              </h1>
              <p className="text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed font-sans">
                {t('hero.subheadline')}
              </p>
            </div>

            {/* Core Tech Stack Badges */}
            <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
              <span className="px-2.5 py-1 rounded bg-surface-900 border border-cyan-500/30 text-cyan-300">
                Go 1.23 · Gin
              </span>
              <span className="px-2.5 py-1 rounded bg-surface-900 border border-emerald-500/30 text-emerald-300">
                PostgreSQL 16 · Redis 7
              </span>
              <span className="px-2.5 py-1 rounded bg-surface-900 border border-purple-500/30 text-purple-300">
                JWT · Argon2id · TOTP
              </span>
              <span className="px-2.5 py-1 rounded bg-surface-900 border border-amber-500/30 text-amber-300">
                FIDO2 Passkeys
              </span>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent-cyan hover:bg-cyan-400 text-surface-950 font-bold text-sm transition-all shadow-[0_0_20px_-3px_rgba(0,229,255,0.4)] hover:shadow-[0_0_25px_-2px_rgba(0,229,255,0.6)]"
              >
                <span>{t('hero.cta.projects')}</span>
                <ArrowDown size={16} weight="bold" />
              </a>

              <a
                href="https://github.com/NguyenQuan121321/FinnApiGo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface-900 hover:bg-surface-850 border border-border-subtle hover:border-border-highlight text-zinc-200 text-sm font-medium transition-all"
              >
                <GithubLogo size={18} weight="bold" />
                <span>{t('hero.cta.github')}</span>
              </a>

              <a
                href="/cv.pdf"
                download="NguyenHoangAnhQuan_Backend_CV.pdf"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-transparent hover:from-emerald-500/20 hover:to-cyan-500/20 border border-emerald-500/30 hover:border-emerald-400 text-emerald-300 text-sm font-medium transition-all"
              >
                <FilePdf size={18} weight="bold" className="text-emerald-400" />
                <span>{t('hero.cta.cv')}</span>
              </a>

              <a
                href="https://www.linkedin.com/in/qu%C3%A2n-nguy%E1%BB%85n-bb2053433/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface-900 hover:bg-surface-850 border border-border-subtle hover:border-border-highlight text-zinc-300 text-sm font-medium transition-all"
              >
                <LinkedinLogo size={18} weight="bold" className="text-blue-400" />
                <span>{t('hero.cta.linkedin')}</span>
              </a>
            </div>
          </div>

          {/* Right Column: 100% Genuine Live Backend Terminal Simulator (Desktop Only) */}
          <div className="hidden lg:block lg:col-span-5">
            <div className="rounded-2xl bg-white dark:bg-[#0d1117] border border-slate-200/90 dark:border-border-highlight/80 shadow-[0_15px_45px_-10px_rgba(0,0,0,0.08)] dark:shadow-[0_15px_50px_-15px_rgba(0,0,0,0.5)] backdrop-blur-xl overflow-hidden transition-all hover:border-accent-cyan/60 group">
              
              {/* Terminal Window Header (MacOS Studio Chrome) */}
              <div className="px-4 py-3 bg-slate-100/90 dark:bg-[#080a0f] border-b border-slate-200/90 dark:border-zinc-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-sm"></span>
                    <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block shadow-sm"></span>
                    <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block shadow-sm"></span>
                  </div>
                  <div className="flex items-center gap-1.5 ml-2 text-[11px] font-mono text-slate-600 dark:text-zinc-300">
                    <Terminal size={13} className="text-cyan-600 dark:text-accent-cyan" />
                    <span>finnapigo.onrender.com · Go 1.23</span>
                  </div>
                </div>

                {/* Status indicator & Direct Swagger UI Link */}
                <div className="flex items-center gap-2">
                  <a
                    href="https://finnapigo.onrender.com/swagger/index.html#/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[10.5px] font-mono bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-600 dark:text-emerald-400 border border-emerald-500/35 transition-all font-semibold shadow-xs hover:scale-105"
                    title="Open Live Interactive Swagger OpenAPI UI (31 Routes)"
                  >
                    <BookOpen size={12} />
                    <span>OpenAPI Swagger UI ↗</span>
                  </a>

                  <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10.5px] font-mono border ${
                    isLiveConnected 
                      ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                      : 'bg-cyan-500/10 border-cyan-500/20 text-cyan-700 dark:text-accent-cyan'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${isLiveConnected ? 'bg-emerald-500 animate-ping' : 'bg-cyan-600 dark:bg-accent-cyan'}`}></span>
                    <span>{displayedStatus} · {displayedLatency}</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="p-1 rounded hover:bg-slate-200 dark:hover:bg-zinc-800 text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-100 transition-colors"
                    title="Copy response"
                  >
                    {copiedCode ? <Check size={13} className="text-emerald-600 dark:text-accent-mint" /> : <Copy size={13} />}
                  </button>
                </div>
              </div>

              {/* Endpoint Switcher Tabs & Live Execute Trigger */}
              <div className="px-3 py-2 bg-slate-50/95 dark:bg-[#0d1117] border-b border-slate-200/90 dark:border-zinc-800/80 flex items-center justify-between gap-2 font-mono text-[11px]">
                <div className="flex items-center gap-1 overflow-x-auto">
                  <button
                    type="button"
                    onClick={() => handleTabChange('readyz')}
                    className={`px-2 py-1 rounded-md transition-all flex items-center gap-1 border shrink-0 ${
                      activeEndpoint === 'readyz'
                        ? 'bg-white dark:bg-cyan-500/20 border-slate-300 dark:border-cyan-400/50 text-cyan-700 dark:text-cyan-300 font-semibold shadow-xs'
                        : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200 hover:bg-slate-200/60 dark:hover:bg-zinc-800/60 border-transparent'
                    }`}
                  >
                    <span className="text-[9.5px] text-emerald-600 dark:text-emerald-400 font-bold">GET</span>
                    <span>/readyz</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleTabChange('register')}
                    className={`px-2 py-1 rounded-md transition-all flex items-center gap-1 border shrink-0 ${
                      activeEndpoint === 'register'
                        ? 'bg-white dark:bg-cyan-500/20 border-slate-300 dark:border-cyan-400/50 text-cyan-700 dark:text-cyan-300 font-semibold shadow-xs'
                        : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200 hover:bg-slate-200/60 dark:hover:bg-zinc-800/60 border-transparent'
                    }`}
                  >
                    <span className="text-[9.5px] text-cyan-600 dark:text-cyan-400 font-bold">POST</span>
                    <span>/auth/register</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleTabChange('login')}
                    className={`px-2 py-1 rounded-md transition-all flex items-center gap-1 border shrink-0 ${
                      activeEndpoint === 'login'
                        ? 'bg-white dark:bg-cyan-500/20 border-slate-300 dark:border-cyan-400/50 text-cyan-700 dark:text-cyan-300 font-semibold shadow-xs'
                        : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200 hover:bg-slate-200/60 dark:hover:bg-zinc-800/60 border-transparent'
                    }`}
                  >
                    <span className="text-[9.5px] text-amber-600 dark:text-amber-400 font-bold">POST</span>
                    <span>/auth/login</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleTabChange('metrics')}
                    className={`px-2 py-1 rounded-md transition-all flex items-center gap-1 border shrink-0 ${
                      activeEndpoint === 'metrics'
                        ? 'bg-white dark:bg-cyan-500/20 border-slate-300 dark:border-cyan-400/50 text-cyan-700 dark:text-cyan-300 font-semibold shadow-xs'
                        : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200 hover:bg-slate-200/60 dark:hover:bg-zinc-800/60 border-transparent'
                    }`}
                  >
                    <span className="text-[9.5px] text-purple-600 dark:text-purple-400 font-bold">GET</span>
                    <span>/metrics</span>
                  </button>
                </div>

                {/* Live Run Button */}
                <button
                  type="button"
                  onClick={handleExecuteLive}
                  disabled={isExecuting}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-accent-cyan hover:bg-cyan-400 text-slate-950 font-bold text-[11px] transition-all active:scale-95 disabled:opacity-50 shadow-sm hover:shadow-[0_0_14px_rgba(0,229,255,0.4)] shrink-0"
                  title="Send real HTTP request to Render Backend"
                >
                  {isExecuting ? (
                    <>
                      <Spinner size={12} className="animate-spin text-slate-950" />
                      <span>Live Call...</span>
                    </>
                  ) : (
                    <>
                      <Play size={11} weight="fill" />
                      <span>{lang === 'vi' ? 'Gửi Request Thật' : 'Run Live'}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Terminal Code Body */}
              <div className="p-4 font-mono text-[11.5px] text-slate-800 dark:text-zinc-100 bg-[#F8FAFC] dark:bg-[#05070a] overflow-x-auto leading-relaxed max-h-[235px] select-text">
                <div className="text-slate-500 dark:text-zinc-400 mb-1.5 flex items-center gap-1.5 text-[11px] font-medium">
                  <span className="text-cyan-600 dark:text-accent-cyan font-bold">$</span>
                  <span>curl -X {currentConfig.method} https://finnapigo.onrender.com{currentConfig.path}</span>
                </div>
                <pre className="text-slate-800 dark:text-zinc-100 font-mono text-[11px] leading-relaxed font-medium">
                  {typeof displayedContent === 'string' 
                    ? displayedContent 
                    : JSON.stringify(displayedContent, null, 2)}
                </pre>
              </div>

              {/* Terminal Footer */}
              <div className="px-4 py-2 bg-slate-100/90 dark:bg-[#080a0f] border-t border-slate-200/90 dark:border-zinc-800/80 flex items-center justify-between text-[10.5px] font-mono text-slate-600 dark:text-zinc-300">
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                  <Broadcast size={13} className="text-emerald-600 dark:text-emerald-400" />
                  <span>{isLiveConnected ? (lang === 'vi' ? 'Đã kết nối Backend Render Thật' : 'Connected to Render Live Backend') : (lang === 'vi' ? 'API Render Sẵn sàng' : 'Render Live API Ready')}</span>
                </span>
                <span className="text-slate-500 dark:text-zinc-400">Go 1.23 · PostgreSQL 16 · Redis 7</span>
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
