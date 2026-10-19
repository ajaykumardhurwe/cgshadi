import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { Profile } from '../data/profiles';
import { AppStore } from '../store/app-store';

@Component({
  selector: 'cg-profile-detail',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDividerModule, MatChipsModule],
  template: `
    <div class="cg-fade-in" *ngIf="profile">
      <div class="cg-photo-wrap">
        <img [src]="profile.photo" [alt]="profile.name" />
        <button type="button" class="cg-back-btn" (click)="close.emit()">
          <mat-icon>arrow_back</mat-icon>
        </button>
        <button type="button" class="cg-detail-heart" [class.active]="isFav"
          (click)="store.toggleFavourite(profile.id)"
          [attr.aria-label]="isFav ? 'Remove from saved' : 'Save profile'">
          <mat-icon>{{ isFav ? 'favorite' : 'favorite_border' }}</mat-icon>
        </button>
      </div>

      <div class="cg-detail-body">
        <div class="cg-detail-name-row">
          <h2>{{ profile.name }} {{ profile.surname }}</h2>
          <span *ngIf="profile.verified" class="cg-badge-verified">
            <mat-icon>verified</mat-icon> Verified
          </span>
        </div>

        <div class="cg-muted cg-detail-meta">
          {{ profile.age }} yrs · {{ profile.height }} · {{ profile.gender }}
        </div>
        <div class="cg-muted cg-detail-loc">
          <mat-icon>place</mat-icon>
          {{ profile.subdistrict }}, {{ profile.district }}, Chhattisgarh
        </div>

        <div class="cg-detail-chips">
          <span class="cg-chip">{{ profile.caste }}</span>
          <span class="cg-chip accent">{{ profile.occupation }}</span>
          <span class="cg-chip success">{{ profile.income }}</span>
        </div>

        <p class="cg-detail-bio">"{{ profile.bio }}"</p>

        <mat-divider></mat-divider>

        <h3 class="cg-detail-h3">Details</h3>
        <div class="cg-detail-grid">
          <div><mat-icon>school</mat-icon><div><div class="cg-d-label">Education</div><div class="cg-d-val">{{ profile.education }}</div></div></div>
          <div><mat-icon>work</mat-icon><div><div class="cg-d-label">Occupation</div><div class="cg-d-val">{{ profile.occupation }}</div></div></div>
          <div><mat-icon>height</mat-icon><div><div class="cg-d-label">Height</div><div class="cg-d-val">{{ profile.height }}</div></div></div>
          <div><mat-icon>payments</mat-icon><div><div class="cg-d-label">Income</div><div class="cg-d-val">{{ profile.income }}</div></div></div>
          <div><mat-icon>group</mat-icon><div><div class="cg-d-label">Caste</div><div class="cg-d-val">{{ profile.caste }}</div></div></div>
          <div><mat-icon>badge</mat-icon><div><div class="cg-d-label">Surname</div><div class="cg-d-val">{{ profile.surname }}</div></div></div>
        </div>

        <h3 class="cg-detail-h3">Hobbies & Interests</h3>
        <mat-chip-set class="cg-hobbies">
          <mat-chip *ngFor="let h of profile.hobbies">{{ h }}</mat-chip>
        </mat-chip-set>

        <div class="cg-detail-actions">
          <button mat-stroked-button (click)="store.toggleFavourite(profile.id)">
            <mat-icon>{{ isFav ? 'favorite' : 'favorite_border' }}</mat-icon> {{ isFav ? 'Saved' : 'Save' }}
          </button>
          <button mat-flat-button class="cg-connect-btn" (click)="onConnect()">
            <mat-icon>favorite</mat-icon> Send Interest
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .cg-photo-wrap { position: relative; }
    .cg-photo-wrap img {
      width: 100%;
      aspect-ratio: 1;
      object-fit: cover;
      border-radius: 0 0 24px 24px;
      display: block;
    }
    .cg-back-btn, .cg-detail-heart {
      position: absolute;
      top: 12px;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.2s ease, color 0.2s ease;
    }
    .cg-back-btn { left: 12px; background: rgba(0, 0, 0, 0.45); color: #fff; backdrop-filter: blur(4px); }
    .cg-back-btn:hover { background: rgba(0, 0, 0, 0.6); transform: scale(1.05); }
    .cg-back-btn mat-icon { font-size: 22px; width: 22px; height: 22px; }
    .cg-detail-heart {
      right: 12px;
      background: rgba(255, 255, 255, 0.95);
      color: #888;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
    }
    .cg-detail-heart mat-icon { font-size: 22px; width: 22px; height: 22px; }
    .cg-detail-heart:hover { transform: scale(1.08); }
    .cg-detail-heart.active {
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
    .cg-detail-body { padding: 18px 20px 28px; }
    .cg-detail-name-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
    .cg-detail-name-row h2 { margin: 0; font-size: 22px; font-weight: 600; }
    .cg-detail-meta { margin-top: 4px; }
    .cg-detail-loc { font-size: 13px; margin-top: 2px; display: flex; align-items: center; gap: 3px; }
    .cg-detail-loc mat-icon { font-size: 14px; width: 14px; height: 14px; }
    .cg-detail-chips { margin-top: 14px; display: flex; gap: 8px; flex-wrap: wrap; }
    .cg-detail-bio { margin: 16px 0 6px; font-style: italic; color: #444; line-height: 1.5; }
    .cg-detail-h3 { margin: 14px 0 8px; font-size: 15px; font-weight: 600; }
    .cg-detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
    .cg-detail-grid > div { display: flex; gap: 8px; align-items: center; }
    .cg-detail-grid mat-icon { color: var(--cg-primary); font-size: 22px; width: 22px; height: 22px; }
    .cg-d-label { font-size: 11px; color: var(--cg-muted); }
    .cg-d-val { font-size: 13px; font-weight: 500; }
    .cg-hobbies { display: flex; gap: 8px; flex-wrap: wrap; }
    .cg-detail-actions { display: flex; gap: 10px; margin-top: 22px; }
    .cg-detail-actions .mat-stroked-button { flex: 1; }
    .cg-connect-btn { flex: 2; background: var(--cg-primary); color: #fff; }
  `],
})
export class ProfileDetailComponent {
  @Input({ required: true }) profile!: Profile;
  @Input() isFav = false;
  @Output() close = new EventEmitter<void>();
  @Output() connect = new EventEmitter<Profile>();
  store = inject(AppStore);

  onConnect(): void {
    this.store.sendRequest(this.profile.id);
    this.connect.emit(this.profile);
  }
}
