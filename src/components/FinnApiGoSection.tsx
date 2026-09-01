import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  ShieldCheck, 
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
  Eye,
  EyeSlash,
  BookOpen,
  ArrowRight,
  Lightning,
  Sparkle
} from '@phosphor-icons/react';

export const FinnApiGoSection: React.FC = () => {
  const { t } = useLanguage();
  
  // Interactive Architecture Layer State
  const [activeLayer, setActiveLayer] = useState<number>(3); // Default to Service layer

  // Interactive Playground State
  const [activeTab, setActiveTab] = useState<'register' | 'login' | 'profile' | 'metrics'>('register');
  
  // Register fields (Matches Go DTO: RegisterRequest)
  const [regUsername, setRegUsername] = useState('finn_dev');
  const [regFullName, setRegFullName] = useState('Nguyen Hoang Anh Quan');
  const [regEmail, setRegEmail] = useState('anhquan.dev@gmail.com');
  const [regPassword, setRegPassword] = useState('Quan#FinnSecure2026!');
  const [showRegPassword, setShowRegPassword] = useState(false);
  
  // Login fields (Matches Go DTO: LoginRequest)
  const [loginEmail, setLoginEmail] = useState('anhquan.dev@gmail.com');
  const [loginPassword, setLoginPassword] = useState('Quan#FinnSecure2026!');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  
  // Auth Token for Protected Endpoints
  const [accessToken, setAccessToken] = useState('');

  const [copiedCurl, setCopiedCurl] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedResponse, setSimulatedResponse] = useState<any>(null);
  const [responseStatus, setResponseStatus] = useState<number>(200);
  const [responseLatency, setResponseLatency] = useState<string>('0ms');

  const liveRenderUrl = 'https://finnapigo.onrender.com';
  const liveSwaggerUrl = 'https://finnapigo.onrender.com/swagger/index.html';

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

  // Helper to generate fresh random credentials for live testing
  const handleGenerateFreshCredentials = () => {
    const rand = Math.floor(1000 + Math.random() * 9000);
    const user = `finn_${rand}`;
    const email = `finn_${rand}@gmail.com`;
    const pass = `Quan#Secure${rand}!`;
    setRegUsername(user);
    setRegEmail(email);
    setRegPassword(pass);
    setLoginEmail(email);
    setLoginPassword(pass);
  };

  // Execute REAL LIVE API Request to Render Backend
  const handleExecuteRequest = async () => {
    setIsSimulating(true);
    setSimulatedResponse(null);
    const startTime = performance.now();

    try {
      let endpoint = '';
      let options: RequestInit = {};

      if (activeTab === 'register') {
        endpoint = '/render-api/api/v1/auth/register';
        options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: regUsername.trim(),
            fullName: regFullName.trim(),
            email: regEmail.trim(),
            password: regPassword
          })
        };
      } else if (activeTab === 'login') {
        endpoint = '/render-api/api/v1/auth/login';
        options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: loginEmail.trim(),
            password: loginPassword
          })
        };
      } else if (activeTab === 'profile') {
        endpoint = '/render-api/api/v1/auth/me';
        options = {
          method: 'GET',
          headers: {
            'Authorization': accessToken ? `Bearer ${accessToken}` : '',
            'Content-Type': 'application/json'
          }
        };
      } else if (activeTab === 'metrics') {
        endpoint = '/render-api/metrics';
        options = { method: 'GET' };
      }

      // First try proxy route, fall back to direct Render URL
      let res: Response;
      try {
        res = await fetch(endpoint, options);
      } catch {
        const directUrl = endpoint.replace(/^\/render-api/, 'https://finnapigo.onrender.com');
        res = await fetch(directUrl, options);
      }

      const elapsed = (performance.now() - startTime).toFixed(1) + 'ms';
      setResponseLatency(elapsed);
      setResponseStatus(res.status);

      if (activeTab === 'metrics') {
        const metricsText = await res.text();
        setSimulatedResponse(metricsText);
      } else {
        const resJson = await res.json();
        setSimulatedResponse(resJson);

        // Auto data sync on success
        if (activeTab === 'register' && (res.status === 200 || res.status === 201)) {
          setLoginEmail(regEmail);
          setLoginPassword(regPassword);
        }
        if (activeTab === 'login' && res.status === 200 && resJson?.data?.accessToken) {
          setAccessToken(resJson.data.accessToken);
        }
      }
    } catch (err: any) {
      const elapsed = (performance.now() - startTime).toFixed(1) + 'ms';
      setResponseLatency(elapsed);
      setResponseStatus(503);
      setSimulatedResponse({
        error: "RENDER_COLD_BOOT_OR_NETWORK",
        message: "Server Render đang khởi động từ trạng thái nghỉ (Free tier cold boot) hoặc bị chặn CORS từ trình duyệt. Hãy thử lại sau 15-20 giây.",
        details: err?.message || "Failed to fetch from finnapigo.onrender.com"
      });
    } finally {
      setIsSimulating(false);
    }
  };

  // Get current cURL command string based on tab
  const getCurlCommand = () => {
    if (activeTab === 'register') {
      return `curl -X POST https://finnapigo.onrender.com/api/v1/auth/register \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "username": "${regUsername}",\n    "fullName": "${regFullName}",\n    "email": "${regEmail}",\n    "password": "${regPassword}"\n  }'`;
    }
    if (activeTab === 'login') {
      return `curl -X POST https://finnapigo.onrender.com/api/v1/auth/login \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "email": "${loginEmail}",\n    "password": "${loginPassword}"\n  }'`;
    }
    if (activeTab === 'profile') {
      return `curl -X GET https://finnapigo.onrender.com/api/v1/auth/me \\\n  -H "Authorization: Bearer ${accessToken || '<ACCESS_TOKEN>'}"`;
    }
    return `curl -X GET https://finnapigo.onrender.com/metrics`;
  };

  const handleCopyCurl = () => {
    navigator.clipboard.writeText(getCurlCommand());
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2000);
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
              <h2 className="text-3xl sm:text-4xl font-bold tracking-normal text-zinc-100 leading-snug">
                {t('project.finnapi.title')}
              </h2>
              <p className="text-accent-cyan font-mono text-sm mt-1">
                {t('project.finnapi.tagline')}
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={liveRenderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent-cyan text-surface-950 font-semibold text-xs transition-colors hover:bg-cyan-300 shadow-[0_0_15px_-4px_rgba(0,229,255,0.3)]"
              >
                <span>{t('project.links.live')}</span>
                <ArrowSquareOut size={14} weight="bold" />
              </a>

              <a
                href={liveSwaggerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-surface-900 hover:bg-surface-850 border border-border-subtle hover:border-border-highlight text-xs font-mono text-zinc-200 transition-colors"
              >
                <BookOpen size={14} className="text-amber-400" />
                <span>{t('project.links.docs')}</span>
                <ArrowSquareOut size={14} />
              </a>

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

          <p className="text-zinc-300 max-w-3xl leading-relaxed text-sm sm:text-base font-normal">
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
                <p className="text-sm text-zinc-300 leading-relaxed font-sans font-normal">
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

        {/* 2. Interactive API Simulator Playground with LIVE Render Connection */}
        <div className="bg-surface-900 border border-border-subtle rounded-xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-subtle pb-4">
            <div>
              <h3 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
                <Lightning size={20} className="text-accent-cyan" weight="fill" />
                <span>{t('project.finnapi.sim.title')}</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                {t('project.finnapi.sim.subtitle')}
              </p>
            </div>

            {/* Live API Server Status Indicator */}
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <a 
                href={liveRenderUrl} 
                target="_blank" 
                rel="noreferrer"
                className="text-accent-cyan hover:underline inline-flex items-center gap-1 font-mono"
              >
                <span>finnapigo.onrender.com</span>
                <ArrowSquareOut size={12} />
              </a>
            </div>
          </div>

          {/* Endpoint Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'register', label: t('project.finnapi.sim.tab_register'), method: 'POST', path: '/api/v1/auth/register' },
              { id: 'login', label: t('project.finnapi.sim.tab_login'), method: 'POST', path: '/api/v1/auth/login' },
              { id: 'profile', label: t('project.finnapi.sim.tab_profile'), method: 'GET', path: '/api/v1/auth/me' },
              { id: 'metrics', label: t('project.finnapi.sim.tab_metrics'), method: 'GET', path: '/metrics' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setSimulatedResponse(null);
                }}
                className={`px-3.5 py-2 rounded-lg text-xs font-mono transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-surface-850 text-accent-cyan border border-accent-cyan shadow-[0_0_12px_-3px_rgba(0,229,255,0.25)]' 
                    : 'bg-surface-950 text-zinc-400 hover:text-zinc-200 border border-border-subtle'
                }`}
              >
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${tab.method === 'POST' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40' : 'bg-cyan-950 text-cyan-400 border border-cyan-800/40'}`}>
                  {tab.method}
                </span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Interactive Request & Response Split Console */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            
            {/* Request Parameter Inputs */}
            <div className="lg:col-span-5 bg-surface-950 border border-border-subtle rounded-xl p-5 space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between text-zinc-400 border-b border-border-subtle pb-2.5">
                <span className="text-zinc-200 font-semibold uppercase tracking-wider text-[11px]">REQUEST PARAMETERS</span>
                <span className="text-accent-cyan font-bold">{activeTab.toUpperCase()}</span>
              </div>

              {/* Form Fields by Tab */}
              {activeTab === 'register' && (
                <div className="space-y-3 font-sans">
                  <div className="flex items-center justify-between">
                    <span className="text-[10.5px] text-zinc-400">Payload DTO (Go Backend)</span>
                    <button
                      type="button"
                      onClick={handleGenerateFreshCredentials}
                      className="text-[10px] font-mono text-accent-cyan hover:underline bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40 flex items-center gap-1"
                    >
                      <Sparkle size={12} />
                      <span>Sinh User Mới</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-mono text-zinc-400 mb-1">{t('project.finnapi.sim.input_username')}</label>
                      <input 
                        type="text"
                        value={regUsername}
                        onChange={(e) => setRegUsername(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded bg-surface-900 border border-border-subtle focus:border-accent-cyan text-zinc-200 text-xs font-mono"
                        placeholder="finn_dev"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-zinc-400 mb-1">{t('project.finnapi.sim.input_fullname')}</label>
                      <input 
                        type="text"
                        value={regFullName}
                        onChange={(e) => setRegFullName(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded bg-surface-900 border border-border-subtle focus:border-accent-cyan text-zinc-200 text-xs font-mono"
                        placeholder="Nguyen Hoang Anh Quan"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-zinc-400 mb-1">{t('project.finnapi.sim.input_email')}</label>
                    <input 
                      type="email"
                      value={regEmail}
                      onChange={(e) => {
                        setRegEmail(e.target.value);
                        setLoginEmail(e.target.value);
                      }}
                      className="w-full px-3 py-2 rounded bg-surface-900 border border-border-subtle focus:border-accent-cyan text-zinc-200 text-xs font-mono"
                      placeholder="user@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-zinc-400 mb-1">{t('project.finnapi.sim.input_password')}</label>
                    <div className="relative">
                      <input 
                        type={showRegPassword ? "text" : "password"}
                        value={regPassword}
                        onChange={(e) => {
                          setRegPassword(e.target.value);
                          setLoginPassword(e.target.value);
                        }}
                        className="w-full pl-3 pr-10 py-2 rounded bg-surface-900 border border-border-subtle focus:border-accent-cyan text-zinc-200 text-xs font-mono"
                        placeholder="••••••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowRegPassword(!showRegPassword)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200 p-1"
                        title={showRegPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                        aria-label="Toggle password visibility"
                      >
                        {showRegPassword ? <EyeSlash size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    <span className="text-[10px] text-zinc-500 mt-1 block">
                      Backend tích hợp kiểm tra HIBP — mật khẩu yếu đã từng bị rò rỉ sẽ bị từ chối với mã 422.
                    </span>
                  </div>
                </div>
              )}

              {activeTab === 'login' && (
                <div className="space-y-3 font-sans">
                  <div>
                    <label className="block text-[11px] font-mono text-zinc-400 mb-1">{t('project.finnapi.sim.input_email')}</label>
                    <input 
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded bg-surface-900 border border-border-subtle focus:border-accent-cyan text-zinc-200 text-xs font-mono"
                      placeholder="user@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-zinc-400 mb-1">{t('project.finnapi.sim.input_password')}</label>
                    <div className="relative">
                      <input 
                        type={showLoginPassword ? "text" : "password"}
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="w-full pl-3 pr-10 py-2 rounded bg-surface-900 border border-border-subtle focus:border-accent-cyan text-zinc-200 text-xs font-mono"
                        placeholder="••••••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200 p-1"
                        title={showLoginPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                        aria-label="Toggle password visibility"
                      >
                        {showLoginPassword ? <EyeSlash size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'profile' && (
                <div className="space-y-3 font-sans">
                  <div>
                    <label className="block text-[11px] font-mono text-zinc-400 mb-1">{t('project.finnapi.sim.input_token')}</label>
                    <textarea 
                      rows={3}
                      value={accessToken}
                      onChange={(e) => setAccessToken(e.target.value)}
                      className="w-full px-3 py-2 rounded bg-surface-900 border border-border-subtle focus:border-accent-cyan text-accent-cyan text-[11px] font-mono break-all"
                      placeholder="eyJhbGciOiJIUzI1NiIs..."
                    />
                    <span className="text-[10px] text-zinc-500 mt-1 block">
                      Token này được tự động điền sau khi bạn thực thi bước Đăng nhập thành công.
                    </span>
                  </div>
                </div>
              )}

              {activeTab === 'metrics' && (
                <div className="text-zinc-400 text-xs py-4 leading-relaxed font-sans">
                  Endpoint <span className="font-mono text-zinc-200">GET /metrics</span> kéo trực tiếp các chỉ số Prometheus thời gian thực từ container Go trên Render (Goroutines, memory allocation, request counters).
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2 border-t border-border-subtle/60">
                <button
                  onClick={handleExecuteRequest}
                  disabled={isSimulating}
                  className="flex-1 py-2.5 rounded-lg bg-accent-cyan hover:bg-cyan-300 text-surface-950 font-sans font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_-4px_rgba(0,229,255,0.3)]"
                >
                  {isSimulating ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin inline-block">↻</span>
                      <span>Đang gọi Render API...</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <Lightning size={14} weight="fill" />
                      <span>{t('project.finnapi.sim.send_btn')}</span>
                    </span>
                  )}
                </button>
                <button
                  onClick={handleCopyCurl}
                  className="px-3.5 py-2.5 rounded-lg bg-surface-900 hover:bg-surface-850 border border-border-subtle text-zinc-300 text-xs transition-colors flex items-center gap-1.5"
                  title="Copy cURL"
                >
                  {copiedCurl ? <Check size={14} className="text-accent-mint" /> : <Copy size={14} />}
                  <span>{copiedCurl ? t('project.finnapi.sim.copied') : t('project.finnapi.sim.copy_btn')}</span>
                </button>
              </div>
            </div>

            {/* Response Console */}
            <div className="lg:col-span-7 bg-surface-950 border border-border-subtle rounded-xl p-5 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-zinc-400 border-b border-border-subtle pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-zinc-200 font-semibold uppercase tracking-wider text-[11px]">LIVE HTTP RESPONSE</span>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${
                    responseStatus >= 200 && responseStatus < 300 
                      ? 'bg-emerald-950/70 border-emerald-700/50 text-emerald-400' 
                      : responseStatus === 422
                      ? 'bg-amber-950/70 border-amber-700/50 text-amber-400'
                      : 'bg-red-950/70 border-red-700/50 text-red-400'
                  }`}>
                    {responseStatus} {responseStatus === 200 ? 'OK' : responseStatus === 201 ? 'Created' : responseStatus === 422 ? 'Unprocessable (HIBP)' : responseStatus === 401 ? 'Unauthorized' : 'Bad Request'}
                  </span>
                </div>
                <div className="text-[11px] text-zinc-400">
                  {t('project.finnapi.sim.response_latency')}: <span className="text-cyan-400 font-bold">{responseLatency}</span>
                </div>
              </div>

              {/* Formatted Multi-line JSON Response View */}
              <div className="bg-surface-900 p-4 rounded-lg border border-border-subtle text-zinc-200 overflow-x-auto text-[11px] leading-relaxed max-h-[250px]">
                {simulatedResponse ? (
                  typeof simulatedResponse === 'string' ? (
                    <pre className="text-zinc-300 whitespace-pre font-mono text-[10.5px]">{simulatedResponse}</pre>
                  ) : (
                    <pre className="text-cyan-200 whitespace-pre font-mono">
                      {JSON.stringify(simulatedResponse, null, 2)}
                    </pre>
                  )
                ) : (
                  <div className="text-zinc-500 py-6 text-center italic font-sans">
                    Nhấn "Thực thi Request Live" để gửi HTTP request thực tế đến server Render và nhận phản hồi trực tiếp.
                  </div>
                )}
              </div>

              {/* Flow Transition Quick Action Buttons */}
              {simulatedResponse && (
                <div className="pt-2">
                  {activeTab === 'register' && (responseStatus === 200 || responseStatus === 201) && (
                    <button
                      onClick={() => {
                        setActiveTab('login');
                        setSimulatedResponse(null);
                      }}
                      className="w-full py-2 px-3 rounded-lg bg-surface-900 hover:bg-surface-850 border border-accent-cyan/40 text-accent-cyan text-xs font-mono flex items-center justify-center gap-1.5 transition-all"
                    >
                      <span>Tài khoản đã tạo trên Render → Chuyển sang bước Đăng nhập</span>
                      <ArrowRight size={14} />
                    </button>
                  )}
                  {activeTab === 'login' && responseStatus === 200 && (
                    <button
                      onClick={() => {
                        setActiveTab('profile');
                        setSimulatedResponse(null);
                      }}
                      className="w-full py-2 px-3 rounded-lg bg-surface-900 hover:bg-surface-850 border border-emerald-500/40 text-emerald-400 text-xs font-mono flex items-center justify-center gap-1.5 transition-all"
                    >
                      <span>Đã nhận JWT Token → Chuyển sang Lấy Profile (GET /me)</span>
                      <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              )}

              {/* Security Headers Summary */}
              <div className="text-[10px] text-zinc-400 space-y-1 pt-1 font-mono">
                <div className="text-zinc-400 font-semibold">{t('project.finnapi.sim.response_headers')}:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[10.5px]">
                  <div><span className="text-zinc-500">server:</span> <span className="text-zinc-300">cloudflare / Render</span></div>
                  <div><span className="text-zinc-500">x-content-type-options:</span> <span className="text-zinc-300">nosniff</span></div>
                  <div><span className="text-zinc-500">cache-control:</span> <span className="text-zinc-300">no-store</span></div>
                  <div><span className="text-zinc-500">content-type:</span> <span className="text-zinc-300">application/json; charset=utf-8</span></div>
                </div>
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
                <p className="text-xs text-zinc-400 leading-relaxed font-normal">
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
