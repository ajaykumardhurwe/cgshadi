import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { AppStore } from '../store/app-store';
import { ProfileCardComponent } from '../components/profile-card.component';
import { LogoComponent } from '../components/logo.component';

@Component({
  selector: 'cg-tab-matches',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTabsModule, MatChipsModule, ProfileCardComponent, LogoComponent],
  template: `
    <div class="cg-fade-in">
      <div class="cg-gradient-header" style="padding:16px 18px;border-radius:0 0 24px 24px;">
        <div style="display:flex;align-items:center;gap:12px;">
          <cg-logo [size]="'lg'" [px]="44"></cg-logo>
          <div>
            <h2 style="margin:0;font-size:22px;font-weight:600;">Your Matches</h2>
            <p style="margin:2px 0 0;opacity:0.9;font-size:13px;">Connections & interests you've sent.</p>
          </div>
        </div>
      </div>

      <mat-tab-group style="margin-top:4px;" [color]="'primary'" (selectedTabChange)="onTab($event)">
        <mat-tab label="Accepted ({{ store.accepted().length }})">
          <div style="padding:16px;">
            <ng-container *ngIf="accepted().length; else emptyAcc">
              <div style="display:flex;flex-direction:column;gap:14px;">
                <cg-profile-card *ngFor="let p of accepted()" [profile]="p" [isFav]="isFav(p.id)"
                  (open)="openProfile(p)" (fav)="store.toggleFavourite(p.id)"></cg-profile-card>
              </div>
            </ng-container>
            <ng-template #emptyAcc>
              <div class="cg-card" style="padding:28px;text-align:center;">
                <mat-icon style="font-size:42px;color:var(--cg-muted);">handshake</mat-icon>
                <p class="cg-muted" style="margin-top:8px;">No accepted matches yet.</p>
              </div>
            </ng-template>
          </div>
        </mat-tab>

        <mat-tab label="Requests ({{ store.requests().length }})">
          <div style="padding:16px;">
            <ng-container *ngIf="requests().length; else emptyReq">
              <div style="display:flex;flex-direction:column;gap:14px;">
                <cg-profile-card *ngFor="let p of requests()" [profile]="p" [isFav]="isFav(p.id)"
                  (open)="openProfile(p)" (fav)="store.toggleFavourite(p.id)"></cg-profile-card>
              </div>
            </ng-container>
            <ng-template #emptyReq>
              <div class="cg-card" style="padding:28px;text-align:center;">
                <mat-icon style="font-size:42px;color:var(--cg-muted);">mail</mat-icon>
                <p class="cg-muted" style="margin-top:8px;">You haven't sent any interest requests.</p>
              </div>
            </ng-template>
          </div>
        </mat-tab>

        <mat-tab label="Saved ({{ store.favourites().length }})">
          <div style="padding:16px;">
            <ng-container *ngIf="favourites().length; else emptyFav">
              <div style="display:flex;flex-direction:column;gap:14px;">
                <cg-profile-card *ngFor="let p of favourites()" [profile]="p" [isFav]="true"
                  (open)="openProfile(p)" (fav)="store.toggleFavourite(p.id)"></cg-profile-card>
              </div>
            </ng-container>
            <ng-template #emptyFav>
              <div class="cg-card" style="padding:28px;text-align:center;">
                <mat-icon style="font-size:42px;color:var(--cg-muted);">favorite_border</mat-icon>
                <p class="cg-muted" style="margin-top:8px;">No saved profiles yet.</p>
              </div>
            </ng-template>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
})
export class TabMatchesComponent {
  store = inject(AppStore);
  accepted = computed(() => this.store.profiles.filter((p) => this.store.accepted().includes(p.id)));
  requests = computed(() => this.store.profiles.filter((p) => this.store.requests().includes(p.id)));
  favourites = computed(() => this.store.favouritesList());

  isFav(id: number) { return this.store.favourites().includes(id); }
  onTab(_e: any) {}
  openProfile(p: any) { this.store.selectedProfileId.set(p.id); }
}
