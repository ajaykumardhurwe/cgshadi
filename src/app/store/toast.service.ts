import { Injectable, signal } from '@angular/core';

export interface Toast {
  message: string;
  id: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  readonly toasts = signal<Toast[]>([]);
  private nextId = 1;

  show(message: string, duration = 2500) {
    const id = this.nextId++;
    this.toasts.update((list) => [...list, { message, id }]);
    setTimeout(() => this.dismiss(id), duration);
  }

  dismiss(id: number) {
    this.toasts.update((list) => list.filter((t) => t.id !== id));
  }
}
