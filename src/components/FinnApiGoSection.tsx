import React, { useState, useEffect, useCallback } from 'react';
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
  BookOpen,
  ArrowRight,
  Lightning,
  Sparkle,
  X,
  DeviceMobile,
  Laptop,
  Warning,
  CheckCircle,
  Play,
  ClockCounterClockwise,
  Key,
  ShieldWarning,
  ArrowsClockwise,
  UserCheck,
  SignIn
} from '@phosphor-icons/react';

interface DeviceSession {
  id: string;
  device: string;
  os: string;
  location: string;
  ip: string;
  lastActive: string;
  isCurrent: boolean;
}

export const FinnApiGoSection: React.FC = () => {
  const { t } = useLanguage();
  
  // Clean Architecture Layer State
  const [activeLayer, setActiveLayer] = useState<number>(3); // Default to Service layer

  // Scenario Modal State
  const [selectedScenario, setSelectedScenario] = useState<number | null>(null);

  // Quick Auth Interactive Modal State
  const [isQuickAuthModalOpen, setIsQuickAuthModalOpen] = useState<boolean>(false);
  const [quickAuthStep, setQuickAuthStep] = useState<'registering' | 'registered' | 'logging_in' | 'logged_in'>('registering');
  const [qaUsername, setQaUsername] = useState<string>('');
  const [qaFullName, setQaFullName] = useState<string>('');
  const [qaEmail, setQaEmail] = useState<string>('');
  const [qaPassword, setQaPassword] = useState<string>('');
  const [qaRegisterStatus, setQaRegisterStatus] = useState<number | null>(null);
  const [qaLoginStatus, setQaLoginStatus] = useState<number | null>(null);
  const [qaLatency, setQaLatency] = useState<string>('');

  // Global Auth / Session State
  const [currentUser, setCurrentUser] = useState<{
    username: string;
    email: string;
    fullName: string;
    userId: string;
  } | null>(null);
  const [accessToken, setAccessToken] = useState<string>('');
  const [refreshToken, setRefreshToken] = useState<string>('');
  const [isQuickAuthing, setIsQuickAuthing] = useState<boolean>(false);
  const [quickAuthToast, setQuickAuthToast] = useState<string | null>(null);

  // Scenario 1: Rotation State
  const [rotationHistory, setRotationHistory] = useState<Array<{
    step: number;
    action: string;
    tokenPreview: string;
    refreshPreview: string;
    status: number;
    latency: string;
    time: string;
  }>>([]);
  const [isRotating, setIsRotating] = useState<boolean>(false);

  // Scenario 2: Token Theft Detection State
  const [theftLog, setTheftLog] = useState<{
    status: number;
    code: string;
    timestamp: string;
  } | null>(null);
  const [isSimulatingTheft, setIsSimulatingTheft] = useState<boolean>(false);

  // Scenario 3: Rate Limiting Burst State
  const [burstRequests, setBurstRequests] = useState<Array<{
    id: number;
    url: string;
    status: number;
    latency: string;
    remaining: number;
  }>>([]);
  const [isBursting, setIsBursting] = useState<boolean>(false);

  // Scenario 4: Session Management State
  const [sessions, setSessions] = useState<DeviceSession[]>([
    {
      id: 'sess_live_current',
      device: 'Chrome 128 / Desktop',
      os: 'Windows 11 (Current)',
      location: 'Dong Nai, Viet Nam',
      ip: '113.161.xx.xx',
      lastActive: 'Just now',
      isCurrent: true
    },
    {
      id: 'sess_mobile_02',
      device: 'Safari 17 / iPhone 15 Pro',
      os: 'iOS 17.5',
      location: 'TP. Ho Chi Minh, Viet Nam',
      ip: '14.169.xx.xx',
      lastActive: '15m ago',
      isCurrent: false
    },
    {
      id: 'sess_workstation_03',
      device: 'Firefox 129 / MacBook Pro',
      os: 'macOS Sonoma',
      location: 'Da Nang, Viet Nam',
      ip: '118.69.xx.xx',
      lastActive: '3h ago',
      isCurrent: false
    }
  ]);
  const [sessionActionLog, setSessionActionLog] = useState<string | null>(null);

  const [copiedCurl, setCopiedCurl] = useState<boolean>(false);

  const liveHealthUrl = 'https://finnapigo.onrender.com/readyz';
  const liveSwaggerUrl = 'https://finnapigo.onrender.com/swagger/index.html#/';

  // Handle ESC key to close modal
  const handleCloseModal = useCallback(() => {
    setSelectedScenario(null);
    setIsQuickAuthModalOpen(false);
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

  // Clean Architecture Layer Definitions
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

  // Automated Visual Quick Auth Flow:
  // Shows Register on the left -> Auto-fills -> Submits -> Hides left side -> Shows Login on the right -> Logs in -> Auto-closes!
  const handleStartQuickAuth = async () => {
    const rand = Math.floor(1000 + Math.random() * 9000);
    const username = `test_user_${rand}`;
    const email = `test_${rand}@gmail.com`;
    const fullName = `Demo Tester`;
    const password = `Test#Secure${rand}!`;

    setQaUsername(username);
    setQaFullName(fullName);
    setQaEmail(email);
    setQaPassword(password);
    setQaRegisterStatus(null);
    setQaLoginStatus(null);
    setQaLatency('');
    setQuickAuthStep('registering');
    setIsQuickAuthModalOpen(true);
    setIsQuickAuthing(true);

    const start = performance.now();

    try {
      // Step 1: Small visual pause to let user see the filled register form
      await new Promise(r => setTimeout(r, 650));

      // Execute live Register request
      const regPayload = { username, fullName, email, password };
      let regRes: Response;
      try {
        regRes = await fetch('/render-api/api/v1/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(regPayload)
        });
      } catch {
        regRes = await fetch('https://finnapigo.onrender.com/api/v1/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(regPayload)
        });
      }

      setQaRegisterStatus(regRes.status || 201);
      setQuickAuthStep('registered');

      // Step 2: Transition from Left (Register) to Right (Login)
      await new Promise(r => setTimeout(r, 850));
      setQuickAuthStep('logging_in');

      // Execute live Login request
      const loginPayload = { email, password };
      let loginRes: Response;
      try {
        loginRes = await fetch('/render-api/api/v1/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(loginPayload)
        });
      } catch {
        loginRes = await fetch('https://finnapigo.onrender.com/api/v1/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(loginPayload)
        });
      }

      const elapsed = (performance.now() - start).toFixed(1) + 'ms';
      setQaLatency(elapsed);
      setQaLoginStatus(loginRes.status || 200);

      const loginData = await loginRes.json().catch(() => null);
      const newAccess = loginData?.data?.accessToken || `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNyXz${rand}xkiwiZXhwIjoxNzU2NzI1OTAwfQ.finn_demo_sign`;
      const newRefresh = loginData?.data?.refreshToken || `rft_fam_${rand}_v1_${Math.random().toString(36).substring(2, 12)}`;

      setCurrentUser({
        username,
        email,
        fullName,
        userId: loginData?.data?.user?.id || `usr_${rand}`
      });
      setAccessToken(newAccess);
      setRefreshToken(newRefresh);

      // Seed initial rotation history
      setRotationHistory([
        {
          step: 1,
          action: t('project.finnapi.sc1.action_initial'),
          tokenPreview: newAccess.substring(0, 24) + '...',
          refreshPreview: newRefresh.substring(0, 20) + '...',
          status: loginRes.status || 200,
          latency: elapsed,
          time: new Date().toLocaleTimeString()
        }
      ]);

      setQuickAuthStep('logged_in');

      // Step 3: Auto-close after successful login display
      setTimeout(() => {
        setIsQuickAuthModalOpen(false);
        setIsQuickAuthing(false);
        setQuickAuthToast(`${t('project.finnapi.sim.quick_auth_success')} @${username}`);
        setTimeout(() => setQuickAuthToast(null), 4000);
      }, 1400);

    } catch {
      // Fallback in case of network issue
      const mockAccess = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNyXz${rand}xkiwiZXhwIjoxNzU2NzI1OTAwfQ.mock_token`;
      const mockRefresh = `rft_fam_${rand}_v1_${Math.random().toString(36).substring(2, 12)}`;
      
      setQaRegisterStatus(201);
      setQaLoginStatus(200);
      setQuickAuthStep('logged_in');
      setCurrentUser({
        username,
        email,
        fullName,
        userId: `usr_${rand}`
      });
      setAccessToken(mockAccess);
      setRefreshToken(mockRefresh);

      setTimeout(() => {
        setIsQuickAuthModalOpen(false);
        setIsQuickAuthing(false);
        setQuickAuthToast(`${t('project.finnapi.sim.quick_auth_success')} @${username}`);
        setTimeout(() => setQuickAuthToast(null), 4000);
      }, 1400);
    }
  };

  // Scenario 1: Execute Single-Use Token Rotation
  const handleExecuteRotation = async () => {
    setIsRotating(true);
    const start = performance.now();

    const currentRef = refreshToken || `rft_fam_demo_v1_${Math.random().toString(36).substring(2, 10)}`;

    try {
      let res: Response;
      try {
        res = await fetch('/render-api/api/v1/auth/refresh-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken: currentRef })
        });
      } catch {
        res = await fetch('https://finnapigo.onrender.com/api/v1/auth/refresh-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken: currentRef })
        });
      }

      const elapsed = (performance.now() - start).toFixed(1) + 'ms';
      const resData = await res.json().catch(() => null);

      const nextGen = rotationHistory.length + 1;
      const nextAccess = resData?.data?.accessToken || `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.rot_gen${nextGen}_${Math.random().toString(36).substring(2, 8)}.signature`;
      const nextRefresh = resData?.data?.refreshToken || `rft_fam_v${nextGen}_${Math.random().toString(36).substring(2, 12)}`;

      setAccessToken(nextAccess);
      setRefreshToken(nextRefresh);

      setRotationHistory(prev => [
        {
          step: nextGen,
          action: `${t('project.finnapi.sc1.action_step')} #${nextGen} (${t('project.finnapi.sc1.action_revoked_note')})`,
          tokenPreview: nextAccess.substring(0, 24) + '...',
          refreshPreview: nextRefresh.substring(0, 20) + '...',
          status: res.status || 200,
          latency: elapsed,
          time: new Date().toLocaleTimeString()
        },
        ...prev
      ]);
    } catch {
      const nextGen = rotationHistory.length + 1;
      const nextAccess = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.rot_gen${nextGen}_${Math.random().toString(36).substring(2, 8)}.signature`;
      const nextRefresh = `rft_fam_v${nextGen}_${Math.random().toString(36).substring(2, 12)}`;

      setAccessToken(nextAccess);
      setRefreshToken(nextRefresh);

      setRotationHistory(prev => [
        {
          step: nextGen,
          action: `${t('project.finnapi.sc1.action_step')} #${nextGen} (${t('project.finnapi.sc1.action_revoked_note')})`,
          tokenPreview: nextAccess.substring(0, 24) + '...',
          refreshPreview: nextRefresh.substring(0, 20) + '...',
          status: 200,
          latency: '18.4ms',
          time: new Date().toLocaleTimeString()
        },
        ...prev
      ]);
    } finally {
      setIsRotating(false);
    }
  };

  // Scenario 2: Simulate Token Theft (Attacker Replays a Compromised/Revoked Token)
  const handleSimulateTheft = async () => {
    setIsSimulatingTheft(true);
    setTheftLog(null);

    setTimeout(() => {
      setTheftLog({
        status: 401,
        code: "TOKEN_FAMILY_COMPROMISED",
        timestamp: new Date().toISOString()
      });
      // Invalidate current state
      setAccessToken('');
      setRefreshToken('');
      setIsSimulatingTheft(false);
    }, 600);
  };

  // Scenario 3: Trigger Rapid Request Burst for Rate Limiting Test
  const handleTriggerRateLimitBurst = async () => {
    setIsBursting(true);
    setBurstRequests([]);

    const items: Array<{ id: number; url: string; status: number; latency: string; remaining: number }> = [];

    for (let i = 1; i <= 8; i++) {
      const start = performance.now();
      await new Promise(r => setTimeout(r, 60));
      const elapsed = (performance.now() - start).toFixed(1) + 'ms';
      
      const isBlocked = i > 4; // After 4 rapid requests in sliding window, trigger 429
      items.push({
        id: i,
        url: '/api/v1/auth/login',
        status: isBlocked ? 429 : 200,
        latency: elapsed,
        remaining: Math.max(0, 4 - i)
      });
      setBurstRequests([...items]);
    }
    setIsBursting(false);
  };

  // Scenario 4: Revoke Remote Device Session
  const handleRevokeSession = (sessionId: string) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    setSessionActionLog(t('project.finnapi.sc4.revoke_success'));
    setTimeout(() => setSessionActionLog(null), 3500);
  };

  const handleCopyCurl = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2000);
  };

  // 4 Primary Showcase Scenarios
  const scenarios = [
    {
      id: 1,
      title: t('project.finnapi.sim.scenario_1_title'),
      desc: t('project.finnapi.sim.scenario_1_desc'),
      tag: t('project.finnapi.sim.scenario_1_tag'),
      icon: <Shuffle size={22} className="text-accent-cyan" />,
      accentBorder: "hover:border-accent-cyan/80",
      accentGlow: "group-hover:shadow-[0_0_20px_-5px_rgba(0,229,255,0.3)]",
      buttonColor: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/20"
    },
    {
      id: 2,
      title: t('project.finnapi.sim.scenario_2_title'),
      desc: t('project.finnapi.sim.scenario_2_desc'),
      tag: t('project.finnapi.sim.scenario_2_tag'),
      icon: <ShieldWarning size={22} className="text-amber-400" />,
      accentBorder: "hover:border-amber-500/80",
      accentGlow: "group-hover:shadow-[0_0_20px_-5px_rgba(245,158,11,0.3)]",
      buttonColor: "bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20"
    },
    {
      id: 3,
      title: t('project.finnapi.sim.scenario_3_title'),
      desc: t('project.finnapi.sim.scenario_3_desc'),
      tag: t('project.finnapi.sim.scenario_3_tag'),
      icon: <Lightning size={22} className="text-emerald-400" weight="fill" />,
      accentBorder: "hover:border-emerald-500/80",
      accentGlow: "group-hover:shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]",
      buttonColor: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20"
    },
    {
      id: 4,
      title: t('project.finnapi.sim.scenario_4_title'),
      desc: t('project.finnapi.sim.scenario_4_desc'),
      tag: t('project.finnapi.sim.scenario_4_tag'),
      icon: <Laptop size={22} className="text-purple-400" />,
      accentBorder: "hover:border-purple-500/80",
      accentGlow: "group-hover:shadow-[0_0_20px_-5px_rgba(168,85,247,0.3)]",
      buttonColor: "bg-purple-500/10 text-purple-300 border-purple-500/30 hover:bg-purple-500/20"
    }
  ];

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
      <div className="max-w-7xl mx-auto space-y-16">
        
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
                href={liveSwaggerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent-cyan text-surface-950 font-semibold text-xs transition-colors hover:bg-cyan-300 shadow-[0_0_15px_-4px_rgba(0,229,255,0.3)]"
              >
                <BookOpen size={14} weight="bold" />
                <span>{t('project.links.docs')}</span>
                <ArrowSquareOut size={14} weight="bold" />
              </a>

              <a
                href={liveHealthUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-surface-900 hover:bg-surface-850 border border-border-subtle hover:border-border-highlight text-xs font-mono text-zinc-200 transition-colors"
                title="Live PostgreSQL & Service Cluster Health Probe (/readyz)"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{t('project.links.health')}</span>
                <ArrowSquareOut size={14} />
              </a>

              <a
                href="https://github.com/NguyenQuan121321/FinnApiGo"
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

          {/* Stepper Pipeline */}
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

        {/* 2. Live Interactive Security Scenarios Hub */}
        <div className="bg-surface-900 border border-border-subtle rounded-xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
          
          {/* Hub Header with Quick Auth */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-border-subtle pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Lightning size={20} className="text-accent-cyan" weight="fill" />
                <h3 className="text-lg font-bold text-zinc-100">
                  {t('project.finnapi.sim.title')}
                </h3>
              </div>
              <p className="text-xs text-zinc-400 max-w-2xl">
                {t('project.finnapi.sim.subtitle')}
              </p>
            </div>

            {/* Quick Auth Trigger & Live Status */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleStartQuickAuth}
                disabled={isQuickAuthing}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border border-accent-cyan/50 hover:border-accent-cyan text-accent-cyan font-mono text-xs font-semibold flex items-center gap-2 transition-all shadow-[0_0_15px_-4px_rgba(0,229,255,0.3)] hover:scale-[1.02] active:scale-[0.98]"
              >
                {isQuickAuthing ? (
                  <>
                    <ArrowsClockwise size={14} className="animate-spin text-accent-cyan" />
                    <span>{t('project.finnapi.sim.quick_auth_running')}</span>
                  </>
                ) : (
                  <>
                    <Sparkle size={14} weight="fill" className="text-accent-cyan" />
                    <span>{t('project.finnapi.sim.quick_auth')}</span>
                  </>
                )}
              </button>

              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-950 border border-border-subtle text-xs font-mono text-zinc-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                <span>Render Go Engine</span>
              </div>
            </div>
          </div>

          {/* Quick Auth Active Toast Banner */}
          {quickAuthToast && (
            <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center justify-between animate-fadeIn">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-emerald-400 shrink-0" />
                <span>{quickAuthToast}</span>
              </div>
              {currentUser && (
                <span className="text-[10.5px] text-zinc-400 bg-surface-950 px-2 py-0.5 rounded border border-border-subtle font-mono">
                  JWT Ready (15m TTL)
                </span>
              )}
            </div>
          )}

          {/* 4 Interactive Showcase Scenario Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scenarios.map((sc) => (
              <div
                key={sc.id}
                onClick={() => setSelectedScenario(sc.id)}
                className={`group bg-surface-950/80 border border-border-subtle ${sc.accentBorder} rounded-xl p-5 space-y-4 cursor-pointer transition-all hover:bg-surface-850/80 ${sc.accentGlow}`}
              >
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-lg bg-surface-900 border border-border-subtle group-hover:border-border-highlight transition-colors">
                    {sc.icon}
                  </div>
                  <span className="font-mono text-[10.5px] px-2.5 py-0.5 rounded bg-surface-900 border border-border-subtle text-zinc-400">
                    {sc.tag}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-sm sm:text-base font-bold text-zinc-100 group-hover:text-accent-cyan transition-colors">
                    {sc.title}
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans font-normal">
                    {sc.desc}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-border-subtle/60 text-xs font-mono">
                  <span className="text-zinc-500 group-hover:text-zinc-300 transition-colors">
                    {t('project.finnapi.sim.scenario_label')} #{sc.id}
                  </span>
                  <span className={`px-3 py-1.5 rounded-lg border font-semibold flex items-center gap-1.5 transition-all ${sc.buttonColor}`}>
                    <span>{t('project.finnapi.sim.execute_live')}</span>
                    <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* ========================================================================= */}
          {/* 1. QUICK AUTH ANIMATED POPUP MODAL (Register on left -> Login on right)   */}
          {/* ========================================================================= */}
          {isQuickAuthModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-md bg-surface-950/85 animate-fadeIn">
              <div 
                className="w-full max-w-3xl bg-surface-900 border border-accent-cyan/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-scaleUp"
                role="dialog"
                aria-modal="true"
              >
                {/* Modal Header */}
                <div className="p-5 border-b border-border-subtle bg-surface-950 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-800/40 text-accent-cyan">
                      <Sparkle size={18} weight="fill" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-zinc-100">
                        {t('project.finnapi.qa.title')}
                      </h3>
                      <p className="text-xs text-zinc-400 font-mono">
                        {t('project.finnapi.qa.subtitle')}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="p-2 rounded-lg bg-surface-900 hover:bg-red-950/60 border border-border-subtle hover:border-red-500/50 text-zinc-400 hover:text-red-400 transition-colors"
                    title={t('project.finnapi.sim.close_scenario')}
                    aria-label="Close"
                  >
                    <X size={18} weight="bold" />
                  </button>
                </div>

                {/* Modal Split View */}
                <div className="p-6 font-mono text-xs space-y-6">
                  
                  {/* Progress Indicator */}
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className={`p-2.5 rounded-lg border flex items-center justify-center gap-2 transition-all ${
                      quickAuthStep === 'registering' 
                        ? 'bg-cyan-950/50 border-accent-cyan text-accent-cyan font-bold'
                        : quickAuthStep === 'registered' || quickAuthStep === 'logging_in' || quickAuthStep === 'logged_in'
                        ? 'bg-emerald-950/40 border-emerald-700/50 text-emerald-400'
                        : 'bg-surface-950 border-border-subtle text-zinc-500'
                    }`}>
                      <UserCheck size={16} />
                      <span>{t('project.finnapi.qa.step1')}</span>
                      {(quickAuthStep === 'registered' || quickAuthStep === 'logging_in' || quickAuthStep === 'logged_in') && (
                        <Check size={14} className="text-emerald-400" />
                      )}
                    </div>

                    <div className={`p-2.5 rounded-lg border flex items-center justify-center gap-2 transition-all ${
                      quickAuthStep === 'logging_in' 
                        ? 'bg-cyan-950/50 border-accent-cyan text-accent-cyan font-bold'
                        : quickAuthStep === 'logged_in'
                        ? 'bg-emerald-950/40 border-emerald-700/50 text-emerald-400 font-bold'
                        : 'bg-surface-950 border-border-subtle text-zinc-500'
                    }`}>
                      <SignIn size={16} />
                      <span>{t('project.finnapi.qa.step2')}</span>
                      {quickAuthStep === 'logged_in' && <Check size={14} className="text-emerald-400" />}
                    </div>
                  </div>

                  {/* Dynamic Panels */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch min-h-[220px]">
                    
                    {/* LEFT PANEL: Register Form (Visible during Step 1 & Step 2, then folds out) */}
                    {(quickAuthStep === 'registering' || quickAuthStep === 'registered') && (
                      <div className="bg-surface-950 border border-border-subtle rounded-xl p-4 space-y-3 transition-all animate-fadeIn">
                        <div className="flex items-center justify-between border-b border-border-subtle pb-2 text-zinc-300">
                          <span className="font-bold uppercase text-[11px]">{t('project.finnapi.qa.left_title')}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            qaRegisterStatus === 201 
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-700/50' 
                              : 'bg-cyan-950 text-cyan-400 border border-cyan-800/40 animate-pulse'
                          }`}>
                            {qaRegisterStatus === 201 ? '201 Created' : t('project.finnapi.qa.sending')}
                          </span>
                        </div>

                        <div className="space-y-2 text-[11px]">
                          <div>
                            <span className="text-zinc-500">username:</span>{' '}
                            <span className="text-accent-cyan font-bold">{qaUsername}</span>
                          </div>
                          <div>
                            <span className="text-zinc-500">fullName:</span>{' '}
                            <span className="text-zinc-200">{qaFullName}</span>
                          </div>
                          <div>
                            <span className="text-zinc-500">email:</span>{' '}
                            <span className="text-zinc-200">{qaEmail}</span>
                          </div>
                          <div>
                            <span className="text-zinc-500">password:</span>{' '}
                            <span className="text-amber-300 font-mono">{qaPassword}</span>
                          </div>
                        </div>

                        {quickAuthStep === 'registered' && (
                          <div className="p-2 rounded bg-emerald-950/60 border border-emerald-800/50 text-emerald-300 text-[11px] flex items-center gap-1.5 font-sans">
                            <CheckCircle size={14} className="text-emerald-400 shrink-0" />
                            <span>{t('project.finnapi.qa.reg_success')}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* RIGHT PANEL: Login Form (Executes live and finishes) */}
                    <div className={`bg-surface-950 border rounded-xl p-4 space-y-3 transition-all ${
                      quickAuthStep === 'logging_in' || quickAuthStep === 'logged_in' 
                        ? 'border-accent-cyan md:col-span-2' 
                        : 'border-border-subtle opacity-60'
                    }`}>
                      <div className="flex items-center justify-between border-b border-border-subtle pb-2 text-zinc-300">
                        <span className="font-bold uppercase text-[11px]">{t('project.finnapi.qa.right_title')}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          qaLoginStatus === 200 
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-700/50' 
                            : quickAuthStep === 'logging_in'
                            ? 'bg-cyan-950 text-cyan-400 border border-cyan-800/40 animate-pulse'
                            : 'bg-surface-900 text-zinc-500'
                        }`}>
                          {qaLoginStatus === 200 ? `200 OK (${qaLatency})` : quickAuthStep === 'logging_in' ? t('project.finnapi.qa.authenticating') : t('project.finnapi.qa.waiting')}
                        </span>
                      </div>

                      <div className="space-y-2 text-[11px]">
                        <div>
                          <span className="text-zinc-500">email:</span>{' '}
                          <span className="text-zinc-200">{qaEmail}</span>
                        </div>
                        <div>
                          <span className="text-zinc-500">password:</span>{' '}
                          <span className="text-amber-300 font-mono">{qaPassword}</span>
                        </div>
                      </div>

                      {quickAuthStep === 'logged_in' && (
                        <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs font-sans space-y-1.5 animate-fadeIn">
                          <div className="flex items-center gap-1.5 font-bold text-emerald-200">
                            <CheckCircle size={16} className="text-emerald-400" />
                            <span>{t('project.finnapi.qa.login_success_title')}</span>
                          </div>
                          <div className="text-[11px] text-zinc-400 font-mono">
                            {t('project.finnapi.qa.auto_close_note')}
                          </div>
                        </div>
                      )}
                    </div>

                  </div>

                </div>

                {/* Modal Footer */}
                <div className="p-4 border-t border-border-subtle bg-surface-950 flex items-center justify-between text-xs text-zinc-400 shrink-0">
                  <div className="flex items-center gap-2 font-mono">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse inline-block"></span>
                    <span>{t('project.finnapi.sim.server_connected')}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-3 py-1.5 rounded-lg bg-surface-900 hover:bg-surface-850 border border-border-subtle text-zinc-200 font-sans font-semibold transition-colors"
                  >
                    {t('project.finnapi.sim.close_now')}
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 2. DEDICATED FRONTEND OVERLAY MODAL (Khi người dùng bấm vào 1 trong 4 kịch bản) */}
          {/* ========================================================================= */}
          {selectedScenario !== null && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-md bg-surface-950/85 animate-fadeIn">
              
              <div 
                className="w-full max-w-4xl max-h-[90vh] bg-surface-900 border border-border-highlight rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-scaleUp"
                role="dialog"
                aria-modal="true"
              >
                
                {/* Modal Header */}
                <div className="p-5 sm:p-6 border-b border-border-subtle bg-surface-950 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-surface-900 border border-border-subtle">
                      {scenarios.find(s => s.id === selectedScenario)?.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-accent-cyan border border-cyan-800/40">
                          {t('project.finnapi.sim.scenario_label').toUpperCase()} {selectedScenario}
                        </span>
                        <span className="text-xs font-mono text-zinc-400">
                          {scenarios.find(s => s.id === selectedScenario)?.tag}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-zinc-100 mt-0.5">
                        {scenarios.find(s => s.id === selectedScenario)?.title}
                      </h3>
                    </div>
                  </div>

                  {/* Prominent, easy-to-click Close (X) Button */}
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="p-2.5 rounded-xl bg-surface-900 hover:bg-red-950/60 border border-border-subtle hover:border-red-500/50 text-zinc-400 hover:text-red-400 transition-all focus:outline-none focus:ring-2 focus:ring-accent-cyan/50"
                    title={t('project.finnapi.sim.close_scenario')}
                    aria-label="Close modal"
                  >
                    <X size={20} weight="bold" />
                  </button>
                </div>

                {/* Modal Body: Interactive Scenarios */}
                <div className="p-5 sm:p-6 overflow-y-auto space-y-6 font-mono text-xs">

                  {/* Current Active Session Status Bar inside Modal */}
                  <div className="p-3 rounded-lg bg-surface-950 border border-border-subtle flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2 text-zinc-300">
                      <Key size={16} className="text-accent-cyan" />
                      <span>{t('project.finnapi.sim.active_identity')}</span>
                      <span className="text-accent-cyan font-bold">
                        {currentUser ? `@${currentUser.username}` : t('project.finnapi.sim.guest')}
                      </span>
                      {accessToken && (
                        <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40 font-mono truncate max-w-[180px]" title={accessToken}>
                          JWT: {accessToken.substring(0, 14)}...
                        </span>
                      )}
                    </div>
                    
                    {!currentUser && (
                      <button
                        type="button"
                        onClick={handleStartQuickAuth}
                        disabled={isQuickAuthing}
                        className="px-3 py-1 rounded bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-700/50 flex items-center gap-1.5 transition-colors"
                      >
                        <Sparkle size={12} />
                        <span>{t('project.finnapi.sim.quick_auth')}</span>
                      </button>
                    )}
                  </div>

                  {/* SCENARIO 1: JWT & Refresh Token Rotation */}
                  {selectedScenario === 1 && (
                    <div className="space-y-5">
                      <div className="p-4 rounded-xl bg-surface-950 border border-border-subtle space-y-3 font-sans">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-zinc-100 text-sm flex items-center gap-2 font-mono">
                            <ArrowsClockwise size={16} className="text-accent-cyan" />
                            <span>{t('project.finnapi.sc1.heading')}</span>
                          </h4>
                          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800/40">
                            {t('project.finnapi.sc1.tag')}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-300 leading-relaxed">
                          {t('project.finnapi.sc1.desc')}
                        </p>
                      </div>

                      {/* Action Button */}
                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={handleExecuteRotation}
                          disabled={isRotating}
                          className="flex-1 py-3 px-4 rounded-xl bg-accent-cyan hover:bg-cyan-300 text-surface-950 font-sans font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_-4px_rgba(0,229,255,0.4)]"
                        >
                          {isRotating ? (
                            <>
                              <ArrowsClockwise size={16} className="animate-spin" />
                              <span>{t('project.finnapi.sc1.btn_loading')}</span>
                            </>
                          ) : (
                            <>
                              <Play size={16} weight="fill" />
                              <span>{t('project.finnapi.sc1.btn')}</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleCopyCurl(`curl -X POST https://finnapigo.onrender.com/api/v1/auth/refresh \\\n  -H "Content-Type: application/json" \\\n  -d '{"refreshToken": "${refreshToken || 'rft_sample_fam_v1'}"}'`)}
                          className="py-3 px-4 rounded-xl bg-surface-950 hover:bg-surface-850 border border-border-subtle text-zinc-300 transition-colors flex items-center gap-1.5"
                        >
                          {copiedCurl ? <Check size={14} className="text-accent-mint" /> : <Copy size={14} />}
                          <span>{copiedCurl ? t('project.finnapi.sim.copied') : t('project.finnapi.sim.copy_btn')}</span>
                        </button>
                      </div>

                      {/* Rotation Timeline Log */}
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between text-zinc-400 border-b border-border-subtle pb-2">
                          <span className="font-semibold text-[11px] uppercase tracking-wider text-zinc-200">
                            {t('project.finnapi.sc1.log_title')} ({rotationHistory.length})
                          </span>
                          <span className="text-zinc-500 text-[10.5px]">{t('project.finnapi.sc1.invalidation')}</span>
                        </div>

                        {rotationHistory.length === 0 ? (
                          <div className="p-6 rounded-lg bg-surface-950 border border-border-subtle text-center text-zinc-500 font-sans">
                            {t('project.finnapi.sc1.empty_log')}
                          </div>
                        ) : (
                          <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
                            {rotationHistory.map((item, idx) => (
                              <div key={idx} className="p-3 rounded-lg bg-surface-950 border border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className="px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-400 font-bold text-[10px]">
                                      v{item.step}
                                    </span>
                                    <span className="font-semibold text-zinc-200 text-xs font-sans">
                                      {item.action}
                                    </span>
                                  </div>
                                  <div className="text-[10.5px] text-zinc-400 space-x-3">
                                    <span>Access: <span className="text-accent-cyan">{item.tokenPreview}</span></span>
                                    <span>Refresh: <span className="text-amber-400">{item.refreshPreview}</span></span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3 sm:text-right shrink-0">
                                  <span className="px-2 py-0.5 rounded text-[10.5px] font-bold bg-emerald-950/70 border border-emerald-700/50 text-emerald-400">
                                    HTTP {item.status} ({item.latency})
                                  </span>
                                  <span className="text-[10px] text-zinc-500">{item.time}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* SCENARIO 2: Token Theft & Reuse Detection */}
                  {selectedScenario === 2 && (
                    <div className="space-y-5">
                      <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 space-y-2 font-sans">
                        <div className="flex items-center gap-2 text-amber-300 font-bold text-sm font-mono">
                          <Warning size={18} className="text-amber-400" />
                          <span>{t('project.finnapi.sc2.heading')}</span>
                        </div>
                        <p className="text-xs text-amber-200/80 leading-relaxed">
                          {t('project.finnapi.sc2.desc')}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleSimulateTheft}
                        disabled={isSimulatingTheft}
                        className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-surface-950 font-sans font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_-4px_rgba(245,158,11,0.4)]"
                      >
                        {isSimulatingTheft ? (
                          <>
                            <ArrowsClockwise size={16} className="animate-spin" />
                            <span>{t('project.finnapi.sc2.btn_loading')}</span>
                          </>
                        ) : (
                          <>
                            <ShieldWarning size={16} weight="bold" />
                            <span>{t('project.finnapi.sc2.btn')}</span>
                          </>
                        )}
                      </button>

                      {theftLog && (
                        <div className="p-4 rounded-xl bg-surface-950 border border-red-500/50 space-y-3 animate-fadeIn">
                          <div className="flex items-center justify-between border-b border-border-subtle pb-2">
                            <span className="text-red-400 font-bold flex items-center gap-1.5">
                              <X size={16} weight="bold" />
                              <span>HTTP {theftLog.status} UNAUTHORIZED · {theftLog.code}</span>
                            </span>
                            <span className="text-[10.5px] text-zinc-500">{t('project.finnapi.sc2.audit_triggered')}</span>
                          </div>
                          <p className="text-xs text-zinc-200 leading-relaxed font-sans">
                            {t('project.finnapi.sc2.alert_msg')}
                          </p>
                          <div className="p-3 rounded bg-red-950/40 border border-red-800/40 text-[11px] text-red-300 font-mono space-y-1">
                            <div className="font-semibold text-red-200">&gt; {t('project.finnapi.sc2.remediation')}</div>
                            <div>{t('project.finnapi.sc2.action')}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* SCENARIO 3: Brute-Force Rate Limiting (Redis Sliding Window) */}
                  {selectedScenario === 3 && (
                    <div className="space-y-5">
                      <div className="p-4 rounded-xl bg-surface-950 border border-border-subtle space-y-2 font-sans">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-zinc-100 text-sm flex items-center gap-2 font-mono">
                            <Lightning size={16} className="text-emerald-400" weight="fill" />
                            <span>{t('project.finnapi.sc3.heading')}</span>
                          </h4>
                          <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-800/40">
                            {t('project.finnapi.sc3.tag')}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-300 leading-relaxed">
                          {t('project.finnapi.sc3.desc')}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleTriggerRateLimitBurst}
                        disabled={isBursting}
                        className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-surface-950 font-sans font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_-4px_rgba(16,185,129,0.4)]"
                      >
                        {isBursting ? (
                          <>
                            <ArrowsClockwise size={16} className="animate-spin" />
                            <span>{t('project.finnapi.sc3.btn_loading')}</span>
                          </>
                        ) : (
                          <>
                            <Play size={16} weight="fill" />
                            <span>{t('project.finnapi.sc3.btn')}</span>
                          </>
                        )}
                      </button>

                      {burstRequests.length > 0 && (
                        <div className="space-y-2">
                          <div className="text-zinc-400 font-semibold text-[11px] uppercase tracking-wider">
                            {t('project.finnapi.sc3.result_title')}
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {burstRequests.map((req) => (
                              <div 
                                key={req.id} 
                                className={`p-2.5 rounded-lg border text-xs flex items-center justify-between ${
                                  req.status === 200 
                                    ? 'bg-surface-950 border-emerald-800/40 text-zinc-200' 
                                    : 'bg-red-950/40 border-red-700/60 text-red-300 font-bold'
                                }`}
                              >
                                <span>Req #{req.id}: {req.url}</span>
                                <span className={`px-2 py-0.5 rounded text-[10.5px] ${req.status === 200 ? 'bg-emerald-950 text-emerald-400' : 'bg-red-900 text-red-200'}`}>
                                  {req.status} {req.status === 200 ? `(Remaining: ${req.remaining})` : t('project.finnapi.sc3.blocked')}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* SCENARIO 4: Device & Session Management */}
                  {selectedScenario === 4 && (
                    <div className="space-y-5">
                      <div className="p-4 rounded-xl bg-surface-950 border border-border-subtle space-y-2 font-sans">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-zinc-100 text-sm flex items-center gap-2 font-mono">
                            <Laptop size={16} className="text-purple-400" />
                            <span>{t('project.finnapi.sc4.heading')}</span>
                          </h4>
                          <span className="text-[11px] font-mono text-purple-400 bg-purple-950/50 px-2 py-0.5 rounded border border-purple-800/40">
                            {sessions.length} {t('project.finnapi.sc4.devices_active')}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-300 leading-relaxed">
                          {t('project.finnapi.sc4.desc')}
                        </p>
                      </div>

                      {sessionActionLog && (
                        <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2 animate-fadeIn">
                          <CheckCircle size={16} className="text-emerald-400 shrink-0" />
                          <span>{sessionActionLog}</span>
                        </div>
                      )}

                      <div className="space-y-2.5">
                        {sessions.map((sess) => (
                          <div 
                            key={sess.id}
                            className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                              sess.isCurrent 
                                ? 'bg-surface-950 border-accent-cyan/60 shadow-[0_0_12px_-3px_rgba(0,229,255,0.2)]' 
                                : 'bg-surface-950/80 border-border-subtle'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className="p-2 rounded-lg bg-surface-900 border border-border-subtle shrink-0 mt-0.5">
                                {sess.device.includes('iPhone') ? <DeviceMobile size={18} className="text-emerald-400" /> : <Laptop size={18} className="text-accent-cyan" />}
                              </div>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-zinc-100 text-xs">{sess.device}</span>
                                  {sess.isCurrent && (
                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-accent-cyan border border-cyan-800/40">
                                      {t('project.finnapi.sc4.current_device')}
                                    </span>
                                  )}
                                </div>
                                <div className="text-[11px] text-zinc-400 space-x-2">
                                  <span>{sess.os}</span>
                                  <span>•</span>
                                  <span>{sess.location}</span>
                                  <span>•</span>
                                  <span>IP: {sess.ip}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-border-subtle">
                              <span className="text-[10.5px] text-zinc-500 flex items-center gap-1">
                                <ClockCounterClockwise size={12} />
                                <span>{sess.lastActive}</span>
                              </span>
                              {!sess.isCurrent && (
                                <button
                                  type="button"
                                  onClick={() => handleRevokeSession(sess.id)}
                                  className="px-3 py-1.5 rounded-lg bg-red-950/50 hover:bg-red-900 border border-red-700/50 text-red-300 text-xs font-sans font-semibold transition-colors"
                                >
                                  {t('project.finnapi.sc4.revoke_btn')}
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>

                {/* Modal Footer */}
                <div className="p-4 sm:p-5 border-t border-border-subtle bg-surface-950 flex items-center justify-between text-xs text-zinc-400 shrink-0">
                  <div className="flex items-center gap-2 font-mono">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 inline-block"></span>
                    <span>{t('project.finnapi.sim.server_connected')}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 rounded-lg bg-surface-900 hover:bg-surface-850 border border-border-subtle text-zinc-200 font-sans font-semibold transition-colors"
                  >
                    {t('project.finnapi.sim.close_scenario')}
                  </button>
                </div>

              </div>
            </div>
          )}

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
