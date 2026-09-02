import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage, JakeProps } from '../types';
import { AIService } from '../services/aiService';
import { useLanguage } from '../../../context/LanguageContext';

interface ChatModalProps extends JakeProps {
  isOpen: boolean;
  onClose: () => void;
  aiService: AIService;
  corgiPos?: { x: number; y: number };
}

export const ChatModal: React.FC<ChatModalProps> = ({
  isOpen,
  onClose,
  aiService,
  name = 'Jake AI',
}) => {
  const { lang } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputVal, setInputVal] = useState<string>('');
  const [isWaiting, setIsWaiting] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const getCurrentTime = (): string => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const currentGreeting = lang === 'vi'
    ? 'Xin chào, tôi là Jake — Portfolio Hub Agent của Quân. Tôi có thể hỗ trợ giải đáp nhanh về kỹ năng backend, kiến trúc dự án FinnApiGo, hoặc cách thức liên hệ phỏng vấn Quân.'
    : 'Hello, I am Jake — Quan’s Portfolio Hub Agent. Feel free to ask about his backend stack, architecture of FinnApiGo, or interview scheduling!';

  const quickChips = lang === 'vi'
    ? [
        'Kỹ năng chính của Quân là gì?',
        'Dự án FinnApiGo giải quyết bài toán gì?',
        'Quân định hướng làm vị trí nào?',
        'Làm sao để liên hệ phỏng vấn Quân?'
      ]
    : [
        'What are Quan’s core backend skills?',
        'How does FinnApiGo handle security?',
        'What role is Quan looking for?',
        'How can I schedule an interview with Quan?'
      ];

  // Initialize greeting on mount or language change if chat has only 1 message
  useEffect(() => {
    setMessages([
      {
        id: 'msg-init-' + lang,
        sender: 'ai',
        text: currentGreeting,
        timestamp: getCurrentTime()
      }
    ]);
  }, [lang]);

  // Save history & scroll down
  useEffect(() => {
    if (messages.length > 0 && typeof window !== 'undefined') {
      try {
        window.sessionStorage.setItem('jakeai_chat_history', JSON.stringify(messages));
      } catch {}
    }
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isWaiting]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleSend = async (customText?: string) => {
    const text = (customText || inputVal).trim();
    if (!text || isWaiting) return;

    setInputVal('');
    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text,
      timestamp: getCurrentTime()
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsWaiting(true);

    try {
      const responseText = await aiService.sendMessage(text, lang);
      const aiMsg: ChatMessage = {
        id: 'msg-ai-' + Date.now(),
        sender: 'ai',
        text: responseText,
        timestamp: getCurrentTime()
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      const errorMsg: ChatMessage = {
        id: 'msg-err-' + Date.now(),
        sender: 'ai',
        text: lang === 'vi'
          ? 'Hiện tại kết nối tới backend đang khởi động lại. Bạn có thể gửi câu hỏi trực tiếp qua email: nguyenhoanganhquan13@gmail.com nhé!'
          : 'Backend connection is currently restarting. You can send questions directly to email: nguyenhoanganhquan13@gmail.com!',
        timestamp: getCurrentTime()
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsWaiting(false);
    }
  };

  const handleClearHistory = () => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem('jakeai_chat_history');
    }
    setMessages([
      {
        id: 'msg-' + Date.now(),
        sender: 'ai',
        text: currentGreeting,
        timestamp: getCurrentTime()
      }
    ]);
  };

  const renderMarkdown = (rawText: string) => {
    let html = rawText
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    html = html.replace(/```([a-zA-Z0-9_]*)\n([\s\S]*?)```/g, '<pre class="jake-code-block"><code>$2</code></pre>');
    html = html.replace(/`([^`]+)`/g, '<code class="jake-inline-code">$1</code>');
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    html = html.replace(/(?:^|\n)[-*]\s+(.+)/g, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
    html = html.replace(/\n\n/g, '</p><p>');
    html = html.replace(/\n/g, '<br>');

    return { __html: `<p>${html}</p>` };
  };

  if (!isOpen) return null;

  return (
    <div
      id="jake-ai-chat"
      className="jake-chat-window jake-chat-open"
      role="dialog"
      aria-label={`${name} Assistant`}
    >
      {/* Header */}
      <div id="jake-ai-header" className="jake-chat-header">
        <div className="jake-header-profile">
          <div className="jake-avatar-badge">
            <img src="/img/jake.png" alt="Jake AI" style={{ width: '22px', height: '22px', objectFit: 'contain' }} />
            <span className="jake-status-dot" title="Online"></span>
          </div>
          <div className="jake-title-wrap">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="jake-title">{name}</span>
              <span style={{ fontSize: '9px', fontFamily: 'monospace', padding: '1px 6px', borderRadius: '9999px', background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                Hub Agent
              </span>
            </div>
            <span className="jake-subtitle">Portfolio Hub Agent · Go Microservice</span>
          </div>
        </div>

        <div className="jake-header-actions">
          <a
            href="https://github.com/NguyenQuan121321/JakeAI"
            target="_blank"
            rel="noopener noreferrer"
            className="jake-btn-icon"
            title={lang === 'vi' ? 'Xem mã nguồn Go Backend' : 'View Go Backend Repo'}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>
          <button
            type="button"
            className="jake-btn-icon"
            onClick={handleClearHistory}
            title={lang === 'vi' ? 'Làm mới hội thoại' : 'Clear conversation'}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
            </svg>
          </button>
          <button
            type="button"
            className="jake-btn-icon jake-btn-close"
            onClick={onClose}
            title={lang === 'vi' ? 'Đóng chat (ESC)' : 'Close chat (ESC)'}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div id="jake-ai-messages" className="jake-chat-body">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`jake-msg-row ${m.sender === 'user' ? 'jake-msg-user-row' : 'jake-msg-ai-row'}`}
          >
            {m.sender === 'ai' && (
              <div className="jake-msg-avatar">
                <img src="/img/jake.png" alt="Jake" style={{ width: '18px', height: '18px', objectFit: 'contain' }} />
              </div>
            )}
            <div className={`jake-msg-bubble ${m.sender === 'user' ? 'jake-msg-user' : 'jake-msg-ai'}`}>
              <div
                className="jake-msg-text"
                dangerouslySetInnerHTML={renderMarkdown(m.text)}
              />
              <span className="jake-msg-time">{m.timestamp}</span>
            </div>
          </div>
        ))}

        {isWaiting && (
          <div className="jake-msg-row jake-msg-ai-row">
            <div className="jake-msg-avatar">
              <img src="/img/jake.png" alt="Jake" style={{ width: '18px', height: '18px', objectFit: 'contain' }} />
            </div>
            <div className="jake-msg-bubble jake-msg-ai jake-typing-indicator">
              <span className="jake-dot"></span>
              <span className="jake-dot"></span>
              <span className="jake-dot"></span>
              <span style={{ fontSize: '11px', color: 'var(--jake-text-muted)', marginLeft: '4px' }}>
                {lang === 'vi' ? 'Jake AI đang phản hồi...' : 'Jake AI is thinking...'}
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions / Quick chips */}
      {quickChips && quickChips.length > 0 && (
        <div className="jake-quick-actions">
          <div className="jake-chips-scroll">
            {quickChips.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                className="jake-chip"
                onClick={() => handleSend(chip)}
                disabled={isWaiting}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Footer */}
      <div className="jake-chat-footer">
        <form
          id="jake-ai-input-form"
          className="jake-input-box"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <input
            ref={inputRef}
            type="text"
            id="jake-ai-input"
            className="jake-input-field"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder={lang === 'vi' ? 'Nhập câu hỏi cho Jake AI...' : 'Ask Jake AI a question...'}
            disabled={isWaiting}
            autoComplete="off"
          />
          <button
            type="submit"
            id="jake-ai-send"
            className="jake-chat-send"
            disabled={!inputVal.trim() || isWaiting}
            title={lang === 'vi' ? 'Gửi câu hỏi' : 'Send message'}
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
        <div className="jake-footer-note">
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#10b981' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
            <span>{lang === 'vi' ? 'Kết nối JakeAI Go Microservice' : 'Connected to JakeAI Go Microservice'}</span>
          </span>
          <span>{lang === 'vi' ? 'ESC để đóng' : 'ESC to close'}</span>
        </div>
      </div>
    </div>
  );
};
