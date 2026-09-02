// Injected scoped CSS styles for JakeAI (TypeScript)
import { JakeTheme } from '../types';

export function injectStyles(_theme: JakeTheme = 'dark'): void {
  if (typeof document === 'undefined') return;
  const existing = document.getElementById('jake-ai-styles');
  if (existing) existing.remove();

  const styleEl = document.createElement('style');
  styleEl.id = 'jake-ai-styles';
  styleEl.textContent = `
    /* JakeAI Container & Themes */
    #jake-ai-container, .jake-ai-root {
      --jake-primary: #00E5FF;
      --jake-primary-hover: #00b4d8;
      --jake-primary-light: rgba(0, 229, 255, 0.12);
      --jake-text: #f8fafc;
      --jake-text-muted: #94a3b8;
      --jake-bg: #0d1117;
      --jake-bg-glass: rgba(13, 17, 23, 0.96);
      --jake-card-border: rgba(255, 255, 255, 0.12);
      --jake-shadow: 0 20px 50px -5px rgba(0, 0, 0, 0.6);
      --jake-msg-ai-bg: #080a0f;
      --jake-msg-ai-text: #f1f5f9;
      --jake-msg-user-bg: linear-gradient(135deg, #0284c7, #00E5FF);
      --jake-msg-user-text: #ffffff;
      --jake-code-bg: #080a0f;
      --jake-code-text: #e2e8f0;
      --jake-input-bg: #121722;
      --jake-input-border: #1e293b;
      --jake-font: "Be Vietnam Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-family: var(--jake-font);
      font-size: 13px;
      line-height: 1.5;
      box-sizing: border-box;
      -webkit-font-smoothing: antialiased;
    }

    #jake-ai-container *, .jake-ai-root * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    /* Corgi Sprite Element */
    #jake-ai-corgi, .jake-corgi-sprite {
      position: fixed;
      z-index: 99990;
      width: 32px;
      height: 32px;
      cursor: pointer;
      image-rendering: pixelated;
      image-rendering: crisp-edges;
      user-select: none;
      -webkit-user-select: none;
      background-repeat: no-repeat;
      display: block;
      pointer-events: auto;
      transform-origin: center center;
      transform: scale(1.15);
      transition: filter 0.2s ease, transform 0.2s ease;
      touch-action: none;
    }

    #jake-ai-corgi:hover, .jake-corgi-sprite:hover {
      filter: drop-shadow(0 4px 12px rgba(245, 158, 11, 0.5));
      transform: scale(1.22);
    }

    #jake-ai-corgi.jake-corgi-hidden {
      opacity: 0 !important;
      pointer-events: none !important;
      transform: scale(0.3) !important;
      transition: opacity 0.2s ease, transform 0.2s ease !important;
    }

    /* Speech Hint Bubble above Corgi */
    .jake-corgi-hint {
      position: absolute;
      bottom: calc(100% + 6px);
      left: 50%;
      transform: translateX(-50%) translateY(4px);
      background: #0d1117;
      color: #00E5FF;
      font-size: 10px;
      font-family: monospace;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: 9999px;
      white-space: nowrap;
      pointer-events: none;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(0, 229, 255, 0.3);
      opacity: 0;
      transition: opacity 0.15s ease, transform 0.15s ease;
      z-index: 99991;
    }

    #jake-ai-corgi:hover .jake-corgi-hint,
    .jake-corgi-hint.jake-hint-visible {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }

    /* Mini Action Popup over Corgi: 2 Sleek Circular Icon Buttons */
    .jake-action-menu {
      position: absolute;
      bottom: calc(100% + 10px);
      left: 50%;
      transform: translateX(-50%) translateY(4px);
      background: rgba(13, 17, 23, 0.94);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 9999px;
      padding: 4px;
      display: flex;
      align-items: center;
      gap: 6px;
      box-shadow: 0 10px 28px rgba(0, 0, 0, 0.5);
      z-index: 99992;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      white-space: nowrap;
    }

    .jake-action-menu.jake-menu-open {
      opacity: 1;
      pointer-events: auto;
      transform: translateX(-50%) translateY(0);
    }

    .jake-circle-action-btn {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #182030;
      color: #ffffff;
      border: 1px solid rgba(255, 255, 255, 0.12);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      transition: transform 0.15s ease, background 0.15s ease, border-color 0.15s ease;
      box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    }

    .jake-circle-action-btn:hover {
      background: #0284c7;
      border-color: #00E5FF;
      transform: scale(1.12);
      box-shadow: 0 0 10px rgba(0, 229, 255, 0.4);
    }

    .jake-circle-action-btn:active {
      transform: scale(0.92);
    }

    /* Dog Bed (Sleep Cushion at bottom right) */
    #jake-ai-dogbed, .jake-dogbed {
      position: fixed;
      z-index: 99980;
      bottom: 20px;
      right: 20px;
      width: 46px;
      height: 46px;
      cursor: pointer;
      background: transparent;
      border: none;
      padding: 0;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      user-select: none;
      -webkit-user-select: none;
      transition: transform 0.2s ease, filter 0.2s ease;
      touch-action: none;
    }

    #jake-ai-dogbed.jake-bed-sleeping {
      animation: jakeBedBreathe 3s infinite ease-in-out;
    }

    @keyframes jakeBedBreathe {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.06) translateY(-1px); }
    }

    #jake-ai-dogbed:hover, .jake-dogbed:hover {
      transform: scale(1.14) translateY(-2px) !important;
      filter: drop-shadow(0 4px 14px rgba(245, 158, 11, 0.45));
    }

    #jake-ai-dogbed:active, .jake-dogbed:active {
      transform: scale(0.95);
    }

    .jake-cozybed-img {
      width: 44px;
      height: 44px;
      object-fit: contain;
      image-rendering: pixelated;
      image-rendering: crisp-edges;
    }

    .jake-sleep-zzz {
      position: absolute;
      top: -10px;
      right: 2px;
      font-size: 11px;
      font-weight: 700;
      font-family: monospace;
      color: #f59e0b;
      animation: jakeZzz 2.2s infinite ease-in-out;
      pointer-events: none;
      text-shadow: 0 0 6px rgba(245, 158, 11, 0.6);
    }

    @keyframes jakeZzz {
      0% { opacity: 0; transform: translateY(2px) scale(0.8); }
      50% { opacity: 1; transform: translateY(-4px) scale(1.1); }
      100% { opacity: 0; transform: translateY(-10px) scale(1.3); }
    }

    .jake-dogbed-tooltip {
      position: absolute;
      bottom: calc(100% + 6px);
      right: 0;
      background: #0d1117;
      color: #f1f5f9;
      font-size: 10.5px;
      font-weight: 600;
      padding: 3px 8px;
      border-radius: 6px;
      white-space: nowrap;
      pointer-events: none;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.15);
      opacity: 0;
      transform: translateY(4px);
      transition: opacity 0.15s ease, transform 0.15s ease;
    }

    #jake-ai-dogbed:hover .jake-dogbed-tooltip {
      opacity: 1;
      transform: translateY(0);
    }

    /* Floating Chat Modal (Always reliably anchored at bottom-right) */
    #jake-ai-chat, .jake-chat-window {
      position: fixed !important;
      right: 20px !important;
      bottom: 80px !important;
      left: auto !important;
      top: auto !important;
      z-index: 99999 !important;
      width: 390px;
      max-width: calc(100vw - 32px);
      height: 520px;
      max-height: calc(100vh - 100px);
      background: var(--jake-bg-glass);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid var(--jake-card-border);
      border-radius: 20px;
      box-shadow: var(--jake-shadow);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      animation: jakeScaleIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    @keyframes jakeScaleIn {
      0% { opacity: 0; transform: scale(0.92) translateY(16px); }
      100% { opacity: 1; transform: scale(1) translateY(0); }
    }

    /* Chat Header */
    #jake-ai-header, .jake-chat-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      background: #080a0f;
      border-bottom: 1px solid var(--jake-card-border);
      user-select: none;
      flex-shrink: 0;
    }

    .jake-header-profile {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .jake-avatar-badge {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: rgba(245, 158, 11, 0.12);
      border: 1px solid rgba(245, 158, 11, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .jake-status-dot {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 8px;
      height: 8px;
      background: #10B981;
      border: 2px solid #080a0f;
      border-radius: 50%;
    }

    .jake-title-wrap {
      display: flex;
      flex-direction: column;
      gap: 1px;
    }

    .jake-title {
      font-size: 13.5px;
      font-weight: 700;
      color: #ffffff;
    }

    .jake-subtitle {
      font-size: 10px;
      font-family: monospace;
      color: var(--jake-text-muted);
    }

    .jake-header-actions {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .jake-btn-icon {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: #182030;
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #94a3b8;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.15s, color 0.15s, border-color 0.15s;
    }

    .jake-btn-icon:hover {
      background: #222c42;
      color: #ffffff;
      border-color: rgba(255, 255, 255, 0.25);
    }

    .jake-btn-close:hover {
      background: rgba(239, 68, 68, 0.2);
      color: #ef4444;
      border-color: rgba(239, 68, 68, 0.4);
    }

    /* Chat Body & Messages */
    #jake-ai-messages, .jake-chat-body {
      flex: 1;
      padding: 14px 16px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 12px;
      background: #080a0f;
    }

    .jake-msg-row {
      display: flex;
      gap: 8px;
      align-items: flex-start;
      width: 100%;
    }

    .jake-msg-user-row {
      justify-content: flex-end;
    }

    .jake-msg-ai-row {
      justify-content: flex-start;
    }

    .jake-msg-avatar {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: rgba(245, 158, 11, 0.12);
      border: 1px solid rgba(245, 158, 11, 0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      margin-top: 2px;
      overflow: hidden;
    }

    .jake-msg-bubble {
      max-width: 84%;
      padding: 10px 14px;
      border-radius: 16px;
      font-size: 12px;
      line-height: 1.55;
      word-break: break-word;
      position: relative;
    }

    .jake-msg-ai {
      background: #0d1117;
      color: #f1f5f9;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-top-left-radius: 4px;
    }

    .jake-msg-user {
      background: linear-gradient(135deg, #0284c7, #00E5FF);
      color: #ffffff;
      font-weight: 500;
      border-top-right-radius: 4px;
      box-shadow: 0 4px 12px rgba(0, 229, 255, 0.25);
    }

    .jake-msg-time {
      display: block;
      font-size: 9px;
      font-family: monospace;
      margin-top: 4px;
      opacity: 0.6;
    }

    .jake-msg-user .jake-msg-time {
      text-align: right;
    }

    .jake-code-block {
      background: #000000;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      padding: 8px 10px;
      margin: 6px 0;
      overflow-x: auto;
      font-family: monospace;
      font-size: 11px;
      color: #00E5FF;
    }

    .jake-inline-code {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      padding: 2px 4px;
      font-family: monospace;
      font-size: 11px;
      color: #00E5FF;
    }

    /* Typing Dots */
    .jake-typing-indicator {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 10px 14px;
    }

    .jake-dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #00E5FF;
      animation: jakeBounce 1.2s infinite ease-in-out;
    }

    .jake-dot:nth-child(2) { animation-delay: 0.2s; }
    .jake-dot:nth-child(3) { animation-delay: 0.4s; }

    @keyframes jakeBounce {
      0%, 80%, 100% { transform: scale(0.8); opacity: 0.4; }
      40% { transform: scale(1.2); opacity: 1; }
    }

    /* Quick Action Chips (Circular Pills) */
    .jake-quick-actions {
      padding: 8px 12px;
      background: #080a0f;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      flex-shrink: 0;
    }

    .jake-chips-scroll {
      display: flex;
      gap: 6px;
      overflow-x: auto;
      scrollbar-width: none;
    }

    .jake-chips-scroll::-webkit-scrollbar {
      display: none;
    }

    .jake-chip {
      background: #121722;
      color: #cbd5e1;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 9999px;
      padding: 4px 10px;
      font-size: 10.5px;
      white-space: nowrap;
      cursor: pointer;
      transition: all 0.15s ease;
      flex-shrink: 0;
    }

    .jake-chip:hover {
      background: rgba(0, 229, 255, 0.12);
      border-color: #00E5FF;
      color: #00E5FF;
      transform: translateY(-1px);
    }

    /* Footer & Input Form */
    .jake-chat-footer {
      padding: 10px 12px;
      background: #0d1117;
      border-top: 1px solid var(--jake-card-border);
      flex-shrink: 0;
    }

    .jake-input-box {
      display: flex;
      align-items: center;
      gap: 6px;
      background: #121722;
      border: 1px solid var(--jake-input-border);
      border-radius: 9999px;
      padding: 3px 6px 3px 12px;
      transition: border-color 0.15s;
    }

    .jake-input-box:focus-within {
      border-color: #00E5FF;
      box-shadow: 0 0 0 1px rgba(0, 229, 255, 0.25);
    }

    .jake-input-field {
      flex: 1;
      background: transparent;
      border: none;
      outline: none;
      color: #ffffff;
      font-size: 12px;
      font-family: inherit;
    }

    .jake-input-field::placeholder {
      color: #64748b;
    }

    .jake-chat-send {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: #00E5FF;
      color: #080a0f;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.15s, background 0.15s;
      flex-shrink: 0;
    }

    .jake-chat-send:hover {
      background: #38bdf8;
      transform: scale(1.06);
    }

    .jake-chat-send:disabled {
      background: #1e293b;
      color: #64748b;
      cursor: not-allowed;
      transform: none;
    }

    .jake-footer-note {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 6px;
      font-size: 9.5px;
      font-family: monospace;
      color: #64748b;
      padding: 0 4px;
    }
  `;
  document.head.appendChild(styleEl);
}
