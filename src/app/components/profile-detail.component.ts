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
      <div style="position:relative;">
        <img [src]="profile.photo" [alt]="profile.name" style="width:100%;aspect-ratio:1;object-fit:cover;border-radius:0 0 24px 24px;display:block;" />
        <button type="button" class="cg-back-btn" (click)="close.emit()">
          <mat-icon>arrow_back</mat-icon>
        </button>
        <button type="button" class="cg-detail-heart" [class.active]="isFav" (click)="store.toggleFavourite(profile.id)">
          <mat-icon>{{ isFav ? 'favorite' : 'favorite_border' }}</mat-icon>
        </button>
      </div>

      <div style="padding:18px 20px 28px;">
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
          <h2 style="margin:0;font-size:22px;font-weight:600;">{{ profile.name }} {{ profile.surname }}</h2>
          <span *ngIf="profile.verified" class="cg-badge-verified">
            <mat-icon style="font-size:16px;">verified</mat-icon> Verified
          </span>
        </div>

        <div style="color:var(--cg-muted);margin-top:4px;">
          {{ profile.age }} yrs · {{ profile.height }} · {{ profile.gender }}
        </div>
        <div style="color:var(--cg-muted);font-size:13px;margin-top:2px;">
          <mat-icon style="font-size:14px;vertical-align:middle;">place</mat-icon>
          {{ profile.subdistrict }}, {{ profile.district }}, Chhattisgarh
        </div>

        <div style="margin-top:14px;display:flex;gap:8px;flex-wrap:wrap;">
          <span class="cg-chip">{{ profile.caste }}</span>
          <span class="cg-chip accent">{{ profile.occupation }}</span>
          <span class="cg-chip success">{{ profile.income }}</span>
        </div>

        <p style="margin:16px 0 6px;font-style:italic;color:#444;line-height:1.5;">"{{ profile.bio }}"</p>

        <mat-divider></mat-divider>

        <h3 style="margin:14px 0 8px;font-size:15px;font-weight:600;">Details</h3>
        <div class="cg-detail-grid">
          <div><mat-icon>school</mat-icon><div><div class="cg-d-label">Education</div><div class="cg-d-val">{{ profile.education }}</div></div></div>
          <div><mat-icon>work</mat-icon><div><div class="cg-d-label">Occupation</div><div class="cg-d-val">{{ profile.occupation }}</div></div></div>
          <div><mat-icon>height</mat-icon><div><div class="cg-d-label">Height</div><div class="cg-d-val">{{ profile.height }}</div></div></div>
          <div><mat-icon>payments</mat-icon><div><div class="cg-d-label">Income</div><div class="cg-d-val">{{ profile.income }}</div></div></div>
          <div><mat-icon>group</mat-icon><div><div class="cg-d-label">Caste</div><div class="cg-d-val">{{ profile.caste }}</div></div></div>
          <div><mat-icon>badge</mat-icon><div><div class="cg-d-label">Surname</div><div class="cg-d-val">{{ profile.surname }}</div></div></div>
        </div>

        <h3 style="margin:18px 0 8px;font-size:15px;font-weight:600;">Hobbies & Interests</h3>
        <mat-chip-set style="display:flex;gap:8px;flex-wrap:wrap;">
          <mat-chip *ngFor="let h of profile.hobbies">{{ h }}</mat-chip>
        </mat-chip-set>

        <div style="display:flex;gap:10px;margin-top:22px;">
          <button mat-stroked-button style="flex:1;" (click)="store.toggleFavourite(profile.id)">
            <mat-icon>{{ isFav ? 'favorite' : 'favorite_border' }}</mat-icon> {{ isFav ? 'Saved' : 'Save' }}
          </button>
          <button mat-flat-button color="primary" style="flex:2;background:var(--cg-primary);color:#fff;" (click)="onConnect()">
            <mat-icon>favorite</mat-icon> Send Interest
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .cg-detail-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
    }
    .cg-detail-grid > div {
      display: flex;
      gap: 8px;
      align-items: center;
    }
    .cg-detail-grid mat-icon { color: var(--cg-primary); font-size: 22px; }
    .cg-d-label { font-size: 11px; color: var(--cg-muted); }
    .cg-d-val { font-size: 13px; font-weight: 500; }
    .cg-back-btn {
      position: absolute;
      top: 12px;
      left: 12px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: none;
      background: rgba(0, 0, 0, 0.45);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      backdrop-filter: blur(4px);
      transition: background 0.2s ease, transform 0.2s ease;
    }
    .cg-back-btn:hover { background: rgba(0, 0, 0, 0.6); transform: scale(1.05); }
    .cg-back-btn mat-icon { font-size: 22px; width: 22px; height: 22px; }
    .cg-detail-heart {
      position: absolute;
      top: 12px;
      right: 12px;
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
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
      transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.2s ease, color 0.2s ease;
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
  `],
})
export class ProfileDetailComponent {
  @Input({ required: true }) profile!: Profile;
  @Input() isFav = false;
  @Output() close = new EventEmitter<void>();
  @Output() connect = new EventEmitter<Profile>();
  store = inject(AppStore);

  onConnect() {
    this.store.sendRequest(this.profile.id);
    this.connect.emit(this.profile);
  }
}
