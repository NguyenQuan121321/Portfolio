// Decoupled Smooth Physics & Movement Controller (TypeScript)
import { SpriteEngine } from './SpriteEngine';
import { DirectionName, JakeProps } from '../types';

export class MovementEngine {
  public element: HTMLElement;
  public spriteEngine: SpriteEngine;
  public config: Required<JakeProps>;

  public corgiX: number = 100;
  public corgiY: number = 100;
  public targetX: number = 100;
  public targetY: number = 100;

  public lastDirection: DirectionName = 'NW';
  public frameCount: number = 0;
  public idleTime: number = 0;
  public lastTimestamp: number = 0;
  public isChatOpen: boolean = false;
  public isPaused: boolean = false;
  public isSleeping: boolean = false;

  private onCorgiClick?: (x: number, y: number) => void;
  private tooltipEl?: HTMLElement;
  private hintTimer?: ReturnType<typeof setTimeout>;

  constructor(
    element: HTMLElement,
    props: JakeProps = {},
    onCorgiClick?: (x: number, y: number) => void
  ) {
    this.element = element;
    this.onCorgiClick = onCorgiClick;
    this.config = {
      backendUrl: props.backendUrl || '',
      greeting: props.greeting || "Xin chào, tôi là Jake — Portfolio Hub Agent của Quân.",
      position: props.position || 'bottom-right',
      speed: props.speed ?? 4,
      theme: props.theme || 'dark',
      name: props.name || 'Jake',
      persistPosition: false,
      quickChips: props.quickChips || [],
      enableSound: false,
      dogHouseImage: props.dogHouseImage || '',
      showDogHouse: props.showDogHouse ?? true,
      className: props.className || '',
      style: props.style || {}
    };

    this.spriteEngine = new SpriteEngine(this.element);

    this.initPosition();
    this.setupListeners();
    this.createTooltip();
  }

  private initPosition(): void {
    if (typeof window !== 'undefined') {
      this.corgiX = window.innerWidth - 82;
      this.corgiY = window.innerHeight - 44;
      this.targetX = this.corgiX;
      this.targetY = this.corgiY;
      this.lastDirection = 'NW';
    }

    this.updatePosition();
    this.spriteEngine.setSprite('idle', this.lastDirection, 0);
  }

  private setupListeners(): void {
    if (typeof window === 'undefined') return;

    this.element.addEventListener('click', (e: MouseEvent) => {
      e.stopPropagation();
      if (this.onCorgiClick) {
        this.onCorgiClick(this.corgiX, this.corgiY);
      }
    });

    window.addEventListener('resize', () => {
      if (typeof window !== 'undefined') {
        this.corgiX = window.innerWidth - 82;
        this.corgiY = window.innerHeight - 44;
        this.targetX = this.corgiX;
        this.targetY = this.corgiY;
        this.updatePosition();
      }
    }, { passive: true });
  }

  private createTooltip(): void {
    if (typeof document === 'undefined') return;
    const hint = document.createElement('div');
    hint.className = 'jake-corgi-hint';
    hint.textContent = 'Jake AI';
    this.element.appendChild(hint);
    this.tooltipEl = hint;
  }

  public showHint(text: string = 'Jake AI', durationMs: number = 3000): void {
    if (!this.tooltipEl) return;
    this.tooltipEl.textContent = text;
    this.tooltipEl.classList.add('jake-hint-visible');
    if (this.hintTimer) clearTimeout(this.hintTimer);
    this.hintTimer = setTimeout(() => {
      this.tooltipEl?.classList.remove('jake-hint-visible');
    }, durationMs);
  }

  public updatePosition(): void {
    const size = 32;
    const half = size / 2;
    const posX = Math.round(this.corgiX - half);
    const posY = Math.round(this.corgiY - half);

    this.element.style.left = `${posX}px`;
    this.element.style.top = `${posY}px`;
  }

  public goToBed(): void {
    this.isSleeping = true;
    this.element.classList.add('jake-corgi-hidden');
  }

  public wakeUp(): void {
    this.isSleeping = false;
    this.element.classList.remove('jake-corgi-hidden');
    if (typeof window !== 'undefined') {
      this.corgiX = window.innerWidth - 82;
      this.corgiY = window.innerHeight - 44;
      this.targetX = this.corgiX;
      this.targetY = this.corgiY;
      this.updatePosition();
    }
    this.spriteEngine.setSprite('idle', 'NW', 0);
  }

  public step(_timestamp: number): void {
    // Keep idle sprite frame calmly with zero CPU overhead
    if (!this.element.isConnected || this.isSleeping) return;
    this.spriteEngine.setSprite('idle', this.lastDirection, 0);
  }

  public teleportTo(x: number, y: number): void {
    this.corgiX = x;
    this.corgiY = y;
    this.targetX = this.corgiX;
    this.targetY = this.corgiY;
    this.updatePosition();
  }
}
