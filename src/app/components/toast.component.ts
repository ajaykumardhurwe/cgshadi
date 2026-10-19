import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ToastService } from '../store/toast.service';

@Component({
  selector: 'cg-toast',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="cg-toast-wrap">
      @for (t of toast.toasts(); track t.id) {
        <div class="cg-toast-item" (click)="toast.dismiss(t.id)">
          <mat-icon style="font-size:18px;color:var(--cg-primary);">favorite</mat-icon>
          <span>{{ t.message }}</span>
        </div>
      }
    </div>
  `,
  styles: [`
    .cg-toast-wrap {
      position: fixed;
      bottom: 90px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 3000;
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: calc(100% - 32px);
      max-width: 440px;
      pointer-events: none;
    }
    .cg-toast-item {
      background: #1f1b16;
      color: #fff;
      padding: 12px 16px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 14px;
      box-shadow: 0 6px 24px rgba(0, 0, 0, 0.25);
      pointer-events: auto;
      animation: cgtoastin 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    @keyframes cgtoastin {
      from { opacity: 0; transform: translateY(20px) scale(0.95); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
  `],
})
export class ToastComponent {
  toast = inject(ToastService);
}
