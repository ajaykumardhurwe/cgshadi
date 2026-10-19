import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { AppStore } from '../store/app-store';
import { ProfileCardComponent } from '../components/profile-card.component';
import { LogoComponent } from '../components/logo.component';

interface QuickFilter {
  label: string;
  icon: string;
  type: 'district' | 'caste';
  value: string;
}

@Component({
  selector: 'cg-tab-home',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatBadgeModule, MatChipsModule, ProfileCardComponent, LogoComponent],
  template: `
    <div class="cg-fade-in">
      <div class="cg-gradient-header" style="padding:16px 18px 60px;border-radius:0 0 28px 28px;">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;">
          <div style="display:flex;align-items:center;gap:12px;">
            <cg-logo [size]="'lg'" [px]="48"></cg-logo>
            <div>
              <div style="font-size:11px;opacity:0.9;letter-spacing:1px;">NAMASTE</div>
              <div style="font-size:22px;font-weight:700;letter-spacing:0.5px;">CGSHADI</div>
              <div style="font-size:10px;opacity:0.85;">Chhattisgarh Matrimonial</div>
            </div>
          </div>
          <button mat-icon-button style="color:#fff;" (click)="store.setTab('settings')">
            <mat-icon matBadge="3" matBadgeColor="warn" matBadgeSize="small">notifications</mat-icon>
          </button>
        </div>
        <div class="cg-search-bar" (click)="store.setTab('discover')">
          <mat-icon>search</mat-icon>
          <span>Search by district, caste, surname...</span>
        </div>
      </div>

      <div style="padding:0 16px;margin-top:-50px;">
        <div class="cg-stats">
          <div class="cg-card cg-stat">
            <mat-icon style="color:var(--cg-primary);">groups</mat-icon>
            <div class="cg-stat-num">12k+</div>
            <div class="cg-stat-label">Profiles</div>
          </div>
          <div class="cg-card cg-stat">
            <mat-icon style="color:var(--cg-success);">favorite</mat-icon>
            <div class="cg-stat-num">3.5k</div>
            <div class="cg-stat-label">Matches</div>
          </div>
          <div class="cg-card cg-stat">
            <mat-icon style="color:var(--cg-warning);">verified</mat-icon>
            <div class="cg-stat-num">98%</div>
            <div class="cg-stat-label">Verified</div>
          </div>
        </div>

        <h3 class="cg-section-title" style="margin-top:22px;">
          <mat-icon style="color:var(--cg-primary);">bolt</mat-icon> Quick Browse
        </h3>
        <div class="cg-quick-scroll">
          <mat-chip *ngFor="let q of quickFilters" (click)="applyQuick(q)" class="cg-quick-chip">
            <mat-icon>{{ q.icon }}</mat-icon> {{ q.label }}
          </mat-chip>
        </div>

        <h3 class="cg-section-title" style="margin-top:22px;">
          <mat-icon style="color:var(--cg-primary);">stars</mat-icon> Featured Profiles
        </h3>
        <div class="cg-card-list">
          <cg-profile-card *ngFor="let p of featured()"
            [profile]="p"
            [isFav]="store.isFavourite(p.id)"
            (open)="store.openProfile(p.id)"
            (fav)="store.toggleFavourite(p.id)">
          </cg-profile-card>
        </div>

        <button mat-stroked-button class="cg-explore-btn" (click)="store.setTab('discover')">
          Explore all profiles <mat-icon>arrow_forward</mat-icon>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .cg-search-bar {
      margin-top: 14px;
      background: rgba(255, 255, 255, 0.18);
      border-radius: 14px;
      padding: 12px 14px;
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      transition: background 0.2s ease;
    }
    .cg-search-bar:hover { background: rgba(255, 255, 255, 0.28); }
    .cg-search-bar mat-icon { color: #fff; }
    .cg-search-bar span { color: #fff; font-size: 14px; opacity: 0.95; }
    .cg-stats { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
    .cg-stat { padding: 12px; text-align: center; }
    .cg-stat-num { font-weight: 600; font-size: 16px; }
    .cg-stat-label { font-size: 10px; color: var(--cg-muted); }
    .cg-quick-scroll { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 6px; }
    .cg-quick-chip { cursor: pointer; }
    .cg-quick-chip mat-icon { font-size: 16px; margin-right: 4px; }
    .cg-card-list { display: flex; flex-direction: column; gap: 14px; }
    .cg-explore-btn { width: 100%; margin-top: 16px; }
  `],
})
export class TabHomeComponent {
  store = inject(AppStore);
  featured = computed(() => this.store.profiles.filter((p) => p.verified).slice(0, 4));

  quickFilters: QuickFilter[] = [
    { label: 'Raipur', icon: 'place', type: 'district', value: 'Raipur' },
    { label: 'Bilaspur', icon: 'place', type: 'district', value: 'Bilaspur' },
    { label: 'Brahmin', icon: 'group', type: 'caste', value: 'Brahmin' },
    { label: 'Yadav', icon: 'group', type: 'caste', value: 'Yadav / Ahir' },
    { label: 'Durg', icon: 'place', type: 'district', value: 'Durg' },
    { label: 'Gond', icon: 'group', type: 'caste', value: 'Gond' },
  ];

  applyQuick(q: QuickFilter): void {
    if (q.type === 'district') this.store.setDistrict(q.value);
    else if (q.type === 'caste') this.store.updateFilters({ caste: q.value });
    this.store.setTab('discover');
  }
}
