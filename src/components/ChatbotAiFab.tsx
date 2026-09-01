import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  X, 
  PaperPlaneRight, 
  Trash, 
  User, 
  Broadcast,
  GithubLogo
} from '@phosphor-icons/react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const ChatbotAiFab: React.FC = () => {
  const { t, lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize initial welcome message
  useEffect(() => {
    setMessages([
      {
        id: 'welcome_msg_01',
        sender: 'assistant',
        text: t('chatbot.welcome_msg'),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [lang, t]);

  // Auto-scroll to bottom on message updates
  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Close on ESC
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Quick suggestions
  const suggestions = [
    t('chatbot.suggest_1'),
    t('chatbot.suggest_2'),
    t('chatbot.suggest_3'),
    t('chatbot.suggest_4'),
  ];

  // Knowledge fallback generator if backend is deploying or cold-starting
  const getKnowledgeResponse = (query: string, currentLang: string): string => {
    const q = query.toLowerCase();

    if (q.includes('kỹ năng') || q.includes('skill') || q.includes('stack') || q.includes('công nghệ') || q.includes('tech')) {
      return currentLang === 'vi'
        ? `Quân có thế mạnh chuyên sâu về **Backend Development** với các kỹ năng chính:\n\n• **Ngôn ngữ**: Golang (1.26), Node.js / TypeScript, Python.\n• **Kiến trúc & Hệ thống**: Clean Architecture, RESTful API, Domain-Driven Design.\n• **Bảo mật & Xác thực**: JWT Rotation (SHA-256 Redis hash), TOTP 2FA (RFC 6238), WebAuthn Passkeys, Rate Limiting (Sliding Window), Constant-Time Auth.\n• **Database & Caching**: MySQL 8, PostgreSQL, Redis 7 (In-memory token & session storage).\n• **DevOps & Testing**: Docker, GitHub Actions CI (7 jobs tự động), Prometheus metrics, Fuzzing & Unit Test (>301 test cases).`
        : `Quan specializes in **Backend Development & Security Systems**:\n\n• **Core Languages**: Golang (1.26), Node.js / TypeScript, Python.\n• **Architecture**: Clean Architecture, RESTful APIs, Framework-independent Service layer.\n• **Security Engineering**: Single-use JWT Rotation, TOTP 2FA (RFC 6238), WebAuthn Passkeys, Redis Sliding Window Rate Limiting.\n• **Data Layer**: MySQL 8 (GORM transactions), Redis 7 (Distributed sessions & token blacklists).\n• **DevOps & CI/CD**: Docker, GitHub Actions CI (301 unit tests, fuzzing, gosec, Trivy), Prometheus observability.`;
    }

    if (q.includes('finnapigo') || q.includes('dự án') || q.includes('project') || q.includes('render')) {
      return currentLang === 'vi'
        ? `**FinnApiGo** là dự án tiêu biểu của Quân đã được triển khai thực tế trên Render (https://finnapigo.onrender.com):\n\n1. **Clean Architecture**: Phân tách 5 tầng nghiêm ngặt (Middleware → Handlers → Services → Repositories → Domain).\n2. **Bảo mật Đa tầng**: Cơ chế Token Family Revocation chống trộm Refresh Token, giới hạn Rate Limit theo subnet IPv6 /64.\n3. **Mã nguồn mở**: Bạn có thể xem mã nguồn hoặc thử nghiệm trực tiếp 4 kịch bản bảo mật ngay trên website!`
        : `**FinnApiGo** is Quan's flagship production backend deployed live on Render (https://finnapigo.onrender.com):\n\n1. **Clean Architecture**: Strict 5-layer separation with zero framework leak into domain logic.\n2. **Advanced Security**: Token Family Revocation against stolen refresh tokens, Redis sliding-window abuse defense.\n3. **Live Verified**: You can run 4 interactive live security scenarios right on this portfolio!`;
    }

    if (q.includes('vị trí') || q.includes('định hướng') || q.includes('role') || q.includes('job') || q.includes('fresher') || q.includes('intern')) {
      return currentLang === 'vi'
        ? `Quân là sinh viên năm cuối Công nghệ Thông tin, hiện đang tìm kiếm cơ hội **Fresher / Intern Backend Developer (Golang hoặc Node.js)** tại **Đồng Nai, TP. Hồ Chí Minh** hoặc làm việc từ xa (**Remote**). Quân sẵn sàng bắt đầu công việc ngay và có tinh thần học hỏi rất cao!`
        : `Quan is a final-year IT student seeking **Fresher / Junior / Intern Backend Developer (Golang / Node.js)** roles in **Dong Nai, Ho Chi Minh City**, or **Remote**. He is available to join immediately with strong problem-solving and self-learning skills!`;
    }

    if (q.includes('cv') || q.includes('resume') || q.includes('hồ sơ')) {
      return currentLang === 'vi'
        ? `Bạn có thể tải bản **CV PDF chính thức** của Quân trực tiếp trên website tại nút **"Tải CV (PDF)"** (hoặc mở file /CV_Nguyen_Hoang_Anh_Quan_Backend_Developer.pdf) để xem chi tiết học vấn, các dự án thực tế và kinh nghiệm làm việc nhé!`
        : `You can download Quan's official **Backend Developer CV (PDF)** directly from the **"Download CV (PDF)"** button on this site (or access /CV_Nguyen_Hoang_Anh_Quan_Backend_Developer.pdf)!`;
    }

    if (q.includes('liên hệ') || q.includes('contact') || q.includes('email') || q.includes('phỏng vấn') || q.includes('interview') || q.includes('linkedin') || q.includes('sđt') || q.includes('phone')) {
      return currentLang === 'vi'
        ? `Bạn có thể liên hệ phỏng vấn Quân trực tiếp qua:\n\n• **Email**: nguyenhoanganhquan13@gmail.com\n• **LinkedIn**: https://www.linkedin.com/in/qu%C3%A2n-nguy%E1%BB%85n-bb2053433/\n• **GitHub**: https://github.com/NguyenQuan121321\n• **Địa điểm**: Đồng Nai, TP.HCM hoặc Remote.\n\nHoặc bạn có thể bấm nút **"Gửi Email Trực tiếp"** ở phần Contact để mở sẵn mẫu thư gửi qua Webmail!`
        : `You can reach out to Quan directly via:\n\n• **Email**: nguyenhoanganhquan13@gmail.com\n• **LinkedIn**: https://www.linkedin.com/in/qu%C3%A2n-nguy%E1%BB%85n-bb2053433/\n• **GitHub**: https://github.com/NguyenQuan121321\n• **Location**: Dong Nai, Ho Chi Minh City, or Remote.\n\nYou can also click **"Send Direct Email"** in the Contact section to launch a pre-filled interview invite draft!`;
    }

    return currentLang === 'vi'
      ? `Gâu gâu! Cảm ơn bạn đã hỏi! Mình là Jake AI — Trợ lý AI độc lập của Quân (được xây dựng trên backend Golang riêng biệt tại github.com/NguyenQuan121321/JakeAI). Bạn có thể hỏi mình thêm về kỹ năng Go/Node.js, kiến trúc FinnApiGo, hoặc cách thức liên hệ phỏng vấn Quân nhé!`
      : `Woof woof! Thanks for asking! I'm Jake AI — Quan's standalone AI Assistant (powered by a dedicated Golang backend at github.com/NguyenQuan121321/JakeAI). Feel free to ask about his Go/Node.js backend stack, live FinnApiGo project, or interview scheduling!`;
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsgId = `user_${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // 1. Call Dedicated JakeAI Go Backend Endpoint via reverse proxy (/jake-ai-api/api/v1/chat or /jake-ai-api/chat)
      let backendReply: string | null = null;
      try {
        const res = await fetch('/jake-ai-api/api/v1/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text, lang })
        });
        if (res.ok) {
          const data = await res.json();
          backendReply = data?.reply || data?.data?.reply || data?.message || null;
        }
      } catch {
        // Backend cold-starting, deploying or falling back to smart local knowledge
      }

      // Simulate micro typing delay for natural feel
      await new Promise(r => setTimeout(r, 650));

      const replyText = backendReply || getKnowledgeResponse(text, lang);

      const aiMsg: ChatMessage = {
        id: `ai_${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch {
      const fallbackReply: ChatMessage = {
        id: `ai_err_${Date.now()}`,
        sender: 'assistant',
        text: getKnowledgeResponse(text, lang),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackReply]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `welcome_${Date.now()}`,
        sender: 'assistant',
        text: t('chatbot.welcome_msg'),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <aside aria-label="Jake AI Assistant" className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
      
      {/* Floating Chatbot Window */}
      {isOpen && (
        <div 
          className="fixed inset-x-3.5 bottom-20 sm:absolute sm:inset-auto sm:bottom-16 sm:right-0 mb-2 sm:w-[390px] md:w-[420px] h-[520px] max-h-[75dvh] sm:max-h-[82vh] bg-surface-900/98 backdrop-blur-2xl border border-accent-cyan/40 rounded-2xl shadow-[0_20px_50px_-5px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden animate-scaleUp origin-bottom-right"
          role="dialog"
          aria-modal="true"
        >
          {/* Header */}
          <div className="p-3 sm:p-4 border-b border-border-subtle bg-surface-950 flex items-center justify-between shrink-0 gap-2">
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <div className="relative shrink-0">
                {/* Jake Avatar */}
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-400/15 border border-amber-400/40 p-0.5 flex items-center justify-center overflow-hidden shadow-sm">
                  <img 
                    src="/jake.png" 
                    alt="Jake AI" 
                    className="w-full h-full object-contain transform hover:scale-110 transition-transform" 
                  />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h3 className="font-bold text-xs sm:text-sm text-zinc-100 font-sans truncate">
                    {t('chatbot.title')}
                  </h3>
                  <span className="text-[9px] sm:text-[9.5px] font-mono px-1.5 py-0.2 rounded bg-amber-400/10 text-amber-500 border border-amber-400/30 shrink-0">
                    Go Backend
                  </span>
                </div>
                <p className="text-[10px] sm:text-[10.5px] text-zinc-400 font-mono truncate max-w-full">
                  {t('chatbot.subtitle')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <a
                href="https://github.com/NguyenQuan121321/JakeAI"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg text-zinc-400 hover:text-amber-400 hover:bg-surface-850 transition-colors flex items-center justify-center"
                title={t('chatbot.view_github')}
                aria-label={t('chatbot.view_github')}
              >
                <GithubLogo size={16} weight="bold" />
              </a>
              <button
                type="button"
                onClick={handleClearChat}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-surface-850 transition-colors flex items-center justify-center"
                title={t('chatbot.clear_chat')}
                aria-label={t('chatbot.clear_chat')}
              >
                <Trash size={15} />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-surface-850 transition-colors flex items-center justify-center"
                title="Close Chat"
                aria-label="Close Chat"
              >
                <X size={17} weight="bold" />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3 font-sans text-xs">
            {messages.map((msg) => (
              <div 
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-7 h-7 rounded-lg bg-amber-400/15 border border-amber-400/30 p-0.5 flex items-center justify-center shrink-0 mt-0.5 overflow-hidden">
                    <img src="/jake.png" alt="Jake" className="w-full h-full object-contain" />
                  </div>
                )}

                <div className={`max-w-[82%] rounded-xl p-3 leading-relaxed whitespace-pre-line ${
                  msg.sender === 'user'
                    ? 'bg-accent-cyan text-white dark:text-surface-950 font-medium shadow-[0_0_12px_-2px_rgba(0,229,255,0.3)]'
                    : 'bg-surface-950 border border-border-subtle text-zinc-200 shadow-sm'
                }`}>
                  <div className="text-[11.5px] sm:text-xs">{msg.text}</div>
                  <div className={`text-[9.5px] font-mono mt-1 ${msg.sender === 'user' ? 'text-white/80 dark:text-surface-900/70 text-right' : 'text-zinc-500'}`}>
                    {msg.timestamp}
                  </div>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-6 h-6 rounded-md bg-surface-850 border border-border-subtle flex items-center justify-center text-zinc-400 shrink-0 mt-0.5">
                    <User size={13} />
                  </div>
                )}
              </div>
            ))}

            {/* AI Typing Indicator */}
            {isLoading && (
              <div className="flex gap-2.5 justify-start animate-fadeIn">
                <div className="w-7 h-7 rounded-lg bg-amber-400/15 border border-amber-400/30 p-0.5 flex items-center justify-center shrink-0 mt-0.5 overflow-hidden">
                  <img src="/jake.png" alt="Jake" className="w-full h-full object-contain animate-pulse" />
                </div>
                <div className="bg-surface-950 border border-border-subtle rounded-xl px-3.5 py-2.5 flex items-center gap-1.5 text-zinc-400 font-mono text-[11px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan animate-bounce [animation-delay:0ms]"></span>
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan animate-bounce [animation-delay:150ms]"></span>
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan animate-bounce [animation-delay:300ms]"></span>
                  <span className="ml-1 text-[10.5px]">{t('chatbot.thinking')}</span>
                </div>
              </div>
            )}

            <div ref={chatBottomRef} />
          </div>

          {/* Prompt Suggestions */}
          <div className="px-3.5 py-2 border-t border-border-subtle/70 bg-surface-950/80 shrink-0 space-y-1.5">
            <div className="text-[10px] font-mono text-zinc-400 flex items-center gap-1">
              <span>{t('chatbot.suggest_title')}</span>
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {suggestions.map((s, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(s)}
                  disabled={isLoading}
                  className="px-2.5 py-1 rounded-full bg-surface-900 hover:bg-surface-850 border border-border-subtle hover:border-accent-cyan/50 text-[10.5px] text-zinc-300 hover:text-accent-cyan font-sans whitespace-nowrap transition-all shrink-0 active:scale-95"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box */}
          <div className="p-2.5 sm:p-3 border-t border-border-subtle bg-surface-950 shrink-0">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={t('chatbot.input_placeholder')}
                disabled={isLoading}
                className="min-w-0 flex-1 py-2 px-3 rounded-xl bg-surface-900 border border-border-subtle focus:border-accent-cyan text-xs text-zinc-100 placeholder:text-zinc-500 font-sans focus:outline-none focus:ring-1 focus:ring-accent-cyan/40 transition-colors"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="p-2 rounded-xl bg-accent-cyan hover:bg-cyan-400 disabled:opacity-40 text-white dark:text-surface-950 transition-all flex items-center justify-center shadow-sm active:scale-95 shrink-0"
                aria-label="Send Message"
              >
                <PaperPlaneRight size={16} weight="bold" />
              </button>
            </form>
            <div className="mt-1.5 flex items-center justify-between text-[9.5px] font-mono text-zinc-400">
              <a
                href="https://github.com/NguyenQuan121321/JakeAI"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-amber-400 transition-colors truncate max-w-[200px]"
              >
                <Broadcast size={11} className="text-emerald-400 shrink-0" />
                <span className="truncate">{t('chatbot.backend_notice')}</span>
              </a>
              <span className="shrink-0 ml-2">ESC to close</span>
            </div>
          </div>

        </div>
      )}

      {/* Floating Action Button for Jake AI (Circular with 100% avatar fill) */}
      <div className="relative group">
        {/* Glow Active Online Dot (Unclipped outside the button circle) */}
        <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5 z-30 pointer-events-none">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-85"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-surface-950 shadow-[0_0_8px_#10B981]"></span>
        </span>

        {/* Round Jake Button (100% image coverage) */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-amber-400/90 hover:border-amber-400 bg-amber-400/20 shadow-[0_4px_20px_-2px_rgba(245,158,11,0.5)] hover:shadow-[0_6px_25px_-2px_rgba(245,158,11,0.7)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-400/50 cursor-pointer overflow-hidden p-0 select-none"
          title={t('chatbot.button_tooltip')}
          aria-label={t('chatbot.button_tooltip')}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <div className="w-full h-full bg-surface-950 flex items-center justify-center text-amber-400">
              <X size={22} weight="bold" className="transition-transform rotate-90" />
            </div>
          ) : (
            <img 
              src="/jake.png" 
              alt="Jake AI" 
              className="w-full h-full object-cover scale-[1.15] group-hover:scale-[1.25] group-hover:rotate-6 transition-all duration-300 pointer-events-none" 
            />
          )}
        </button>
      </div>

    </aside>
  );
};
