const en: Record<string, string> = {
  // Navigation
  "nav.status": "Available for Fresher / Intern Backend Roles",
  "nav.projects": "Projects",
  "nav.skills": "Skills & Technologies",
  "nav.about": "About Me",
  "nav.contact": "Contact",
  "lang.toggle": "VI",

  // Hero
  "hero.badge": "Backend Developer · Go & Node.js",
  "hero.greeting": "Hello, I am",
  "hero.name": "Nguyen Hoang Anh Quan",
  "hero.headline": "Building Robust Backend Systems, Multi-Factor Auth & Scalable APIs.",
  "hero.description": "Final-year student specializing in Go and Node.js backend development. Focused on Clean Architecture, multi-factor security mechanisms (JWT rotation, TOTP, Passkeys), and automated testing.",
  "hero.cta.projects": "Explore Project & Try API",
  "hero.cta.github": "GitHub Profile",
  "hero.cta.contact": "Contact Me",

  // Telemetry Bar
  "telemetry.title": "LIVE SYSTEM METRICS ON RENDER",
  "telemetry.uptime": "Live Status",
  "telemetry.uptime_val": "Online (Render)",
  "telemetry.tests": "Automated Tests",
  "telemetry.tests_val": "258 Test Cases",
  "telemetry.ci": "CI Pipeline",
  "telemetry.ci_val": "7 Automated Jobs",
  "telemetry.latency": "Response Latency",
  "telemetry.latency_val": "< 20ms",
  "telemetry.coverage": "Security Scans",
  "telemetry.coverage_val": "gosec & Trivy",

  // FinnApiGo Flagship Project
  "project.finnapi.badge": "DEPLOYED PROJECT · GOLANG BACKEND",
  "project.finnapi.title": "FinnApiGo",
  "project.finnapi.tagline": "Authentication & Multi-Factor Security Engine in Go",
  "project.finnapi.description": "Complete production backend deployed live on Render. Built with Clean Architecture to ensure separation of concerns, featuring JWT rotation, TOTP 2FA (RFC 6238), WebAuthn Passkeys, and defense-in-depth security mitigations.",
  
  // FinnApiGo Architecture Inspector
  "project.finnapi.arch.title": "Clean Architecture & Layer Breakdown",
  "project.finnapi.arch.subtitle": "Click each architectural boundary to inspect layer responsibilities and code organization.",
  "project.finnapi.arch.layer_client": "Client Layer",
  "project.finnapi.arch.layer_client_desc": "Web and Mobile clients sending HTTP requests with security headers over TLS 1.3.",
  "project.finnapi.arch.layer_mw": "Middleware Pipeline",
  "project.finnapi.arch.layer_mw_desc": "Handles sliding-window rate limiting with IPv6 /64 collapse, secure CORS configuration, structured request logging, and security headers injection (HSTS, CSP).",
  "project.finnapi.arch.layer_handlers": "Handlers (Controller Layer)",
  "project.finnapi.arch.layer_handlers_desc": "Receives requests from Gin Router, validates DTO inputs, invokes Service layer methods, and formats standard JSON responses. Strictly contains zero business logic.",
  "project.finnapi.arch.layer_services": "Services (Domain Core)",
  "project.finnapi.arch.layer_services_desc": "Contains core business logic, secure password hashing, TOTP generation, and JWT rotation. Completely framework-agnostic (Gin imports strictly prohibited via depguard).",
  "project.finnapi.arch.layer_repo": "Repository (Data Access)",
  "project.finnapi.arch.layer_repo_desc": "Performs transactional MySQL 8 queries via GORM and connects to Redis 7 for distributed session management, rate limiting, and refresh token blacklisting.",
  "project.finnapi.arch.depguard_note": "Domain Isolation Guarantee: Service layer is 100% framework-independent. Gin engine is strictly banned from services via CI depguard linter rules.",

  // FinnApiGo Playground / Simulator
  "project.finnapi.sim.title": "Live Interactive Render API Console",
  "project.finnapi.sim.subtitle": "Send real live HTTP requests to the Golang backend deployed on Render at finnapigo.onrender.com:",
  "project.finnapi.sim.tab_register": "1. Register (POST /register)",
  "project.finnapi.sim.tab_login": "2. Login (POST /login)",
  "project.finnapi.sim.tab_profile": "3. Get Profile (GET /me)",
  "project.finnapi.sim.tab_metrics": "4. Prometheus Metrics (GET /metrics)",
  "project.finnapi.sim.input_username": "Username",
  "project.finnapi.sim.input_fullname": "Full Name",
  "project.finnapi.sim.input_email": "Email Address",
  "project.finnapi.sim.input_password": "Password (HIBP Breach Check)",
  "project.finnapi.sim.input_token": "JWT Access Token from Login",
  "project.finnapi.sim.use_demo": "Fill Demo Data",
  "project.finnapi.sim.send_btn": "Execute Live Request",
  "project.finnapi.sim.copied": "cURL Copied!",
  "project.finnapi.sim.copy_btn": "Copy cURL",
  "project.finnapi.sim.response_status": "Response Code",
  "project.finnapi.sim.response_latency": "Roundtrip Latency",
  "project.finnapi.sim.response_headers": "Security Headers from Render",
  "project.finnapi.sim.note_real_api": "Live Render Server:",

  // FinnApiGo Security Hardening Matrix
  "project.finnapi.sec.title": "Defense-in-Depth Security Matrix",
  "project.finnapi.sec.subtitle": "Concrete security mechanisms implemented in source code:",
  "project.finnapi.sec.token_title": "Zero-Trust Token Lifecycle",
  "project.finnapi.sec.token_desc": "Short-lived JWT access tokens paired with single-use refresh token rotation. Refresh tokens are stored as SHA-256 hashes in Redis; reuse detection immediately revokes the token family.",
  "project.finnapi.sec.mfa_title": "MFA & Passkey Ecosystem",
  "project.finnapi.sec.mfa_desc": "RFC 6238 TOTP with dynamic QR provisioning, AES-256-GCM encrypted single-use recovery codes, and FIDO2/WebAuthn Passkeys with clone detection.",
  "project.finnapi.sec.timing_title": "Defensive Credential Verification",
  "project.finnapi.sec.timing_desc": "Constant-time comparison prevents timing enumeration attacks. BCrypt password inputs are capped at 72 bytes to prevent CPU starvation DoS. Passwords screened via HIBP API.",
  "project.finnapi.sec.abuse_title": "Anti-Abuse & Rate Limiting",
  "project.finnapi.sec.abuse_desc": "Redis-backed sliding-window rate limiter with progressive account lockouts. IPv6 addresses are collapsed into /64 subnets to prevent bot rotation.",
  "project.finnapi.sec.obs_title": "Structured Observability & Audit",
  "project.finnapi.sec.obs_desc": "High-performance structured slog JSON logging with automatic token/credential field redaction. Prometheus metrics exporter and async non-blocking audit trail.",
  "project.finnapi.sec.ci_title": "Automated Security CI Assurance",
  "project.finnapi.sec.ci_desc": "7-job GitHub Actions pipeline running gosec static security analysis, Trivy container vulnerability scanning, govulncheck, 3 fuzzing targets, and 14 CI coverage floors.",

  // Project Links
  "project.links.source": "GitHub Source Code",
  "project.links.live": "Live Deployment (Render)",
  "project.links.docs": "Swagger OpenAPI Docs",

  // Skills Section
  "skills.title": "Practical Skills & Stack",
  "skills.subtitle": "Technologies actively applied and verified through concrete implementation:",
  "skills.cat_backend": "Core Backend & Architecture",
  "skills.cat_db": "Databases & Caching",
  "skills.cat_security": "Security & Authentication",
  "skills.cat_devops": "DevOps, CI/CD & Testing",
  "skills.verified_by": "Implemented in",

  // About Section
  "about.title": "About Me & Engineering Focus",
  "about.p1": "I am a final-year Computer Science student pursuing a career as a Backend Developer. My primary focus is on Golang, RESTful API design, database optimization, and implementing hardened authentication architectures.",
  "about.p2": "When building systems, I prioritize understanding how things work under the hood: from cryptographic password hashing and token lifecycle management to structuring Clean Architecture so code remains modular and testable. I actively integrate Docker, GitHub Actions, and Prometheus into my daily development workflow.",
  "about.p3": "I utilize AI tools pragmatically to accelerate lookups and scaffolding, but I always review business logic, verify security boundaries, and write automated tests to ensure production reliability.",
  "about.strengths_title": "Key Strengths",
  "about.strengths_1": "Solid grasp of data flow and Clean Architecture organization in Go.",
  "about.strengths_2": "Hands-on experience implementing multi-factor auth, JWT rotation, and API rate limiting.",
  "about.strengths_3": "Proactive writing of Unit & Integration tests and setting up CI automation.",
  "about.strengths_4": "Fast learner, receptive to feedback, and passionate about software craft.",
  "about.growth_title": "Active Learning Goals",
  "about.growth_1": "Deepening high-concurrency Go patterns (channels, goroutines, sync primitives).",
  "about.growth_2": "Advanced PostgreSQL and MySQL query optimization and indexing strategies.",
  "about.growth_3": "Exploring Microservices architectures and Message Queues (RabbitMQ, Kafka).",
  "about.growth_4": "Getting hands-on with container orchestration on Kubernetes.",

  // Contact Section
  "contact.title": "Get in Touch",
  "contact.subtitle": "Seeking Intern / Fresher Backend Developer opportunities in Dong Nai, Viet Nam or Remote",
  "contact.email_btn": "Copy Email Address",
  "contact.email_copied": "Email copied to clipboard!",
  "contact.github_btn": "View GitHub Profile",

  // Footer
  "footer.text": "Nguyen Hoang Anh Quan — Backend Developer Portfolio.",
  "footer.commit": "FinnApiGo live deployment on Render."
};

export default en;
