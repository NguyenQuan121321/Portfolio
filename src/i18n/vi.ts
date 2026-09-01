const vi: Record<string, string> = {
  // Navigation
  "nav.status": "Sẵn sàng nhận việc Fresher / Intern Backend",
  "nav.projects": "Dự án",
  "nav.skills": "Kỹ năng & Công nghệ",
  "nav.about": "Về tôi",
  "nav.contact": "Liên hệ",
  "lang.toggle": "EN",

  // Hero
  "hero.badge": "Backend Developer · Go & Node.js",
  "hero.greeting": "Xin chào, tôi là",
  "hero.name": "Nguyễn Hoàng Anh Quân",
  "hero.headline": "Xây dựng Hệ thống Backend, Xác thực Đa tầng & API Hiệu năng cao.",
  "hero.description": "Sinh viên năm cuối tập trung chuyên sâu vào lập trình backend với Go và Node.js. Chú trọng kiến trúc Clean Architecture, cơ chế bảo mật xác thực (JWT rotation, TOTP, Passkeys) và viết test tự động.",
  "hero.cta.projects": "Xem Dự án & Thử API",
  "hero.cta.github": "GitHub Cá nhân",
  "hero.cta.contact": "Liên hệ",

  // Telemetry Bar
  "telemetry.title": "THÔNG SỐ HỆ THỐNG TRÊN RENDER",
  "telemetry.uptime": "Trạng thái Live",
  "telemetry.uptime_val": "Online (Render)",
  "telemetry.tests": "Hàm Test Tự động",
  "telemetry.tests_val": "258 Test Cases",
  "telemetry.ci": "CI Pipeline",
  "telemetry.ci_val": "7 Jobs Tự động",
  "telemetry.latency": "Độ trễ phản hồi",
  "telemetry.latency_val": "< 20ms",
  "telemetry.coverage": "Kiểm thử bảo mật",
  "telemetry.coverage_val": "gosec & Trivy",

  // FinnApiGo Flagship Project
  "project.finnapi.badge": "DỰ ÁN ĐÃ DEPLOY · GOLANG BACKEND",
  "project.finnapi.title": "FinnApiGo",
  "project.finnapi.tagline": "Hệ thống Xác thực & Bảo mật API Đa yếu tố viết bằng Go",
  "project.finnapi.description": "Dự án backend hoàn chỉnh đã triển khai thực tế trên Render. Áp dụng Clean Architecture để phân tách ranh giới rõ ràng, tích hợp đầy đủ JWT rotation, TOTP 2FA (RFC 6238), WebAuthn Passkeys và các lớp bảo vệ chống tấn công phổ biến.",
  
  // FinnApiGo Architecture Inspector
  "project.finnapi.arch.title": "Mô hình Clean Architecture & Phân tầng",
  "project.finnapi.arch.subtitle": "Nhấp vào từng tầng để xem nguyên tắc phân tách trách nhiệm và cách tổ chức mã nguồn.",
  "project.finnapi.arch.layer_client": "Tầng Client",
  "project.finnapi.arch.layer_client_desc": "Các client Web, Mobile gửi HTTP request kèm header bảo mật qua giao thức TLS 1.3.",
  "project.finnapi.arch.layer_mw": "Tầng Middleware",
  "project.finnapi.arch.layer_mw_desc": "Xử lý Rate Limiter (bảo vệ DoS với IPv6 /64 collapse), cấu hình CORS an toàn, ghi nhận log request và chèn header bảo mật (HSTS, CSP).",
  "project.finnapi.arch.layer_handlers": "Tầng Handlers (Controller)",
  "project.finnapi.arch.layer_handlers_desc": "Tiếp nhận request từ Gin Router, validate DTO đầu vào, chuyển tiếp sang Service và định dạng response JSON chuẩn. Tuyệt đối không chứa logic nghiệp vụ.",
  "project.finnapi.arch.layer_services": "Tầng Services (Domain Core)",
  "project.finnapi.arch.layer_services_desc": "Chứa toàn bộ logic nghiệp vụ cốt lõi, băm mật khẩu an toàn, sinh mã TOTP, xoay vòng JWT. Tầng này hoàn toàn độc lập framework (cấm import Gin qua depguard).",
  "project.finnapi.arch.layer_repo": "Tầng Repository (Data)",
  "project.finnapi.arch.layer_repo_desc": "Thao tác với MySQL 8 qua GORM (transaction an toàn) và kết nối Redis 7 để lưu trữ session, rate limiting và danh sách đen refresh token.",
  "project.finnapi.arch.depguard_note": "Quy tắc kiểm tra tự động: Cấm tuyệt đối import framework Gin vào tầng Service qua công cụ depguard linter trong CI.",

  // FinnApiGo Playground / Simulator
  "project.finnapi.sim.title": "API Playground Kết nối Trực tiếp Render Server",
  "project.finnapi.sim.subtitle": "Gửi request HTTP thực tế tới backend Golang đang host trên Render tại finnapigo.onrender.com:",
  "project.finnapi.sim.tab_register": "1. Đăng ký (POST /register)",
  "project.finnapi.sim.tab_login": "2. Đăng nhập (POST /login)",
  "project.finnapi.sim.tab_profile": "3. Lấy Profile (GET /me)",
  "project.finnapi.sim.tab_metrics": "4. Prometheus Metrics (GET /metrics)",
  "project.finnapi.sim.input_username": "Tên đăng nhập (Username)",
  "project.finnapi.sim.input_fullname": "Họ và tên (Full Name)",
  "project.finnapi.sim.input_email": "Địa chỉ Email",
  "project.finnapi.sim.input_password": "Mật khẩu (Kiểm tra rò rỉ HIBP)",
  "project.finnapi.sim.input_token": "JWT Access Token từ bước Login",
  "project.finnapi.sim.use_demo": "Điền dữ liệu mẫu",
  "project.finnapi.sim.send_btn": "Thực thi Request Live",
  "project.finnapi.sim.copied": "Đã sao chép cURL!",
  "project.finnapi.sim.copy_btn": "Sao chép cURL",
  "project.finnapi.sim.response_status": "Mã phản hồi",
  "project.finnapi.sim.response_latency": "Độ trễ Roundtrip",
  "project.finnapi.sim.response_headers": "Header bảo mật trả về từ Render",
  "project.finnapi.sim.note_real_api": "Live Render Server:",

  // FinnApiGo Security Hardening Matrix
  "project.finnapi.sec.title": "Các Cơ chế Bảo mật & Gia cố Hệ thống",
  "project.finnapi.sec.subtitle": "Các giải pháp kỹ thuật cụ thể được triển khai trực tiếp trong mã nguồn:",
  "project.finnapi.sec.token_title": "Vòng đời Token & Chống Replay",
  "project.finnapi.sec.token_desc": "JWT access token ngắn hạn kết hợp refresh token xoay vòng một lần. Refresh token được băm SHA-256 lưu trong Redis; nếu phát hiện token cũ tái sử dụng sẽ lập tức thu hồi toàn bộ phiên.",
  "project.finnapi.sec.mfa_title": "Bảo mật 2 Lớp (TOTP & Passkeys)",
  "project.finnapi.sec.mfa_desc": "Mã xác thực TOTP (RFC 6238) tích hợp mã QR, hỗ trợ mã khôi phục dự phòng mã hóa AES-256-GCM và chuẩn FIDO2/WebAuthn Passkey chống lừa đảo.",
  "project.finnapi.sec.timing_title": "Chống Dò mật khẩu & Tấn công Timing",
  "project.finnapi.sec.timing_desc": "So sánh thông tin đăng nhập thời gian không đổi (constant-time) ngăn chặn dò user. Giới hạn độ dài mật khẩu BCrypt tối đa 72 bytes tránh nghẽn CPU và tra cứu rò rỉ qua HIBP.",
  "project.finnapi.sec.abuse_title": "Chống Brute-force & Rate Limiting",
  "project.finnapi.sec.abuse_desc": "Cơ chế giới hạn tốc độ cửa sổ trượt (Sliding Window) qua Redis, khóa tài khoản tạm thời khi nhập sai nhiều lần và gom cụm subnet IPv6 /64 chống xoay IP botnet.",
  "project.finnapi.sec.obs_title": "Logging Có cấu trúc & Quan sát",
  "project.finnapi.sec.obs_desc": "Ghi log JSON có cấu trúc bằng thư viện chuẩn slog, tự động ẩn (mask) mật khẩu và token. Xuất dữ liệu metric Prometheus và ghi vết audit bất đồng bộ.",
  "project.finnapi.sec.ci_title": "Kiểm thử Toàn diện qua CI/CD",
  "project.finnapi.sec.ci_desc": "Pipeline GitHub Actions 7 jobs tự động: chạy 258 unit tests, 3 fuzzing tests, kiểm thử bảo mật gosec, rà soát lỗ hổng thư viện govulncheck và quét container Trivy.",

  // Project Links
  "project.links.source": "Mã nguồn GitHub",
  "project.links.live": "Trang Web Render (Live)",
  "project.links.docs": "Tài liệu API Swagger",

  // Skills Section
  "skills.title": "Kỹ năng & Công nghệ Thực tế",
  "skills.subtitle": "Các công nghệ đã trực tiếp áp dụng và kiểm chứng qua dự án thực tế:",
  "skills.cat_backend": "Lập trình Backend & Kiến trúc",
  "skills.cat_db": "Cơ sở Dữ liệu & Caching",
  "skills.cat_security": "Kỹ thuật Bảo mật & Xác thực",
  "skills.cat_devops": "DevOps, CI/CD & Testing",
  "skills.verified_by": "Áp dụng tại",

  // About Section
  "about.title": "Về bản thân & Định hướng",
  "about.p1": "Tôi là sinh viên năm cuối chuyên ngành Công nghệ Thông tin, định hướng phát triển sự nghiệp ở vị trí Backend Developer. Tôi tập trung nhiều vào Golang, thiết kế RESTful API, tối ưu hóa cơ sở dữ liệu và xây dựng các cơ chế xác thực an toàn.",
  "about.p2": "Trong quá trình học và làm dự án, tôi thích tìm hiểu bản chất cách hoạt động của hệ thống: từ cách mã hóa mật khẩu, cơ chế xoay vòng token, đến việc phân tách Clean Architecture sao cho code dễ bảo trì và dễ viết test. Tôi chủ động áp dụng các công cụ hiện đại (như Docker, GitHub Actions, Prometheus) để quy trình phát triển và kiểm thử được tự động hóa.",
  "about.p3": "Tôi sử dụng các công cụ AI một cách thực tế để hỗ trợ tra cứu và tăng tốc độ code, nhưng luôn tự mình kiểm tra lại logic, rà soát bảo mật và viết test thực tế để đảm bảo hệ thống chạy đúng và ổn định.",
  "about.strengths_title": "Điểm mạnh trong công việc",
  "about.strengths_1": "Nắm vững luồng xử lý dữ liệu và cấu trúc Clean Architecture trong Go.",
  "about.strengths_2": "Hiểu rõ và biết cách triển khai các giải pháp bảo mật API cơ bản đến nâng cao (JWT, TOTP, Rate limit).",
  "about.strengths_3": "Chủ động viết Unit Test, Integration Test và thiết lập pipeline CI tự động.",
  "about.strengths_4": "Tinh thần học hỏi nhanh, sẵn sàng tiếp thu công nghệ mới và tiếp thu feedback.",
  "about.growth_title": "Mục tiêu đang tiếp tục trau dồi",
  "about.growth_1": "Đào sâu hơn các kỹ thuật xử lý đồng thời (Concurrency, Goroutines, Channels) trong Go.",
  "about.growth_2": "Học hỏi và tối ưu hóa truy vấn nâng cao trên PostgreSQL và MySQL.",
  "about.growth_3": "Tìm hiểu kiến trúc Microservices và các hệ thống Message Queue (RabbitMQ, Kafka).",
  "about.growth_4": "Làm quen với việc vận hành container trên môi trường Kubernetes.",

  // Contact Section
  "contact.title": "Liên hệ với tôi",
  "contact.subtitle": "Tìm kiếm cơ hội thực tập / Fresher Backend Developer tại Đồng Nai, TP.HCM hoặc Remote",
  "contact.email_btn": "Sao chép Email",
  "contact.email_copied": "Đã sao chép email!",
  "contact.github_btn": "Xem GitHub Cá nhân",

  // Footer
  "footer.text": "Nguyễn Hoàng Anh Quân — Backend Developer Portfolio.",
  "footer.commit": "Dự án FinnApiGo đã triển khai trên Render."
};

export default vi;
