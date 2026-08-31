import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  ShieldCheck, 
  Key, 
  Fingerprint, 
  Cpu, 
  LockKey, 
  GitBranch, 
  Copy, 
  Check, 
  ArrowSquareOut, 
  Code, 
  Database, 
  Shuffle, 
  Broadcast,
  Eye
} from '@phosphor-icons/react';

export const FinnApiGoSection: React.FC = () => {
  const { t } = useLanguage();
  
  // Interactive Architecture Layer State
  const [activeLayer, setActiveLayer] = useState<number>(3); // Default to Service layer

  // Interactive Playground State
  const [selectedEndpoint, setSelectedEndpoint] = useState<'login' | 'totp' | 'metrics'>('login');
  const [copiedCurl, setCopiedCurl] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedTimestamp, setSimulatedTimestamp] = useState<string>(new Date().toISOString());

  const layers = [
    {
      id: 0,
      name: t('project.finnapi.arch.layer_client'),
      tech: 'HTTP/2 · TLS 1.3',
      desc: t('project.finnapi.arch.layer_client_desc'),
      icon: <Broadcast size={18} className="text-cyan-400" />
    },
    {
      id: 1,
      name: t('project.finnapi.arch.layer_mw'),
      tech: 'IPv6 /64 · CSP · CORS',
      desc: t('project.finnapi.arch.layer_mw_desc'),
      icon: <ShieldCheck size={18} className="text-emerald-400" />
    },
    {
      id: 2,
      name: t('project.finnapi.arch.layer_handlers'),
      tech: 'Strict DTO · Validation',
      desc: t('project.finnapi.arch.layer_handlers_desc'),
      icon: <Code size={18} className="text-amber-400" />
    },
    {
      id: 3,
      name: t('project.finnapi.arch.layer_services'),
      tech: 'Pure Domain · depguard',
      desc: t('project.finnapi.arch.layer_services_desc'),
      icon: <Cpu size={18} className="text-accent-cyan" />,
      isCore: true
    },
    {
      id: 4,
      name: t('project.finnapi.arch.layer_repo'),
      tech: 'MySQL 8 · Redis 7',
      desc: t('project.finnapi.arch.layer_repo_desc'),
      icon: <Database size={18} className="text-purple-400" />
    },
  ];

  const endpoints = {
    login: {
      method: 'POST',
      path: '/api/v1/auth/login',
      status: 200,
      latency: '14.2ms',
      reqBody: JSON.stringify({
        email: "engineer.candidate@finnapi.dev",
        password: "••••••••••••••••"
      }, null, 2),
      headers: {
        "Content-Type": "application/json",
        "X-Content-Type-Options": "nosniff",
        "Strict-Transport-Security": "max-age=63072000; includeSubDomains",
        "RateLimit-Limit": "100",
        "RateLimit-Remaining": "98",
      },
      resBody: {
        success: true,
        data: {
          token_type: "Bearer",
          access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey...",
          expires_in: 900,
          refresh_token_hash: "8f4b23c91d8a4f912e73...",
          mfa_enforced: true,
          mfa_types: ["totp", "webauthn_passkey"],
          session_id: "sess_01HZX89J4V9N2Q"
        }
      },
      curl: `curl -X POST https://api.finnapi.render.com/api/v1/auth/login \\\n  -H "Content-Type: application/json" \\\n  -d '{"email":"engineer.candidate@finnapi.dev","password":"••••••••"}'`
    },
    totp: {
      method: 'POST',
      path: '/api/v1/mfa/totp/verify',
      status: 200,
      latency: '9.8ms',
      reqBody: JSON.stringify({
        session_id: "sess_01HZX89J4V9N2Q",
        totp_code: "839201"
      }, null, 2),
      headers: {
        "Content-Type": "application/json",
        "X-MFA-Verified": "true",
        "X-Audit-Id": "audit_91823719"
      },
      resBody: {
        success: true,
        data: {
          verified: true,
          authenticated_at: simulatedTimestamp,
          scope: ["read:profile", "write:keys", "admin:sessions"]
        }
      },
      curl: `curl -X POST https://api.finnapi.render.com/api/v1/mfa/totp/verify \\\n  -H "Content-Type: application/json" \\\n  -d '{"session_id":"sess_01HZX89J4V9N2Q","totp_code":"839201"}'`
    },
    metrics: {
      method: 'GET',
      path: '/metrics',
      status: 200,
      latency: '4.1ms',
      reqBody: "(HTTP GET - No Body)",
      headers: {
        "Content-Type": "text/plain; version=0.0.4; charset=utf-8"
      },
      resBody: `# HELP http_requests_total Total number of HTTP requests
# TYPE http_requests_total counter
http_requests_total{code="200",handler="login",method="post"} 14892
http_requests_total{code="401",handler="login",method="post"} 23
# HELP http_request_duration_seconds Histogram of latencies
http_request_duration_seconds_bucket{le="0.01"} 12840
http_request_duration_seconds_bucket{le="0.05"} 14880`,
      curl: `curl -X GET https://api.finnapi.render.com/metrics`
    }
  };

  const handleCopyCurl = () => {
    navigator.clipboard.writeText(endpoints[selectedEndpoint].curl);
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2000);
  };

  const handleSimulate = () => {
    setIsSimulating(true);
    setSimulatedTimestamp(new Date().toISOString());
    setTimeout(() => {
      setIsSimulating(false);
    }, 350);
  };

  const securityPillars = [
    {
      title: t('project.finnapi.sec.token_title'),
      desc: t('project.finnapi.sec.token_desc'),
      icon: <Shuffle size={20} className="text-accent-cyan" />,
      tag: "JWT + SHA-256 Redis"
    },
    {
      title: t('project.finnapi.sec.mfa_title'),
      desc: t('project.finnapi.sec.mfa_desc'),
      icon: <Fingerprint size={20} className="text-emerald-400" />,
      tag: "RFC 6238 + WebAuthn"
    },
    {
      title: t('project.finnapi.sec.timing_title'),
      desc: t('project.finnapi.sec.timing_desc'),
      icon: <LockKey size={20} className="text-amber-400" />,
      tag: "Constant-Time + HIBP"
    },
    {
      title: t('project.finnapi.sec.abuse_title'),
      desc: t('project.finnapi.sec.abuse_desc'),
      icon: <ShieldCheck size={20} className="text-cyan-400" />,
      tag: "IPv6 /64 + Lockout"
    },
    {
      title: t('project.finnapi.sec.obs_title'),
      desc: t('project.finnapi.sec.obs_desc'),
      icon: <Eye size={20} className="text-purple-400" />,
      tag: "slog JSON + Prometheus"
    },
    {
      title: t('project.finnapi.sec.ci_title'),
      desc: t('project.finnapi.sec.ci_desc'),
      icon: <GitBranch size={20} className="text-emerald-300" />,
      tag: "gosec + Trivy + Fuzz"
    },
  ];

  const currentEp = endpoints[selectedEndpoint];

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-border-subtle/80 bg-surface-950">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan"></span>
            <span>{t('project.finnapi.badge')}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100">
                {t('project.finnapi.title')}
              </h2>
              <p className="text-accent-cyan font-mono text-sm mt-1">
                {t('project.finnapi.tagline')}
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/NguyenQuan121321"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-surface-900 hover:bg-surface-850 border border-border-subtle hover:border-border-highlight text-xs font-mono text-zinc-200 transition-colors"
              >
                <span>{t('project.links.source')}</span>
                <ArrowSquareOut size={14} />
              </a>
            </div>
          </div>

          <p className="text-zinc-300 max-w-3xl leading-relaxed text-sm sm:text-base">
            {t('project.finnapi.description')}
          </p>
        </div>

        {/* 1. Interactive Clean Architecture Inspector */}
        <div className="bg-surface-900 border border-border-subtle rounded-xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border-subtle pb-4">
            <div>
              <h3 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
                <Cpu size={20} className="text-accent-cyan" />
                <span>{t('project.finnapi.arch.title')}</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                {t('project.finnapi.arch.subtitle')}
              </p>
            </div>
            <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-surface-950 border border-border-subtle text-zinc-400">
              Clean Architecture Boundary Map
            </span>
          </div>

          {/* Interactive Stepper Pipeline */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
            {layers.map((layer) => {
              const isActive = activeLayer === layer.id;
              return (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  className={`p-3.5 rounded-lg border text-left transition-all relative ${
                    isActive 
                      ? 'bg-surface-850 border-accent-cyan shadow-[0_0_15px_-4px_rgba(0,229,255,0.25)]' 
                      : 'bg-surface-950/70 border-border-subtle hover:border-border-highlight'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] text-zinc-400">L0{layer.id + 1}</span>
                    {layer.icon}
                  </div>
                  <div className={`font-mono text-xs font-semibold ${isActive ? 'text-accent-cyan' : 'text-zinc-200'}`}>
                    {layer.name}
                  </div>
                  <div className="text-[11px] font-mono text-zinc-400 mt-1 truncate">
                    {layer.tech}
                  </div>
                  {layer.isCore && (
                    <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-accent-cyan"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Selected Layer Technical Inspector Box */}
          {(() => {
            const currentLayer = layers.find(l => l.id === activeLayer) || layers[0];
            if (!currentLayer) return null;
            return (
              <div className="p-4 sm:p-5 rounded-lg bg-surface-950 border border-border-subtle/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono text-sm font-semibold text-zinc-100">
                    <span className="text-accent-cyan">&gt;</span>
                    <span>{currentLayer.name}</span>
                    <span className="text-xs text-zinc-400">({currentLayer.tech})</span>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800/40">
                    Active Inspection
                  </span>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                  {currentLayer.desc}
                </p>
                {activeLayer === 3 && (
                  <div className="pt-2 border-t border-border-subtle/60 flex items-start gap-2 text-xs font-mono text-amber-300/90 bg-amber-950/20 p-2.5 rounded">
                    <ShieldCheck size={16} className="text-amber-400 shrink-0 mt-0.5" />
                    <span>{t('project.finnapi.arch.depguard_note')}</span>
                  </div>
                )}
              </div>
            );
          })()}
        </div>

        {/* 2. Interactive API Simulator Playground */}
        <div className="bg-surface-900 border border-border-subtle rounded-xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border-subtle pb-4">
            <div>
              <h3 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
                <Key size={20} className="text-accent-cyan" />
                <span>{t('project.finnapi.sim.title')}</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                {t('project.finnapi.sim.subtitle')}
              </p>
            </div>

            {/* Endpoint Tabs */}
            <div className="flex items-center gap-1.5 bg-surface-950 p-1 rounded-lg border border-border-subtle">
              {(['login', 'totp', 'metrics'] as const).map((ep) => (
                <button
                  key={ep}
                  onClick={() => setSelectedEndpoint(ep)}
                  className={`px-3 py-1 rounded text-xs font-mono transition-all ${
                    selectedEndpoint === ep 
                      ? 'bg-surface-850 text-accent-cyan border border-border-highlight' 
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {ep === 'login' ? 'POST /login' : ep === 'totp' ? 'POST /totp' : 'GET /metrics'}
                </button>
              ))}
            </div>
          </div>

          {/* Playground Console */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Request View */}
            <div className="lg:col-span-5 bg-surface-950 border border-border-subtle rounded-lg p-4 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-zinc-400 border-b border-border-subtle/80 pb-2">
                <span className="text-zinc-300 font-semibold">REQUEST</span>
                <span className="text-emerald-400 font-bold">{currentEp.method}</span>
              </div>
              <div className="text-zinc-200 text-[11px] break-all">
                {currentEp.path}
              </div>
              <div className="bg-surface-900 p-3 rounded border border-border-subtle text-zinc-300 overflow-x-auto text-[11px] leading-relaxed">
                {typeof currentEp.reqBody === 'string' ? currentEp.reqBody : JSON.stringify(currentEp.reqBody, null, 2)}
              </div>
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={handleSimulate}
                  disabled={isSimulating}
                  className="flex-1 py-2 rounded bg-accent-cyan hover:bg-cyan-300 text-surface-950 font-sans font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  {isSimulating ? (
                    <span className="animate-spin inline-block">↻</span>
                  ) : (
                    <span>{t('project.finnapi.sim.send_btn')}</span>
                  )}
                </button>
                <button
                  onClick={handleCopyCurl}
                  className="px-3 py-2 rounded bg-surface-900 hover:bg-surface-850 border border-border-subtle text-zinc-300 text-xs transition-colors flex items-center gap-1"
                  title="Copy cURL"
                >
                  {copiedCurl ? <Check size={14} className="text-accent-mint" /> : <Copy size={14} />}
                  <span>{copiedCurl ? t('project.finnapi.sim.copied') : t('project.finnapi.sim.copy_btn')}</span>
                </button>
              </div>
            </div>

            {/* Response View */}
            <div className="lg:col-span-7 bg-surface-950 border border-border-subtle rounded-lg p-4 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-zinc-400 border-b border-border-subtle/80 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-zinc-300 font-semibold">RESPONSE</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-700/50 text-emerald-400 font-bold">
                    {currentEp.status} OK
                  </span>
                </div>
                <div className="text-[11px] text-zinc-400">
                  {t('project.finnapi.sim.response_latency')}: <span className="text-cyan-400 font-bold">{currentEp.latency}</span>
                </div>
              </div>

              {/* Formatted Response Body */}
              <div className="bg-surface-900 p-3 rounded border border-border-subtle text-cyan-200 overflow-x-auto text-[11px] leading-relaxed max-h-[220px]">
                <pre>{typeof currentEp.resBody === 'string' ? currentEp.resBody : JSON.stringify(currentEp.resBody, null, 2)}</pre>
              </div>

              {/* Response Headers */}
              <div className="text-[10px] text-zinc-400 space-y-1 pt-1">
                <div className="text-zinc-400 font-semibold">{t('project.finnapi.sim.response_headers')}:</div>
                {Object.entries(currentEp.headers).map(([k, v]) => (
                  <div key={k} className="flex gap-2">
                    <span className="text-zinc-400">{k}:</span>
                    <span className="text-zinc-300 truncate">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Defense-in-Depth Security Hardening Matrix */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
              <ShieldCheck size={22} className="text-accent-cyan" />
              <span>{t('project.finnapi.sec.title')}</span>
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              {t('project.finnapi.sec.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {securityPillars.map((pillar, idx) => (
              <div
                key={idx}
                className="bg-surface-900 border border-border-subtle hover:border-border-highlight rounded-xl p-5 space-y-3 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-surface-950 border border-border-subtle">
                    {pillar.icon}
                  </div>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-surface-950 border border-border-subtle text-zinc-400">
                    {pillar.tag}
                  </span>
                </div>
                <h4 className="font-semibold text-zinc-100 text-sm">
                  {pillar.title}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Tech Stack Tags */}
        <div className="p-5 rounded-xl bg-surface-900/60 border border-border-subtle space-y-3">
          <div className="text-xs font-mono uppercase text-zinc-400 font-semibold tracking-wider">
            Verified Stack & Tooling
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              'Go 1.26', 'MySQL 8', 'Redis 7', 'Gin Engine', 'GORM', 
              'golang-jwt v5', 'BCrypt (72B cap)', 'AES-256-GCM', 'WebAuthn / Passkeys', 
              'Docker', 'GitHub Actions CI', 'Prometheus', 'OpenAPI 3.0', 'k6', 'slog JSON'
            ].map((tech) => (
              <span 
                key={tech}
                className="px-2.5 py-1 rounded-md bg-surface-950 border border-border-subtle text-xs font-mono text-zinc-300 hover:border-accent-cyan/50 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
