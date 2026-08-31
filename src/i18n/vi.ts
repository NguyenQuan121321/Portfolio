const vi: Record<string, string> = {
  // Navigation
  "nav.status": "Sẵn sàng nhận vị trí Fresher / Intern Backend",
  "nav.projects": "Dự án Tiêu biểu",
  "nav.thesis": "Khóa luận Tốt nghiệp",
  "nav.skills": "Kỹ năng Đã Kiểm chứng",
  "nav.about": "Tư duy Kỹ thuật",
  "nav.contact": "Liên hệ",
  "lang.toggle": "EN",

  // Hero
  "hero.badge": "Kỹ sư Hệ thống Backend & Bảo mật",
  "hero.greeting": "Xin chào, tôi là",
  "hero.name": "Nguyễn Quân",
  "hero.headline": "Xây dựng Hệ thống Bền bỉ, Xác thực Đa tầng & Production APIs.",
  "hero.description": "Tập trung vào Clean Architecture, mã hóa bảo mật chuyên sâu và API hiệu năng cao với Go và Node.js. Xây dựng các hệ thống được kiểm chứng qua bộ test toàn diện và pipeline CI tự động.",
  "hero.cta.projects": "Khám phá Kiến trúc Hệ thống",
  "hero.cta.github": "Kho lưu trữ GitHub",
  "hero.cta.contact": "Liên hệ với tôi",

  // Telemetry Bar
  "telemetry.title": "THÔNG SỐ HỆ THỐNG TRỰC TIẾP",
  "telemetry.uptime": "Cam kết Uptime SLA",
  "telemetry.uptime_val": "99.98%",
  "telemetry.tests": "Bộ Test tự động",
  "telemetry.tests_val": "258 / 258 Vượt qua",
  "telemetry.ci": "CI Pipeline",
  "telemetry.ci_val": "7 Jobs Xanh",
  "telemetry.latency": "Độ trễ API p95",
  "telemetry.latency_val": "< 12ms",
  "telemetry.coverage": "Ngưỡng Coverage",
  "telemetry.coverage_val": "14 Quy tắc áp dụng",

  // FinnApiGo Flagship Project
  "project.finnapi.badge": "DỰ ÁN TIÊU BIỂU · PRODUCTION-GRADE GO BACKEND",
  "project.finnapi.title": "FinnApiGo",
  "project.finnapi.tagline": "Hệ thống Xác thực & Bảo mật Đa yếu tố viết bằng Go",
  "project.finnapi.description": "Hệ thống xác thực production-ready đang vận hành trên Render. Thiết kế theo Clean Architecture cách ly hoàn toàn domain logic khỏi framework, tích hợp JWT rotation nhận diện tái sử dụng, RFC 6238 TOTP, WebAuthn Passkeys và bảo mật phòng thủ chiều sâu.",
  
  // FinnApiGo Architecture Inspector
  "project.finnapi.arch.title": "Trình Khảo sát Clean Architecture Tương tác",
  "project.finnapi.arch.subtitle": "Nhấp vào từng ranh giới kiến trúc để xem chi tiết cam kết cách ly và quyết định kỹ thuật.",
  "project.finnapi.arch.layer_client": "Tầng Client",
  "project.finnapi.arch.layer_client_desc": "Các HTTP/2 REST client, ứng dụng di động và Single-Page App giao tiếp qua giao thức bảo mật TLS 1.3.",
  "project.finnapi.arch.layer_mw": "Pipeline Middleware",
  "project.finnapi.arch.layer_mw_desc": "Gắn header bảo mật (HSTS, CSP), giới hạn tốc độ trượt (Rate Limit) gom cụm subnet IPv6 /64 và xác thực CORS.",
  "project.finnapi.arch.layer_handlers": "Tầng Handlers (Giao vận)",
  "project.finnapi.arch.layer_handlers_desc": "Validate DTO nghiêm ngặt, chuẩn hóa payload và chuyển đổi giao thức HTTP sang Domain. Handler không bao giờ chạm trực tiếp vào DB.",
  "project.finnapi.arch.layer_services": "Tầng Service (Nghiệp vụ cốt lõi)",
  "project.finnapi.arch.layer_services_desc": "Logic nghiệp vụ độc lập framework. Cấm import Gin ở compile-time qua depguard. Xử lý token rotation, mật mã TOTP và phát sự kiện audit.",
  "project.finnapi.arch.layer_repo": "Tầng Repository (Truy xuất Dữ liệu)",
  "project.finnapi.arch.layer_repo_desc": "Truy vấn MySQL 8 an toàn transaction qua GORM và Redis 7 distributed cache lưu session cùng danh sách đen hash refresh token.",
  "project.finnapi.arch.depguard_note": "Cam kết cách ly Domain: Service layer độc lập 100% framework. Gin engine bị cấm triệt để khỏi service qua linter depguard trong CI.",

  // FinnApiGo Playground / Simulator
  "project.finnapi.sim.title": "API Playground Mô phỏng Trực tiếp",
  "project.finnapi.sim.subtitle": "Mô phỏng chu trình gửi request và phản hồi thực tế từ engine xác thực FinnApiGo.",
  "project.finnapi.sim.endpoint_login": "POST /api/v1/auth/login",
  "project.finnapi.sim.endpoint_totp": "POST /api/v1/mfa/totp/verify",
  "project.finnapi.sim.endpoint_metrics": "GET /metrics",
  "project.finnapi.sim.send_btn": "Gửi Request",
  "project.finnapi.sim.copied": "Đã sao chép lệnh curl!",
  "project.finnapi.sim.copy_btn": "Sao chép cURL",
  "project.finnapi.sim.response_status": "Trạng thái",
  "project.finnapi.sim.response_latency": "Độ trễ",
  "project.finnapi.sim.response_headers": "Security Headers",

  // FinnApiGo Security Hardening Matrix
  "project.finnapi.sec.title": "Ma trận Bảo mật Phòng thủ Chiều sâu",
  "project.finnapi.sec.subtitle": "Các cơ chế bảo mật nghiêm ngặt được thiết kế nhằm triệt tiêu lỗ hổng OWASP Top 10 API.",
  "project.finnapi.sec.token_title": "Vòng đời Token Zero-Trust",
  "project.finnapi.sec.token_desc": "JWT access token kết hợp xoay vòng refresh token dùng 1 lần. Refresh token chỉ lưu dưới dạng hash SHA-256 trong Redis; phát hiện tái sử dụng sẽ lập tức thu hồi toàn bộ token family.",
  "project.finnapi.sec.mfa_title": "Hệ sinh thái MFA & Passkey",
  "project.finnapi.sec.mfa_desc": "TOTP (RFC 6238) sinh mã QR động, mã phục hồi dùng 1 lần mã hóa AES-256-GCM, và passkey FIDO2/WebAuthn với cơ chế đếm sign-count phát hiện clone.",
  "project.finnapi.sec.timing_title": "Xác minh Thông tin Phòng vệ",
  "project.finnapi.sec.timing_desc": "So sánh thời gian hằng số (Constant-time) chống tấn công timing enumeration. Giới hạn mật khẩu BCrypt tối đa 72 bytes tránh DoS nghẽn CPU. Kiểm tra mật khẩu rò rỉ qua HIBP.",
  "project.finnapi.sec.abuse_title": "Chống Lạm dụng & Giới hạn Tốc độ",
  "project.finnapi.sec.abuse_desc": "Rate limiter cửa sổ trượt trên Redis kèm cơ chế khóa tài khoản lũy tiến. Gom cụm IPv6 về subnet /64 ngăn bot xoay IP vượt rào.",
  "project.finnapi.sec.obs_title": "Khả năng Quan sát & Audit Có cấu trúc",
  "project.finnapi.sec.obs_desc": "Logging JSON có cấu trúc hiệu năng cao với thư viện slog, tự động che trường nhạy cảm (token/credential). Exporter Prometheus và luồng ghi audit phi đồng bộ.",
  "project.finnapi.sec.ci_title": "Đảm bảo Bảo mật Tự động qua CI",
  "project.finnapi.sec.ci_desc": "Pipeline GitHub Actions 7 jobs chạy phân tích tĩnh gosec, quét lỗ hổng container Trivy, govulncheck, 3 fuzz target và 14 ngưỡng coverage bắt buộc.",

  // Project Links
  "project.links.source": "Xem Mã nguồn",
  "project.links.live": "Bản Triển khai Live (Render)",
  "project.links.docs": "Tài liệu Swagger / OpenAPI",

  // Vovinam Thesis Project
  "project.vovinam.badge": "KHÓA LUẬN TỐT NGHIỆP · ĐANG PHÁT TRIỂN",
  "project.vovinam.title": "VovinamApiNode",
  "project.vovinam.tagline": "Backend Quản lý CLB Võ thuật & Đối soát Tài chính QR Xác thực",
  "project.vovinam.description": "Hệ thống quản lý toàn diện cho CLB võ thuật phục vụ khóa luận tốt nghiệp của tác giả. Xây dựng bằng TypeScript & Node.js với phân quyền RBAC deny-by-default, điểm danh lớp học và đối soát webhook thanh toán QR.",
  "project.vovinam.scope_title": "Phạm vi & Tính năng Hệ thống",
  "project.vovinam.scope_1": "Phân quyền vai trò RBAC chi tiết (Võ sinh, Huấn luyện viên, Thủ quỹ, Quản trị) kiểm soát quyền mức object.",
  "project.vovinam.scope_2": "Tích hợp webhook thanh toán QR với xác thực chữ ký HMAC-SHA256 và tự động đối soát sổ cái kế toán.",
  "project.vovinam.scope_3": "Quản lý hồ sơ võ sinh, lịch sử thi thăng đai/cấp và phân công huấn luyện viên.",
  "project.vovinam.scope_4": "Xếp lịch học, điểm danh theo thời gian thực và tự động khóa sĩ số lớp khi đạt trần.",
  "project.vovinam.roadmap_title": "Lộ trình Thực hiện Tương tác",
  "project.vovinam.m1": "M1: Kiến trúc & Mô hình Đe dọa",
  "project.vovinam.m1_detail": "Mô hình ERD, hợp đồng OpenAPI 3.1, phân tích mối đe dọa STRIDE.",
  "project.vovinam.m2": "M2: Hạ tầng & Khung CI ban đầu",
  "project.vovinam.m2_detail": "Môi trường Docker Compose, migration PostgreSQL, GitHub Actions CI.",
  "project.vovinam.m3": "M3: Tầng Định danh & Phân quyền",
  "project.vovinam.m3_detail": "Băm mật khẩu Argon2id, JWT rotation, bảo vệ RBAC deny-by-default.",
  "project.vovinam.m4": "M4: Nghiệp vụ Võ sinh & Lớp học",
  "project.vovinam.m4_detail": "Theo dõi đai cấp, nhật ký điểm danh, giới hạn sĩ số lớp học.",
  "project.vovinam.m5": "M5: Thu phí & Đối soát QR",
  "project.vovinam.m5_detail": "Tạo mã VietQR, xác minh HMAC webhook, sổ cái đối soát bất biến.",
  "project.vovinam.m6": "M6: Đánh giá Bảo mật & Triển khai",
  "project.vovinam.m6_detail": "Kiểm thử tải k6, gia cố container bảo mật, tài liệu vận hành.",

  // Skills Section
  "skills.title": "Kỹ năng Kỹ thuật Đã Kiểm chứng",
  "skills.subtitle": "Mọi kỹ năng liệt kê đều được chứng minh qua dòng code thực tế trong dự án production hoặc khóa luận.",
  "skills.cat_backend": "Lập trình Backend & Kiến trúc",
  "skills.cat_db": "Cơ sở Dữ liệu & Hệ thống Phân tán",
  "skills.cat_security": "Kỹ thuật Bảo mật & Mật mã học",
  "skills.cat_devops": "DevOps, Testing & Đảm bảo Chất lượng",
  "skills.verified_by": "Kiểm chứng tại",

  // About Section
  "about.title": "Tư duy Kỹ thuật & Định hướng",
  "about.quote": "Trong kỷ nguyên lập trình được hỗ trợ bởi AI, giá trị cốt lõi của kỹ sư backend nằm ở tư duy kiến trúc hệ thống, phân tích rủi ro bảo mật và kiểm chứng code vận hành tin cậy dưới các kịch bản tấn công thực tế.",
  "about.p1": "Tôi là sinh viên năm cuối đang chuẩn bị khóa luận tốt nghiệp với trọng tâm nghiên cứu sâu về kỹ thuật backend và an toàn hệ thống. Tôi tin rằng chất lượng kỹ thuật đến từ việc hiểu rõ luồng dữ liệu, ranh giới domain rõ ràng và kiên trì kiểm thử các trường hợp biên.",
  "about.p2": "Quy trình phát triển của tôi kết hợp công cụ AI như một người bạn lập trình cặp (pair programmer): tôi nghiên cứu sâu kiến trúc, phân tích vector tấn công, rà soát lỗi bảo mật tinh vi trong code do AI sinh ra và viết test tự động trước khi triển khai.",
  "about.strengths_title": "Thế mạnh Kỹ thuật Cốt lõi",
  "about.strengths_1": "Tư duy Hệ thống Toàn diện: Thiết kế API mở rộng tốt với sự phân tách trách nhiệm rõ ràng.",
  "about.strengths_2": "Phân tích Lỗ hổng: Chủ động ngăn ngừa tấn công timing, replay token và race condition.",
  "about.strengths_3": "Áp dụng Chất lượng Tự động: Thiết lập các ngưỡng coverage CI khắt khe, fuzzing và quét container.",
  "about.strengths_4": "Thực thi Nhanh chóng: Tiếp thu framework mới qua việc triển khai thực tế và đo lường benchmark.",
  "about.growth_title": "Định hướng Phát triển",
  "about.growth_1": "Đào sâu các pattern lập trình đồng thời hiệu năng cao trong Go (channels, goroutines, sync).",
  "about.growth_2": "Tối ưu hóa PostgreSQL nâng cao (indexing, partitioning, phân tích query planner).",
  "about.growth_3": "Cơ chế đồng thuận phân tán & Message broker (Kafka / RabbitMQ).",
  "about.growth_4": "Triển khai Kubernetes cloud-native và cấu hình service mesh.",

  // Contact Section
  "contact.title": "Cùng Xây dựng Các Hệ thống Bền vững",
  "contact.subtitle": "Tôi đang tích cực tìm kiếm cơ hội Fresher / Intern Backend Developer tại Hà Nội hoặc Remote.",
  "contact.email_btn": "Sao chép Địa chỉ Email",
  "contact.email_copied": "Đã sao chép email vào clipboard!",
  "contact.github_btn": "Xem Trang Cá nhân GitHub",

  // Footer
  "footer.text": "Được thiết kế tỉ mỉ, tuân thủ Clean Architecture và các tiêu chuẩn kỹ thuật nghiêm ngặt.",
  "footer.commit": "Kiểm chứng: Clean Architecture & Gia cố Bảo mật."
};

export default vi;
