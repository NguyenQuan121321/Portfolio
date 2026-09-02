// Injected scoped CSS styles for JakeAI (TypeScript) with full Light & Dark mode support and sleeping animations
import { JakeTheme } from '../types';

export function injectStyles(_theme: JakeTheme = 'auto'): void {
  if (typeof document === 'undefined') return;
  const existing = document.getElementById('jake-ai-styles');
  if (existing) existing.remove();

  const styleEl = document.createElement('style');
  styleEl.id = 'jake-ai-styles';
  styleEl.textContent = `
    /* JakeAI Container Base Variables (Light Mode Default) */
    #jake-ai-container, .jake-ai-root, .jake-theme-light {
      --jake-primary: #0284c7;
      --jake-primary-hover: #0369a1;
      --jake-primary-light: rgba(2, 132, 199, 0.12);
      --jake-text: #0f172a;
      --jake-text-muted: #64748b;
      --jake-bg: #ffffff;
      --jake-bg-glass: rgba(255, 255, 255, 0.98);
      --jake-card-border: #e2e8f0;
      --jake-shadow: 0 20px 45px -5px rgba(0, 0, 0, 0.18), 0 0 0 1px rgba(0, 0, 0, 0.05);
      --jake-msg-ai-bg: #f1f5f9;
      --jake-msg-ai-text: #1e293b;
      --jake-msg-ai-border: #e2e8f0;
      --jake-msg-user-bg: linear-gradient(135deg, #0284c7, #00E5FF);
      --jake-msg-user-text: #ffffff;
      --jake-code-bg: #0f172a;
      --jake-code-text: #38bdf8;
      --jake-input-bg: #ffffff;
      --jake-input-border: #cbd5e1;
      --jake-header-bg: #f8fafc;
      --jake-btn-bg: #f1f5f9;
      --jake-btn-hover: #e2e8f0;
      --jake-btn-border: #cbd5e1;
      --jake-chip-bg: #ffffff;
      --jake-chip-text: #334155;
      --jake-chip-border: #e2e8f0;
      --jake-action-menu-bg: rgba(255, 255, 255, 0.96);
      --jake-action-menu-border: #cbd5e1;
      --jake-circle-btn-bg: #f8fafc;
      --jake-circle-btn-text: #0f172a;
      --jake-circle-btn-border: #cbd5e1;
      --jake-font: "Be Vietnam Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-family: var(--jake-font);
      font-size: 13px;
      line-height: 1.5;
      box-sizing: border-box;
      -webkit-font-smoothing: antialiased;
    }

    /* JakeAI Dark Mode Variables */
    html.dark #jake-ai-container,
    .dark #jake-ai-container,
    #jake-ai-container.jake-theme-dark,
    .jake-ai-root.jake-theme-dark {
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
      --jake-msg-ai-border: rgba(255, 255, 255, 0.1);
      --jake-msg-user-bg: linear-gradient(135deg, #0284c7, #00E5FF);
      --jake-msg-user-text: #ffffff;
      --jake-code-bg: #080a0f;
      --jake-code-text: #00E5FF;
      --jake-input-bg: #121722;
      --jake-input-border: #1e293b;
      --jake-header-bg: #080a0f;
      --jake-btn-bg: #182030;
      --jake-btn-hover: #222c42;
      --jake-btn-border: rgba(255, 255, 255, 0.1);
      --jake-chip-bg: #121722;
      --jake-chip-text: #cbd5e1;
      --jake-chip-border: rgba(255, 255, 255, 0.1);
      --jake-action-menu-bg: rgba(13, 17, 23, 0.94);
      --jake-action-menu-border: rgba(255, 255, 255, 0.15);
      --jake-circle-btn-bg: #182030;
      --jake-circle-btn-text: #ffffff;
      --jake-circle-btn-border: rgba(255, 255, 255, 0.12);
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

    /* Sleeping Corgi State */
    #jake-ai-corgi.jake-corgi-sleeping {
      animation: jakeCorgiSleepBreathe 2.4s infinite ease-in-out;
      filter: drop-shadow(0 2px 8px rgba(245, 158, 11, 0.35));
    }

    @keyframes jakeCorgiSleepBreathe {
      0%, 100% {
        transform: scale(1.12) translateY(0);
      }
      50% {
        transform: scale(1.16) translateY(-2px);
      }
    }

    /* Speech Hint Bubble above Corgi */
    .jake-corgi-hint {
      position: absolute;
      bottom: calc(100% + 6px);
      left: 50%;
      transform: translateX(-50%) translateY(4px);
      background: var(--jake-bg);
      color: var(--jake-primary);
      font-size: 10px;
      font-family: monospace;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: 9999px;
      white-space: nowrap;
      pointer-events: none;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      border: 1px solid var(--jake-card-border);
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
      background: var(--jake-action-menu-bg);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border: 1px solid var(--jake-action-menu-border);
      border-radius: 9999px;
      padding: 4px;
      display: flex;
      align-items: center;
      gap: 6px;
      box-shadow: var(--jake-shadow);
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
      background: var(--jake-circle-btn-bg);
      color: var(--jake-circle-btn-text);
      border: 1px solid var(--jake-circle-btn-border);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      transition: transform 0.15s ease, background 0.15s ease, border-color 0.15s ease;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    }

    .jake-circle-action-btn:hover {
      background: #0284c7;
      border-color: #00E5FF;
      color: #ffffff;
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
      bottom: 18px;
      right: 18px;
      width: 48px;
      height: 48px;
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
      transition: transform 0.25s ease, filter 0.25s ease;
      touch-action: none;
    }

    #jake-ai-dogbed.jake-bed-sleeping {
      animation: jakeBedGlowPulse 2.8s infinite ease-in-out;
    }

    @keyframes jakeBedGlowPulse {
      0%, 100% {
        transform: scale(1);
        filter: drop-shadow(0 2px 8px rgba(245, 158, 11, 0.3));
      }
      50% {
        transform: scale(1.05) translateY(-2px);
        filter: drop-shadow(0 6px 18px rgba(245, 158, 11, 0.65));
      }
    }

    #jake-ai-dogbed:hover, .jake-dogbed:hover {
      transform: scale(1.15) translateY(-3px) !important;
      filter: drop-shadow(0 6px 18px rgba(245, 158, 11, 0.6)) !important;
    }

    #jake-ai-dogbed:active, .jake-dogbed:active {
      transform: scale(0.95);
    }

    .jake-cozybed-img {
      width: 46px;
      height: 46px;
      object-fit: contain;
      image-rendering: pixelated;
      image-rendering: crisp-edges;
    }

    /* Animated Floating zZz Particles */
    .jake-sleep-particles {
      position: absolute;
      top: -12px;
      right: -2px;
      display: flex;
      align-items: flex-start;
      pointer-events: none;
    }

    .jake-zzz-item {
      font-size: 11px;
      font-weight: 800;
      font-family: monospace;
      color: #f59e0b;
      text-shadow: 0 0 8px rgba(245, 158, 11, 0.75);
      animation: jakeZzzFloat 2.2s infinite ease-in-out;
      opacity: 0;
    }

    .jake-zzz-1 { animation-delay: 0s; }
    .jake-zzz-2 { animation-delay: 0.6s; font-size: 13px; margin-left: 2px; }
    .jake-zzz-3 { animation-delay: 1.2s; font-size: 15px; margin-left: 2px; }

    @keyframes jakeZzzFloat {
      0% {
        opacity: 0;
        transform: translate(0, 4px) scale(0.7);
      }
      40% {
        opacity: 1;
        transform: translate(3px, -6px) scale(1);
      }
      80% {
        opacity: 0.8;
        transform: translate(6px, -16px) scale(1.25);
      }
      100% {
        opacity: 0;
        transform: translate(9px, -24px) scale(1.4);
      }
    }

    .jake-dogbed-tooltip {
      position: absolute;
      bottom: calc(100% + 8px);
      right: 0;
      background: var(--jake-bg);
      color: var(--jake-text);
      font-size: 10.5px;
      font-weight: 600;
      padding: 3px 8px;
      border-radius: 6px;
      white-space: nowrap;
      pointer-events: none;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      border: 1px solid var(--jake-card-border);
      opacity: 0;
      transform: translateY(4px);
      transition: opacity 0.15s ease, transform 0.15s ease;
    }

    #jake-ai-dogbed:hover .jake-dogbed-tooltip {
      opacity: 1;
      transform: translateY(0);
    }

    /* Floating Chat Window Modal */
    #jake-ai-chat, .jake-chat-window {
      position: fixed;
      z-index: 99995;
      bottom: 70px;
      right: 20px;
      width: 380px;
      max-width: calc(100vw - 32px);
      height: 490px;
      max-height: calc(100vh - 100px);
      background: var(--jake-bg-glass);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid var(--jake-card-border);
      border-radius: 18px;
      box-shadow: var(--jake-shadow);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      opacity: 0;
      transform: scale(0.96) translateY(10px);
      pointer-events: none;
      transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }

    #jake-ai-chat.jake-chat-open, .jake-chat-window.jake-chat-open {
      opacity: 1;
      transform: scale(1) translateY(0);
      pointer-events: auto;
    }

    /* Chat Header */
    .jake-chat-header {
      padding: 12px 14px;
      background: var(--jake-header-bg);
      border-bottom: 1px solid var(--jake-card-border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      user-select: none;
    }

    .jake-header-profile {
      display: flex;
      align-items: center;
      gap: 9px;
    }

    .jake-avatar-badge {
      position: relative;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: var(--jake-btn-bg);
      border: 1px solid var(--jake-card-border);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .jake-status-dot {
      position: absolute;
      bottom: 0px;
      right: 0px;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #10b981;
      border: 1.5px solid var(--jake-bg);
    }

    .jake-title-wrap {
      display: flex;
      flex-direction: column;
      line-height: 1.2;
    }

    .jake-title {
      font-weight: 700;
      color: var(--jake-text);
      font-size: 13px;
    }

    .jake-subtitle {
      font-size: 10px;
      color: var(--jake-text-muted);
    }

    .jake-header-actions {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .jake-btn-icon {
      width: 26px;
      height: 26px;
      border-radius: 6px;
      background: transparent;
      border: none;
      color: var(--jake-text-muted);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.15s ease, color 0.15s ease;
    }

    .jake-btn-icon:hover {
      background: var(--jake-btn-hover);
      color: var(--jake-text);
    }

    .jake-btn-close:hover {
      background: rgba(239, 68, 68, 0.12);
      color: #ef4444;
    }

    /* Chat Body */
    .jake-chat-body {
      flex: 1;
      overflow-y: auto;
      padding: 12px 14px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      scroll-behavior: smooth;
    }

    .jake-chat-body::-webkit-scrollbar {
      width: 4px;
    }

    .jake-chat-body::-webkit-scrollbar-thumb {
      background: var(--jake-card-border);
      border-radius: 4px;
    }

    .jake-msg-row {
      display: flex;
      align-items: flex-end;
      gap: 7px;
      max-width: 88%;
    }

    .jake-msg-user-row {
      align-self: flex-end;
      flex-direction: row-reverse;
    }

    .jake-msg-ai-row {
      align-self: flex-start;
    }

    .jake-msg-avatar {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: var(--jake-btn-bg);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      margin-bottom: 2px;
    }

    .jake-msg-bubble {
      padding: 8px 12px;
      border-radius: 12px;
      font-size: 12px;
      line-height: 1.5;
      position: relative;
      word-break: break-word;
    }

    .jake-msg-ai {
      background: var(--jake-msg-ai-bg);
      color: var(--jake-msg-ai-text);
      border: 1px solid var(--jake-msg-ai-border);
      border-bottom-left-radius: 3px;
    }

    .jake-msg-user {
      background: var(--jake-msg-user-bg);
      color: var(--jake-msg-user-text);
      border-bottom-right-radius: 3px;
      box-shadow: 0 4px 12px rgba(2, 132, 199, 0.25);
    }

    .jake-msg-time {
      display: block;
      font-size: 9px;
      margin-top: 3px;
      opacity: 0.65;
      text-align: right;
    }

    /* Typing Indicator */
    .jake-typing-indicator {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 8px 12px;
    }

    .jake-dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: var(--jake-primary);
      animation: jakeTyping 1.4s infinite ease-in-out;
    }

    .jake-dot:nth-child(2) { animation-delay: 0.2s; }
    .jake-dot:nth-child(3) { animation-delay: 0.4s; }

    @keyframes jakeTyping {
      0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
      40% { transform: translateY(-4px); opacity: 1; }
    }

    /* Quick Action Chips */
    .jake-quick-actions {
      padding: 6px 12px 8px;
      border-top: 1px solid var(--jake-card-border);
      background: var(--jake-header-bg);
    }

    .jake-chips-scroll {
      display: flex;
      gap: 6px;
      overflow-x: auto;
      padding-bottom: 2px;
    }

    .jake-chips-scroll::-webkit-scrollbar {
      display: none;
    }

    .jake-chip {
      background: var(--jake-chip-bg);
      color: var(--jake-chip-text);
      border: 1px solid var(--jake-chip-border);
      font-size: 10.5px;
      font-weight: 500;
      padding: 4px 9px;
      border-radius: 9999px;
      white-space: nowrap;
      cursor: pointer;
      transition: all 0.15s ease;
      flex-shrink: 0;
    }

    .jake-chip:hover {
      background: var(--jake-primary-light);
      border-color: var(--jake-primary);
      color: var(--jake-primary);
      transform: translateY(-1px);
    }

    /* Footer & Input */
    .jake-chat-footer {
      padding: 8px 12px 10px;
      background: var(--jake-bg);
      border-top: 1px solid var(--jake-card-border);
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .jake-input-box {
      display: flex;
      align-items: center;
      gap: 6px;
      background: var(--jake-input-bg);
      border: 1px solid var(--jake-input-border);
      border-radius: 10px;
      padding: 3px 6px 3px 10px;
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
    }

    .jake-input-box:focus-within {
      border-color: var(--jake-primary);
      box-shadow: 0 0 0 2px var(--jake-primary-light);
    }

    .jake-input-field {
      flex: 1;
      border: none;
      background: transparent;
      color: var(--jake-text);
      font-size: 12px;
      outline: none;
      font-family: inherit;
    }

    .jake-chat-send {
      width: 28px;
      height: 28px;
      border-radius: 7px;
      background: var(--jake-primary);
      border: none;
      color: #ffffff;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.15s ease, transform 0.1s ease;
    }

    .jake-chat-send:hover {
      background: var(--jake-primary-hover);
      transform: scale(1.05);
    }

    .jake-chat-send:disabled {
      opacity: 0.4;
      cursor: not-allowed;
      transform: none;
    }

    .jake-footer-note {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 9.5px;
      color: var(--jake-text-muted);
    }

    .jake-code-block {
      background: var(--jake-code-bg);
      color: var(--jake-code-text);
      padding: 6px 8px;
      border-radius: 6px;
      font-family: monospace;
      font-size: 11px;
      overflow-x: auto;
      margin: 4px 0;
    }

    .jake-inline-code {
      background: var(--jake-code-bg);
      color: var(--jake-code-text);
      padding: 1px 4px;
      border-radius: 4px;
      font-family: monospace;
      font-size: 11px;
    }
  `;

  document.head.appendChild(styleEl);
}
