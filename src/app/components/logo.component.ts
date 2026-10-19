import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cg-logo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cg-logo" [class.cg-logo-lg]="size === 'lg'" [style.width.px]="px" [style.height.px]="px">
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="cglogo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#7f1313" />
            <stop offset="100%" stop-color="#ef4444" />
          </linearGradient>
        </defs>
        <path d="M22 18 L30 14 L40 16 L48 12 L56 15 L64 13 L72 18 L78 24 L82 32 L80 40
                 L84 46 L80 54 L74 58 L78 66 L72 74 L66 78 L58 82 L52 86 L46 82
                 L40 86 L34 82 L28 78 L24 72 L20 66 L22 58 L18 52 L20 44
                 L16 38 L18 30 L20 24 Z"
              fill="url(#cglogo-grad)" stroke="#fff" stroke-width="1.5" stroke-linejoin="round" />
        <path d="M50 42 C46 36 38 36 38 44 C38 50 50 58 50 58 C50 58 62 50 62 44 C62 36 54 36 50 42 Z"
              fill="#fff" />
      </svg>
    </div>
  `,
  styles: [`
    .cg-logo {
      border-radius: 12px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      flex-shrink: 0;
    }
    .cg-logo svg { width: 100%; height: 100%; display: block; }
    .cg-logo-lg { border-radius: 16px; box-shadow: 0 6px 18px rgba(127, 19, 19, 0.3); }
  `],
})
export class LogoComponent {
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() px = 44;
}
