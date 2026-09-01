import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  X, 
  PaperPlaneRight, 
  Sparkle, 
  Trash, 
  User, 
  Robot,
  Broadcast
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

  // Knowledge fallback generator if backend is cold-starting on Render
  const getKnowledgeResponse = (query: string, currentLang: string): string => {
    const q = query.toLowerCase();

    if (q.includes('kỹ năng') || q.includes('skill') || q.includes('stack') || q.includes('công nghệ') || q.includes('tech')) {
      return currentLang === 'vi'
        ? `Quân có thế mạnh chuyên sâu về **Backend Development** với các kỹ năng chính:\n\n• **Ngôn ngữ**: Golang (1.26), Node.js / TypeScript, Python.\n• **Kiến trúc & Hệ thống**: Clean Architecture, RESTful API, Domain-Driven Design.\n• **Bảo mật & Xác thực**: JWT Rotation (SHA-256 Redis hash), TOTP 2FA (RFC 6238), WebAuthn Passkeys, Rate Limiting (Sliding Window), Constant-Time Auth.\n• **Database & Caching**: MySQL 8, PostgreSQL, Redis 7 (In-memory token & session storage).\n• **DevOps & Testing**: Docker, GitHub Actions CI (7 jobs tự động), Prometheus metrics, Fuzzing & Unit Test (>258 test cases).`
        : `Quan specializes in **Backend Development & Security Systems**:\n\n• **Core Languages**: Golang (1.26), Node.js / TypeScript, Python.\n• **Architecture**: Clean Architecture, RESTful APIs, Framework-independent Service layer.\n• **Security Engineering**: Single-use JWT Rotation, TOTP 2FA (RFC 6238), WebAuthn Passkeys, Redis Sliding Window Rate Limiting.\n• **Data Layer**: MySQL 8 (GORM transactions), Redis 7 (Distributed sessions & token blacklists).\n• **DevOps & CI/CD**: Docker, GitHub Actions CI (258 unit tests, fuzzing, gosec, Trivy), Prometheus observability.`;
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

    if (q.includes('liên hệ') || q.includes('contact') || q.includes('email') || q.includes('phỏng vấn') || q.includes('interview') || q.includes('sđt') || q.includes('phone')) {
      return currentLang === 'vi'
        ? `Bạn có thể liên hệ phỏng vấn Quân trực tiếp qua:\n\n• **Email**: nguyenhoanganhquan13@gmail.com\n• **GitHub**: https://github.com/NguyenQuan121321\n• **Địa điểm**: Đồng Nai, TP.HCM hoặc Remote.\n\nHoặc bạn có thể bấm nút **"Gửi Email Trực tiếp"** ở phần Contact để mở sẵn mẫu thư gửi qua Webmail!`
        : `You can reach out to Quan directly via:\n\n• **Email**: nguyenhoanganhquan13@gmail.com\n• **GitHub**: https://github.com/NguyenQuan121321\n• **Location**: Dong Nai, Ho Chi Minh City, or Remote.\n\nYou can also click **"Send Direct Email"** in the Contact section to launch a pre-filled interview invite draft!`;
    }

    return currentLang === 'vi'
      ? `Cảm ơn bạn đã hỏi! Quân (Finn) là Backend Developer chuyên sâu về Golang, thiết kế Clean Architecture và giải pháp bảo mật API. Bạn có thể hỏi mình thêm về các dự án, kỹ năng chuyên môn, hoặc cách thức liên hệ phỏng vấn Quân nhé!`
      : `Thanks for reaching out! Quan (Finn) is a Backend Developer specializing in Golang, Clean Architecture, and API Security. Feel free to ask about his technical stack, live projects, or interview contact details!`;
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
      // 1. Call Backend AI Endpoint via proxy (/chat-api or /render-api/api/v1/chat)
      let backendReply: string | null = null;
      try {
        const res = await fetch('/chat-api/api/v1/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text, lang })
        });
        if (res.ok) {
          const data = await res.json();
          backendReply = data?.reply || data?.message || data?.data?.reply || null;
        }
      } catch {
        // Backend cold-starting or endpoint handled via fallback knowledge
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
    <aside aria-label="AI Chatbot Assistant" className="fixed bottom-6 right-6 z-40">
      
      {/* Floating Chatbot Window */}
      {isOpen && (
        <div 
          className="absolute bottom-16 right-0 mb-2 w-[92vw] sm:w-[390px] md:w-[420px] h-[520px] max-h-[82vh] bg-surface-900/95 backdrop-blur-2xl border border-accent-cyan/40 rounded-2xl shadow-[0_15px_45px_-5px_rgba(0,0,0,0.7)] flex flex-col overflow-hidden animate-scaleUp origin-bottom-right"
          role="dialog"
          aria-modal="true"
        >
          {/* Header */}
          <div className="p-3.5 sm:p-4 border-b border-border-subtle bg-surface-950 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-accent-cyan shadow-sm">
                  <Robot size={18} weight="bold" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-xs sm:text-sm text-zinc-100 font-sans">
                    {t('chatbot.title')}
                  </h3>
                  <span className="text-[9.5px] font-mono px-1.5 py-0.2 rounded bg-cyan-950 text-accent-cyan border border-cyan-800/40">
                    AI Backend
                  </span>
                </div>
                <p className="text-[10.5px] text-zinc-400 font-mono truncate max-w-[220px]">
                  {t('chatbot.subtitle')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleClearChat}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-surface-850 transition-colors"
                title={t('chatbot.clear_chat')}
                aria-label={t('chatbot.clear_chat')}
              >
                <Trash size={16} />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-surface-850 transition-colors"
                title="Close Chat"
                aria-label="Close Chat"
              >
                <X size={18} weight="bold" />
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
                  <div className="w-6 h-6 rounded-md bg-cyan-950/80 border border-cyan-800/50 flex items-center justify-center text-accent-cyan shrink-0 mt-0.5">
                    <Sparkle size={13} weight="fill" />
                  </div>
                )}

                <div className={`max-w-[82%] rounded-xl p-3 leading-relaxed whitespace-pre-line ${
                  msg.sender === 'user'
                    ? 'bg-accent-cyan text-surface-950 font-medium shadow-[0_0_12px_-2px_rgba(0,229,255,0.3)]'
                    : 'bg-surface-950 border border-border-subtle text-zinc-200 shadow-sm'
                }`}>
                  <div className="text-[11.5px] sm:text-xs">{msg.text}</div>
                  <div className={`text-[9.5px] font-mono mt-1 ${msg.sender === 'user' ? 'text-surface-900/70 text-right' : 'text-zinc-500'}`}>
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
                <div className="w-6 h-6 rounded-md bg-cyan-950/80 border border-cyan-800/50 flex items-center justify-center text-accent-cyan shrink-0 mt-0.5">
                  <Sparkle size={13} weight="fill" className="animate-spin" />
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
              <Sparkle size={11} className="text-accent-cyan" />
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
          <div className="p-3 border-t border-border-subtle bg-surface-950 shrink-0">
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
                className="flex-1 py-2 px-3 rounded-xl bg-surface-900 border border-border-subtle focus:border-accent-cyan text-xs text-zinc-100 placeholder:text-zinc-500 font-sans focus:outline-none focus:ring-1 focus:ring-accent-cyan/40 transition-colors"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="p-2 rounded-xl bg-accent-cyan hover:bg-cyan-300 disabled:opacity-40 disabled:hover:bg-accent-cyan text-surface-950 transition-all flex items-center justify-center shadow-sm active:scale-95 shrink-0"
                aria-label="Send Message"
              >
                <PaperPlaneRight size={16} weight="bold" />
              </button>
            </form>
            <div className="mt-1.5 flex items-center justify-between text-[9.5px] font-mono text-zinc-400">
              <span className="flex items-center gap-1">
                <Broadcast size={11} className="text-emerald-400" />
                <span>{t('chatbot.backend_notice')}</span>
              </span>
              <span>ESC to close</span>
            </div>
          </div>

        </div>
      )}

      {/* Floating Action Button for Chatbot AI */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-surface-900 hover:bg-surface-850 border-2 border-accent-cyan/60 hover:border-accent-cyan text-accent-cyan flex items-center justify-center shadow-[0_0_25px_-4px_rgba(0,229,255,0.45)] hover:scale-110 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-accent-cyan/50"
        title={t('chatbot.button_tooltip')}
        aria-label={t('chatbot.button_tooltip')}
        aria-expanded={isOpen}
      >
        {/* Glow Ring Indicator */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-accent-cyan border-2 border-surface-950"></span>
        </span>

        {isOpen ? (
          <X size={22} weight="bold" className="text-zinc-200 transition-transform rotate-90" />
        ) : (
          <div className="flex items-center justify-center">
            <Robot size={24} weight="bold" className="text-accent-cyan group-hover:scale-110 transition-transform" />
          </div>
        )}
      </button>

    </aside>
  );
};
