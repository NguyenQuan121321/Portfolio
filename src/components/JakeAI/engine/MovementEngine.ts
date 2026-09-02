// Autonomous Cozy Corner Roaming & Companion Engine (TypeScript)
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
  public idleTimer: number = 0;
  public idleWaitFrames: number = 60;
  public state: 'idle' | 'wandering' | 'going_to_bed' = 'idle';

  public lastTimestamp: number = 0;
  public isChatOpen: boolean = false;
  public isPaused: boolean = false;
  public isSleeping: boolean = false;

  private onCorgiClick?: (x: number, y: number) => void;

  private clickHandler = (e: MouseEvent) => {
    // Guard: Ignore clicks inside action menu buttons so they don't get canceled
    if ((e.target as HTMLElement).closest('.jake-action-menu')) {
      return;
    }
    e.stopPropagation();
    this.isPaused = !this.isPaused;
    if (this.onCorgiClick) {
      this.onCorgiClick(this.corgiX, this.corgiY);
    }
  };

  private resizeHandler = () => {
    const bounds = this.getCozyBounds();
    if (this.isSleeping) {
      this.corgiX = bounds.bedX;
      this.corgiY = bounds.bedY;
    } else {
      this.corgiX = Math.min(Math.max(bounds.minX, this.corgiX), bounds.maxX);
      this.corgiY = Math.min(Math.max(bounds.minY, this.corgiY), bounds.maxY);
    }
    this.targetX = this.corgiX;
    this.targetY = this.corgiY;
    this.updatePosition();
  };

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
      speed: props.speed ?? 1.4,
      theme: props.theme || 'auto',
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
  }

  public getCozyBounds() {
    if (typeof window === 'undefined') {
      return { minX: 100, maxX: 200, minY: 100, maxY: 200, bedX: 150, bedY: 150 };
    }
    const width = window.innerWidth;
    const height = window.innerHeight;
    return {
      minX: width - 160,
      maxX: width - 60,
      minY: height - 90,
      maxY: height - 40,
      bedX: width - 42,
      bedY: height - 42
    };
  }

  private initPosition(): void {
    const bounds = this.getCozyBounds();
    this.corgiX = bounds.minX + 35;
    this.corgiY = bounds.maxY - 15;
    this.targetX = this.corgiX;
    this.targetY = this.corgiY;
    this.lastDirection = 'NW';

    this.updatePosition();
    this.spriteEngine.setSprite('idle', this.lastDirection, 0);
  }

  private setupListeners(): void {
    if (typeof window === 'undefined') return;
    this.element.addEventListener('click', this.clickHandler);
    window.addEventListener('resize', this.resizeHandler, { passive: true });
  }

  public destroy(): void {
    if (typeof window === 'undefined') return;
    this.element.removeEventListener('click', this.clickHandler);
    window.removeEventListener('resize', this.resizeHandler);
  }

  public updatePosition(): void {
    const size = this.spriteEngine.currentState === 'running' ? 37 : 32;
    const half = size / 2;
    const posX = Math.round(this.corgiX - half);
    const posY = Math.round(this.corgiY - half);

    this.element.style.left = `${posX}px`;
    this.element.style.top = `${posY}px`;
  }

  public goToBed(): void {
    const bounds = this.getCozyBounds();
    this.targetX = bounds.bedX;
    this.targetY = bounds.bedY;
    this.state = 'going_to_bed';
    this.isPaused = false;
  }

  public wakeUp(): void {
    this.isSleeping = false;
    this.isPaused = false;
    const bounds = this.getCozyBounds();
    this.targetX = bounds.minX + 35;
    this.targetY = bounds.maxY - 15;
    this.state = 'wandering';
    this.idleTimer = 0;
  }

  public showHint(_text?: string, _duration?: number): void {
    // Safe compatibility method for standalone engine
  }

  public pickNewCozyTarget(): void {
    const bounds = this.getCozyBounds();
    this.targetX = bounds.minX + Math.random() * (bounds.maxX - bounds.minX);
    this.targetY = bounds.minY + Math.random() * (bounds.maxY - bounds.minY);
    this.state = 'wandering';
    this.frameCount = 0;
  }

  public step(timestamp: number): void {
    if (!this.element.isConnected) return;

    if (!this.lastTimestamp) this.lastTimestamp = timestamp;
    const elapsed = timestamp - this.lastTimestamp;

    // Smooth calibrated 100ms cadence
    if (elapsed >= 100) {
      this.lastTimestamp = timestamp;
      this.tick();
    }
  }

  public tick(): void {
    if (this.isSleeping) {
      this.spriteEngine.setSprite('idle', 'S', 0);
      this.updatePosition();
      return;
    }

    if (this.state === 'going_to_bed') {
      const dx = this.targetX - this.corgiX;
      const dy = this.targetY - this.corgiY;
      const distance = Math.hypot(dx, dy);

      if (distance <= 4) {
        this.corgiX = this.targetX;
        this.corgiY = this.targetY;
        this.isSleeping = true;
        this.isPaused = true;
        this.state = 'idle';
        this.lastDirection = 'S';
        this.spriteEngine.setSprite('idle', 'S', 0);
        this.updatePosition();
        return;
      }

      const dirInfo = SpriteEngine.getDirection(dx, dy);
      this.lastDirection = dirInfo.name;
      const stepSpeed = Math.min(2.0, distance);
      this.corgiX += (dx / distance) * stepSpeed;
      this.corgiY += (dy / distance) * stepSpeed;

      this.frameCount = (this.frameCount + 1) % this.spriteEngine.runTotalFrames;
      this.spriteEngine.setSprite('running', this.lastDirection, this.frameCount);
      this.updatePosition();
      return;
    }

    if (this.isPaused) {
      this.spriteEngine.setSprite('idle', this.lastDirection, 0);
      this.updatePosition();
      return;
    }

    if (this.state === 'idle') {
      this.idleTimer += 1;
      this.spriteEngine.setSprite('idle', this.lastDirection, 0);
      this.updatePosition();

      // After resting (approx 3.5s - 5.5s), choose a new spot to wander nearby
      if (this.idleTimer >= this.idleWaitFrames) {
        this.idleTimer = 0;
        this.idleWaitFrames = Math.floor(35 + Math.random() * 25);
        this.pickNewCozyTarget();
      }
      return;
    }

    // State is 'wandering'
    const dx = this.targetX - this.corgiX;
    const dy = this.targetY - this.corgiY;
    const distance = Math.hypot(dx, dy);

    // Reached destination
    if (distance <= 4) {
      this.corgiX = this.targetX;
      this.corgiY = this.targetY;
      this.state = 'idle';
      this.idleTimer = 0;
      this.spriteEngine.setSprite('idle', this.lastDirection, 0);
      this.updatePosition();
      return;
    }

    // Direction calculation
    const dirInfo = SpriteEngine.getDirection(dx, dy);
    this.lastDirection = dirInfo.name;

    // Leisurely calm walking speed
    const stepSpeed = Math.min(1.4, distance);
    this.corgiX += (dx / distance) * stepSpeed;
    this.corgiY += (dy / distance) * stepSpeed;

    this.frameCount = (this.frameCount + 1) % this.spriteEngine.runTotalFrames;
    this.spriteEngine.setSprite('running', this.lastDirection, this.frameCount);
    this.updatePosition();
  }

  public teleportTo(x: number, y: number): void {
    this.corgiX = x;
    this.corgiY = y;
    this.targetX = this.corgiX;
    this.targetY = this.corgiY;
    this.updatePosition();
  }
}
