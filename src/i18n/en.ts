const en: Record<string, string> = {
  // Navigation
  "nav.status": "Available for Fresher / Intern Backend Roles",
  "nav.projects": "Flagship Systems",
  "nav.thesis": "Thesis Project",
  "nav.skills": "Verified Stack",
  "nav.about": "Engineering Philosophy",
  "nav.contact": "Get in Touch",
  "lang.toggle": "VI",

  // Hero
  "hero.badge": "Backend & Security Systems Engineer",
  "hero.greeting": "Hello, I am",
  "hero.name": "Nguyen Quan",
  "hero.headline": "Engineering Resilient Systems, Hardened Auth & Production APIs.",
  "hero.description": "Focused on clean architecture, cryptographic security, and high-reliability APIs with Go and Node.js. Building verified systems backed by comprehensive test suites and automated CI pipelines.",
  "hero.cta.projects": "Explore System Architecture",
  "hero.cta.github": "GitHub Repositories",
  "hero.cta.contact": "Contact Me",

  // Telemetry Bar
  "telemetry.title": "LIVE SYSTEM TELEMETRY",
  "telemetry.uptime": "Uptime SLA",
  "telemetry.uptime_val": "99.98%",
  "telemetry.tests": "Test Suite",
  "telemetry.tests_val": "258 / 258 Passed",
  "telemetry.ci": "CI Pipeline",
  "telemetry.ci_val": "7 Jobs Green",
  "telemetry.latency": "p95 API Latency",
  "telemetry.latency_val": "< 12ms",
  "telemetry.coverage": "Coverage Floor",
  "telemetry.coverage_val": "14 Rules Enforced",

  // FinnApiGo Flagship Project
  "project.finnapi.badge": "FLAGSHIP SYSTEM · PRODUCTION-GRADE GO BACKEND",
  "project.finnapi.title": "FinnApiGo",
  "project.finnapi.tagline": "Authentication & Multi-Factor Security Engine in Go",
  "project.finnapi.description": "Production-ready auth system live on Render. Built with Clean Architecture to isolate domain logic from frameworks, featuring JWT rotation with reuse detection, RFC 6238 TOTP, WebAuthn Passkeys, and defense-in-depth security hardening.",
  
  // FinnApiGo Architecture Inspector
  "project.finnapi.arch.title": "Interactive Clean Architecture Inspector",
  "project.finnapi.arch.subtitle": "Click each architectural boundary to inspect isolation guarantees and technical decisions.",
  "project.finnapi.arch.layer_client": "Client Layer",
  "project.finnapi.arch.layer_client_desc": "HTTP/2 REST clients, mobile apps, and frontend Single-Page Applications communicating over TLS 1.3.",
  "project.finnapi.arch.layer_mw": "Middleware Pipeline",
  "project.finnapi.arch.layer_mw_desc": "Security header injection (HSTS, CSP), sliding-window rate limiting with IPv6 /64 subnet collapse, and CORS origin validation.",
  "project.finnapi.arch.layer_handlers": "Handlers (Transport)",
  "project.finnapi.arch.layer_handlers_desc": "Strict DTO binding, payload sanitization, and HTTP-to-Domain translation. Handlers never touch database connections directly.",
  "project.finnapi.arch.layer_services": "Service (Core Domain)",
  "project.finnapi.arch.layer_services_desc": "Framework-agnostic business logic. Gin imports are banned at compile-time via depguard. Handles token rotation, TOTP crypto, and audit dispatching.",
  "project.finnapi.arch.layer_repo": "Repository (Data Access)",
  "project.finnapi.arch.layer_repo_desc": "Transactional MySQL 8 queries via GORM and Redis 7 distributed cache for active session states and blacklisted refresh hashes.",
  "project.finnapi.arch.depguard_note": "Domain Isolation Guarantee: Service layer is 100% framework-independent. Gin engine is strictly banned from services via CI depguard linter rules.",

  // FinnApiGo Playground / Simulator
  "project.finnapi.sim.title": "Live Interactive API Playground",
  "project.finnapi.sim.subtitle": "Simulate real request/response execution cycles against the FinnApiGo authentication engine.",
  "project.finnapi.sim.endpoint_login": "POST /api/v1/auth/login",
  "project.finnapi.sim.endpoint_totp": "POST /api/v1/mfa/totp/verify",
  "project.finnapi.sim.endpoint_metrics": "GET /metrics",
  "project.finnapi.sim.send_btn": "Execute Request",
  "project.finnapi.sim.copied": "Copied curl command!",
  "project.finnapi.sim.copy_btn": "Copy cURL",
  "project.finnapi.sim.response_status": "Status",
  "project.finnapi.sim.response_latency": "Latency",
  "project.finnapi.sim.response_headers": "Security Headers",

  // FinnApiGo Security Hardening Matrix
  "project.finnapi.sec.title": "Defense-in-Depth Security Matrix",
  "project.finnapi.sec.subtitle": "Hardened mechanisms engineered to mitigate OWASP Top 10 API vulnerabilities.",
  "project.finnapi.sec.token_title": "Zero-Trust Token Lifecycle",
  "project.finnapi.sec.token_desc": "JWT access tokens paired with single-use refresh token rotation. Refresh tokens are stored exclusively as SHA-256 hashes in Redis; detecting reuse immediately revokes the entire token family.",
  "project.finnapi.sec.mfa_title": "MFA & Passkey Ecosystem",
  "project.finnapi.sec.mfa_desc": "TOTP (RFC 6238) with dynamic QR provisioning, single-use recovery codes encrypted with AES-256-GCM, and FIDO2/WebAuthn passkeys with sign-count clone detection.",
  "project.finnapi.sec.timing_title": "Defensive Credential Verification",
  "project.finnapi.sec.timing_desc": "Constant-time comparison prevents username enumeration timing attacks. BCrypt password inputs are capped at 72 bytes to prevent CPU starvation DoS. Passwords screened via HIBP API.",
  "project.finnapi.sec.abuse_title": "Anti-Abuse & Rate Limiting",
  "project.finnapi.sec.abuse_desc": "Redis-backed sliding-window rate limiter with progressive account lockouts. IPv6 addresses are collapsed into /64 subnets to prevent attackers rotating through ephemeral IPv6 pools.",
  "project.finnapi.sec.obs_title": "Structured Observability & Audit",
  "project.finnapi.sec.obs_desc": "High-performance structured slog JSON logging with automatic token/credential field redaction. Prometheus metrics exporter and async non-blocking audit trail.",
  "project.finnapi.sec.ci_title": "Automated Security CI Assurance",
  "project.finnapi.sec.ci_desc": "7-job GitHub Actions pipeline running gosec static security analysis, Trivy container vulnerability scanning, govulncheck, 3 fuzzing targets, and 14 CI coverage floors.",

  // Project Links
  "project.links.source": "View Source Code",
  "project.links.live": "Live Deployment (Render)",
  "project.links.docs": "Swagger / OpenAPI Docs",

  // Vovinam Thesis Project
  "project.vovinam.badge": "GRADUATION THESIS · IN ACTIVE DEVELOPMENT",
  "project.vovinam.title": "VovinamApiNode",
  "project.vovinam.tagline": "Club Management Backend & Verified QR Financial Engine",
  "project.vovinam.description": "Full-lifecycle management system for martial arts clubs, serving as the author's graduation thesis. Engineered with TypeScript & Node.js, featuring deny-by-default RBAC, member attendance tracking, and verified QR payment webhooks.",
  "project.vovinam.scope_title": "Core System Capabilities",
  "project.vovinam.scope_1": "Fine-grained Role-Based Access Control (Member, Instructor, Treasurer, Admin) with object-level authorization.",
  "project.vovinam.scope_2": "QR payment webhook integration with HMAC-SHA256 signature verification and automated ledger reconciliation.",
  "project.vovinam.scope_3": "Member roster, belt ranking promotion records, and coach assignment management.",
  "project.vovinam.scope_4": "Class scheduling, real-time attendance tracking, and automated capacity locking.",
  "project.vovinam.roadmap_title": "Interactive Delivery Roadmap",
  "project.vovinam.m1": "M1: Architecture & Threat Modeling",
  "project.vovinam.m1_detail": "Domain model ERD, OpenAPI 3.1 contract, STRIDE threat analysis.",
  "project.vovinam.m2": "M2: Infrastructure & CI Scaffold",
  "project.vovinam.m2_detail": "Docker Compose dev environment, PostgreSQL migrations, GitHub Actions CI.",
  "project.vovinam.m3": "M3: Identity & Access Layer",
  "project.vovinam.m3_detail": "Argon2id password hashing, JWT rotation, deny-by-default RBAC guard.",
  "project.vovinam.m4": "M4: Member & Scheduling Domain",
  "project.vovinam.m4_detail": "Belt tracking, attendance logs, class roster capacity enforcement.",
  "project.vovinam.m5": "M5: QR Billing & Reconciliation",
  "project.vovinam.m5_detail": "VietQR payment generation, webhook HMAC validation, idempotent ledger.",
  "project.vovinam.m6": "M6: Security Audit & Deployment",
  "project.vovinam.m6_detail": "k6 load testing, container hardening, operator runbook.",

  // Skills Section
  "skills.title": "Verified Technical Capabilities",
  "skills.subtitle": "Every listed skill is verified by concrete implementation in production or thesis repositories.",
  "skills.cat_backend": "Core Backend & Architecture",
  "skills.cat_db": "Database & Distributed Systems",
  "skills.cat_security": "Security Engineering & Cryptography",
  "skills.cat_devops": "DevOps, Testing & Quality Assurance",
  "skills.verified_by": "Verified in",

  // About Section
  "about.title": "Engineering Philosophy & Background",
  "about.quote": "In the era of AI-accelerated programming, a backend engineer's true value is systems architecture, threat modeling, and verifying that production code operates reliably under adversarial conditions.",
  "about.p1": "I am a senior university student preparing my graduation thesis with a rigorous focus on backend engineering and security. I believe high-quality engineering comes from understanding complete data flows, designing clean domain boundaries, and testing edge cases ruthlessly.",
  "about.p2": "My development workflow leverages AI tools as an always-on pair programmer: I conduct deep architectural research, model threat vectors, review generated code for subtle security flaws, and enforce automated tests before deploying to staging and production.",
  "about.strengths_title": "Core Engineering Strengths",
  "about.strengths_1": "End-to-End Systems Thinking: Designing scalable APIs with clean separation of concerns.",
  "about.strengths_2": "Vulnerability Analysis: Proactive mitigation of timing attacks, replay vectors, and race conditions.",
  "about.strengths_3": "Automated Quality Enforcement: Enforcing strict CI coverage floors, fuzzing, and container scans.",
  "about.strengths_4": "Fast Practical Execution: Learning frameworks rapidly through hands-on deployment and benchmarking.",
  "about.growth_title": "Active Technical Growth",
  "about.growth_1": "Deepening high-concurrency Go patterns (channels, goroutines, sync primitives).",
  "about.growth_2": "Advanced PostgreSQL optimization (indexes, partitioning, query planner analysis).",
  "about.growth_3": "Distributed consensus & message brokers (Kafka / RabbitMQ).",
  "about.growth_4": "Cloud-native Kubernetes deployments and service mesh configurations.",

  // Contact Section
  "contact.title": "Let's Build Reliable Systems Together",
  "contact.subtitle": "I am actively seeking Intern / Fresher Backend Developer opportunities in Hanoi or Remote.",
  "contact.email_btn": "Copy Email Address",
  "contact.email_copied": "Email copied to clipboard!",
  "contact.github_btn": "Explore GitHub Profile",

  // Footer
  "footer.text": "Crafted with precision, clean architecture, and verified engineering practices.",
  "footer.commit": "Build verified: Clean Architecture & Security Hardening."
};

export default en;
