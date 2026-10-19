import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Profile } from '../data/profiles';

@Component({
  selector: 'cg-profile-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  template: `
    <div class="cg-card cg-card-pop" (click)="open.emit(profile)">
      <div class="cg-photo-wrap">
        <img [src]="profile.photo" [alt]="profile.name" class="cg-profile-avatar" loading="lazy" />
        <span *ngIf="profile.online" class="cg-online-dot"></span>
        <span *ngIf="profile.verified" class="cg-verified-pill">
          <mat-icon>verified</mat-icon> Verified
        </span>
        <button type="button" class="cg-heart-btn" [class.active]="isFav"
          (click)="fav.emit(profile); $event.stopPropagation()"
          [attr.aria-label]="isFav ? 'Remove from saved' : 'Save profile'">
          <mat-icon>{{ isFav ? 'favorite' : 'favorite_border' }}</mat-icon>
        </button>
      </div>
      <div style="padding:12px 14px 14px;">
        <div style="display:flex;align-items:center;gap:6px;justify-content:space-between;">
          <span style="font-weight:600;font-size:16px;">{{ profile.name }} {{ profile.surname }}</span>
          <span class="cg-age-chip">{{ profile.age }} yrs</span>
        </div>
        <div style="font-size:13px;color:var(--cg-muted);margin-top:4px;">
          {{ profile.height }} · {{ profile.caste }}
        </div>
        <div style="font-size:12px;color:var(--cg-muted);margin-top:3px;display:flex;align-items:center;gap:3px;">
          <mat-icon style="font-size:14px;">place</mat-icon>
          {{ profile.subdistrict }}, {{ profile.district }}
        </div>
        <div style="margin-top:10px;display:flex;gap:6px;flex-wrap:wrap;">
          <span class="cg-chip">{{ profile.occupation }}</span>
          <span class="cg-chip accent">{{ profile.education }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .cg-photo-wrap {
      position: relative;
      width: 100%;
      aspect-ratio: 1;
      background: #fde8e8;
    }
    .cg-profile-avatar {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .cg-online-dot {
      position: absolute;
      top: 10px;
      left: 10px;
      width: 11px;
      height: 11px;
      background: #22c55e;
      border: 2px solid #fff;
      border-radius: 50%;
      box-shadow: 0 0 6px rgba(34, 197, 94, 0.6);
    }
    .cg-verified-pill {
      position: absolute;
      top: 10px;
      left: 28px;
      display: inline-flex;
      align-items: center;
      gap: 2px;
      background: rgba(37, 99, 235, 0.92);
      color: #fff;
      font-size: 10px;
      font-weight: 600;
      padding: 2px 8px 2px 4px;
      border-radius: 999px;
    }
    .cg-verified-pill mat-icon { font-size: 12px; width: 12px; height: 12px; }
    .cg-heart-btn {
      position: absolute;
      bottom: 10px;
      right: 10px;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      border: none;
      background: rgba(255, 255, 255, 0.95);
      color: #888;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.18);
      transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.2s ease, color 0.2s ease;
      padding: 0;
      z-index: 2;
    }
    .cg-heart-btn mat-icon {
      font-size: 22px;
      width: 22px;
      height: 22px;
    }
    .cg-heart-btn:hover {
      transform: scale(1.08);
    }
    .cg-heart-btn:active {
      transform: scale(0.92);
    }
    .cg-heart-btn.active {
      background: var(--cg-primary);
      color: #fff;
      animation: cgheartpop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    @keyframes cgheartpop {
      0% { transform: scale(1); }
      40% { transform: scale(1.3); }
      70% { transform: scale(0.9); }
      100% { transform: scale(1); }
    }
    .cg-age-chip {
      background: #fde8e8;
      color: var(--cg-primary-dark);
      font-size: 11px;
      font-weight: 600;
      padding: 3px 8px;
      border-radius: 999px;
    }
  `],
})
export class ProfileCardComponent {
  @Input({ required: true }) profile!: Profile;
  @Input() isFav = false;
  @Output() open = new EventEmitter<Profile>();
  @Output() fav = new EventEmitter<Profile>();
}
