import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Database, 
  ShieldCheck, 
  Key, 
  ArrowsClockwise, 
  ArrowRight, 
  X, 
  CheckCircle, 
  WarningCircle, 
  Code, 
  Terminal, 
  Copy, 
  Check,
  Tag
} from '@phosphor-icons/react';

interface WriteupItem {
  id: string;
  category: 'db' | 'auth' | 'concurrency';
  titleKey: string;
  summaryKey: string;
  tagKey: string;
  problemKey: string;
  rcaKey: string;
  solutionKey: string;
  metricsKey: string;
  icon: React.ReactNode;
  accentColor: string;
  badgeBg: string;
  readTime: string;
  codeSnippet: {
    language: string;
    filename: string;
    code: string;
  };
}

export const WriteupsSection: React.FC = () => {
  const { t } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'db' | 'auth' | 'concurrency'>('all');
  const [activeArticle, setActiveArticle] = useState<WriteupItem | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const writeups: WriteupItem[] = [
    {
      id: 'db-migration-deadlock',
      category: 'db',
      titleKey: 'writeups.art1.title',
      summaryKey: 'writeups.art1.summary',
      tagKey: 'writeups.art1.tag',
      problemKey: 'writeups.art1.problem',
      rcaKey: 'writeups.art1.rca',
      solutionKey: 'writeups.art1.solution',
      metricsKey: 'writeups.art1.metrics',
      icon: <Database size={20} className="text-purple-400" />,
      accentColor: 'border-l-purple-400 hover:border-purple-400/60',
      badgeBg: 'bg-purple-950/40 border-purple-500/30 text-purple-300',
      readTime: '4 min read',
      codeSnippet: {
        language: 'sql',
        filename: 'migrations/0004_expand_user_auth_schema.sql',
        code: `-- 3-Phase Expand/Contract Migration Pattern (Goose / Postgres / MySQL)
-- Phase 1: EXPAND (Zero-Downtime Non-blocking DDL)
SET lock_timeout = '3s';

-- 1. Add new column as NULLABLE to prevent exclusive table rewrite locks
ALTER TABLE users ADD COLUMN totp_secret_v2 VARCHAR(64) NULL;

-- 2. Create index concurrently (Postgres) or with ALGORITHM=INPLACE, LOCK=NONE (MySQL 8)
-- MySQL 8.0+:
ALTER TABLE users ADD INDEX idx_users_totp_v2 (totp_secret_v2),
  ALGORITHM=INPLACE, LOCK=NONE;

-- Phase 2: DUAL-WRITE in Go Service Layer
-- (Go backend writes to both totp_secret and totp_secret_v2, reads with fallback)

-- Phase 3: CONTRACT (Scheduled off-peak batch cleanup)
-- ALTER TABLE users DROP COLUMN totp_secret;`
      }
    },
    {
      id: 'sudo-mode-reauth',
      category: 'auth',
      titleKey: 'writeups.art2.title',
      summaryKey: 'writeups.art2.summary',
      tagKey: 'writeups.art2.tag',
      problemKey: 'writeups.art2.problem',
      rcaKey: 'writeups.art2.rca',
      solutionKey: 'writeups.art2.solution',
      metricsKey: 'writeups.art2.metrics',
      icon: <ShieldCheck size={20} className="text-emerald-400" />,
      accentColor: 'border-l-emerald-400 hover:border-emerald-400/60',
      badgeBg: 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300',
      readTime: '5 min read',
      codeSnippet: {
        language: 'go',
        filename: 'internal/middleware/sudo_mode.go',
        code: `// RequireSudoMode enforces step-up authentication for sensitive operations
func RequireSudoMode(redisClient *redis.Client) gin.HandlerFunc {
    return func(c *gin.Context) {
        userID := c.GetString("user_id")
        sudoToken := c.GetHeader("X-Sudo-Token")

        if sudoToken == "" {
            c.AbortWithStatusJSON(http.StatusForbidden, gin.H{
                "error": "SUDO_MODE_REQUIRED",
                "message": "Re-authentication required for sensitive operation",
                "auth_methods": []string{"password", "totp", "webauthn"},
            })
            return
        }

        // Verify SHA-256 hash in Redis (300s TTL)
        tokenHash := hashSHA256(sudoToken)
        key := fmt.Sprintf("sudo_grant:%s:%s", userID, tokenHash)
        exists, err := redisClient.Exists(c.Request.Context(), key).Result()
        if err != nil || exists == 0 {
            c.AbortWithStatusJSON(http.StatusForbidden, gin.H{
                "error": "SUDO_TOKEN_EXPIRED",
                "message": "Sudo session expired. Please verify credentials again.",
            })
            return
        }

        c.Next()
    }
}`
      }
    },
    {
      id: 'webauthn-rpid-binding',
      category: 'auth',
      titleKey: 'writeups.art3.title',
      summaryKey: 'writeups.art3.summary',
      tagKey: 'writeups.art3.tag',
      problemKey: 'writeups.art3.problem',
      rcaKey: 'writeups.art3.rca',
      solutionKey: 'writeups.art3.solution',
      metricsKey: 'writeups.art3.metrics',
      icon: <Key size={20} className="text-accent-cyan" />,
      accentColor: 'border-l-cyan-400 hover:border-accent-cyan/60',
      badgeBg: 'bg-cyan-950/40 border-cyan-500/30 text-cyan-300',
      readTime: '4 min read',
      codeSnippet: {
        language: 'go',
        filename: 'internal/service/webauthn_resolver.go',
        code: `// DynamicRPIDResolver resolves effective RPID & Origin matching W3C specs
type DynamicRPIDResolver struct {
    AllowedOrigins map[string]string // Origin URL -> Effective RPID
}

func NewRPIDResolver(allowedOrigins []string) *DynamicRPIDResolver {
    m := make(map[string]string)
    for _, orig := range allowedOrigins {
        u, err := url.Parse(orig)
        if err == nil {
            // Strip port & scheme to construct valid effective RPID domain
            hostname := u.Hostname()
            m[orig] = hostname
        }
    }
    return &DynamicRPIDResolver{AllowedOrigins: m}
}

func (r *DynamicRPIDResolver) Resolve(requestOrigin string) (string, error) {
    rpid, exists := r.AllowedOrigins[requestOrigin]
    if !exists {
        return "", fmt.Errorf("origin %q not authorized for FIDO2 RPID binding", requestOrigin)
    }
    return rpid, nil
}`
      }
    },
    {
      id: 'token-race-redis-lua',
      category: 'concurrency',
      titleKey: 'writeups.art4.title',
      summaryKey: 'writeups.art4.summary',
      tagKey: 'writeups.art4.tag',
      problemKey: 'writeups.art4.problem',
      rcaKey: 'writeups.art4.rca',
      solutionKey: 'writeups.art4.solution',
      metricsKey: 'writeups.art4.metrics',
      icon: <ArrowsClockwise size={20} className="text-amber-400" />,
      accentColor: 'border-l-amber-400 hover:border-amber-400/60',
      badgeBg: 'bg-amber-950/40 border-amber-500/30 text-amber-300',
      readTime: '6 min read',
      codeSnippet: {
        language: 'lua',
        filename: 'scripts/atomic_refresh_token_swap.lua',
        code: `-- Redis Lua Script: Atomic Token Exchange with 10s Grace Window
local session_key    = KEYS[1] -- "session:user_123:device_01"
local incoming_hash  = ARGV[1] -- SHA-256 of submitted refresh token
local new_token_hash = ARGV[2] -- SHA-256 of freshly issued refresh token
local new_access_jwt = ARGV[3] -- Fresh short-lived JWT string
local ttl_seconds    = tonumber(ARGV[4]) -- 604800 (7 days)

local current_hash = redis.call("HGET", session_key, "active_refresh_hash")
local grace_hash   = redis.call("HGET", session_key, "grace_refresh_hash")

-- Case 1: Match active token -> Rotate atomically
if current_hash == incoming_hash then
    redis.call("HSET", session_key, "grace_refresh_hash", current_hash)
    redis.call("HSET", session_key, "active_refresh_hash", new_token_hash)
    redis.call("HSET", session_key, "cached_jwt", new_access_jwt)
    redis.call("EXPIRE", session_key, ttl_seconds)
    return {1, new_access_jwt} -- Status 1: Fresh Rotation OK

-- Case 2: Match grace token (concurrent tab request within 10s window)
elseif grace_hash == incoming_hash then
    local cached_jwt = redis.call("HGET", session_key, "cached_jwt")
    return {2, cached_jwt} -- Status 2: Grace Hit OK (Return cached JWT)

-- Case 3: Replay attack on older token -> Revoke session family immediately
else
    redis.call("DEL", session_key)
    return {0, "SECURITY_ALERT_TOKEN_FAMILY_REVOKED"}
end`
      }
    }
  ];

  const filteredWriteups = selectedFilter === 'all' 
    ? writeups 
    : writeups.filter(w => w.category === selectedFilter);

  const handleCloseModal = useCallback(() => {
    setActiveArticle(null);
    setCopiedCode(false);
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

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="writeups" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-border-subtle/80 bg-surface-950">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100">
                {t('writeups.title')}
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 max-w-3xl">
                {t('writeups.subtitle')}
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-surface-900 border border-border-subtle text-xs font-mono">
              <button
                type="button"
                onClick={() => setSelectedFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedFilter === 'all'
                    ? 'bg-accent-cyan text-white dark:text-surface-950 font-bold shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-surface-850'
                }`}
              >
                {t('writeups.filter_all')}
              </button>
              <button
                type="button"
                onClick={() => setSelectedFilter('db')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedFilter === 'db'
                    ? 'bg-purple-500 text-white font-bold shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-surface-850'
                }`}
              >
                {t('writeups.filter_db')}
              </button>
              <button
                type="button"
                onClick={() => setSelectedFilter('auth')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedFilter === 'auth'
                    ? 'bg-emerald-500 text-white font-bold shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-surface-850'
                }`}
              >
                {t('writeups.filter_auth')}
              </button>
              <button
                type="button"
                onClick={() => setSelectedFilter('concurrency')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedFilter === 'concurrency'
                    ? 'bg-amber-500 text-white font-bold shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-surface-850'
                }`}
              >
                {t('writeups.filter_concurrency')}
              </button>
            </div>
          </div>
        </div>

        {/* 2x2 Bento Grid of Engineering Write-ups */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredWriteups.map((item) => (
            <div
              key={item.id}
              className={`bg-surface-900 border border-border-subtle border-l-4 ${item.accentColor} rounded-xl p-6 sm:p-7 flex flex-col justify-between space-y-5 transition-all hover:border-border-highlight shadow-sm group`}
            >
              <div className="space-y-4">
                {/* Header: Tag & Read Time */}
                <div className="flex items-center justify-between gap-2">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-mono border bg-surface-950 text-zinc-300">
                    {item.icon}
                    <span>{t(item.tagKey)}</span>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400">
                    {item.readTime}
                  </span>
                </div>

                {/* Title & Summary */}
                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-bold text-zinc-100 group-hover:text-accent-cyan transition-colors leading-snug">
                    {t(item.titleKey)}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans line-clamp-3">
                    {t(item.summaryKey)}
                  </p>
                </div>

                {/* Code Snapshot Preview */}
                <div className="p-3 rounded-lg bg-surface-950 border border-border-subtle/80 font-mono text-[11px] text-zinc-400 overflow-hidden relative">
                  <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-border-subtle/50 text-[10px] text-zinc-500">
                    <span className="flex items-center gap-1">
                      <Terminal size={12} className="text-accent-cyan" />
                      <span>{item.codeSnippet.filename}</span>
                    </span>
                    <span>{item.codeSnippet.language.toUpperCase()}</span>
                  </div>
                  <pre className="text-zinc-300 overflow-x-auto whitespace-pre-wrap font-mono line-clamp-2 leading-tight">
                    {item.codeSnippet.code.split('\n').slice(0, 3).join('\n')}
                  </pre>
                </div>
              </div>

              {/* Action Trigger */}
              <button
                type="button"
                onClick={() => setActiveArticle(item)}
                className="w-full sm:w-auto inline-flex items-center justify-between sm:justify-start gap-2 px-4 py-2.5 rounded-lg bg-surface-950 hover:bg-surface-850 border border-border-subtle hover:border-border-highlight text-xs font-mono font-medium text-zinc-200 hover:text-accent-cyan transition-all active:scale-[0.98]"
              >
                <span>{t('writeups.read_deepdive')}</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* DETAILED ARTICLE / RCA MODAL DRAWER                                        */}
      {/* ========================================================================= */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 backdrop-blur-md bg-surface-950/85 animate-fadeIn">
          <div 
            className="w-full max-w-4xl max-h-[90vh] bg-surface-900 border border-border-highlight rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-scaleUp text-left"
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-border-subtle bg-surface-950 flex items-center justify-between shrink-0 gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2.5 rounded-xl bg-surface-900 border border-border-subtle text-accent-cyan shrink-0">
                  {activeArticle.icon}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface-900 border border-border-subtle text-accent-cyan">
                      {t(activeArticle.tagKey)}
                    </span>
                    <span className="text-xs font-mono text-zinc-500">• {activeArticle.readTime}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-zinc-100 truncate mt-0.5">
                    {t(activeArticle.titleKey)}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                className="p-2.5 rounded-xl bg-surface-900 hover:bg-red-950/60 border border-border-subtle hover:border-red-500/50 text-zinc-400 hover:text-red-400 transition-all shrink-0"
                title={t('writeups.close')}
                aria-label="Close"
              >
                <X size={18} weight="bold" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-7 overflow-y-auto space-y-6 text-sm">
              
              {/* 1. Problem Statement */}
              <div className="p-4 rounded-xl bg-surface-950 border border-border-subtle space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400">
                  <WarningCircle size={16} />
                  <span>{t('writeups.problem_label')}</span>
                </div>
                <p className="text-zinc-300 leading-relaxed font-sans text-xs sm:text-sm">
                  {t(activeArticle.problemKey)}
                </p>
              </div>

              {/* 2. Root Cause Analysis (RCA) */}
              <div className="p-4 rounded-xl bg-surface-950 border border-border-subtle space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-400">
                  <Tag size={16} />
                  <span>{t('writeups.rca_label')}</span>
                </div>
                <div className="text-zinc-300 leading-relaxed font-sans text-xs sm:text-sm whitespace-pre-line space-y-1">
                  {t(activeArticle.rcaKey)}
                </div>
              </div>

              {/* 3. Solution & Mitigation */}
              <div className="p-4 rounded-xl bg-surface-950 border border-border-subtle space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent-cyan">
                  <CheckCircle size={16} />
                  <span>{t('writeups.solution_label')}</span>
                </div>
                <div className="text-zinc-300 leading-relaxed font-sans text-xs sm:text-sm whitespace-pre-line space-y-1">
                  {t(activeArticle.solutionKey)}
                </div>
              </div>

              {/* 4. Code Snippet Block */}
              <div className="rounded-xl bg-surface-950 border border-border-subtle overflow-hidden">
                <div className="p-3 bg-surface-900 border-b border-border-subtle flex items-center justify-between font-mono text-xs text-zinc-400">
                  <div className="flex items-center gap-2">
                    <Code size={16} className="text-accent-cyan" />
                    <span className="font-semibold text-zinc-200">{activeArticle.codeSnippet.filename}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyCode(activeArticle.codeSnippet.code)}
                    className="px-2.5 py-1 rounded bg-surface-950 hover:bg-surface-850 border border-border-subtle text-[11px] font-mono text-zinc-300 flex items-center gap-1.5 transition-colors"
                  >
                    {copiedCode ? <Check size={13} className="text-accent-mint" /> : <Copy size={13} />}
                    <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                </div>
                <div className="p-4 overflow-x-auto font-mono text-xs text-zinc-200 bg-[#080a0f] leading-relaxed">
                  <pre className="whitespace-pre">
                    {activeArticle.codeSnippet.code}
                  </pre>
                </div>
              </div>

              {/* 5. Metrics & Takeaways */}
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent-mint">
                  <CheckCircle size={16} weight="fill" />
                  <span>{t('writeups.metrics_label')}</span>
                </div>
                <div className="text-zinc-300 leading-relaxed font-mono text-xs whitespace-pre-line">
                  {t(activeArticle.metricsKey)}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-border-subtle bg-surface-950 flex items-center justify-between text-xs text-zinc-400 shrink-0">
              <div className="flex items-center gap-2 font-mono">
                <Terminal size={14} className="text-accent-cyan" />
                <span>Verified in FinnApiGo / Production Codebase</span>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-4 py-1.5 rounded-lg bg-surface-900 hover:bg-surface-850 border border-border-subtle text-zinc-200 font-sans font-semibold transition-colors"
              >
                {t('writeups.close')}
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
