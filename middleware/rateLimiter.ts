export type KeyType = string;

export class RateLimiter {
  static check(key: string) {
      throw new Error("Method not implemented.");
  }
  private maxRequests: number;
  private windowMs: number;
  private map: Map<KeyType, { count: number; startTime: number }>;

  constructor(maxRequests: number, windowMs: number) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.map = new Map();
  }

  check(key: KeyType): { allowed: boolean; remaining?: number } {
    const now = Date.now();
    const info = this.map.get(key);

    if (!info) {
      this.map.set(key, { count: 1, startTime: now });
      return { allowed: true, remaining: this.maxRequests - 1 };
    }

    if (now - info.startTime > this.windowMs) {
      this.map.set(key, { count: 1, startTime: now });
      return { allowed: true, remaining: this.maxRequests - 1 };
    }

    if (info.count >= this.maxRequests) {
      return { allowed: false };
    }

    info.count++;
    this.map.set(key, info);
    return { allowed: true, remaining: this.maxRequests - info.count };
  }
}
