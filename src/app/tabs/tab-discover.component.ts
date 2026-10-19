import { Component, inject, computed } from '@angular/core';
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
import { AppStore, GenderFilter } from '../store/app-store';
import { DISTRICTS, CASTES, subdistrictsOf } from '../data/locations';
import { ProfileCardComponent } from '../components/profile-card.component';

@Component({
  selector: 'cg-tab-discover',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    MatIconModule, MatButtonModule, MatFormFieldModule, MatSelectModule,
    MatInputModule, MatSliderModule, MatChipsModule, MatDividerModule,
    ProfileCardComponent,
  ],
  template: `
    <div class="cg-fade-in" style="padding:16px 16px 30px;">
      <h2 style="margin:0 0 4px;font-size:22px;font-weight:600;">Discover Partner</h2>
      <p class="cg-muted" style="margin:0 0 14px;font-size:13px;">
        Filter by district, subdistrict, caste & surname across Chhattisgarh.
      </p>

      <div class="cg-card" style="padding:14px;">
        <div class="cg-filter-head">
          <span class="cg-filter-title">
            <mat-icon style="color:var(--cg-primary);">tune</mat-icon> Filters
            <span class="cg-chip" *ngIf="store.activeFilterCount() > 0">{{ store.activeFilterCount() }} active</span>
          </span>
          <button mat-button (click)="store.resetFilters()" style="color:var(--cg-primary);">
            <mat-icon>refresh</mat-icon> Reset
          </button>
        </div>

        <mat-divider style="margin:10px 0;"></mat-divider>

        <div class="cg-filter-grid">
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
              <mat-option *ngFor="let s of subOptions()" [value]="s">{{ s }}</mat-option>
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

        <div class="cg-filter-row">
          <label class="cg-filter-label">Gender</label>
          <mat-chip-set style="margin-top:4px;">
            <mat-chip *ngFor="let g of genders" (click)="onGender(g.value)"
              [style.background]="f.gender === g.value ? 'var(--cg-primary)' : ''"
              [style.color]="f.gender === g.value ? '#fff' : ''"
              class="cg-gender-chip">{{ g.label }}</mat-chip>
          </mat-chip-set>
        </div>

        <div class="cg-filter-row" style="margin-top:12px;">
          <label class="cg-filter-label">
            Age range: <b>{{ f.ageMin }} - {{ f.ageMax }} yrs</b>
          </label>
          <div class="cg-slider-row">
            <mat-slider style="flex:1;" min="18" max="60" discrete>
              <input matSliderThumb [value]="f.ageMin" (input)="onAgeMin($event)" />
            </mat-slider>
            <mat-slider style="flex:1;" min="18" max="60" discrete>
              <input matSliderThumb [value]="f.ageMax" (input)="onAgeMax($event)" />
            </mat-slider>
          </div>
        </div>
      </div>

      <div style="margin-top:18px;">
        <span class="cg-section-title" style="margin:0;">
          <mat-icon style="color:var(--cg-primary);">person_search</mat-icon>
          {{ results().length }} match{{ results().length === 1 ? '' : 'es' }} found
        </span>
      </div>

      <div *ngIf="results().length > 0; else emptyState" class="cg-card-list">
        <cg-profile-card *ngFor="let p of results()"
          [profile]="p"
          [isFav]="store.isFavourite(p.id)"
          (open)="store.openProfile(p.id)"
          (fav)="store.toggleFavourite(p.id)">
        </cg-profile-card>
      </div>

      <ng-template #emptyState>
        <div class="cg-card" style="padding:30px;text-align:center;margin-top:14px;">
          <mat-icon style="font-size:48px;color:var(--cg-muted);">search_off</mat-icon>
          <p style="margin:10px 0 0;color:var(--cg-muted);">No profiles match your filters.</p>
          <button mat-flat-button class="cg-connect-btn" style="margin-top:10px;" (click)="store.resetFilters()">
            Clear filters
          </button>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .cg-filter-head { display: flex; justify-content: space-between; align-items: center; }
    .cg-filter-title { font-weight: 600; display: flex; align-items: center; gap: 6px; }
    .cg-filter-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
    .cg-filter-row { margin-top: 6px; }
    .cg-filter-label { font-size: 12px; color: var(--cg-muted); display: block; margin-bottom: 4px; }
    .cg-gender-chip { cursor: pointer; transition: all 0.2s ease; }
    .cg-slider-row { display: flex; gap: 14px; align-items: center; }
    .cg-card-list { display: flex; flex-direction: column; gap: 14px; margin-top: 12px; }
    .cg-connect-btn { background: var(--cg-primary); color: #fff; }
  `],
})
export class TabDiscoverComponent {
  store = inject(AppStore);
  districts = DISTRICTS;
  castes = CASTES;
  genders: { label: string; value: GenderFilter }[] = [
    { label: 'All', value: 'all' },
    { label: 'Female', value: 'Female' },
    { label: 'Male', value: 'Male' },
  ];

  get f() { return this.store.filters(); }

  results = computed(() => this.store.filteredProfiles());
  subOptions = computed(() => subdistrictsOf(this.f.district));

  onDistrict(value: string | null): void {
    this.store.setDistrict(value);
  }
  onSubdistrict(value: string | null): void {
    this.store.updateFilters({ subdistrict: value });
  }
  onCaste(value: string | null): void {
    this.store.updateFilters({ caste: value });
  }
  onSurname(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.store.updateFilters({ surname: val });
  }
  onGender(value: GenderFilter): void {
    this.store.updateFilters({ gender: value });
  }
  onAgeMin(event: any): void {
    const v = Number(event.target?.value ?? event.value ?? 18);
    this.store.updateFilters({ ageMin: Math.min(v, this.f.ageMax) });
  }
  onAgeMax(event: any): void {
    const v = Number(event.target?.value ?? event.value ?? 40);
    this.store.updateFilters({ ageMax: Math.max(v, this.f.ageMin) });
  }
}
