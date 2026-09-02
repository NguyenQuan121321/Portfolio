// Go Backend AI Service & Smart Fallback Mock Engine (TypeScript)
import { GoBackendChatRequest, GoBackendChatResponse } from '../types';

export class AIService {
  private backendUrl: string;
  private sessionId: string;

  constructor(backendUrl: string = '') {
    this.backendUrl = backendUrl.replace(/\/$/, '');
    this.sessionId = this.getOrCreateSessionId();
  }

  public setBackendUrl(url: string): void {
    this.backendUrl = url.replace(/\/$/, '');
  }

  public getSessionId(): string {
    return this.sessionId;
  }

  private getOrCreateSessionId(): string {
    if (typeof window === 'undefined') return 'jake-ssr-' + Date.now();
    try {
      let id = window.sessionStorage.getItem('jakeai_session_id');
      if (!id) {
        id = 'jake-' + Math.random().toString(36).substring(2, 10) + '-' + Date.now();
        window.sessionStorage.setItem('jakeai_session_id', id);
      }
      return id;
    } catch {
      return 'jake-sess-' + Date.now();
    }
  }

  /**
   * Send chat message to the Go backend API or mock engine
   */
  public async sendMessage(userMessage: string, currentLang: string = 'vi'): Promise<string> {
    if (this.backendUrl) {
      try {
        const payload: GoBackendChatRequest = {
          message: userMessage,
          sessionId: this.sessionId
        };

        const res = await fetch(`${this.backendUrl}/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          throw new Error(`Backend responded with HTTP status ${res.status}`);
        }

        const data = (await res.json()) as GoBackendChatResponse;
        return data.response || data.reply || data.message || JSON.stringify(data);
      } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : String(err);
        console.warn('[JakeAI] Go Backend request failed, switching to local agent:', errorMsg);
      }
    }

    // Fallback to local intelligent mock agent with bilingual support
    return this.generateMockResponse(userMessage, currentLang);
  }

  /**
   * Built-in intelligent response engine tailored for portfolio projects
   */
  private generateMockResponse(query: string, currentLang: string = 'vi'): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const q = query.toLowerCase();

        // 1. Technical Stack & Skills
        if (q.includes('kỹ năng') || q.includes('skill') || q.includes('stack') || q.includes('công nghệ') || q.includes('tech') || q.includes('golang') || q.includes('node')) {
          if (currentLang === 'vi') {
            resolve(
              "Quân có thế mạnh chuyên sâu về **Backend Development & Security Systems**:\n\n" +
              "• **Ngôn ngữ**: Golang (1.23+), Node.js / TypeScript, Python.\n" +
              "• **Kiến trúc & Hệ thống**: Clean Architecture (5 tầng), RESTful APIs, Domain-Driven Design.\n" +
              "• **Bảo mật**: JWT Rotation (SHA-256 Redis hash), TOTP 2FA (RFC 6238), WebAuthn Passkeys, Rate Limiting (Sliding Window), Constant-Time Auth.\n" +
              "• **Database & Caching**: PostgreSQL 16, MySQL 8, Redis 7 (Distributed session & token storage).\n" +
              "• **DevOps & Testing**: Docker, GitHub Actions CI (301 test cases, fuzzing, gosec, Trivy), Prometheus metrics."
            );
          } else {
            resolve(
              "Quan specializes in **Backend Development & Security Engineering**:\n\n" +
              "• **Core Languages**: Golang (1.23+), Node.js / TypeScript, Python.\n" +
              "• **Architecture**: Clean Architecture (5-layer strict separation), RESTful APIs, Domain-Driven Design.\n" +
              "• **Security Systems**: Single-use JWT Rotation with SHA-256 Redis token family hashing, TOTP 2FA (RFC 6238), WebAuthn Passkeys, Sliding Window Rate Limiting.\n" +
              "• **Databases & Cache**: PostgreSQL 16, MySQL 8 (GORM transactions), Redis 7 (Distributed caching & blacklists).\n" +
              "• **DevOps & CI/CD**: Docker, GitHub Actions CI (301 unit tests, fuzzing, gosec, Trivy), Prometheus observability."
            );
          }
          return;
        }

        // 2. FinnApiGo Flagship Project
        if (q.includes('finnapi') || q.includes('finn') || q.includes('dự án') || q.includes('project') || q.includes('render')) {
          if (currentLang === 'vi') {
            resolve(
              "📈 **FinnApiGo** là dự án backend trọng điểm của Quân đã triển khai production trên Render (https://finnapigo.onrender.com):\n\n" +
              "1. **Clean Architecture**: Tách bạch 5 tầng (Middleware → Handlers → Services → Repositories → Domain), không phụ thuộc framework.\n" +
              "2. **Bảo mật nâng cao**: Token Family Revocation tự động hủy chuỗi token khi phát hiện token cũ bị tái sử dụng; Rate limit phân tầng theo IP /64 subnet.\n" +
              "3. **Kiểm thử thực tế**: Bạn có thể bấm nút **'Gửi Request Thật'** ở Hero Terminal để kiểm tra độ trễ mạng thực tế!"
            );
          } else {
            resolve(
              "📈 **FinnApiGo** is Quan's flagship production backend deployed live on Render (https://finnapigo.onrender.com):\n\n" +
              "1. **Clean Architecture**: Strict 5-layer separation with zero framework leak into core domain business rules.\n" +
              "2. **Production Security**: Token Family Revocation defending against stolen refresh tokens, Redis sliding-window rate limiting.\n" +
              "3. **Live Verified**: You can click **'Run Live'** in the Hero Terminal to test live response times!"
            );
          }
          return;
        }

        // 3. Vovinam Project
        if (q.includes('vovinam') || q.includes('martial') || q.includes('võ') || q.includes('đai')) {
          if (currentLang === 'vi') {
            resolve(
              "🥋 **VovinamApiNode** là hệ thống REST API chuyên biệt cho môn phái Vovinam Việt Võ Đạo xây dựng bằng **Node.js & Express**:\n\n" +
              "• Cơ sở dữ liệu kỹ thuật đầy đủ (đòn chân tấn công, thế khóa gỡ, quyền pháp).\n" +
              "• Lộ trình thi lên đai & chương trình huấn luyện chuẩn hóa JSON Schema."
            );
          } else {
            resolve(
              "🥋 **VovinamApiNode** is a specialized REST API system for Vovinam Martial Arts built with **Node.js & Express**:\n\n" +
              "• Complete technique database (leg scissor attacks, counters, forms).\n" +
              "• Standardized belt ranking curricula and tournament scoring schemas."
            );
          }
          return;
        }

        // 4. Role & Career Orientation
        if (q.includes('vị trí') || q.includes('role') || q.includes('job') || q.includes('định hướng') || q.includes('fresher') || q.includes('intern') || q.includes('tuyển dụng')) {
          if (currentLang === 'vi') {
            resolve(
              "Quân hiện là sinh viên năm cuối Công nghệ Thông tin, đang tìm kiếm cơ hội **Fresher / Junior / Intern Backend Developer (Golang hoặc Node.js)** tại **Đồng Nai, TP. Hồ Chí Minh** hoặc làm việc **Remote**.\n\nQuân sẵn sàng tiếp nhận công việc ngay và có tinh thần tự học, nghiên cứu sâu!"
            );
          } else {
            resolve(
              "Quan is a final-year IT student actively seeking **Fresher / Junior / Intern Backend Developer (Golang / Node.js)** opportunities in **Dong Nai, Ho Chi Minh City**, or **Remote**.\n\nHe is ready to join immediately with strong problem-solving and self-learning capabilities!"
            );
          }
          return;
        }

        // 5. Contact & Interview Scheduling
        if (q.includes('liên hệ') || q.includes('contact') || q.includes('email') || q.includes('phỏng vấn') || q.includes('interview') || q.includes('linkedin') || q.includes('sđt') || q.includes('phone') || q.includes('cv')) {
          if (currentLang === 'vi') {
            resolve(
              "Bạn có thể liên hệ trực tiếp với Quân qua:\n\n" +
              "• **Email**: nguyenhoanganhquan13@gmail.com\n" +
              "• **LinkedIn**: https://www.linkedin.com/in/qu%C3%A2n-nguy%E1%BB%85n-bb2053433/\n" +
              "• **GitHub**: https://github.com/NguyenQuan121321\n" +
              "• **Địa điểm**: Đồng Nai, TP.HCM hoặc Remote.\n\n" +
              "Bạn cũng có thể bấm nút **'Tải CV (PDF)'** ở đầu trang để xem bản hồ sơ chi tiết!"
            );
          } else {
            resolve(
              "You can reach out to Quan directly via:\n\n" +
              "• **Email**: nguyenhoanganhquan13@gmail.com\n" +
              "• **LinkedIn**: https://www.linkedin.com/in/qu%C3%A2n-nguy%E1%BB%85n-bb2053433/\n" +
              "• **GitHub**: https://github.com/NguyenQuan121321\n" +
              "• **Location**: Dong Nai, Ho Chi Minh City, or Remote.\n\n" +
              "You can also click **'Download CV (PDF)'** at the top of the page for his complete resume!"
            );
          }
          return;
        }

        // Default greeting / info
        if (currentLang === 'vi') {
          resolve(
            "Tôi là **Jake** — Portfolio Hub Agent của **Nguyễn Hoàng Anh Quân**!\n\n" +
            "Tôi được kết nối trực tiếp với backend **Go (Golang)** (tại github.com/NguyenQuan121321/JakeAI) để hỗ trợ bạn tìm hiểu về các dự án thực tế, kỹ năng chuyên sâu và thông tin liên hệ của Quân."
          );
        } else {
          resolve(
            "I am **Jake** — Quan's **Portfolio Hub Agent**!\n\n" +
            "I am connected to a dedicated **Go (Golang)** backend (at github.com/NguyenQuan121321/JakeAI) to help you explore Quan's real-world projects, core backend skills, and interview scheduling."
          );
        }
      }, 350 + Math.random() * 200);
    });
  }
}
