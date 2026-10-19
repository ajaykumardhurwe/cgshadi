import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';
import { AppStore } from '../store/app-store';
import { DISTRICTS, CASTES } from '../data/locations';
import { ProfileCardComponent } from '../components/profile-card.component';

@Component({
  selector: 'cg-tab-discover',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    MatIconModule, MatButtonModule, MatFormFieldModule, MatSelectModule,
    MatInputModule, MatSliderModule, MatChipsModule, MatDividerModule,
    MatBadgeModule, ProfileCardComponent,
  ],
  template: `
    <div class="cg-fade-in" style="padding:16px 16px 30px;">
      <h2 style="margin:0 0 4px;font-size:22px;font-weight:600;">Discover Partner</h2>
      <p class="cg-muted" style="margin:0 0 14px;font-size:13px;">
        Filter by district, subdistrict, caste & surname across Chhattisgarh.
      </p>

      <!-- Filter panel -->
      <div class="cg-card" style="padding:14px;">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="font-weight:600;display:flex;align-items:center;gap:6px;">
            <mat-icon style="color:var(--cg-primary);">tune</mat-icon> Filters
            <span class="cg-chip" style="margin-left:4px;" *ngIf="activeCount() > 0">{{ activeCount() }} active</span>
          </span>
          <button mat-button (click)="resetAll()" style="color:var(--cg-primary);">
            <mat-icon>refresh</mat-icon> Reset
          </button>
        </div>

        <mat-divider style="margin:10px 0;"></mat-divider>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
          <mat-form-field appearance="outline" style="width:100%;">
            <mat-label>District</mat-label>
            <mat-select [value]="f.district" (selectionChange)="onDistrict($event.value)">
              <mat-option [value]="null">All districts</mat-option>
              <mat-option *ngFor="let d of districts" [value]="d.name">{{ d.name }}</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline" style="width:100%;">
            <mat-label>Subdistrict</mat-label>
            <mat-select [value]="f.subdistrict" (selectionChange)="onSubdistrict($event.value)" [disabled]="!f.district">
              <mat-option [value]="null">All subdistricts</mat-option>
              <mat-option *ngFor="let s of subdistrictOptions()" [value]="s">{{ s }}</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline" style="width:100%;">
            <mat-label>Caste</mat-label>
            <mat-select [value]="f.caste" (selectionChange)="onCaste($event.value)">
              <mat-option [value]="null">All castes</mat-option>
              <mat-option *ngFor="let c of castes" [value]="c">{{ c }}</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline" style="width:100%;">
            <mat-label>Surname</mat-label>
            <input matInput [value]="f.surname" (input)="onSurname($event)" placeholder="e.g. Sharma" />
          </mat-form-field>
        </div>

        <div style="margin-top:6px;">
          <label style="font-size:12px;color:var(--cg-muted);">Gender</label>
          <mat-chip-set style="margin-top:4px;">
            <mat-chip *ngFor="let g of genders" (click)="onGender(g.value)"
              [style.background]="f.gender === g.value ? 'var(--cg-primary)' : ''"
              [style.color]="f.gender === g.value ? '#fff' : ''"
              style="cursor:pointer;transition:all 0.2s ease;">{{ g.label }}</mat-chip>
          </mat-chip-set>
        </div>

        <div style="margin-top:12px;">
          <label style="font-size:12px;color:var(--cg-muted);display:block;margin-bottom:4px;">
            Age range: <b>{{ f.ageMin }} - {{ f.ageMax }} yrs</b>
          </label>
          <div style="display:flex;gap:14px;align-items:center;">
            <mat-slider style="flex:1;" min="18" max="60" discrete>
              <input matSliderThumb [value]="f.ageMin" (input)="onAgeMin($event)" />
            </mat-slider>
            <mat-slider style="flex:1;" min="18" max="60" discrete>
              <input matSliderThumb [value]="f.ageMax" (input)="onAgeMax($event)" />
            </mat-slider>
          </div>
        </div>
      </div>

      <!-- Results -->
      <div style="margin-top:18px;display:flex;justify-content:space-between;align-items:center;">
        <span class="cg-section-title" style="margin:0;">
          <mat-icon style="color:var(--cg-primary);">person_search</mat-icon>
          {{ results().length }} match{{ results().length === 1 ? '' : 'es' }} found
        </span>
      </div>

      <div *ngIf="results().length > 0; else emptyState" style="display:flex;flex-direction:column;gap:14px;margin-top:12px;">
        <cg-profile-card *ngFor="let p of results()"
          [profile]="p"
          [isFav]="isFav(p.id)"
          (open)="openProfile(p)"
          (fav)="store.toggleFavourite(p.id)">
        </cg-profile-card>
      </div>

      <ng-template #emptyState>
        <div class="cg-card" style="padding:30px;text-align:center;margin-top:14px;">
          <mat-icon style="font-size:48px;color:var(--cg-muted);">search_off</mat-icon>
          <p style="margin:10px 0 0;color:var(--cg-muted);">No profiles match your filters.</p>
          <button mat-flat-button color="primary" style="background:var(--cg-primary);color:#fff;margin-top:10px;" (click)="resetAll()">
            Clear filters
          </button>
        </div>
      </ng-template>
    </div>
  `,
})
export class TabDiscoverComponent {
  store = inject(AppStore);
  districts = DISTRICTS;
  castes = CASTES;
  genders = [
    { label: 'All', value: 'all' as const },
    { label: 'Female', value: 'Female' as const },
    { label: 'Male', value: 'Male' as const },
  ];

  get f() { return this.store.filters(); }

  results = computed(() => this.store.filteredProfiles());
  subdistrictOptions = computed(() => {
    const d = this.f.district;
    if (!d) return [];
    return DISTRICTS.find((x) => x.name === d)?.subdistricts ?? [];
  });

  activeCount = computed(() => {
    const f = this.f;
    let n = 0;
    if (f.district) n++;
    if (f.subdistrict) n++;
    if (f.caste) n++;
    if (f.surname) n++;
    if (f.gender !== 'all') n++;
    if (f.ageMin !== 18 || f.ageMax !== 40) n++;
    return n;
  });

  isFav(id: number) { return this.store.favourites().includes(id); }

  onDistrict(value: string | null) {
    this.store.updateFilters({ district: value, subdistrict: null });
  }
  onSubdistrict(value: string | null) {
    this.store.updateFilters({ subdistrict: value });
  }
  onCaste(value: string | null) {
    this.store.updateFilters({ caste: value });
  }
  onSurname(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.store.updateFilters({ surname: val });
  }
  onGender(value: 'all' | 'Male' | 'Female') {
    this.store.updateFilters({ gender: value });
  }
  onAgeMin(event: any) {
    const v = Number(event.target.value ?? event.value ?? 18);
    const max = this.f.ageMax;
    this.store.updateFilters({ ageMin: Math.min(v, max) });
  }
  onAgeMax(event: any) {
    const v = Number(event.target.value ?? event.value ?? 40);
    const min = this.f.ageMin;
    this.store.updateFilters({ ageMax: Math.max(v, min) });
  }

  resetAll() {
    this.store.resetFilters();
  }

  openProfile(p: any) {
    this.store.selectedProfileId.set(p.id);
  }
}
