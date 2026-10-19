import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { AppStore } from '../store/app-store';
import { ProfileCardComponent } from '../components/profile-card.component';
import { LogoComponent } from '../components/logo.component';

@Component({
  selector: 'cg-tab-home',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatBadgeModule, MatChipsModule, ProfileCardComponent, LogoComponent],
  template: `
    <div class="cg-fade-in">
      <!-- Header -->
      <div class="cg-gradient-header" style="padding:16px 18px 60px;border-radius:0 0 28px 28px;">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;">
          <div style="display:flex;align-items:center;gap:12px;">
            <cg-logo [size]="'lg'" [px]="48"></cg-logo>
            <div>
              <div style="font-size:11px;opacity:0.9;letter-spacing:1px;">NAMASTE 🙏</div>
              <div style="font-size:22px;font-weight:700;letter-spacing:0.5px;">CGSHADI</div>
              <div style="font-size:10px;opacity:0.85;">Chhattisgarh Matrimonial</div>
            </div>
          </div>
          <button mat-icon-button style="color:#fff;" (click)="store.setTab('settings')">
            <mat-icon matBadge="3" matBadgeColor="warn" matBadgeSize="small">notifications</mat-icon>
          </button>
        </div>
        <div style="margin-top:14px;background:rgba(255,255,255,0.18);border-radius:14px;padding:12px 14px;display:flex;align-items:center;gap:8px;cursor:pointer;" (click)="store.setTab('discover')">
          <mat-icon style="color:#fff;">search</mat-icon>
          <span style="color:#fff;font-size:14px;opacity:0.95;">Search by district, caste, surname…</span>
        </div>
      </div>

      <div style="padding:0 16px;margin-top:-50px;">
        <!-- Quick stat cards -->
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;">
          <div class="cg-card" style="padding:12px;text-align:center;">
            <mat-icon style="color:var(--cg-primary);">groups</mat-icon>
            <div style="font-weight:600;font-size:16px;">12k+</div>
            <div style="font-size:10px;color:var(--cg-muted);">Profiles</div>
          </div>
          <div class="cg-card" style="padding:12px;text-align:center;">
            <mat-icon style="color:var(--cg-success);">favorite</mat-icon>
            <div style="font-weight:600;font-size:16px;">3.5k</div>
            <div style="font-size:10px;color:var(--cg-muted);">Matches</div>
          </div>
          <div class="cg-card" style="padding:12px;text-align:center;">
            <mat-icon style="color:var(--cg-warning);">verified</mat-icon>
            <div style="font-weight:600;font-size:16px;">98%</div>
            <div style="font-size:10px;color:var(--cg-muted);">Verified</div>
          </div>
        </div>

        <!-- Quick filters -->
        <h3 class="cg-section-title" style="margin-top:22px;">
          <mat-icon style="color:var(--cg-primary);">bolt</mat-icon> Quick Browse
        </h3>
        <div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:6px;">
          <mat-chip *ngFor="let q of quickFilters" (click)="applyQuick(q)" style="cursor:pointer;">
            <mat-icon style="font-size:16px;margin-right:4px;">{{ q.icon }}</mat-icon> {{ q.label }}
          </mat-chip>
        </div>

        <!-- Featured -->
        <h3 class="cg-section-title" style="margin-top:22px;">
          <mat-icon style="color:var(--cg-primary);">stars</mat-icon> Featured Profiles
        </h3>
        <div style="display:flex;flex-direction:column;gap:14px;">
          <cg-profile-card *ngFor="let p of featured();"
            [profile]="p"
            [isFav]="isFav(p.id)"
            (open)="openProfile(p)"
            (fav)="store.toggleFavourite(p.id)">
          </cg-profile-card>
        </div>

        <button mat-stroked-button style="width:100%;margin-top:16px;" (click)="store.setTab('discover')">
          Explore all profiles <mat-icon>arrow_forward</mat-icon>
        </button>
      </div>
    </div>
  `,
})
export class TabHomeComponent {
  store = inject(AppStore);
  featured = computed(() => this.store.profiles.filter((p) => p.verified).slice(0, 4));

  quickFilters = [
    { label: 'Raipur', icon: 'place', type: 'district', value: 'Raipur' },
    { label: 'Bilaspur', icon: 'place', type: 'district', value: 'Bilaspur' },
    { label: 'Brahmin', icon: 'group', type: 'caste', value: 'Brahmin' },
    { label: 'Yadav', icon: 'group', type: 'caste', value: 'Yadav / Ahir' },
    { label: 'Verified', icon: 'verified', type: 'verified', value: '' },
    { label: 'Online now', icon: 'circle', type: 'online', value: '' },
  ];

  isFav(id: number) {
    return this.store.favourites().includes(id);
  }

  applyQuick(q: any) {
    if (q.type === 'district') this.store.updateFilters({ district: q.value });
    else if (q.type === 'caste') this.store.updateFilters({ caste: q.value });
    this.store.setTab('discover');
  }

  openProfile(p: any) {
    this.store.selectedProfileId.set(p.id);
  }
}
